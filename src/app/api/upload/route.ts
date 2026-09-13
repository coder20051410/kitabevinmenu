import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

export async function POST(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ success: false, error: "Giriş tələb olunur" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const type = formData.get("type") as string;
    const oldUrl = formData.get("oldUrl") as string | null;

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "Fayl tapılmadı" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Yalnız şəkil faylları (JPG, PNG, WEBP, GIF) qəbul edilir" },
        { status: 400 }
      );
    }

    // No size limit - accept any size

    const ext = file.name.split(".").pop() || "jpg";
    const uniqueName = `${type}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const blob = await put(uniqueName, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN || undefined,
      addRandomSuffix: false,
    });

    // Delete old image if provided
    if (oldUrl) {
      try {
        const oldKey = oldUrl.split("/").pop();
        if (oldKey) {
          await del(oldKey);
          console.log("Deleted old image:", oldKey);
        }
      } catch (delError) {
        console.error("Failed to delete old image:", delError);
        // Continue even if delete fails
      }
    }

    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Yükləmə zamanı xəta baş verdi" },
      { status: 500 }
    );
  }
}
