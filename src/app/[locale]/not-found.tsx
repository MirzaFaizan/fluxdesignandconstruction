import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main
      id="content"
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-24 sm:px-6 lg:px-8"
    >
      <p className="nav-link text-foreground/70">{t("kicker")}</p>
      <h1 className="font-display mt-4 text-4xl">{t("title")}</h1>
      <p className="mt-4 max-w-md text-foreground/80">{t("lede")}</p>
      <Link href="/" className="nav-link mt-10 inline-flex text-foreground">
        FluX
      </Link>
    </main>
  );
}
