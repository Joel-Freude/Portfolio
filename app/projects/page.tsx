"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAnimationDelay } from "@/app/components/useAnimationDelay";
import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import CustomCursor from "@/app/components/CustomCursor";

export default function Projects() {
  const getDelay = useAnimationDelay();
  const [webDesignIndex, setWebDesignIndex] = useState(0);
  const [mobileDevIndex, setMobileDevIndex] = useState(0);
  const [hoveredText, setHoveredText] = useState<string>("");
  const [cursorColor, setCursorColor] = useState<string>("black");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading projects data:", err));
  }, []);

  if (!data) return null;

  const nextSlide = (currentIndex: number, totalImages: number, setCurrentIndex: (index: number) => void) => {
    setCurrentIndex((currentIndex + 1) % totalImages);
  };

  const prevSlide = (currentIndex: number, totalImages: number, setCurrentIndex: (index: number) => void) => {
    setCurrentIndex((currentIndex - 1 + totalImages) % totalImages);
  };

  const goToSlide = (index: number, setCurrentIndex: (index: number) => void) => {
    setCurrentIndex(index);
  };

 

  return (
    <div>
      <CustomCursor hoveredText={hoveredText} isHovering={!!hoveredText} cursorColor={cursorColor} />
      <div className=" flex items-center relative left-[0vw] gap-4 pt-40">
        <hr className="border border-zinc-500 w-80"/>
         <h2 className=" font-bold font-sans text-zinc-400 text-center">
          PROJECTS
        </h2>
      </div>
      <div className="pl-40 my-20 flex-col flex gap-20">
        <div className="flex justify-between items-center px-40 gap-20">
          {/* Navigation Controls */}
              <div className=" flex flex-col items-center gap-4 z-10">
                <button
                  onClick={() => prevSlide(webDesignIndex, data.webDesign.length, setWebDesignIndex)}
                  className="w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronUp size={24} />
                </button>
                <div className="flex flex-col gap-2">
                  {data.webDesign.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index, setWebDesignIndex)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === webDesignIndex ? "bg-white" : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => nextSlide(webDesignIndex, data.webDesign.length, setWebDesignIndex)}
                  className="w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronDown size={24} />
                </button>
              </div>
          <div className="flex flex-col w-[40%] gap-4">
            <h1 className="text-2xl font-bold font-sans text-zinc-300 text-5xl">Web Design Projects</h1>
            {data.webDesign[webDesignIndex] && (
              <motion.a
                href={`/projects/${data.webDesign[webDesignIndex].name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-3xl font-bold font-serif text-zinc-400 hover:text-orange-400 transition-colors"
                whileHover={{ x: 10 }}
              >
                {data.webDesign[webDesignIndex].name} →
              </motion.a>
            )}
          </div>
          <div className="w-[60%] h-[500px] relative">
            <motion.a
              href={`/projects/${data.webDesign[webDesignIndex].name.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative w-full h-full overflow-hidden rounded-lg group cursor-pointer block"
              onMouseEnter={() => {
                setHoveredText("more");
                setCursorColor("black");
              }}
              onMouseLeave={() => {
                setHoveredText("");
                setCursorColor("white");
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={webDesignIndex}
                  src={data.webDesign[webDesignIndex].image}
                  alt={data.webDesign[webDesignIndex].name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-white/60 flex items-center justify-center"
              >
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="text-black text-2xl font-bold font-sans"
                >
                  more
                </motion.span>
              </motion.div>
            </motion.a>
          </div>
        </div>       
        <div className="flex justify-between items-center gap-20 px-40">
          <div className="w-[60%] h-[500px] relative">
            <motion.a
              href={`/projects/${data.mobileDev[mobileDevIndex].name.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative w-full h-full overflow-hidden rounded-lg group cursor-pointer block"
              onMouseEnter={() => {
                setHoveredText("more");
                setCursorColor("black");
              }}
              onMouseLeave={() => {
                setHoveredText("");
                setCursorColor("white");
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={mobileDevIndex}
                  src={data.mobileDev[mobileDevIndex].image}
                  alt={data.mobileDev[mobileDevIndex].name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-white/60 flex items-center justify-center"
              >
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="text-black text-2xl font-bold font-sans"
                >
                  more
                </motion.span>
              </motion.div>
            </motion.a>
          </div>
          <div className="flex flex-col w-[40%] gap-4">
            <h1 className="text-2xl font-bold font-sans text-zinc-300 text-5xl">Mobile Dev Projects</h1>
            {data.mobileDev[mobileDevIndex] && (
              <motion.a
                href={`/projects/${data.mobileDev[mobileDevIndex].name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-3xl font-bold font-serif text-zinc-400 hover:text-orange-400 transition-colors"
                whileHover={{ x: 10 }}
              >
                {data.mobileDev[mobileDevIndex].name} →
              </motion.a>
            )}
          </div>
          {/* Navigation Controls */}
              <div className="flex flex-col items-center gap-4 z-10">
                <button
                  onClick={() => prevSlide(mobileDevIndex, data.mobileDev.length, setMobileDevIndex)}
                  className="w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronUp size={24} />
                </button>
                <div className="flex flex-col gap-2">
                  {data.mobileDev.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index, setMobileDevIndex)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === mobileDevIndex ? "bg-white" : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => nextSlide(mobileDevIndex, data.mobileDev.length, setMobileDevIndex)}
                  className="w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronDown size={24} />
                </button>
              </div>
        </div>       
      </div>
    </div>
  );
}   