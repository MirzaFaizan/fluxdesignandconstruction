"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ctaPrimary, ctaSecondary } from "@/lib/cta";
import {
  createSketchLeadSchema,
  type SketchLeadFormValues,
} from "@/lib/sketch-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

const controlClass =
  "min-h-11 w-full rounded-[2px] border border-border bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-foreground/45 focus-visible:outline focus-visible:outline-offset-3 disabled:opacity-50";

type DownloadDialogProps = {
  locale: Locale;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  society: string;
  status: "idle" | "sending" | "sent" | "error";
  shareUrl: string | null;
  whatsappHref: string | null;
  onSubmitLead: (values: SketchLeadFormValues) => Promise<void>;
};

export function DownloadDialog({
  locale,
  open,
  onOpenChange,
  society,
  status,
  shareUrl,
  whatsappHref,
  onSubmitLead,
}: DownloadDialogProps) {
  const t = useTranslations("Sketch");
  const schema = useMemo(
    () =>
      createSketchLeadSchema({
        errName: t("errName"),
        errWhatsapp: t("errWhatsapp"),
        errEmail: t("errEmail"),
        errCity: t("errCity"),
        errConsent: t("errConsent"),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SketchLeadFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      whatsapp: "",
      email: "",
      society,
      city: "",
      consent: false,
    },
  });

  useEffect(() => {
    if (open && status !== "sent") {
      reset((current) => ({ ...current, society }));
    }
  }, [open, reset, society, status]);

  const busy = isSubmitting || status === "sending";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto rounded-[2px] sm:max-w-md"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl leading-snug">
            {t("gateTitle")}
          </DialogTitle>
          <DialogDescription className="text-pretty text-sm leading-relaxed text-foreground/80">
            {t("gateLede")}
          </DialogDescription>
        </DialogHeader>

        {status === "sent" ? (
          <div className="flex flex-col gap-4">
            <p role="status" className="text-sm leading-relaxed">
              {t("sent")}
            </p>
            {shareUrl ? (
              <p className="break-all text-sm leading-relaxed text-foreground/80">
                {t("shareLabel")}{" "}
                <a href={shareUrl} className="underline" dir="ltr">
                  {shareUrl}
                </a>
              </p>
            ) : null}
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={ctaPrimary}
              >
                {t("sendWhatsapp")}
              </a>
            ) : null}
            <button
              type="button"
              className={ctaSecondary}
              onClick={() => onOpenChange(false)}
            >
              {t("close")}
            </button>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit(onSubmitLead)}
            className="flex flex-col gap-4"
          >
            <Field id="sketch-name" label={t("fieldName")} error={errors.name?.message}>
              <input
                id="sketch-name"
                autoComplete="name"
                className={controlClass}
                {...register("name")}
              />
            </Field>
            <Field
              id="sketch-whatsapp"
              label={t("fieldWhatsapp")}
              error={errors.whatsapp?.message}
            >
              <input
                id="sketch-whatsapp"
                dir="ltr"
                inputMode="tel"
                autoComplete="tel"
                placeholder={t("phWhatsapp")}
                className={controlClass}
                {...register("whatsapp")}
              />
            </Field>
            <Field
              id="sketch-email"
              label={t("fieldEmail")}
              error={errors.email?.message}
            >
              <input
                id="sketch-email"
                dir="ltr"
                type="email"
                autoComplete="email"
                placeholder={t("phEmail")}
                className={controlClass}
                {...register("email")}
              />
            </Field>
            <Field id="sketch-society" label={t("fieldSociety")}>
              <input
                id="sketch-society"
                placeholder={t("phSociety")}
                className={controlClass}
                {...register("society")}
              />
            </Field>
            <Field id="sketch-city" label={t("fieldCity")} error={errors.city?.message}>
              <input
                id="sketch-city"
                autoComplete="address-level2"
                placeholder={t("phCity")}
                className={controlClass}
                {...register("city")}
              />
            </Field>
            <div className="flex flex-col gap-2">
              <label className="flex min-h-11 items-start gap-3 text-sm leading-relaxed">
                <input
                  type="checkbox"
                  className="mt-1 size-4 shrink-0 accent-white"
                  {...register("consent")}
                />
                <span>
                  {t("consent")}{" "}
                  <Link href="/privacy" className="underline">
                    {t("privacyLink")}
                  </Link>
                  .
                </span>
              </label>
              {errors.consent?.message ? (
                <p role="alert" className="text-sm">
                  {errors.consent.message}
                </p>
              ) : null}
            </div>
            <button type="submit" className={ctaPrimary} disabled={busy}>
              {busy ? t("sending") : t("gateSubmit")}
            </button>
            {status === "error" ? (
              <p role="alert" className="text-sm leading-relaxed">
                {t("sendFail")}
              </p>
            ) : null}
            <p className="text-xs leading-relaxed text-foreground/70" dir={locale === "ur" ? "rtl" : "ltr"}>
              {t("otpNote")}
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
