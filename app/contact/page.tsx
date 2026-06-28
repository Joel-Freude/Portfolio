"use client";

import { motion } from "framer-motion";
import { useAnimationDelay } from "@/app/components/useAnimationDelay";

export default function Contact() {
  const getDelay = useAnimationDelay();

  return (
    <div className="min-h-screen w-full flex items-center justify-center pl-20 pr-8 py-20 bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(0) }}
        className="max-w-4xl border border-zinc-800 bg-zinc-900/50 p-12 rounded-lg"
      >
        <h2 className="text-5xl font-bold text-zinc-100 mb-12" style={{ fontFamily: "var(--font-gued)" }}>
          Get In Touch
        </h2>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(1) }}
          >
            <h3 className="text-xl font-bold text-zinc-100 mb-2" style={{ fontFamily: "var(--font-gued)" }}>
              Email
            </h3>
            <p className="text-zinc-400" style={{ fontFamily: "var(--font-vlorentine)" }}>
              your.email@example.com
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(2) }}
          >
            <h3 className="text-xl font-bold text-zinc-100 mb-2" style={{ fontFamily: "var(--font-gued)" }}>
              Location
            </h3>
            <p className="text-zinc-400" style={{ fontFamily: "var(--font-vlorentine)" }}>
              Your City, Country
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(3) }}
          >
            <h3 className="text-xl font-bold text-zinc-100 mb-2" style={{ fontFamily: "var(--font-gued)" }}>
              Social
            </h3>
            <div className="flex gap-4">
              <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">LinkedIn</a>
              <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">GitHub</a>
              <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">Twitter</a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}