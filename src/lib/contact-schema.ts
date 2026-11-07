import { z } from "zod";

export const PLOT_SIZES = ["5marla", "10marla", "1kanal", "other"] as const;
export const SERVICES = [
  "house",
  "interior",
  "grey",
  "turnkey",
  "commercial",
  "abroad",
  "approvals",
  "other",
] as const;

export type PlotSize = (typeof PLOT_SIZES)[number];
export type Service = (typeof SERVICES)[number];

export const contactApiSchema = z.object({
  name: z.string().trim().min(1).max(120),
  whatsapp: z
    .string()
    .trim()
    .min(1)
    .max(30)
    .refine((value) => value.replace(/\D/g, "").length >= 7),
  plot: z.enum(PLOT_SIZES),
  society: z.string().trim().min(1).max(120),
  service: z.enum(SERVICES),
  city: z.string().trim().min(1).max(80),
  message: z.string().trim().min(1).max(4000),
  locale: z.enum(["en", "ur"]),
  page: z.string().trim().max(200).optional(),
});

export type ContactPayload = z.infer<typeof contactApiSchema>;

type ContactCopy = {
  errName: string;
  errWhatsapp: string;
  errPlot: string;
  errSociety: string;
  errService: string;
  errCity: string;
  errMessage: string;
};

export function createContactSchema(t: ContactCopy) {
  return z.object({
    name: z.string().trim().min(1, t.errName).max(120),
    whatsapp: z
      .string()
      .trim()
      .min(1, t.errWhatsapp)
      .max(30)
      .refine((value) => value.replace(/\D/g, "").length >= 7, t.errWhatsapp),
    plot: z.enum(PLOT_SIZES, { error: t.errPlot }),
    society: z.string().trim().min(1, t.errSociety).max(120),
    service: z.enum(SERVICES, { error: t.errService }),
    city: z.string().trim().min(1, t.errCity).max(80),
    message: z.string().trim().min(1, t.errMessage).max(4000),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

const PLOT_EN: Record<PlotSize, string> = {
  "5marla": "5 marla",
  "10marla": "10 marla",
  "1kanal": "1 kanal",
  other: "other",
};

const PLOT_UR: Record<PlotSize, string> = {
  "5marla": "5 مرلہ",
  "10marla": "10 مرلہ",
  "1kanal": "1 کنال",
  other: "دیگر",
};

const SERVICE_EN: Record<Service, string> = {
  house: "house (architecture + build)",
  interior: "interior",
  grey: "grey structure",
  turnkey: "turnkey",
  commercial: "commercial",
  abroad: "a plot from abroad",
  approvals: "approvals",
  other: "a project",
};

const SERVICE_UR: Record<Service, string> = {
  house: "گھر (ڈیزائن اور تعمیر)",
  interior: "انٹیریئر",
  grey: "گرے سٹرکچر",
  turnkey: "ٹرن کی",
  commercial: "کمرشل",
  abroad: "بیرون ملک سے پلاٹ",
  approvals: "منظوریاں",
  other: "منصوبہ",
};

export function enquiryWhatsAppText(
  locale: "en" | "ur",
  data: ContactFormValues
): string {
  const plot = locale === "ur" ? PLOT_UR[data.plot] : PLOT_EN[data.plot];
  const service =
    locale === "ur" ? SERVICE_UR[data.service] : SERVICE_EN[data.service];

  if (locale === "ur") {
    return `السلام علیکم، میں ${data.name}۔ ${service} کے بارے میں بات کرنی ہے۔ پلاٹ کا سائز: ${plot}۔ سوسائٹی: ${data.society}۔ میں ${data.city} سے لکھ رہا/رہی ہوں۔ واٹس ایپ: ${data.whatsapp}۔ ${data.message}`;
  }

  return `Salaam, I am ${data.name}. I am interested in ${service}. Plot size: ${plot}. Society: ${data.society}. I am writing from ${data.city}. WhatsApp: ${data.whatsapp}. ${data.message}`;
}
