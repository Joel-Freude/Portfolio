"use client";

import { motion } from "framer-motion";
import { useAnimationDelay } from "@/app/components/useAnimationDelay";

export default function School() {
  const getDelay = useAnimationDelay();

  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "University Name",
      year: "2020 - 2024",
      description: "Specialized in software development and web technologies",
    },
    {
      degree: "High School Diploma",
      school: "High School Name",
      year: "2018 - 2020",
      description: "Focus on mathematics and computer science",
    },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center pl-20 pr-8 py-20 bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(0) }}
        className="max-w-4xl border border-zinc-800 bg-zinc-900/50 p-12 rounded-lg"
      >
        <h2 className="text-5xl font-bold text-zinc-100 mb-12" style={{ fontFamily: "var(--font-gued)" }}>
          Education
        </h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(index + 1) }}
              className="border-l-2 border-yellow-400 pl-6"
            >
              <h3 className="text-2xl font-bold text-zinc-100" style={{ fontFamily: "var(--font-gued)" }}>
                {edu.degree}
              </h3>
              <p className="text-lg text-yellow-400 mt-1">{edu.school}</p>
              <p className="text-sm text-zinc-500 mt-1">{edu.year}</p>
              <p className="text-zinc-400 mt-2" style={{ fontFamily: "var(--font-vlorentine)" }}>
                {edu.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}