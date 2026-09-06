import { NextResponse } from "next/server";
import { authenticateAdmin, setAdminToken } from "@/lib/admin-auth";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (limit && now < limit.resetAt) {
    if (limit.count >= 5) {
      return NextResponse.json({ error: "Çox sayda cəhd, bir az sonra yenidən cəhd edin" }, { status: 429 });
    }
    limit.count++;
  } else {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 5 * 60 * 1000 });
  }

  const { password } = (await request.json()) as { password?: string };
  if (!password) {
    return NextResponse.json({ error: "Şifrə yanlışdır" }, { status: 401 });
  }

  const token = await authenticateAdmin("", password);
  if (!token) return NextResponse.json({ error: "Giriş məlumatları yanlışdır" }, { status: 401 });

  rateLimitMap.delete(ip);

  const response = NextResponse.json({ ok: true });
  setAdminToken(response, token);
  return response;
}
