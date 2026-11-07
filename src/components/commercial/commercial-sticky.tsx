import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { getTranslations } from "next-intl/server";

export async function CommercialSticky() {
  const t = await getTranslations("Commercial");
  const nav = await getTranslations("Nav");

  return (
    <WhatsAppCta
      intent="commercial"
      ariaLabel={nav("whatsappAria")}
      className="fixed end-4 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 min-h-11 border border-border bg-background/90 px-3 text-sm text-foreground shadow-none transition-colors duration-150 hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-offset-3 active:scale-[0.96] md:hidden"
    >
      {t("stickyLabel")}
    </WhatsAppCta>
  );
}
