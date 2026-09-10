import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "../../i18n/request";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "../../i18n/routing";
import type { Metadata } from "next";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import PageTransition from "../components/PageTransition";
import DownloadCVButton from "../components/DownloadCVButton";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Freude Portfolio",
  description: "Freude's personal portfolio together with his projects, skills and experience",
  icons:{
    icon:"/images/icon.png",
    apple:"/images/icon.png",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages(locale);

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <MobileNavbar />
          <DownloadCVButton />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
