import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { getTranslations } from "next-intl/server";

export async function HousesSticky() {
  const t = await getTranslations("Houses");
  const nav = await getTranslations("Nav");

  return (
    <WhatsAppCta
      intent="housesPage"
      ariaLabel={nav("whatsappAria")}
      className="fixed end-4 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 inline-flex min-h-11 items-center gap-2 border border-border bg-background/90 px-3 text-sm text-foreground shadow-none transition-colors duration-150 hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-offset-3 active:scale-[0.96] md:hidden"
    >
      {t("stickyLabel")}
    </WhatsAppCta>
  );
}
