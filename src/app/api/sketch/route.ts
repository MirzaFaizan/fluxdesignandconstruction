import { sendSketchMail } from "@/lib/sketch-mail";
import { sketchApiSchema } from "@/lib/sketch-schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = sketchApiSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  console.info(
    "[sketch]",
    parsed.data.locale,
    parsed.data.sketchId,
    parsed.data.plotId,
    parsed.data.city,
    parsed.data.rooms.length
  );

  // The lead is only useful if the visitor still gets the PDF, so a mail
  // failure is logged by sendStudioMail and never blocks the download.
  await sendSketchMail(parsed.data);
  return NextResponse.json({ ok: true, sketchId: parsed.data.sketchId });
}
