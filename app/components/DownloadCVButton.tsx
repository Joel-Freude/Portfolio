"use client";

import { Paperclip } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DownloadCVButton() {
  const [isWhiteBackground, setIsWhiteBackground] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsWhiteBackground(pathname === '/education');
  }, [pathname]);

  if (pathname !== '/about') {
    return null;
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex items-center justify-between gap-2 border rounded-lg p-4 z-10 ${
        isWhiteBackground
          ? 'bg-white border-black'
          : 'bg-black border-zinc-300'
      } absolute top-4 right-[10%] z-10`}
    >
      <Paperclip size={24} color={`${isWhiteBackground ? 'var(--color-zinc-800)' : 'white'}`} />
      <a href="/data/CV Professionnel .pdf" download className={`font-sans ${isWhiteBackground ? 'text-black' : 'text-white'}`}>
        Download CV
      </a>
    </motion.button>
  );
}
