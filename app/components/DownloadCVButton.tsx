"use client";

import { Paperclip } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DownloadCVButton() {
  const [isMobile, setIsMobile] = useState(false);
  const [isWhiteBackground, setIsWhiteBackground] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsWhiteBackground(pathname === '/education');
  }, [pathname]);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex items-center justify-between gap-2 border rounded-lg p-4 z-10 ${
        isWhiteBackground
          ? 'bg-white border-black'
          : 'bg-black border-zinc-300'
      } ${
        isMobile
          ? 'absolute top-16 left-1/2 -translate-x-1/2 z-10000000000'
          : 'absolute top-4 right-[10%] z-10'
      }`}
    >
      <Paperclip size={24} color={`${isWhiteBackground ? 'var(--color-zinc-800)' : 'white'}`} />
      <a href="/data/CV Professionnel .pdf" download className={`font-sans ${isWhiteBackground ? 'text-black' : 'text-white'}`}>
        Download CV
      </a>
    </motion.button>
  );
}
