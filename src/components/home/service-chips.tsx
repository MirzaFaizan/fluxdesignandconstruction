import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { ctaChip } from "@/lib/cta";
import type { WhatsAppIntent } from "@/lib/whatsapp";
import { getTranslations } from "next-intl/server";

const CHIPS: { intent: WhatsAppIntent; label: "chipHouse" | "chipInterior" | "chipGrey" | "chipTurnkey" | "chipCommercial" | "chipAbroad" }[] =
  [
    { intent: "house", label: "chipHouse" },
    { intent: "interior", label: "chipInterior" },
    { intent: "grey", label: "chipGrey" },
    { intent: "turnkey", label: "chipTurnkey" },
    { intent: "commercial", label: "chipCommercial" },
    { intent: "abroad", label: "chipAbroad" },
  ];

export async function ServiceChips() {
  const t = await getTranslations("Home");
  const nav = await getTranslations("Nav");

  return (
    <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <p className="max-w-2xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
        {t("chipIntro")}
      </p>
      <ul className="mt-8 flex flex-wrap gap-2">
        {CHIPS.map((chip) => (
          <li key={chip.intent}>
            <WhatsAppCta
              intent={chip.intent}
              className={ctaChip}
              ariaLabel={nav("whatsappAria")}
            >
              {t(chip.label)}
            </WhatsAppCta>
          </li>
        ))}
      </ul>
    </section>
  );
}
