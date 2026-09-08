import { NextResponse } from "next/server";
import { getBakuTemperature, getCategoryPriorityByTemp } from "@/lib/weather";

export async function GET() {
  const temp = await getBakuTemperature();
  return NextResponse.json({ temp, priority: getCategoryPriorityByTemp(temp) });
}
