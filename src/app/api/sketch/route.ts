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
  return NextResponse.json({ ok: true, sketchId: parsed.data.sketchId });
}
