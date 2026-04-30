import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body?.jobId || !body?.userId) {
    return NextResponse.json({ ok: false, error: "jobId and userId are required" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, message: "Application received" });
}
