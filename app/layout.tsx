import type { Metadata } from "next";
import { Gudea, Vollkorn } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import PageTransition from "./components/PageTransition";
import DownloadCVButton from "./components/DownloadCVButton";
import Footer from "./components/Footer";

const gudea = Gudea({
  variable: "--font-gued",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const vollkorn = Vollkorn({
  variable: "--font-vlorentine",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Freude Portfolio",
  description: "Freude's personal portfolio together with his projects, skills and experience",
  icons:{
    icon:"/images/icon.png",
    apple:"/images/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${gudea.variable} ${vollkorn.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        <MobileNavbar />
        <DownloadCVButton />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
