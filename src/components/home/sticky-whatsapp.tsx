import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { getTranslations } from "next-intl/server";

export async function StickyWhatsApp() {
  const t = await getTranslations("Home");
  const nav = await getTranslations("Nav");

  return (
    <div className="pointer-events-none fixed inset-inline-0 bottom-0 z-50 md:hidden">
      <div className="pointer-events-auto border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <WhatsAppCta
          intent="generic"
          ariaLabel={nav("whatsappAria")}
          className="flex min-h-12 w-full min-w-0 flex-col items-center justify-center bg-[#25D366] px-4 py-2 text-center text-background transition-colors duration-150 hover:bg-[#1ebe5d] focus-visible:outline focus-visible:outline-offset-3 active:scale-[0.96]"
        >
          <span className="text-base font-medium">{t("stickyLabel")}</span>
          <span className="text-xs leading-5 opacity-90">{t("stickySub")}</span>
        </WhatsAppCta>
      </div>
    </div>
  );
}
