
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const SUPABASE_TABLE = process.env.SUPABASE_TABLE || "leads";

    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
      const { error } = await supabase.from(SUPABASE_TABLE).insert({
        created_at: new Date().toISOString(),
        lang: body.lang,
        job: body.job,
        visa: body.visa,
        pref: body.pref,
        jlpt: body.jlpt,
        exp: body.exp,
        housing: body.housing,
        name: body.name,
        contact: body.contact,
        email: body.email || null,
        ua: body.ua,
        ts: body.ts
      });
      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      }
      return NextResponse.json({ ok: true });
    } else {
      console.log("[Lead Received]", body);
      return NextResponse.json({ ok: true, mode: "log" });
    }
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || "unknown error" }, { status: 400 });
  }
}
