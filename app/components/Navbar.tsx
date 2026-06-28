"use client";

import React, { useState, useEffect } from "react";
import { User, Briefcase, Mail, GraduationCap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [elementPositions, setElementPositions] = useState({
    logo: false,
    pageLabel: false,
    navItems: [false, false, false, false]
  });
  const pathname = usePathname();

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const whiteSection = document.querySelector('.bg-white');
      if (!whiteSection) return;

      const whiteRect = whiteSection.getBoundingClientRect();

      // Check logo position
      const logoElement = document.querySelector('[data-element="logo"]');
      if (logoElement) {
        const logoRect = logoElement.getBoundingClientRect();
        const logoCenter = logoRect.top + logoRect.height / 2;
        const logoOverWhite = logoCenter >= whiteRect.top && logoCenter <= whiteRect.bottom;
        setElementPositions(prev => ({ ...prev, logo: logoOverWhite }));
      }

      // Check page label position
      const pageLabelElement = document.querySelector('[data-element="page-label"]');
      if (pageLabelElement) {
        const labelRect = pageLabelElement.getBoundingClientRect();
        const labelCenter = labelRect.top + labelRect.height / 2;
        const labelOverWhite = labelCenter >= whiteRect.top && labelCenter <= whiteRect.bottom;
        setElementPositions(prev => ({ ...prev, pageLabel: labelOverWhite }));
      }

      // Check each nav item position
      const navItemElements = document.querySelectorAll('[data-element^="nav-item"]');
      navItemElements.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const itemOverWhite = itemCenter >= whiteRect.top && itemCenter <= whiteRect.bottom;
        setElementPositions(prev => {
          const newNavItems = [...prev.navItems];
          newNavItems[index] = itemOverWhite;
          return { ...prev, navItems: newNavItems };
        });
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const getPageLabel = () => {
    if (pathname === "/") return "HOME";
    if (pathname === "/about") return "ABOUT";
    if (pathname === "/school") return "SCHOOL";
    if (pathname === "/projects") return "PROJECTS";
    if (pathname === "/contact") return "CONTACT";
    return "HOME";
  };
  
  const navItems = [
    { icon: <User />, href: "/about", label: "About" },
    { icon: <GraduationCap />, href: "/school", label: "School" },
    { icon: <Briefcase />, href: "/projects", label: "Projects" },
    { icon: <Mail />, href: "/contact", label: "Contact" },
  ];

  const fullName = "FOFIE JOUNEWE JOEL FREUDE";
  const initials = getInitials(fullName);

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-4 top-0 w-30 z-50 bg-transparent  flex flex-col items-start justify-between py-8 gap-20 ml-4 md:flex"
      style={{ display: isDesktop ? 'flex' : 'none' }}
    >

      <Link
        href="/"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="h-[400px] flex items-start -mt-2 relative ml-2 cursor-pointer"
        data-element="logo"
      >
        <p className={`font-sans text-xl [writing-mode:vertical-lr] [text-orientation:upright] absolute transition-opacity duration-300 ease-in-out ${elementPositions.logo ? 'text-zinc-900' : 'text-zinc-100'}`}
           style={{ opacity: isHovered ? 0 : 1 }}
        >
          {initials}
        </p>
        <p className={`font-sans text-xl [writing-mode:vertical-lr] [text-orientation:upright] absolute transition-opacity duration-300 ease-in-out ${elementPositions.logo ? 'text-zinc-900' : 'text-zinc-100'}`}
           style={{ opacity: isHovered ? 1 : 0 }}
        >
          {fullName}
        </p>
      </Link>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className="flex flex-col gap-2"
      >
        <span className={`font-sans text-sm [writing-mode:vertical-lr] rotate-180 ml-4 transition-colors duration-300 ${elementPositions.pageLabel ? 'text-zinc-900' : 'text-zinc-100'}`} data-element="page-label">
          {getPageLabel()}
        </span>
      </motion.div>
      <div className="group flex flex-col gap-9 rounded-full px-4 py-2 h-60 ml-2 pr-4 hover:pr-20 transition-all duration-300 ease-in-out">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`group/item relative transition-colors duration-200 text-sm font-sans ${elementPositions.navItems[index] ? 'text-zinc-600 hover:text-zinc-900' : 'text-zinc-400 hover:text-zinc-100'}`}
            data-element={`nav-item-${index}`}
          >
            {item.icon}
            <span className={`absolute left-8 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 ease-in-out whitespace-nowrap font-sans text-sm ${elementPositions.navItems[index] ? 'text-zinc-900' : 'text-zinc-100'}`}>
              {item.label.toUpperCase()}
            </span>
          </Link>
        ))}
      </div>

      
      
    </motion.nav>
  );
}