import { STUDIO_EMAIL } from "./contact";
import type { ContactPayload } from "./contact-schema";

const MAIL_FROM = `FluX Design and Construction <${STUDIO_EMAIL}>`;
const MAIL_CC = "fluxdesignstudio.info@gmail.com";

export type MailResult = "sent" | "skipped" | "failed";

export function contactMailText(data: ContactPayload): string {
  return [
    `Name: ${data.name}`,
    `Phone: ${data.whatsapp}`,
    `Message: ${data.message}`,
    `Locale: ${data.locale}`,
    `Page: ${data.page || "-"}`,
    `Plot: ${data.plot}`,
    `Society: ${data.society}`,
    `Service: ${data.service}`,
    `City: ${data.city}`,
  ].join("\n");
}

/**
 * Plain-text mail to the studio inbox (To info@, CC the Gmail) via the
 * Resend HTTPS API, which works on Cloudflare Workers / OpenNext.
 * `tag` prefixes the log lines, e.g. "[contact]" or "[sketch]".
 */
export async function sendStudioMail(
  tag: string,
  subject: string,
  text: string
): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  if (!apiKey) {
    console.warn(`${tag} mail skipped: RESEND_API_KEY is not set`);
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
        cc: [MAIL_CC],
        subject,
        text,
      }),
    });
    if (!response.ok) {
      console.error(`${tag} mail failed`, response.status);
      return "failed";
    }
    console.info(`${tag} mail sent`);
    return "sent";
  } catch {
    console.error(`${tag} mail failed`);
    return "failed";
  }
}

export function sendContactMail(data: ContactPayload): Promise<MailResult> {
  return sendStudioMail(
    "[contact]",
    `Enquiry from ${data.name.replace(/\s+/g, " ")}`,
    contactMailText(data)
  );
}
