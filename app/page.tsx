"use client";

import { useState, useEffect, useRef } from "react";
import WelcomeAnimation from "./components/WelcomeAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationDelay } from "@/app/components/useAnimationDelay";
import PolygonBall from "./components/PolygonBall";
import { Network, Globe, Wrench, ArrowDown, ArrowUp } from "lucide-react";
import ScrollingLines from "./components/ScrollingLines";

const jobTitles = [
  "Network Administrator",
  "Web Designer",
  "Mobile App Dev"
];

export default function Home() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const [isFreshLoad, setIsFreshLoad] = useState(true);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [buttonOverWhite, setButtonOverWhite] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [elementVisibility, setElementVisibility] = useState({
    heading: false,
    paragraph1: false,
    paragraph2: false,
    profile: false,
    image: false
  });
  const whiteSectionRef = useRef<any>(null);
  const headingRef = useRef<any>(null);
  const paragraph1Ref = useRef<any>(null);
  const paragraph2Ref = useRef<any>(null);
  const profileRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const fullName = "Fofie Jounewe Joel Freude";

  const getDelay = useAnimationDelay();

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const whiteSections = document.querySelectorAll('.bg-white');
      if (whiteSections.length === 0) {
        setButtonOverWhite(false);
        return;
      }

      // Check if any white section is visible in viewport
      let isAnyWhiteVisible = false;
      whiteSections.forEach(section => {
        const whiteRect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (whiteRect.top < windowHeight && whiteRect.bottom > 0) {
          isAnyWhiteVisible = true;
        }
      });

      setButtonOverWhite(isAnyWhiteVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '-50px'
      }
    );

    if (whiteSectionRef.current) {
      observer.observe(whiteSectionRef.current);
    }

    return () => {
      if (whiteSectionRef.current) {
        observer.unobserve(whiteSectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observers = [
      { ref: headingRef, key: 'heading' },
      { ref: paragraph1Ref, key: 'paragraph1' },
      { ref: paragraph2Ref, key: 'paragraph2' },
      { ref: profileRef, key: 'profile' },
      { ref: imageRef, key: 'image' }
    ];

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = observers.find(o => o.ref.current === entry.target);
          if (element) {
            setElementVisibility(prev => ({
              ...prev,
              [element.key]: entry.isIntersecting
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-20px'
      }
    );

    observers.forEach(({ ref }) => {
      if (ref.current) {
        intersectionObserver.observe(ref.current);
      }
    });

    return () => {
      observers.forEach(({ ref }) => {
        if (ref.current) {
          intersectionObserver.unobserve(ref.current);
        }
      });
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cycle through job titles every 3 seconds
  useEffect(() => {
    if (!animationComplete) return;

    const interval = setInterval(() => {
      setCurrentJobIndex((prev) => (prev + 1) % jobTitles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [animationComplete]);

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem("hasSeenWelcomeAnimation");
    if (!hasSeenAnimation) {
      // First ever visit — play the welcome animation
      setIsFreshLoad(true);
      setShowAnimation(true);
    } else {
      // Returning visit (reload or nav) — skip welcome animation
      setIsFreshLoad(false);
      setAnimationComplete(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
    sessionStorage.setItem("hasSeenWelcomeAnimation", "true");
  };

  const h1Delay    = isFreshLoad ? 2.1 : getDelay(0);
  const subDelay   = isFreshLoad ? 3.1 : getDelay(1);
  const bodyDelay  = isFreshLoad ? 4.1 : getDelay(2);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="min-h-screen w-full grid grid-rows-3">
      {showAnimation && (
        <WelcomeAnimation onAnimationComplete={handleAnimationComplete} />
      )}

      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={animationComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: h1Delay }}
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:gap-20 lg:-mb-20 overflow-hidden lg:pt-0 my-8 md:my-16 lg:my-32"
      >

      <motion.div
      initial={{ opacity: 0, x: 
        -50 }}
      animate={animationComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: h1Delay }}
      className="h-auto z-10 pl-4 md:pl-32 lg:pt-4"
      >
        <h1
          className="text-6xl md:text-6xl lg:text-8xl font-bold text-zinc-100 mb-6 text-center md:text-left lg:text-left pt-8 md:pt-16 lg:pt-30 pt-60"
          style={{ fontFamily: "var(--font-gued)" }}
        >
          Hello, I'm {fullName}
        </h1>

        <div className="relative text-xl md:text-2xl lg:text-3xl text-zinc-400 mb-8 overflow-hidden text-center md:text-left lg:text-left xl:text-left" style={{ fontFamily: "var(--font-vlorentine)" }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentJobIndex}
              initial={{ opacity: 0 }}
              animate={animationComplete ? { opacity: 1 } : { opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center md:text-left"
            >
              {jobTitles[currentJobIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={animationComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: bodyDelay }}
          className="text-base md:text-lg text-zinc-500 max-w-2xl text-center md:text-left lg:text-left xl:text-left px-4 md:px-8 lg:px-0"
          style={{ fontFamily: "var(--font-vlorentine)" }}
        >
          Passionate about creating digital experiences that matter and resolve real-world problems.
        </motion.p>
      </motion.div>
      

      <div className=" absolute z-0 lg:w-[100%] lg:h-[98%] w-[200%] h-[108%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <PolygonBall sphereSize={isMobile ? 3 : 5}/>
      </div>
      
      </motion.section>

      {/* My Approach Section */}
      <motion.section
        className="w-full max-w-9xl px-4 md:px-20 py-20 md:mt-12 bg-white relative overflow-hidden"
      >
        <div className="absolute left-[80vw] md:left-[80vw] line w-50 h-50 hidden md:block">
          <ScrollingLines />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <motion.h2
              ref={headingRef}
              initial={{ opacity: 0, y: 20 }}
              animate={elementVisibility.heading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-8xl font-bold text-zinc-900 text-center md:text-left"
              style={{ fontFamily: "var(--font-gued)" }}
            >
              My Approach
            </motion.h2>
            <motion.p
              ref={paragraph1Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={elementVisibility.paragraph1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-base md:text-lg lg:text-xl text-zinc-600 leading-relaxed text-center md:text-left"
              style={{ fontFamily: "var(--font-vlorentine)" }}
            >
              I blend technical expertise with creative problem-solving to build solutions that actually work for users and businesses. Every project starts with understanding the core problem.
            </motion.p>
            <motion.p
              ref={paragraph2Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={elementVisibility.paragraph2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-base md:text-lg lg:text-xl text-zinc-400 leading-relaxed text-center md:text-left"
              style={{ fontFamily: "var(--font-vlorentine)" }}
            >
              From network architecture to mobile applications, I approach every project with a user-centered mindset, clean code standards, and attention to detail.
            </motion.p>

            {/* Circular Profile Element */}
            <motion.div
              ref={profileRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={elementVisibility.profile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center md:items-start mt-8"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center mb-3">
                <span className="text-zinc-400 text-xl md:text-2xl lg:text-3xl">👨‍💻</span>
              </div>
              <p className="text-xs md:text-sm lg:text-base text-zinc-500 font-sans text-center md:text-left">
                Building with Purpose
              </p>
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 30 }}
            animate={elementVisibility.image ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full"
          >
            <div className="aspect-[3/4] md:aspect-[3/3] overflow-hidden bg-zinc-800 border border-zinc-700 relative">
              <img
                src="https://www.tstc.edu/wp-content/uploads/2025/09/Computer-Networking-1200x800.jpg"
                alt="Working on projects"
                className="w-full h-full object-cover"
              />
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20 border-2 border-zinc-700 rounded-full opacity-50"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 md:w-16 md:h-16 border-2 border-zinc-700 rounded-lg opacity-50"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={animationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: bodyDelay + 1 }}
        className="flex flex-col items-center px-4 pt-8 md:pt-0 lg:flex-row lg:gap-40 lg:items-center lg:ml-40"
      >

        <h2 className="text-4xl md:text-5xl mb-12 text-center">
          <span className="font-bold text-zinc-100 text-5xl md:text-6xl lg:text-8xl" style={{ fontFamily: "var(--font-gued)" }}>My Services</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-800 items-center h-full w-full">
            {/* Network Administration Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={animationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: bodyDelay + 1.2 }}
              className="border-b md:border-r border-zinc-800 p-6 md:p-8 hover:bg-zinc-900/50 transition-colors duration-300 flex flex-col items-center justify-center h-full group"
            >
              <h3 className="text-lg md:text-xl font-bold text-zinc-100 mb-4" style={{ fontFamily: "var(--font-gued)" }}>
                Network Administration
              </h3>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-8" style={{ fontFamily: "var(--font-vlorentine)" }}>
                Design, implement, and maintain robust network infrastructures ensuring optimal performance, security, and reliability for your business operations.
              </p>
              <div className="flex justify-center">
                <ArrowDown size={24} className="text-orange-500" />
              </div>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="group-hover:opacity-100 group-hover:translate-y-0 bg-orange-400 text-black font-serif px-6 py-4 rounded-lg transition-all duration-300 mt-12"
              >
                Contact Me
              </motion.button>
            </motion.div>

            {/* Web Design Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={animationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: bodyDelay + 1.4 }}
              className="border-b md:border-r border-zinc-800 p-6 md:p-8 hover:bg-zinc-900/50 transition-colors duration-300 flex flex-col items-center justify-center h-full group"
            >
              <h3 className="text-lg md:text-xl font-bold text-zinc-100 mb-4" style={{ fontFamily: "var(--font-gued)" }}>
                Web Design
              </h3>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-8" style={{ fontFamily: "var(--font-vlorentine)" }}>
                Create stunning, responsive websites that deliver exceptional user experiences and drive engagement with modern design principles.
              </p>
              <div className="flex justify-center">
                <ArrowDown size={24} className="text-orange-500" />
              </div>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="group-hover:opacity-100 group-hover:translate-y-0 bg-orange-400 text-black font-serif px-6 py-4 rounded-lg transition-all duration-300 mt-12"
              >
                Contact Me
              </motion.button>
            </motion.div>

            {/* IT Maintenance Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={animationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: bodyDelay + 1.6 }}
              className="border-b md:border-r border-zinc-800 p-6 md:p-8 hover:bg-zinc-900/50 transition-colors duration-300 flex flex-col items-center justify-center h-full group"
            >
              <h3 className="text-lg md:text-xl font-bold text-zinc-100 mb-4" style={{ fontFamily: "var(--font-gued)" }}>
                IT Maintenance
              </h3>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-8" style={{ fontFamily: "var(--font-vlorentine)" }}>
                Provide comprehensive IT support and maintenance services to keep your systems running smoothly and minimize downtime for your organization.
              </p>
              <div className="flex justify-center">
                <ArrowDown size={24} className="text-orange-500" />
              </div>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="group-hover:opacity-100 group-hover:translate-y-0 bg-orange-400 text-black font-serif px-6 py-4 rounded-lg transition-all duration-300 mt-12"
              >
                Contact Me
              </motion.button>
            </motion.div>
        </div>

        
      </motion.section>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed right-4 bottom-4 md:right-8 md:bottom-8 flex items-center gap-3 z-50"
          >
            <span className={`text-xs font-sans [writing-mode:vertical-lr] rotate-180 transition-colors duration-300 ${buttonOverWhite ? 'text-zinc-900' : 'text-zinc-100'}`}>
              BACK TO TOP
            </span>
            <button
              onClick={scrollToTop}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 border ${buttonOverWhite ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700' : 'bg-white hover:bg-zinc-100 border-zinc-300'}`}
            >
              <ArrowUp size={20} className={buttonOverWhite ? 'text-white' : 'text-zinc-900'} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}