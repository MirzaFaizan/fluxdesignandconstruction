"use client";

import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { isPhoneLive, telHref } from "@/lib/contact";
import type { ReactNode } from "react";

type CallCtaProps = {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  fallbackHref?: string;
};

export function CallCta({
  className,
  children,
  ariaLabel,
  fallbackHref = "#enquiry",
}: CallCtaProps) {
  const liveHref = telHref();
  const classes = cn("inline-flex items-center justify-center gap-2", className);
  const body = (
    <>
      <Phone className="size-4 shrink-0" aria-hidden="true" />
      {children}
    </>
  );

  if (isPhoneLive() && liveHref) {
    return (
      <a href={liveHref} className={classes} aria-label={ariaLabel}>
        {body}
      </a>
    );
  }

  return (
    <a href={fallbackHref} className={classes} aria-label={ariaLabel}>
      {body}
    </a>
  );
}
