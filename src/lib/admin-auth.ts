import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const accessTokenCookie = "kitab-admin-token";

function getSupabaseAuthClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function authenticateAdmin(email: string, password: string) {
  const supabase = getSupabaseAuthClient();
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) return null;
    return data.session.access_token;
  }

  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (configuredPassword && password === configuredPassword) return "legacy-admin";
  return null;
}

export async function isAdminAuthenticated() {
  const token = (await cookies()).get(accessTokenCookie)?.value;
  if (!token) return false;
  if (token === "legacy-admin") return Boolean(process.env.ADMIN_PASSWORD);

  const supabase = getSupabaseAuthClient();
  if (!supabase) return false;
  const { data, error } = await supabase.auth.getUser(token);
  return !error && Boolean(data.user);
}

export function setAdminToken(
  response: { cookies: { set: (name: string, value: string, options: Record<string, unknown>) => void } },
  token: string,
) {
  response.cookies.set(accessTokenCookie, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
}

export const ADMIN_TOKEN_COOKIE = accessTokenCookie;