import { NextResponse } from "next/server";
import { getVenueImages } from "@/lib/venue-images";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getVenueImages(), {
    headers: { "Cache-Control": "no-store" },
  });
}