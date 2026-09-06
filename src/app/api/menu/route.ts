import { NextResponse } from "next/server";
import { getMenu } from "@/lib/menu-store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getMenu(), {
    headers: { "Cache-Control": "no-store" },
  });
}
