import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { Link } from "@/i18n/navigation";
import { ctaPrimary, ctaSecondary } from "@/lib/cta";
import { getTranslations } from "next-intl/server";

export async function CommercialClose() {
  const t = await getTranslations("Commercial");
  const nav = await getTranslations("Nav");

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h2 className="font-display max-w-3xl text-3xl text-pretty sm:text-4xl lg:text-5xl">
        {t("close")}
      </h2>
      <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-foreground/85">
        {t("reply")}
      </p>
      <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-foreground/85">
        {t("freeLook")}
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <WhatsAppCta
          intent="commercial"
          className={ctaPrimary}
          ariaLabel={nav("whatsappAria")}
        >
          {t("enquire")}
        </WhatsAppCta>
        <Link href="/work" className={ctaSecondary}>
          {t("viewWork")}
        </Link>
      </div>
    </section>
  );
}
