"use client";

import { useState } from "react";
import { FaGithub, FaInstagram, FaTwitter, FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaDatabase, FaWindows, FaLinux, FaApple, FaNetworkWired, FaShieldAlt, FaServer, FaChevronLeft, FaChevronRight, FaHeadset } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiMysql, SiFramer, SiHtml5, SiCss, SiCisco } from "react-icons/si";
import { ChessKing, Piano, Palette, Code, Database, Layout, Server, Cpu, Smartphone, Globe, Monitor, Settings, Wrench, BookOpen, Music, Camera, Gamepad2, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationDelay } from "@/app/components/useAnimationDelay";
import PolygonBall from "../components/PolygonBall";
import ScrollingLines from "../components/ScrollingLines";
import DownloadCVButton from "../components/DownloadCVButton";

export default function About() {
  const getDelay = useAnimationDelay();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const skillCards = [
    {
      id: 0,
      title: "IT Support",
      image: "/images/IT Support.jpg",
      iconGradient: "from-blue-500 to-cyan-500",
      skills: [
        { icon: <FaWindows className="text-blue-600" size={18} />, name: "Windows OS setup, configuration and activation for clients and servers" },
        { icon: <FaLinux className="text-orange-500" size={18} />, name: "Linux setup and configuration for clients and servers" },
        { icon: <Wrench className="text-zinc-600" size={18} />, name: "Hardwware Troubleshooting, diagnostics and repair together with synthesized reports" },
        { icon: <Monitor className="text-zinc-600" size={18} />, name: "Software installation, activation and setup for adapted computer" },
      ]
    },
    {
      id: 1,
      title: "Web Designer",
      image: "/images/Web Design.jpeg",
      iconGradient: "from-purple-500 to-pink-500",
      skills: [
        { icon: <SiFramer className="text-zinc-900" size={18} />, name: "The good use of Framer for the optimum design and management of my clients website and digital network resources" },
        { icon: <SiNextdotjs className="text-zinc-900" size={18} />, name: "The good use of Next.js for the developement and deployemeny of the clients website for it's self management" },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 32 32" fill="#31A8FF"><path d="M0 .401v31.198h32V.401zm1.333 1.333h29.333v28.531H1.333zm6.401 5.974c0-.089.188-.156.297-.156a76 76 0 0 1 3.438-.068c3.698 0 5.135 2.026 5.135 4.62c0 3.391-2.458 4.844-5.469 4.844c-.51 0-.682-.026-1.036-.026v5.125c0 .109-.042.156-.151.156H7.885c-.109 0-.151-.042-.151-.151zm2.365 7.084c.307.021.552.021 1.083.021c1.557 0 3.026-.552 3.026-2.661c0-1.693-1.052-2.552-2.833-2.552c-.526 0-1.031.021-1.276.042zm11.479-1.589c-1.057 0-1.411.531-1.411.969c0 .484.24.813 1.651 1.542c2.089 1.016 2.75 1.979 2.75 3.411c0 2.13-1.63 3.276-3.828 3.276c-1.167 0-2.161-.245-2.734-.573c-.083-.042-.104-.109-.104-.219v-1.958c0-.13.063-.177.151-.109a4.9 4.9 0 0 0 2.682.792c1.057 0 1.495-.438 1.495-1.036c0-.484-.307-.901-1.646-1.604c-1.896-.906-2.688-1.828-2.688-3.37c0-1.719 1.344-3.146 3.672-3.146c1.146 0 1.953.177 2.396.37c.109.068.13.177.13.266v1.828c0 .109-.068.177-.198.13c-.594-.349-1.469-.573-2.323-.573z"/></svg>, name: "The design of logo and visuals with the use of Adobe Photoshop for posters and brand identity" },
      ]
    },
    {
      id: 2,
      title: "Network Admin",
      image: "/images/Network.jpg",
      iconGradient: "from-green-500 to-emerald-500",
      skills: [
        { icon: <SiCisco className="text-blue-600" size={18} />, name: "The use of cisco" },
        { icon: <FaShieldAlt className="text-green-600" size={18} />, name: "Network Security" },
        { icon: <FaServer className="text-zinc-600" size={18} />, name: "Server Management" },
        { icon: <Globe className="text-zinc-600" size={18} />, name: "Routing & Switching" },
      ]
    },
    {
      id: 3,
      title: "Mobile Dev",
      image: "/images/Mobile Dev.jpg",
      iconGradient: "from-orange-500 to-red-500",
      skills: [
        { icon: <Smartphone className="text-zinc-600" size={18} />, name: "Cross-platform mobile application development using React Native and Flutter" },
        { icon: <Cpu className="text-zinc-600" size={18} />, name: "Native mobile app development for iOS and Android platforms" },
        { icon: <Code className="text-zinc-600" size={18} />, name: "Mobile UI/UX design and implementation with modern frameworks" },
        { icon: <Database className="text-zinc-600" size={18} />, name: "Integration with backend APIs and local database management" },
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % skillCards.length);
    setIsCardFlipped(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + skillCards.length) % skillCards.length);
    setIsCardFlipped(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-zinc-950 py-20 md:py-0">
      {/* Main About Content */}
      <div className="max-w-8xl grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-10 w-full pb-20 md:pb-60 overflow-hidden z-10 relative pt-32 md:pt-60 py-20 md:py-60 z-0">
        
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: getDelay(0) }}
          className="max-w-4xl lg:max-w-8xl p-4 md:p-8 rounded-lg pl-4 md:pl-60 order-2 md:order-1 "
        >
          <div className=" relative bottom-[10vh] -left-[15vw] flex items-center gap-4">
            <hr className="border-0.5 border-zinc-500 w-80 "/>
            <h1 className="text-xl font-sans text-zinc-500">About</h1>
        </div>
          <h2 className="text-4xl md:text-5xl lg:text-8xl font-bold text-zinc-100 mb-4 md:mb-8 text-center md:text-left" style={{ fontFamily: "var(--font-gued)" }}>
            About Me
          </h2>
          <p className="text-base md:text-lg md:text-xl text-zinc-400 leading-relaxed text-center md:text-left px-2 md:px-0" style={{ fontFamily: "var(--font-vlorentine)" }}>
            I am a computer passionate who love to create innovative digital solutions with thoughful design, clean code and user-centered approach to satisfy
            the needs of users and businesses that seek to make a positive impact.
          </p>
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: getDelay(1) }}
            className="mt-4 md:mt-8 "
          >
            <h1 className="text-lg md:text-xl md:text-2xl font-bold text-zinc-100 mb-3 md:mb-4 text-center md:text-left" style={{ fontFamily: "var(--font-gued)" }}>
              Hobbies
            </h1>
            <ul className="list-disc list-inside text-zinc-400 font-sans text-center md:text-left text-sm md:text-base">
              <li className="flex items-center gap-2 mb-2 justify-center md:justify-start"><ChessKing size={24} className="w-5 h-5 md:w-8 md:h-8" /> Chess</li>
              <li className="flex items-center gap-2 mb-2 justify-center md:justify-start"><Palette size={24} className="w-5 h-5 md:w-8 md:h-8" /> Drawing</li>
              <li className="flex items-center gap-2 mb-2 justify-center md:justify-start"><BookOpen size={24} className="w-5 h-5 md:w-8 md:h-8" />Reading </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: getDelay(2) }}
          className="socials flex flex-col w-full md:w-180 gap-4 md:gap-6 md:gap-8 items-center justify-center mt-4 md:mt-8 md:mt-0 z-10 order-1 md:order-2"
        >
          <div className="flex flex-col items-center gap-4 mb-4">
  <div className="relative flex items-center justify-center w-72 h-72 md:w-[28rem] md:h-[28rem]">
    
    {/* Circular image */}
    <div className="absolute border border-zinc-950 rounded-full overflow-hidden w-60 h-60 md:w-96 md:h-96">
      <img src="/images/Wow.png" alt="" className="w-full h-full object-cover" />
    </div>

    {/* SVG curved text */}
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Top arc rotated -30deg around center (150,150) */}
        <path
          id="topArc"
          d="M 20,150 A 130,130 0 0,1 290,150"
          transform="rotate(-30, 150, 150)"
        />
        {/* Bottom arc rotated -30deg, with larger radius for more gap */}
        <path
          id="bottomArc"
          d="M 10,150 A 140,140 0 0,0 300,150"
          transform="rotate(-30, 150, 150)"
        />
      </defs>

      {/* Email curved along top */}
      <text
        fill="white"
        fontSize="13"
        fontFamily="gued"
        letterSpacing="3"
      >
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          fofie_joel&#64;yahoo.fr
        </textPath>
      </text>

      {/* Phone curved along bottom */}
      <text
        fill="white"
        fontSize="13"
        fontFamily="gued"
        letterSpacing="3"
      >
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          +237 650812141
        </textPath>
      </text>
    </svg>

  </div>
</div>
          <DownloadCVButton />
          <div className="flex flex-row gap-4 md:gap-6 md:gap-8">
            <motion.div
            className="relative w-12 h-12 md:w-16 md:h-16 cursor-pointer"
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
                <FaGithub size={24} className="text-zinc-400" />
              </div>
              {/* Back - Profile name */}
              <div
                className="absolute inset-0 backface-hidden flex items-center justify-center bg-zinc-800 rounded-lg border border-zinc-700"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="text-[10px] md:text-xs font-sans text-zinc-100 text-center px-1">Joel-Freude</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-12 h-12 md:w-16 md:h-16 cursor-pointer"
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
                <FaInstagram size={24} className="text-zinc-400" />
              </div>
              {/* Back - Profile name */}
              <div
                className="absolute inset-0 backface-hidden flex items-center justify-center bg-zinc-800 rounded-lg border border-zinc-700"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="text-[10px] md:text-xs font-sans text-zinc-100 text-center px-1">joelfofie</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-12 h-12 md:w-16 md:h-16 cursor-pointer"
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
                <FaTwitter size={24} className="text-zinc-400" />
              </div>
              {/* Back - Profile name */}
              <div
                className="absolute inset-0 backface-hidden flex items-center justify-center bg-zinc-800 rounded-lg border border-zinc-700"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="text-[10px] md:text-xs font-sans text-zinc-100 text-center px-1">@JoelFofie</span>
              </div>
            </motion.div>
          </motion.div>
          </div>
        </motion.div>
        <div className=" absolute -z-100000000 lg:w-[100%] lg:h-[98%] w-[200%] h-[108%] left-1/3 bottom-[50vh] ">
          <PolygonBall sphereSize={1.5}/>
        </div>
        <div className=" absolute -z-10000000 lg:w-[100%] lg:h-[198%] w-[200%] h-[108%] right-1/3 top-[20vw] ">
          <PolygonBall sphereSize={1.7}/>
        </div>
      </div>

      {/* TechStack Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: getDelay(3) }}
        className="w-full max-w-8xl flex flex-col md:flex-row bg-white relative overflow-hidden "
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-auto md:right-[80vw] md:top-auto md:translate-x-0 md:translate-y-0 line w-50 h-50 block z-0">
            <ScrollingLines animationY={[-100, -300, -100]} stroke="#c5c5c5" />
        </div>
       <div className="flex flex-col py-[10vh] pt-20 md:pt-[10vh] z-10 order-2 md:order-1 px-4 md:px-0">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-64">
            <div className="flex items-center gap-4">
              <hr className="border-0.5 border-zinc-500 w-20 md:w-40 "/>
              <h1 className="text-base md:text-xl font-sans text-zinc-500">TechStack</h1>
            </div>
            <div className="flex items-center gap-4 ml-0 md:ml-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-zinc-200 hover:bg-zinc-300 transition-colors"
              >
                <FaChevronLeft className="text-zinc-700" size={16} />
              </button>
              <div className="flex gap-2">
                {skillCards.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-zinc-700' : 'bg-zinc-300'}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-zinc-200 hover:bg-zinc-300 transition-colors"
              >
                <FaChevronRight className="text-zinc-700" size={16} />
              </button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="pl-4 md:pl-64 pr-4 md:pr-32 py-[5vh] gap-4"
            >
              <div>
                <h1 className="font-serif text-5xl md:text-8xl font-bold text-center">{skillCards[currentIndex].title}</h1>
              </div>
              <p className="text-zinc-400 font-sans text-sm md:text-xl">
                {skillCards[currentIndex].title === "IT Support" && "I specialize in providing comprehensive IT support solutions, ensuring your technology infrastructure runs smoothly and efficiently. I'm good with what concern known Operating systems(Windows, MacOS and Linux) and other main hardware diagnostics and maintenance."}
                {skillCards[currentIndex].title === "Web Designer" && "I use my design skills to create my visually stunning and user-friendly websites with modern design principles. I specialize in creating responsive layouts, smooth animations, and intuitive user experiences that engage and delight visitors giving an amazing visual experience to my network audience."}
                {skillCards[currentIndex].title === "Network Admin" && "I design, implement, deploy, and secure robust network infrastructures for small, medium and large enterprises. I ensure optimal performance, security, and reliability for enterprise networks through expert configuration and monitoring in order to garantee confidentiality, intergrity and avalaibility."}
              </p>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={`skills-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              className="mt-4 md:mt-8 pl-4 md:pl-64 pr-4 md:pr-32 "
            >
              <h1 className="text-base md:text-xl font-serif font-bold mb-2 md:mb-4">Associated Skills</h1>
              <ul className="space-y-1 md:space-y-2 font-sans text-zinc-500 text-sm md:text-base">
                {skillCards[currentIndex].skills.map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2">{skill.icon} {skill.name}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
       </div>
       <AnimatePresence mode="wait">
         <motion.img
           key={`image-${currentIndex}`}
           src={skillCards[currentIndex].image}
           alt=""
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 1.05 }}
           transition={{ duration: 0.4, ease: "easeOut" }}
           className="w-full md:w-[50vw] h-[30vh] md:h-[90vh] object-cover order-1 md:order-2 z-10"
         />
       </AnimatePresence>
      </motion.section>

      {/*Ohter Center of Interests section*/}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: getDelay(4) }}
        className="w-full flex flex-col align-center max-w-8xl flex pt-[15%] px-4 md:px-40 bg-zinc-950 relative overflow-hidden flex flex-col items-center"
      >
        <div className=" absolute z-0 lg:w-[400%] lg:h-[150%] left-1/2 bottom-[65vh] -translate-x-1/2">
          <PolygonBall sphereSize={1.5} color="#444444"/>
        </div>

        <div className="gap-12 md:gap-24 px-4 md:px-12 flex flex-col items-center">
          <div className="relative flex items-center gap-4">
                <p className="font-serif text-zinc-700 text-sm md:text-base">Other center of Tnterests</p>
                <hr className="border border-zinc-700 w-20 md:w-40"/>
          </div>
          <p className="text-center text-zinc-400 max-w-2xl text-xl md:text-4xl px-0 font-serif">
              Beyond technology, I'm passionate about exploring diverse fields that enrich my creativity and my perspective about life
          </p>

          <div className="space-y-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border border-zinc-800 w-full md:w-auto md:mx-24">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(5) }}
              className="p-6 md:p-6 pt-8 md:pt-60 hover:bg-zinc-900/70 transition-all duration-300 border-b md:border-b-0 md:border-r border-zinc-800"
            >
              <div className="flex flex-col items-center text-center gap-4 ">
                <div className="bg-zinc-800 p-3 rounded-lg ">
                  <BookOpen className="text-zinc-300" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: "var(--font-gued)" }}>
                    Psychology
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base" style={{ fontFamily: "var(--font-vlorentine)" }}>
                    Understanding human behavior and mental processes to help my in my daily life and understand my humanity
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(6) }}
              className="p-6 md:p-6 pt-8 md:pt-60 hover:bg-zinc-900/70 transition-all duration-300 border-b md:border-b-0 md:border-r border-zinc-800"
            >
              <div className="flex flex-col items-center text-center gap-4 w-full md:w-[20vw]">
                <div className="bg-zinc-800 p-3 rounded-lg">
                  <Stethoscope className="text-zinc-300" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: "var(--font-gued)" }}>
                    Medecine
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base" style={{ fontFamily: "var(--font-vlorentine)" }}>
                    Understanding the concepts of the living human anatomy and how to enhance my survival skills
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: getDelay(7) }}
              className="p-6 md:p-6 pt-8 md:pt-60 hover:bg-zinc-900/70 transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-4 text-center w-full md:w-[20vw]">
                <div className="bg-zinc-800 p-3 rounded-lg ">
                  <Music className="text-zinc-300" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: "var(--font-gued)" }}>
                    Music
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base" style={{ fontFamily: "var(--font-vlorentine)" }}>
                    Exploring different genres, attending concerts, and discovering new artists
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}