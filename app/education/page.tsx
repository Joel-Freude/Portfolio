"use client";

import { motion } from "framer-motion";
import { useAnimationDelay } from "@/app/components/useAnimationDelay";
import { useState, useEffect, useRef } from "react";
import CustomCursor from "@/app/components/CustomCursor";
import ScrollingLines from "@/app/components/ScrollingLines";
import PolygonBall from "../components/PolygonBall";

export default function Education() {
  const getDelay = useAnimationDelay();
  const [data, setData] = useState<any>(null);
  const [hoveredInstitution, setHoveredInstitution] = useState<string>("");
  const [cursorColor, setCursorColor] = useState<string>("black");
  const [mouseY, setMouseY] = useState<number>(0);
  const blackSectionRef = useRef<HTMLDivElement>(null);
  const whiteSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/data/academic-journey.json")
      .then((res) => res.json())
      .then((json) => setData(json.academicJourney))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  useEffect(() => {
    const updateCursorColor = (clientY: number) => {
      // Check black section first (certifications)
      if (blackSectionRef.current) {
        const blackRect = blackSectionRef.current.getBoundingClientRect();
        if (clientY >= blackRect.top && clientY <= blackRect.bottom) {
          setCursorColor("white");
          return;
        }
      }
      
      // Check white section (university)
      if (whiteSectionRef.current) {
        const whiteRect = whiteSectionRef.current.getBoundingClientRect();
        if (clientY >= whiteRect.top && clientY <= whiteRect.bottom) {
          setCursorColor("black");
          return;
        }
      }
      
      // Default to black
      setCursorColor("black");
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
      updateCursorColor(e.clientY);
    };

    const handleScroll = () => {
      updateCursorColor(mouseY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen w-full">
      <CustomCursor hoveredText={hoveredInstitution} isHovering={!!hoveredInstitution} cursorColor={cursorColor} />
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(0) }}
          className=""
        >
          <div ref={whiteSectionRef} className="bg-white max-w-[120vw]">
            <div className="absolute -top-140 -translate-x-1/2 left-1/2 w-[80vw] h-[90vh]">
              <PolygonBall sphereSize={1.5} color="#efefef" verticalEnabled={true} verticalAmplitude={0.2}/>
          </div>
       <div className=" flex items-center relative left-[0vw] gap-4 pt-40">
        <hr className="border border-zinc-300 w-80"/>
         <h2 className="text-xl font-bold font-sans text-zinc-300 text-center">
          SCHOOL
        </h2>
       </div>

        {/* University Level Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(0) }} 
          className="px-40 min-w-[90vw] py-40">
            <div className="absolute -translate-x-1/2 left-1/2 line w-50 h-50 block z-0">
                <ScrollingLines animationY={[100, 300, 100]} stroke="#e5e5e5" />
            </div>
          <h3 className="text-5xl font-bold font-sans text-zinc-700 my-12 pl-40">
              {data.universityLevel.title}
          </h3>
          <div className="w-full">
            <motion.div
            className="columns-2 gap-24 pl-40 space-y-24"
            >
            {data.universityLevel.institutions.map((inst: any, index: number) => (
              <div 
                key={index} 
                className="relative flex flex-col overflow-hidden break-inside"
                onMouseEnter={() => setHoveredInstitution(inst.name)}
                onMouseLeave={() => setHoveredInstitution("")}
              >
                <img 
                  src={inst.image} 
                  alt={inst.name} 
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  style={{ height: inst.height }}
                />
                <div className="text-left text-black p-4">
                    <h4 className="font-bold font-serif text-lg">{inst.name}</h4>
                    <p className="text-sm font-sans text-zinc-500">{inst.period}</p>
                  </div>
              </div>
            ))}
          </motion.div>
          </div>
        
        </motion.section>
          </div>

        {/* Certifications Section */}
        <motion.div
          ref={blackSectionRef}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(0) }} 
          className="px-40 min-w-[100vw] py-20 bg-black">
          <h3 className="text-5xl text-center font-bold font-sans text-zinc-200 my-12" >
            {data.certifications.title}
          </h3>

          <div className="">
            {data.certifications.categories.map((category: any, catIndex: number) => (
          <div key={catIndex} className={catIndex < data.certifications.categories.length - 1 ? "mb-12" : ""}>
            
            <ol className="relative space-y-8 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-zinc-700">
              {category.certificates.map((cert: any, certIndex: number) => (
                <li key={certIndex} className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
                  <div className="relative flex items-center gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last">
                    <span className="size-3 shrink-0 rounded-full bg-yellow-400"></span>
                    <div className={certIndex % 2 === 0 ? "-mt-2 flex flex-col items-end" : "-mt-2 flex flex-col items-start"}>
                      <img 
                        src={cert.image} 
                        alt={cert.name} 
                        className={category.category === "Cybersecurity" 
                          ? "w-[500px] h-[350px] object-cover rounded-lg mb-2" 
                          : "w-[400px] h-[300px] object-cover rounded-lg mb-2"
                        } 
                      />
                      
                      <h3 className={certIndex % 2 === 0 ? "text-lg font-bold text-zinc-100 text-right font-serif" : "text-lg font-bold text-zinc-100 text-left font-serif"}>{cert.name}</h3>
                      <p className={certIndex % 2 === 0 ? "text-sm text-zinc-300 text-right font-sans pl-60" : "text-sm text-zinc-300 text-left font-serif pr-60"}>{cert.description}</p>
                      <time className={certIndex % 2 === 0 ? "text-xs/none font-medium text-zinc-400 text-right font-sans" : "text-xs/none font-medium text-zinc-400 text-left font-sans"}>{cert.date}</time>
                    </div>
                  </div>
                  <div aria-hidden="true"></div>
                </li>
              ))}
            </ol>
          </div>
        ))}  
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}