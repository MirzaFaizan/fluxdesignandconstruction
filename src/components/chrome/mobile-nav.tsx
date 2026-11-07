"use client";

import { LogoMark } from "@/components/brand/logo-mark";
import { WhatsAppMark } from "@/components/chrome/whatsapp-mark";
import { useDirection } from "@/components/ui/direction";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { primaryNav } from "@/lib/nav";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";

export function MobileNav() {
  const t = useTranslations("Nav");
  const direction = useDirection();
  const side = direction === "rtl" ? "left" : "right";

  return (
    <Sheet>
      <SheetTrigger
        aria-label={t("openMenu")}
        className="inline-flex size-11 items-center justify-center text-foreground"
      >
        <Menu className="size-5" strokeWidth={1.5} />
      </SheetTrigger>
      <SheetContent
        side={side}
        showCloseButton
        className="w-full max-w-none gap-0 border-border bg-background p-0 shadow-none sm:max-w-sm"
      >
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="flex items-center gap-3 font-sans text-sm font-medium tracking-[0.18em] uppercase">
            <LogoMark className="size-8" />
            <span dir="ltr">FluX</span>
          </SheetTitle>
        </SheetHeader>
        <nav aria-label={t("primary")} className="flex flex-col px-6 py-6">
          {primaryNav.map((item) => (
            <SheetClose
              key={item.href}
              nativeButton={false}
              render={
                <Link
                  href={item.href}
                  className="flex min-h-12 items-center border-b border-border/60 text-lg text-foreground"
                />
              }
            >
              <span className="nav-link">{t(item.key)}</span>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-6 px-6 py-6">
          <LanguageSwitcher />
          <SheetClose
            nativeButton={false}
            render={
              <Link
                href="/contact"
                aria-label={t("whatsappAria")}
                className="nav-link inline-flex items-center gap-2 text-foreground/80 hover:text-foreground"
              />
            }
          >
            <WhatsAppMark />
            {t("whatsapp")}
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
