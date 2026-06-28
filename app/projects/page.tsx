"use client";

import { motion } from "framer-motion";
import { useAnimationDelay } from "@/app/components/useAnimationDelay";

export default function Projects() {
  const getDelay = useAnimationDelay();

  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern single-page portfolio built with Next.js and React",
      tags: ["Next.js", "React", "TailwindCSS"],
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack online store with payment integration",
      tags: ["Node.js", "MongoDB", "Stripe"],
    },
    {
      title: "Mobile App",
      description: "Cross-platform mobile application for task management",
      tags: ["React Native", "Firebase"],
    },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center pl-20 pr-8 py-20 bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(0) }}
        className="max-w-6xl border border-zinc-800 bg-zinc-900/50 p-12 rounded-lg"
      >
        <h2 className="text-5xl font-bold text-zinc-100 mb-12" style={{ fontFamily: "var(--font-gued)" }}>
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(index + 1) }}
              className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800 transition-colors duration-300"
            >
              <h3 className="text-2xl font-bold text-zinc-100 mb-3" style={{ fontFamily: "var(--font-gued)" }}>
                {project.title}
              </h3>
              <p className="text-zinc-400 mb-4" style={{ fontFamily: "var(--font-vlorentine)" }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-3 py-1 bg-yellow-400/20 text-yellow-400 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}   