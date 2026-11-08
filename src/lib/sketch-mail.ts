import { SITE_ORIGIN } from "./contact";
import { sendStudioMail, type MailResult } from "./contact-mail";
import {
  encodeSketch,
  indicativeCovered,
  PLOT_TEMPLATES,
  plotFamilyLabel,
  roomLabel,
  roomSizeLabel,
  sharePath,
  type SketchState,
} from "./sketch";
import type { SketchLeadPayload } from "./sketch-schema";

/** "0333 1234567" -> "923331234567"; "+92 333 1234567" -> "923331234567". */
export function leadWhatsAppUrl(whatsapp: string): string {
  let digits = whatsapp.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = `92${digits.slice(1)}`;
  return `https://wa.me/${digits}`;
}

export function sketchPlotLabel(data: SketchLeadPayload): string {
  const plot = PLOT_TEMPLATES[data.plotId];
  return `${plotFamilyLabel(plot, "en")} ${plot.widthFt}x${plot.depthFt}`;
}

export function sketchMailSubject(data: SketchLeadPayload): string {
  return `Sketch lead: ${sketchPlotLabel(data)} - ${data.whatsapp}`;
}

export function sketchMailText(data: SketchLeadPayload): string {
  const state: SketchState = {
    v: 1,
    id: data.sketchId,
    plotId: data.plotId,
    society: data.society,
    rooms: data.rooms,
  };
  const rooms = data.rooms.map(
    (room) => `- ${roomLabel(room.type, "en")} ${roomSizeLabel(room)}`
  );

  return [
    `Name: ${data.name}`,
    `WhatsApp: ${data.whatsapp}`,
    `Chat: ${leadWhatsAppUrl(data.whatsapp)}`,
    `Email: ${data.email || "-"}`,
    `City: ${data.city}`,
    `Society: ${data.society || "-"}`,
    `Locale: ${data.locale}`,
    `Plot: ${sketchPlotLabel(data)} (${PLOT_TEMPLATES[data.plotId].areaSqFt} sq ft)`,
    `Sketch: ${data.sketchId}`,
    `Rooms (${data.rooms.length}), indicative covered ${indicativeCovered(data.rooms)} sq ft:`,
    ...(rooms.length ? rooms : ["- none"]),
    `Open sketch: ${SITE_ORIGIN}${sharePath(data.locale, encodeSketch(state))}`,
  ].join("\n");
}

export function sendSketchMail(data: SketchLeadPayload): Promise<MailResult> {
  return sendStudioMail("[sketch]", sketchMailSubject(data), sketchMailText(data));
}
