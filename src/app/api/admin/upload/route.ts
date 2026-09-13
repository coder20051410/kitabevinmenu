import sharp from "sharp";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { slugify } from "@/lib/images";
import { getVenueImages, saveVenueImages } from "@/lib/venue-images";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Giriş tələb olunur" }, { status: 401 });
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Yalnız şəkil faylı yükləyin" }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "Şəkil 10 MB-dan böyük ola bilməz" }, { status: 400 });
  }
  const formName = formData.get("name");
  const categoryId = formData.get("categoryId");
  const venueType = formData.get("venueType");
  const imageName = typeof formName === "string" && formName.trim() ? formName : file.name;
  const slug = slugify(imageName);
  const timestamp = Date.now();
  const filename = venueType === "hero"
    ? `hero-${timestamp}.jpg`
    : venueType === "gallery"
      ? `gallery-${timestamp}.jpg`
      : `${typeof categoryId === "string" && categoryId ? `${categoryId}-` : ""}${slug}-${timestamp}.jpg`;
  const image = await sharp(Buffer.from(await file.arrayBuffer()))
    .resize({ width: venueType === "hero" ? 1600 : 800, withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();

  const subfolder = venueType === "hero" || venueType === "gallery" ? "venue" : "menu";

  try {
    const blob = await put(`images/${subfolder}/${filename}`, image, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN || undefined,
      addRandomSuffix: false,
      contentType: "image/jpeg",
      allowOverwrite: true,
    });
    const imageUrl = blob.url;
    if (venueType === "hero" || venueType === "gallery") {
      const venue = await getVenueImages();
      await saveVenueImages({ hero: venueType === "hero" ? imageUrl : venue.hero, gallery: venueType === "gallery" ? [...venue.gallery, imageUrl] : venue.gallery });
      revalidatePath("/");
    }
    return NextResponse.json({ path: imageUrl });
  } catch (blobError) {
    const errorMessage = blobError instanceof Error ? blobError.message : String(blobError);
    console.error("Blob upload error:", errorMessage);
    return NextResponse.json(
      { error: `Vercel Blob-a yükləmək mümkün olmadı: ${errorMessage}` },
      { status: 500 },
    );
  }
}
