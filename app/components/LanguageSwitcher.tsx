"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/i18n/locales";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = locales.includes(pathname.split("/")[1] as any)
    ? pathname.split("/")[1]
    : "en";

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as any)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join("/") || `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={`text-xs font-mono uppercase tracking-wider transition-colors ${
          currentLocale === "en" ? "text-orange-400" : "text-zinc-500 hover:text-white"
        }`}
      >
        EN
      </button>
      <span className="text-zinc-600">|</span>
      <button
        type="button"
        onClick={() => switchLocale("fr")}
        className={`text-xs font-mono uppercase tracking-wider transition-colors ${
          currentLocale === "fr" ? "text-orange-400" : "text-zinc-500 hover:text-white"
        }`}
      >
        FR
      </button>
    </div>
  );
}
