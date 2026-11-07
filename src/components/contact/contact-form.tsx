"use client";

import { CallCta } from "@/components/chrome/call-cta";
import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import type { Locale } from "@/i18n/routing";
import {
  createContactSchema,
  enquiryWhatsAppText,
  PLOT_SIZES,
  SERVICES,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { isPhoneLive, phoneDisplay } from "@/lib/contact";
import { ctaPrimary } from "@/lib/cta";
import { cn } from "@/lib/utils";
import { isWhatsAppLive, whatsappUrlWithText } from "@/lib/whatsapp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const controlClass =
  "min-h-11 w-full rounded-[2px] border border-border bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-foreground/45 focus-visible:outline focus-visible:outline-offset-3 disabled:opacity-50";

type ContactFormProps = {
  locale: Locale;
};

export function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations("Contact");
  const nav = useTranslations("Nav");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [followUp, setFollowUp] = useState<string | null>(null);

  const schema = useMemo(
    () =>
      createContactSchema({
        errName: t("errName"),
        errWhatsapp: t("errWhatsapp"),
        errPlot: t("errPlot"),
        errSociety: t("errSociety"),
        errService: t("errService"),
        errCity: t("errCity"),
        errMessage: t("errMessage"),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      whatsapp: "",
      plot: undefined,
      society: "",
      service: undefined,
      city: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    setFollowUp(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setStatus("sent");
      if (isWhatsAppLive()) {
        setFollowUp(whatsappUrlWithText(enquiryWhatsAppText(locale, values)));
      }
    } catch {
      setStatus("error");
    }
  }

  const liveNumber = phoneDisplay();

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <aside className="flex flex-col gap-4 lg:col-start-2 lg:row-start-1">
        <WhatsAppCta
          intent="generic"
          fallbackHref="#enquiry"
          className={cn(ctaPrimary, "w-full")}
          ariaLabel={nav("whatsappAria")}
        >
          {nav("whatsapp")}
        </WhatsAppCta>
        <CallCta className={cn(ctaPrimary, "w-full")} ariaLabel={t("callAria")}>
          {t("call")}
        </CallCta>
        <p className="text-pretty text-sm leading-relaxed text-foreground/85">
          {t("sameNumber")}
          {isPhoneLive() && liveNumber ? (
            <>
              {" "}
              <span dir="ltr">{liveNumber}</span>
            </>
          ) : (
            <> {t("numberPending")}</>
          )}
        </p>
      </aside>

      <form
        id="enquiry"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 lg:col-start-1 lg:row-start-1"
      >
        <p className="nav-link text-foreground/70">{t("formEyebrow")}</p>

        <Field
          id="name"
          label={t("fieldName")}
          error={errors.name?.message}
        >
          <input
            id="name"
            autoComplete="name"
            placeholder={t("phName")}
            className={controlClass}
            {...register("name")}
          />
        </Field>

        <Field
          id="whatsapp"
          label={t("fieldWhatsapp")}
          error={errors.whatsapp?.message}
        >
          <input
            id="whatsapp"
            dir="ltr"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t("phWhatsapp")}
            className={controlClass}
            {...register("whatsapp")}
          />
        </Field>

        <Field id="plot" label={t("fieldPlot")} error={errors.plot?.message}>
          <select
            id="plot"
            className={controlClass}
            defaultValue=""
            {...register("plot")}
          >
            <option value="" disabled>
              {t("phPlot")}
            </option>
            {PLOT_SIZES.map((size) => (
              <option key={size} value={size}>
                {t(
                  size === "5marla"
                    ? "plot5"
                    : size === "10marla"
                      ? "plot10"
                      : size === "1kanal"
                        ? "plot1"
                        : "plotOther"
                )}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="society"
          label={t("fieldSociety")}
          error={errors.society?.message}
        >
          <input
            id="society"
            placeholder={t("phSociety")}
            className={controlClass}
            {...register("society")}
          />
        </Field>

        <Field
          id="service"
          label={t("fieldService")}
          error={errors.service?.message}
        >
          <select
            id="service"
            className={controlClass}
            defaultValue=""
            {...register("service")}
          >
            <option value="" disabled>
              {t("phService")}
            </option>
            {SERVICES.map((service) => (
              <option key={service} value={service}>
                {t(
                  service === "house"
                    ? "serviceHouse"
                    : service === "interior"
                      ? "serviceInterior"
                      : service === "grey"
                        ? "serviceGrey"
                        : service === "turnkey"
                          ? "serviceTurnkey"
                          : service === "commercial"
                            ? "serviceCommercial"
                            : service === "abroad"
                              ? "serviceAbroad"
                              : service === "approvals"
                                ? "serviceApprovals"
                                : "serviceOther"
                )}
              </option>
            ))}
          </select>
        </Field>

        <Field id="city" label={t("fieldCity")} error={errors.city?.message}>
          <input
            id="city"
            autoComplete="address-level2"
            placeholder={t("phCity")}
            className={controlClass}
            {...register("city")}
          />
        </Field>

        <Field
          id="message"
          label={t("fieldMessage")}
          error={errors.message?.message}
        >
          <textarea
            id="message"
            rows={5}
            placeholder={t("phMessage")}
            className={cn(controlClass, "min-h-32 py-3")}
            {...register("message")}
          />
        </Field>

        <button type="submit" className={ctaPrimary} disabled={isSubmitting}>
          {isSubmitting ? t("sending") : t("submit")}
        </button>

        {status === "sent" ? (
          <p role="status" className="text-sm leading-relaxed text-foreground">
            {t("sent")}
          </p>
        ) : null}
        {status === "error" ? (
          <p role="alert" className="text-sm leading-relaxed text-foreground">
            {t("sendFail")}
          </p>
        ) : null}
        {followUp ? (
          <a
            href={followUp}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaPrimary}
          >
            {t("continueWhatsapp")}
          </a>
        ) : null}
      </form>
    </div>
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
        <p role="alert" className="text-sm text-foreground">
          {error}
        </p>
      ) : null}
    </div>
  );
}
