import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const STEPS = [
  { n: "01", title: "process1Title", line: "process1Line" },
  { n: "02", title: "process2Title", line: "process2Line" },
  { n: "03", title: "process3Title", line: "process3Line" },
  { n: "04", title: "process4Title", line: "process4Line" },
] as const;

export async function ProcessStepper() {
  const t = await getTranslations("Home");

  return (
    <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h2 className="nav-link text-foreground/70">{t("processEyebrow")}</h2>
      <ol className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
        {STEPS.map((step) => (
          <li key={step.n} className="reveal border-s border-border ps-5 md:border-s-0 md:ps-0">
            <p dir="ltr" className="nav-link text-foreground/70">
              {step.n}
            </p>
            <h3 className="font-display mt-4 text-2xl sm:text-3xl">
              {t(step.title)}
            </h3>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/85 sm:text-base">
              {t(step.line)}
            </p>
          </li>
        ))}
      </ol>
      <Link
        href="/approvals"
        className="nav-link mt-10 inline-flex text-foreground/80 transition-colors duration-150 hover:text-foreground"
      >
        {t("processApprovals")}
      </Link>
    </section>
  );
}
