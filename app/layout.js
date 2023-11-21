import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { getSEOTags } from "@/libs/seo";
import { dir } from 'i18next';

import PlausibleProvider from "next-plausible";
import ClientLayout from "@/components/LayoutClient";
import TranslationsProvider from '@/components/TranslationsProvider';

import i18nConfig from '@/i18n.config';
import initTranslations from './i18n';
import config from "@/config";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams () {
  return i18nConfig.locales.map(locale => ({ locale }));
}

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default async function RootLayout ({ children, params: { locale } }) {

  if (locale === undefined) {
    const local = cookies().get('NEXT_LOCALE') || { value: i18nConfig.defaultLocale };
    locale = local.value;
  }
  const { _, options } = await initTranslations(locale, ['common']);

  return (
    <html lang={locale} dir={dir(locale)} data-theme={config.colors.theme} className={font.className}>
      {config.domainName && (
        <head>
          <PlausibleProvider domain={config.domainName} />
        </head>
      )}
      <body>
        {/* TranslationsProvider contains the handling of cookies and routes for the multi language support */}
        <TranslationsProvider namespaces={options.ns} locale={locale}>
          {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
          <ClientLayout>{children}</ClientLayout>
        </TranslationsProvider>
      </body>
    </html>
  );
}
