import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Add this to .env.local
  {
    auth: {
      autoRefreshToken: true,
      persistSession: false,
    },
  }
);

export async function POST(request: Request) {
  const { email, password, name } = await request.json();
  const { data, error: authError } = await supabase.auth.signUp({ email, password });
  if (authError) return NextResponse.json({ error: authError.message }, { status: 400 });

  if (data.user) {
    const { error: prefsError } = await supabase
      .from("preferences")
      .insert({
        user_id: data.user.id,
        settings: { "color": "blue", "style": "modern" },
        subscription_status: "inactive",
        name,
      });
    if (prefsError) return NextResponse.json({ error: prefsError.message }, { status: 500 });
    return NextResponse.json({ message: "User registered, please log in" });
  }
  return NextResponse.json({ message: "Registration initiated" });
}