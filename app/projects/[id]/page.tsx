"use client";

import { motion } from "framer-motion";
import { useAnimationDelay } from "@/app/components/useAnimationDelay";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CustomCursor from "@/app/components/CustomCursor";

export default function ProjectDetail() {
  const getDelay = useAnimationDelay();
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [category, setCategory] = useState<string>("");
  const [hoveredText, setHoveredText] = useState<string>("");
  const [cursorColor, setCursorColor] = useState<string>("black");

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((json) => {
        const id = params.id as string;
        
        // Search in webDesign
        const webProject = json.webDesign.find((p: any) => p.name.toLowerCase().replace(/\s+/g, '-') === id);
        if (webProject) {
          setProject(webProject);
          setCategory("webDesign");
          return;
        }

        // Search in mobileDev
        const mobileProject = json.mobileDev.find((p: any) => p.name.toLowerCase().replace(/\s+/g, '-') === id);
        if (mobileProject) {
          setProject(mobileProject);
          setCategory("mobileDev");
          return;
        }
      })
      .catch((err) => console.error("Error loading project data:", err));
  }, [params.id]);

  if (!project) return null;

  return (
    <div>
      <CustomCursor hoveredText={hoveredText} isHovering={!!hoveredText} cursorColor={cursorColor} />
      <div className="min-h-screen py-20 px-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Back Button */}
          <motion.a
            href="/projects"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
            whileHover={{ x: -5 }}
          >
            ← Back to Projects
          </motion.a>

          {/* Project Header */}
          <h1 className="text-6xl font-bold font-sans text-zinc-300 mb-4">{project.name}</h1>
          <p className="text-lg font-sans text-zinc-500 mb-8">{project.date}</p>

          {/* Project Image */}
          <div className="w-full h-[500px] relative mb-12">
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold font-serif text-zinc-400 mb-4">Description</h2>
            <p className="text-lg font-sans text-zinc-600 leading-relaxed">{project.description}</p>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold font-serif text-zinc-400 mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech: string, idx: number) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-sm font-sans"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Status (for Mobile Dev) */}
          {project.status && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold font-serif text-zinc-400 mb-4">Status</h2>
              <p className="text-lg font-sans text-orange-400">{project.status}</p>
            </div>
          )}

          {/* Link (for Web Design) */}
          {project.link && project.link.trim() !== "" && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold font-serif text-zinc-400 mb-4">Project Link</h2>
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-sans text-lg"
                whileHover={{ x: 5 }}
              >
                View Project →
              </motion.a>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
