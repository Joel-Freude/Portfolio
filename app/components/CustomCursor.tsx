"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface CustomCursorProps {
  hoveredText: string;
  isHovering: boolean;
  cursorColor?: string;
}

export default function CustomCursor({ hoveredText, isHovering, cursorColor = "black" }: CustomCursorProps) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 flex items-center justify-center ${cursorColor === "white" ? "bg-white" : "bg-black"}`}
        animate={{
          scale: isHovering ? 5 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        {isHovering && (
          <span className="text-white text-[3px] font-sans text-center px-4">
            More
          </span>
        )}
      </motion.div>
    </>
  );
}
