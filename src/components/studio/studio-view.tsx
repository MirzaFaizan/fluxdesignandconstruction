import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { Still } from "@/components/media/still";
import { Link } from "@/i18n/navigation";
import { ctaPrimary, ctaSecondary } from "@/lib/cta";
import {
  studioArchitect,
  studioEngineer,
  studioStill,
} from "@/lib/studio";
import type { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

const PEOPLE = [
  {
    key: "architect",
    index: "01",
    role: "architectRole",
    person: studioArchitect,
    verify: "pcatpVerify",
  },
  {
    key: "engineer",
    index: "02",
    role: "engineerRole",
    person: studioEngineer,
    verify: "pecVerify",
  },
] as const;

export async function StudioView({ locale }: { locale: Locale }) {
  const t = await getTranslations("Studio");
  const nav = await getTranslations("Nav");

  return (
    <>
      <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="nav-link text-foreground/70">{t("kicker")}</p>
        <h1 className="font-display mt-5 max-w-3xl text-2xl leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="block">{t("h1Line1")}</span>
          <span className="block">{t("h1Line2")}</span>
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground/90 sm:text-lg">
          {t("lede")}
        </p>
        <Still
          src={studioStill.image}
          alt={studioStill.alt[locale]}
          sizes="100vw"
          priority
          className="mt-12 aspect-[16/10] w-full"
          caption={studioStill.caption[locale]}
        />
      </section>

      <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="nav-link text-foreground/70">{t("peopleEyebrow")}</h2>
        <ul className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
          {PEOPLE.map((item) => (
            <li
              key={item.key}
              className="reveal border-s border-border ps-5"
            >
              <p dir="ltr" className="nav-link text-foreground/70">
                {item.index}
              </p>
              <h3 className="font-display mt-4 text-2xl sm:text-3xl">
                {t(item.role)}
              </h3>
              <p dir="ltr" className="mt-4 text-base text-foreground sm:text-lg">
                {item.person.prefix} {item.person.name}
              </p>
              <p dir="ltr" className="mt-1 text-sm text-foreground/85 sm:text-base">
                {item.person.register} {item.person.number}
              </p>
              <a
                href={item.person.verifyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center text-sm text-foreground/80 underline-offset-4 transition-colors duration-150 hover:text-foreground hover:underline"
              >
                {t(item.verify)}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-xl text-pretty text-sm leading-relaxed text-foreground/85 sm:text-base">
          {t("licenseNote")}
        </p>
      </section>

      <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="nav-link text-foreground/70">{t("citiesEyebrow")}</h2>
        <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
          {t("cities")}
        </p>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="max-w-xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
          {t("close")}
        </p>
        <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-foreground/85">
          {t("freeLook")}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <WhatsAppCta
            intent="freeLook"
            className={ctaPrimary}
            ariaLabel={nav("whatsappAria")}
          >
            {t("freeLookCta")}
          </WhatsAppCta>
          <Link href="/work" className={ctaSecondary}>
            {t("viewWork")}
          </Link>
        </div>
      </section>
    </>
  );
}
