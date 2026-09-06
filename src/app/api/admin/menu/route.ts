import { NextResponse } from "next/server";
import { getMenu, updateMenu } from "@/lib/menu-store";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Giriş tələb olunur" }, { status: 401 });
  return NextResponse.json(await getMenu(), {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Giriş tələb olunur" }, { status: 401 });
  const categories = await request.json();
  if (!Array.isArray(categories)) return NextResponse.json({ error: "Menyu formatı yanlışdır" }, { status: 400 });
  if (categories.some((category) => category.items?.some((item: { name?: string; price?: number }) => !item.name?.trim() || typeof item.price !== "number" || !Number.isFinite(item.price) || item.price < 0))) {
    return NextResponse.json({ error: "Məhsul adı boş və qiymət mənfi ola bilməz" }, { status: 400 });
  }
  try {
    await updateMenu(categories);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Menyu yadda saxlanmadı" }, { status: 500 });
  }
  return NextResponse.json(await getMenu(), {
    headers: { "Cache-Control": "no-store" },
  });
}
