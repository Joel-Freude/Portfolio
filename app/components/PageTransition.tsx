"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { PageLabelAnimation } from "./WelcomeAnimation";

// Shared transition config
const SLIDE_DISTANCE = 60;
const DURATION = 0.45;
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1]; // material-style ease

type Phase = "idle" | "exiting" | "label" | "entering";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const [phase, setPhase] = useState<Phase>("entering");
  const [displayedChildren, setDisplayedChildren] = useState(children);

  const getPageLabel = (path: string) => {
    const map: Record<string, string> = {
      "/": "HOME",
      "/about": "ABOUT",
      "/school": "SCHOOL",
      "/projects": "PROJECTS",
      "/contact": "CONTACT",
    };
    return map[path] ?? "HOME";
  };

  useEffect(() => {
    if (prevPathnameRef.current === pathname) {
      // Initial mount — skip exit, go straight to entering
      setPhase("entering");
      return;
    }

    // Route changed
    sessionStorage.setItem("pageTransitionActive", "true");
    prevPathnameRef.current = pathname;

    // 1. Exit current content
    setPhase("exiting");

    // 2. After exit animation, show label
    const labelTimer = setTimeout(() => {
      setDisplayedChildren(children); // swap content while hidden
      setPhase("label");
    }, DURATION * 1000 + 50);

    return () => clearTimeout(labelTimer);
  }, [pathname]);

  // When new children arrive during a transition, capture them
  useEffect(() => {
    if (phase === "idle" || phase === "entering") {
      setDisplayedChildren(children);
    }
  }, [children, phase]);

  const handleLabelComplete = () => {
    setPhase("entering");
  };

  const isVisible = phase === "entering" || phase === "idle";

  return (
    <>
      {/* Full-screen fade overlay during exit */}
      <AnimatePresence>
        {phase === "exiting" && (
          <motion.div
            key="exit-overlay"
            className="fixed inset-0 bg-zinc-950 z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION, ease: EASE }}
          />
        )}
      </AnimatePresence>

      {/* Page label animation */}
      <AnimatePresence>
        {phase === "label" && (
          <PageLabelAnimation
            key="label"
            label={getPageLabel(pathname)}
            onAnimationComplete={handleLabelComplete}
          />
        )}
      </AnimatePresence>

      {/* Page content — slides in on entry, slides out on exit */}
      <motion.div
        className="w-full bg-zinc-950"
        initial={{ opacity: 0, x: SLIDE_DISTANCE }}
        animate={
          isVisible
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: -SLIDE_DISTANCE }
        }
        transition={{ duration: DURATION, ease: EASE }}
        onAnimationComplete={() => {
          if (isVisible) setPhase("idle");
        }}
      >
        {displayedChildren}
      </motion.div>
    </>
  );
}