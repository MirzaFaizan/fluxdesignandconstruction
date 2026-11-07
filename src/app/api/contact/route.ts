import { contactApiSchema } from "@/lib/contact-schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = contactApiSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  console.info("[contact]", parsed.data.locale, parsed.data.service, parsed.data.city);
  return NextResponse.json({ ok: true });
}
