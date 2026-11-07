import { PLOT_IDS, ROOM_TYPES } from "@/lib/sketch";
import { z } from "zod";

export const sketchApiSchema = z.object({
  name: z.string().trim().min(1).max(120),
  whatsapp: z
    .string()
    .trim()
    .min(1)
    .max(30)
    .refine((value) => value.replace(/\D/g, "").length >= 7),
  email: z
    .string()
    .trim()
    .max(120)
    .refine((value) => value.length === 0 || value.includes("@")),
  society: z.string().trim().max(120),
  city: z.string().trim().min(1).max(80),
  consent: z.boolean().refine((value) => value === true),
  locale: z.enum(["en", "ur"]),
  sketchId: z.string().trim().min(1).max(16),
  plotId: z.enum(PLOT_IDS),
  rooms: z
    .array(
      z.object({
        id: z.string().max(16),
        type: z.enum(ROOM_TYPES),
        x: z.number(),
        y: z.number(),
        w: z.number(),
        h: z.number(),
      })
    )
    .max(40),
});

export type SketchLeadPayload = z.infer<typeof sketchApiSchema>;

type SketchFormCopy = {
  errName: string;
  errWhatsapp: string;
  errEmail: string;
  errCity: string;
  errConsent: string;
};

export function createSketchLeadSchema(t: SketchFormCopy) {
  return z.object({
    name: z.string().trim().min(1, t.errName).max(120),
    whatsapp: z
      .string()
      .trim()
      .min(1, t.errWhatsapp)
      .max(30)
      .refine((value) => value.replace(/\D/g, "").length >= 7, t.errWhatsapp),
    email: z
      .string()
      .trim()
      .max(120)
      .refine((value) => value.length === 0 || value.includes("@"), t.errEmail),
    society: z.string().trim().max(120),
    city: z.string().trim().min(1, t.errCity).max(80),
    consent: z
      .boolean()
      .refine((value) => value === true, t.errConsent),
  });
}

export type SketchLeadFormValues = z.infer<
  ReturnType<typeof createSketchLeadSchema>
>;
