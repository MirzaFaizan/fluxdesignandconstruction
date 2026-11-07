import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { AppDirectionProvider } from "@/components/providers/direction-provider";
import { htmlDir, isLocale, routing } from "@/i18n/routing";
import { ibmPlexSans, notoNaskh, notoNastaliq } from "@/lib/fonts";
import { languageAlternates } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

export const viewport: Viewport = {
  themeColor: "#2b3642",
};

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = await getTranslations({ locale: raw, namespace: "Meta" });

  return {
    metadataBase: new URL("https://fluxdesignandconstruction.com"),
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    applicationName: t("siteName"),
    alternates: languageAlternates("/", raw),
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw) || !isLocale(raw)) {
    notFound();
  }

  setRequestLocale(raw);
  const messages = await getMessages();
  const dir = htmlDir(raw);

  return (
    <html
      lang={raw}
      dir={dir}
      className={cn(
        ibmPlexSans.variable,
        notoNaskh.variable,
        notoNastaliq.variable,
        "h-full antialiased"
      )}
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <NextIntlClientProvider locale={raw} messages={messages}>
          <AppDirectionProvider direction={dir}>
            <SiteHeader />
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
            <SiteFooter />
          </AppDirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
