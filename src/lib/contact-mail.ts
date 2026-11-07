import { STUDIO_EMAIL } from "./contact";
import type { ContactPayload } from "./contact-schema";

const MAIL_FROM = `FluX Design and Construction <${STUDIO_EMAIL}>`;

export function contactMailText(data: ContactPayload): string {
  return [
    `Name: ${data.name}`,
    `Phone: ${data.whatsapp}`,
    `Message: ${data.message}`,
    `Locale: ${data.locale}`,
    `Page: ${data.page || "—"}`,
    `Plot: ${data.plot}`,
    `Society: ${data.society}`,
    `Service: ${data.service}`,
    `City: ${data.city}`,
  ].join("\n");
}

/** Resend HTTPS API — works on Cloudflare Workers / OpenNext. */
export async function sendContactMail(
  data: ContactPayload
): Promise<"sent" | "skipped" | "failed"> {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  if (!apiKey) {
    console.info("[contact] mail skipped: RESEND_API_KEY is not set");
    return "skipped";
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [STUDIO_EMAIL],
        subject: `Enquiry from ${data.name.replace(/\s+/g, " ")}`,
        text: contactMailText(data),
      }),
    });
    if (!response.ok) {
      console.error("[contact] mail failed", response.status);
      return "failed";
    }
    console.info("[contact] mail sent");
    return "sent";
  } catch {
    console.error("[contact] mail failed");
    return "failed";
  }
}
