"use client";

import { useState } from "react";
import { FaGithub, FaInstagram, FaTwitter, FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaDatabase, FaWindows, FaLinux, FaNetworkWired, FaShieldAlt, FaServer, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiMysql, SiFramer, SiHtml5, SiCss, SiCisco } from "react-icons/si";
import { ChessKing, Piano, Palette, Code, Database, Layout, Server, Cpu, Smartphone, Globe, Monitor, Settings, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationDelay } from "@/app/components/useAnimationDelay";
import PolygonBall from "../components/PolygonBall";
import ScrollingLines from "../components/ScrollingLines";

export default function About() {
  const getDelay = useAnimationDelay();
  const [currentIndex, setCurrentIndex] = useState(0);

  const skillCards = [
    {
      id: 0,
      title: "IT Support",
      image: "/images/IT Support.jpg",
      iconGradient: "from-blue-500 to-cyan-500",
      skills: [
        { icon: <FaWindows className="text-blue-600" size={18} />, name: "Windows", percentage: "95%", gradient: "from-blue-600 to-cyan-500" },
        { icon: <FaLinux className="text-orange-500" size={18} />, name: "Linux", percentage: "85%", gradient: "from-orange-500 to-yellow-400" },
        { icon: <Wrench className="text-zinc-600" size={18} />, name: "Troubleshooting", percentage: "90%", gradient: "from-zinc-600 to-zinc-800" },
        { icon: <Monitor className="text-zinc-600" size={18} />, name: "Hardware", percentage: "82%", gradient: "from-zinc-500 to-zinc-700" },
      ]
    },
    {
      id: 1,
      title: "Web Designer",
      image: "/images/Web Design.jpeg",
      iconGradient: "from-purple-500 to-pink-500",
      skills: [
        { icon: <SiFramer className="text-zinc-900" size={18} />, name: "Framer", percentage: "88%", gradient: "from-zinc-700 to-zinc-900" },
        { icon: <SiHtml5 className="text-orange-600" size={18} />, name: "HTML5", percentage: "92%", gradient: "from-orange-600 to-red-500" },
        { icon: <SiCss className="text-blue-500" size={18} />, name: "CSS", percentage: "90%", gradient: "from-blue-500 to-cyan-400" },
        { icon: <Layout className="text-zinc-600" size={18} />, name: "UI/UX Design", percentage: "85%", gradient: "from-zinc-600 to-zinc-800" },
      ]
    },
    {
      id: 2,
      title: "Network Administration",
      image: "/images/Network.jpg",
      iconGradient: "from-green-500 to-emerald-500",
      skills: [
        { icon: <SiCisco className="text-blue-600" size={18} />, name: "Cisco", percentage: "80%", gradient: "from-blue-600 to-cyan-500" },
        { icon: <FaShieldAlt className="text-green-600" size={18} />, name: "Network Security", percentage: "85%", gradient: "from-green-600 to-emerald-500" },
        { icon: <FaServer className="text-zinc-600" size={18} />, name: "Server Management", percentage: "78%", gradient: "from-zinc-600 to-zinc-800" },
        { icon: <Globe className="text-zinc-600" size={18} />, name: "Routing & Switching", percentage: "75%", gradient: "from-zinc-500 to-zinc-700" },
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % skillCards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + skillCards.length) % skillCards.length);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center  bg-zinc-950">
      {/* Main About Content */}
      <div className="max-w-8xl grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-10 w-full pb-60 overflow-hidden z-10 relative py-60 z-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(0) }}
          className="max-w-4xl lg:max-w-8xl p-8 rounded-lg pl-60 "
        >
          <h2 className="text-6xl lg:text-8xl md:text-5xl font-bold text-zinc-100 mb-6 md:mb-8 text-center md:text-left" style={{ fontFamily: "var(--font-gued)" }}>
            About Me
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed text-center md:text-left" style={{ fontFamily: "var(--font-vlorentine)" }}>
            I am a computer passionate who love to create innovative digital solutions with thoughful design, clean code and user-centered approach to satisfy
            the needs of users and businesses that seek to make a positive impact.
          </p>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(1) }}
            className="mt-6 md:mt-8 "
          >
            <h1 className="text-xl md:text-2xl font-bold text-zinc-100 mb-4 text-center md:text-left" style={{ fontFamily: "var(--font-gued)" }}>
              Hobbies
            </h1>
            <ul className="list-disc list-inside text-zinc-400 font-sans text-center md:text-left">
              <li className="flex items-center gap-2 mb-2 justify-center md:justify-start"><ChessKing size={30} className="w-6 h-6 md:w-8 md:h-8" /> Chess</li>
              <li className="flex items-center gap-2 mb-2 justify-center md:justify-start"><Palette size={30} className="w-6 h-6 md:w-8 md:h-8" /> Drawing</li>
              <li className="flex items-center gap-2 mb-2 justify-center md:justify-start"><Piano size={30} className="w-6 h-6 md:w-8 md:h-8" /> Piano</li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(2) }}
          className="socials flex flex-col w-180 gap-6 md:gap-8 items-center justify-center mt-8 md:mt-0 z-10"
        >
          <div className="border border-zinc-950 rounded-full overflow-hidden w-100 h-100 items-center">
            <img src="/images/Wow.png" alt="" className=" w-400 "/> 
          </div>
          <div className="flex flex-row gap-6 md:gap-8">
            <motion.div
            className="relative w-16 h-16 cursor-pointer md:mt-[50%]"
            whileHover={{ scale: 1.05 }}
          >
            
            <motion.div
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* Front - Icon */}
              <div
                className="absolute inset-0 backface-hidden flex items-center justify-center bg-zinc-900 rounded-lg border border-zinc-800"
                style={{ backfaceVisibility: "hidden" }}
              >
                <FaGithub size={34} className="text-zinc-400" />
              </div>
              {/* Back - Profile name */}
              <div
                className="absolute inset-0 backface-hidden flex items-center justify-center bg-zinc-800 rounded-lg border border-zinc-700"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="text-xs font-sans text-zinc-100 text-center px-1">Joel-Freude</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-16 h-16 cursor-pointer md:mt-[50%]"
            whileHover={{ scale: 1.05 }}
          >
            
            <motion.div
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* Front - Icon */}
              <div
                className="absolute inset-0 backface-hidden flex items-center justify-center bg-zinc-900 rounded-lg border border-zinc-800"
                style={{ backfaceVisibility: "hidden" }}
              >
                <FaInstagram size={34} className="text-zinc-400" />
              </div>
              {/* Back - Profile name */}
              <div
                className="absolute inset-0 backface-hidden flex items-center justify-center bg-zinc-800 rounded-lg border border-zinc-700"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="text-xs font-sans text-zinc-100 text-center px-1">joelfofie</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-16 h-16 cursor-pointer md:mt-[50%]"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* Front - Icon */}
              <div
                className="absolute inset-0 backface-hidden flex items-center justify-center bg-zinc-900 rounded-lg border border-zinc-800"
                style={{ backfaceVisibility: "hidden" }}
              >
                <FaTwitter size={34} className="text-zinc-400" />
              </div>
              {/* Back - Profile name */}
              <div
                className="absolute inset-0 backface-hidden flex items-center justify-center bg-zinc-800 rounded-lg border border-zinc-700"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="text-xs font-sans text-zinc-100 text-center px-1">@JoelFofie</span>
              </div>
            </motion.div>
          </motion.div>
          </div>
        </motion.div>
        <div className=" absolute z-0 lg:w-[100%] lg:h-[98%] w-[200%] h-[108%] left-1/3 bottom-[50vh] z-0">
          <PolygonBall sphereSize={1.5}/>
        </div>
        <div className=" absolute z-0 lg:w-[100%] lg:h-[198%] w-[200%] h-[108%] right-1/3 top-[20vw] z-0">
          <PolygonBall sphereSize={1.7}/>
        </div>
      </div>

      {/* TechStack Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: getDelay(3) }}
        className="w-full max-w-8xl flex py-[10%] px-4 md:px-40 bg-white relative overflow-hidden  "
      >
        <div className="absolute md:right-[80vw] line w-50 h-50 hidden md:block">
            <ScrollingLines animationY={[-600, -300, -600]} stroke="#a1a1a1" />
        </div>
        <div className="grid grid-cols-2 items-center gap-24 px-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-gued)" }}>
              My Tech Skills
            </h1>
            <p className="text-zinc-500 max-w-2xl" style={{ fontFamily: "var(--font-vlorentine)" }}>
              These are the technologies and tools I use to build modern, scalable applications
            </p>
          </div>

          <div className="w-full max-w-9xl relative ">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-14 h-14 rounded-full bg-zinc-900 shadow-xl flex items-center justify-center hover:bg-zinc-800 transition-all duration-300 border-2 border-zinc-700 hover:scale-110"
            >
              <FaChevronLeft className="text-white" size={22} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-48 z-10 w-14 h-14 rounded-full bg-zinc-900 shadow-xl flex items-center justify-center hover:bg-zinc-800 transition-all duration-300 border-2 border-zinc-700 hover:scale-110"
            >
              <FaChevronRight className="text-white" size={22} />
            </button>

            {/* Carousel */}
            <div className="overflow-hidden py-8 w-[120%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative group"
                  style={{ perspective: '1500px' }}
                >
                  {/* Flip card */}
                  <motion.div
                    className="relative w-full"
                    style={{ transformStyle: "preserve-3d", minHeight: '600px', minWidth: '600px' }}
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {/* Front - Image */}
                    <div
                      className="absolute inset-0 backface-hidden rounded-2xl border border-zinc-200 overflow-hidden"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <img
                        src={skillCards[currentIndex].image}
                        alt={skillCards[currentIndex].title}
                        className="w-full h-full object-cover"
                        style={{ minHeight: '400px' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <h3 className="absolute bottom-8 left-8 text-3xl font-bold text-white" style={{ fontFamily: "var(--font-gued)" }}>
                        {skillCards[currentIndex].title}
                      </h3>
                    </div>

                    {/* Back - Skills */}
                    <div
                      className="absolute inset-0 backface-hidden bg-gradient-to-br from-zinc-50 to-white rounded-2xl border border-zinc-200 p-8 flex flex-col overflow-hidden"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", minHeight: '400px' }}
                    >
                      <h3 className="text-2xl font-bold text-zinc-900 mb-6" style={{ fontFamily: "var(--font-gued)" }}>
                        {skillCards[currentIndex].title}
                      </h3>
                      <div className="space-y-5 flex-1 overflow-y-auto">
                        {skillCards[currentIndex].skills.map((skill, index) => (
                          <div key={index} className="group/item">
                            <div className="flex items-center gap-3 mb-2">
                              {skill.icon}
                              <span className="text-base font-medium text-zinc-700" style={{ fontFamily: "var(--font-vlorentine)" }}>{skill.name}</span>
                            </div>
                            <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
                              <motion.div
                                key={`${currentIndex}-${index}`}
                                initial={{ width: 0 }}
                                animate={{ width: skill.percentage }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`bg-gradient-to-r ${skill.gradient} h-2 rounded-full`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-3 mt-6">
              {skillCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-zinc-900 w-8' : 'bg-zinc-300 hover:bg-zinc-400 w-3'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}