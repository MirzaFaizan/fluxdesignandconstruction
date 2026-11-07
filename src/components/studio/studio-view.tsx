import { CallCta } from "@/components/chrome/call-cta";
import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { Still } from "@/components/media/still";
import { Link } from "@/i18n/navigation";
import { ctaPrimary, ctaSecondary } from "@/lib/cta";
import {
  BEHANCE_URL,
  INSTAGRAM_URL,
  STUDIO_EMAIL,
  isPhoneLive,
  phoneDisplay,
  telHref,
} from "@/lib/contact";
import { studioPeople, studioStill } from "@/lib/studio";
import type { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export async function StudioView({ locale }: { locale: Locale }) {
  const t = await getTranslations("Studio");
  const nav = await getTranslations("Nav");
  const contact = await getTranslations("Contact");
  const footer = await getTranslations("Footer");
  const display = phoneDisplay();
  const callHref = telHref();

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
          {studioPeople.map((person) => (
            <li
              key={person.key}
              className="reveal border-s border-border ps-5"
            >
              <p dir="ltr" className="nav-link text-foreground/70">
                {person.index}
              </p>
              <h3 dir="ltr" className="font-display mt-4 text-2xl sm:text-3xl">
                {person.prefix} {person.name}
              </h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/85 sm:text-base">
                {t(person.role)}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-xl text-pretty text-sm leading-relaxed text-foreground/85 sm:text-base">
          {t("graduates")}
        </p>
        <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-foreground/85 sm:text-base">
          {t("energy")}
        </p>
      </section>

      <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="nav-link text-foreground/70">{t("citiesEyebrow")}</h2>
        <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
          {t("cities")}
        </p>
      </section>

      <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="nav-link text-foreground/70">{t("reachEyebrow")}</h2>
        <ul className="mt-6 flex max-w-xl flex-col gap-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
          {isPhoneLive() && display && callHref ? (
            <li>
              <a href={callHref} dir="ltr" className="hover:underline">
                {display}
              </a>
            </li>
          ) : null}
          <li>
            <a
              dir="ltr"
              href={`mailto:${STUDIO_EMAIL}`}
              className="hover:underline"
            >
              {STUDIO_EMAIL}
            </a>
          </li>
          <li>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {footer("instagram")}
            </a>
          </li>
          <li>
            <a
              href={BEHANCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="hover:underline"
            >
              {footer("behance")}
            </a>
          </li>
        </ul>
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
          <CallCta className={ctaPrimary} ariaLabel={contact("callAria")}>
            {contact("call")}
          </CallCta>
          <Link href="/work" className={ctaSecondary}>
            {t("viewWork")}
          </Link>
        </div>
      </section>
    </>
  );
}
