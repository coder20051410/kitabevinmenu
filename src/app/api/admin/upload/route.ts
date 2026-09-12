import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { slugify } from "@/lib/images";
import { getVenueImages, saveVenueImages } from "@/lib/venue-images";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Giriş tələb olunur" }, { status: 401 });
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Yalnız şəkil faylı yükləyin" }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Şəkil 5 MB-dan böyük ola bilməz" }, { status: 400 });
  }
  const formName = formData.get("name");
  const categoryId = formData.get("categoryId");
  const venueType = formData.get("venueType");
  const imageName = typeof formName === "string" && formName.trim() ? formName : file.name;
  const slug = slugify(imageName);
  const filename = venueType === "hero"
    ? "hero.jpg"
    : venueType === "gallery"
      ? `gallery-${Date.now()}.jpg`
      : `${typeof categoryId === "string" && categoryId ? `${categoryId}-` : ""}${slug}.jpg`;
  const image = await sharp(Buffer.from(await file.arrayBuffer()))
    .resize({ width: venueType === "hero" ? 1600 : 800, withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();

  const subfolder = venueType === "hero" || venueType === "gallery" ? "venue" : "menu";

  // Try Blob first (OIDC works automatically in Vercel)
  try {
    const blob = await put(`images/${subfolder}/${filename}`, image, {
      access: "public",
      addRandomSuffix: false,
      contentType: "image/jpeg",
    });
    const imageUrl = blob.url;
    if (venueType === "hero" || venueType === "gallery") {
      const venue = await getVenueImages();
      await saveVenueImages({ hero: venueType === "hero" ? imageUrl : venue.hero, gallery: venueType === "gallery" ? [...venue.gallery, imageUrl] : venue.gallery });
    }
    return NextResponse.json({ path: imageUrl });
  } catch (blobError) {
    console.error("Blob upload error, falling back to local filesystem:", JSON.stringify(blobError));
  }

  // Fallback to local filesystem (for local development)
  try {
    const directory = path.join(process.cwd(), "public", "images", subfolder);
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(directory, filename), image);
    const imagePath = `/images/${subfolder}/${filename}`;
    if (venueType === "hero" || venueType === "gallery") {
      const venue = await getVenueImages();
      await saveVenueImages({ hero: venueType === "hero" ? imagePath : venue.hero, gallery: venueType === "gallery" ? [...venue.gallery, imagePath] : venue.gallery });
    }
    return NextResponse.json({ path: imagePath });
  } catch (fsError) {
    console.error("Local filesystem write error:", fsError);
    return NextResponse.json(
      { error: "Failed to upload image. Please check Vercel Blob connection." },
      { status: 500 }
    );
  }
}
