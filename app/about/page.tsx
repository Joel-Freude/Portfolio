"use client";

import { FaGithub, FaInstagram, FaTwitter, FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaDatabase, FaWindows, FaLinux, FaNetworkWired, FaShieldAlt, FaServer } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiMysql, SiFramer, SiHtml5, SiCss, SiCisco } from "react-icons/si";
import { ChessKing, Piano, Palette, Code, Database, Layout, Server, Cpu, Smartphone, Globe, Monitor, Settings, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { useAnimationDelay } from "@/app/components/useAnimationDelay";
import PolygonBall from "../components/PolygonBall";

export default function About() {
  const getDelay = useAnimationDelay();

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
        className="w-full max-w-8xl flex py-20 px-4 md:px-40 bg-white "
      >
        <div className="grid grid-cols-2 items-center gap-24 px-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-gued)" }}>
              My Tech Skills
            </h1>
            <p className="text-zinc-500 max-w-2xl" style={{ fontFamily: "var(--font-vlorentine)" }}>
              These are the technologies and tools I use to build modern, scalable applications
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 w-full max-w-4xl">
            {/* IT Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(3.1) }}
              className="group bg-gradient-to-br from-zinc-50 to-white rounded-xl p-6 border border-zinc-200 hover:border-zinc-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                  <Settings className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-zinc-900" style={{ fontFamily: "var(--font-gued)" }}>IT Support</h3>
              </div>
              <div className="space-y-5">
                <div className="group/item">
                  <div className="flex items-center gap-2 mb-2">
                    <FaWindows className="text-blue-600" size={18} />
                    <span className="text-sm font-medium text-zinc-700" style={{ fontFamily: "var(--font-vlorentine)" }}>Windows</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '95%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 h-1.5 rounded-full"
                    />
                  </div>
                </div>
                <div className="group/item">
                  <div className="flex items-center gap-2 mb-2">
                    <FaLinux className="text-orange-500" size={18} />
                    <span className="text-sm font-medium text-zinc-700" style={{ fontFamily: "var(--font-vlorentine)" }}>Linux</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-orange-500 to-yellow-400 h-1.5 rounded-full"
                    />
                  </div>
                </div>
                <div className="group/item">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="text-zinc-600" size={18} />
                    <span className="text-sm font-medium text-zinc-700" style={{ fontFamily: "var(--font-vlorentine)" }}>Troubleshooting</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '90%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-zinc-600 to-zinc-800 h-1.5 rounded-full"
                    />
                  </div>
                </div>
                <div className="group/item">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="text-zinc-600" size={18} />
                    <span className="text-sm font-medium text-zinc-700" style={{ fontFamily: "var(--font-vlorentine)" }}>Hardware</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '82%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-zinc-500 to-zinc-700 h-1.5 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Web Designer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(3.2) }}
              className="group bg-gradient-to-br from-zinc-50 to-white rounded-xl p-6 border border-zinc-200 hover:border-zinc-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <Palette className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-zinc-900" style={{ fontFamily: "var(--font-gued)" }}>Web Designer</h3>
              </div>
              <div className="space-y-5">
                <div className="group/item">
                  <div className="flex items-center gap-2 mb-2">
                    <SiFramer className="text-zinc-900" size={18} />
                    <span className="text-sm font-medium text-zinc-700" style={{ fontFamily: "var(--font-vlorentine)" }}>Framer</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '88%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-zinc-700 to-zinc-900 h-1.5 rounded-full"
                    />
                  </div>
                </div>
                <div className="group/item">
                  <div className="flex items-center gap-2 mb-2">
                    <SiHtml5 className="text-orange-600" size={18} />
                    <span className="text-sm font-medium text-zinc-700" style={{ fontFamily: "var(--font-vlorentine)" }}>HTML5</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '92%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-orange-600 to-red-500 h-1.5 rounded-full"
                    />
                  </div>
                </div>
                <div className="group/item">
                  <div className="flex items-center gap-2 mb-2">
                    <SiCss className="text-blue-500" size={18} />
                    <span className="text-sm font-medium text-zinc-700" style={{ fontFamily: "var(--font-vlorentine)" }}>CSS</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '90%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full"
                    />
                  </div>
                </div>
                <div className="group/item">
                  <div className="flex items-center gap-2 mb-2">
                    <Layout className="text-zinc-600" size={18} />
                    <span className="text-sm font-medium text-zinc-700" style={{ fontFamily: "var(--font-vlorentine)" }}>UI/UX Design</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-zinc-600 to-zinc-800 h-1.5 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Network Administration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(3.3) }}
              className="group bg-gradient-to-br from-zinc-50 to-white rounded-xl p-6 border border-zinc-200 hover:border-zinc-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                  <FaNetworkWired className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-zinc-900" style={{ fontFamily: "var(--font-gued)" }}>Network Administration</h3>
              </div>
              <div className="space-y-5">
                <div className="group/item">
                  <div className="flex items-center gap-2 mb-2">
                    <SiCisco className="text-blue-600" size={18} />
                    <span className="text-sm font-medium text-zinc-700" style={{ fontFamily: "var(--font-vlorentine)" }}>Cisco</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '80%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 h-1.5 rounded-full"
                    />
                  </div>
                </div>
                <div className="group/item">
                  <div className="flex items-center gap-2 mb-2">
                    <FaShieldAlt className="text-green-600" size={18} />
                    <span className="text-sm font-medium text-zinc-700" style={{ fontFamily: "var(--font-vlorentine)" }}>Network Security</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-green-600 to-emerald-500 h-1.5 rounded-full"
                    />
                  </div>
                </div>
                <div className="group/item">
                  <div className="flex items-center gap-2 mb-2">
                    <FaServer className="text-zinc-600" size={18} />
                    <span className="text-sm font-medium text-zinc-700" style={{ fontFamily: "var(--font-vlorentine)" }}>Server Management</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '78%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-zinc-600 to-zinc-800 h-1.5 rounded-full"
                    />
                  </div>
                </div>
                <div className="group/item">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="text-zinc-600" size={18} />
                    <span className="text-sm font-medium text-zinc-700" style={{ fontFamily: "var(--font-vlorentine)" }}>Routing & Switching</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '75%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-zinc-500 to-zinc-700 h-1.5 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
             
          </div>
        </div>
      </motion.section>
    </div>
  );
}