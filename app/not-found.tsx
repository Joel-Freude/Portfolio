"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-8xl md:text-9xl font-bold text-zinc-100 mb-4"
          style={{ fontFamily: "var(--font-gued)" }}
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="text-2xl md:text-4xl font-bold text-zinc-300 mb-4"
          style={{ fontFamily: "var(--font-gued)" }}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="text-zinc-500 mb-8 max-w-md mx-auto"
          style={{ fontFamily: "var(--font-vlorentine)" }}
        >
          The page you're looking for doesn't exist or has been moved to a different location.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-orange-400 text-black font-bold font-sans rounded-lg hover:bg-orange-300 transition-colors"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 font-sans rounded-lg hover:bg-zinc-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
