"use client";

import { WhatsAppMark } from "@/components/chrome/whatsapp-mark";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
  isWhatsAppLive,
  whatsappUrl,
  type WhatsAppIntent,
} from "@/lib/whatsapp";
import { useLocale } from "next-intl";
import type { ReactNode } from "react";

type WhatsAppCtaProps = {
  intent?: WhatsAppIntent;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

export function WhatsAppCta({
  intent = "generic",
  className,
  children,
  ariaLabel,
}: WhatsAppCtaProps) {
  const rawLocale = useLocale();
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const liveHref = whatsappUrl(locale, intent);
  const classes = cn("inline-flex items-center gap-2", className);
  const body = (
    <>
      <WhatsAppMark />
      {children}
    </>
  );

  if (isWhatsAppLive() && liveHref) {
    return (
      <a
        href={liveHref}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href="/contact" className={classes} aria-label={ariaLabel}>
      {body}
    </Link>
  );
}
