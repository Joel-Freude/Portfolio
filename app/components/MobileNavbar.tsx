"use client";

import React, { useState } from "react";
import { User, Briefcase, Mail, GraduationCap, Menu, X, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const getPageLabel = () => {
    if (pathname === "/") return "HOME";
    if (pathname === "/about") return "ABOUT";
    if (pathname === "/school") return "SCHOOL";
    if (pathname === "/projects") return "PROJECTS";
    if (pathname === "/contact") return "CONTACT";
    return "HOME";
  };

  const navItems = [
    { icon: <Home size={24} />, href: "/", label: "Home" },
    { icon: <User size={24} />, href: "/about", label: "About" },
    { icon: <GraduationCap size={24} />, href: "/school", label: "School" },
    { icon: <Briefcase size={24} />, href: "/projects", label: "Projects" },
    { icon: <Mail size={24} />, href: "/contact", label: "Contact" },
  ];

  const fullName = "FOFIE JOUNEWE JOEL FREUDE";
  const initials = getInitials(fullName);

  return (
    <>
      {/* Mobile Header */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800 px-4 py-3 flex items-center justify-between md:hidden"
      >
        {/* Logo */}
        <Link
          href="/"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative cursor-pointer"
        >
          <p
            className="text-zinc-100 font-sans text-lg transition-opacity duration-300 ease-in-out"
            style={{ opacity: isHovered ? 0 : 1 }}
          >
            {initials}
          </p>
          <p
            className="text-zinc-100 font-sans text-sm absolute top-0 left-0 transition-opacity duration-300 ease-in-out"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            {fullName}
          </p>
        </Link>

        {/* Page Label */}
        <span className="text-zinc-100 font-sans text-sm">{getPageLabel()}</span>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-zinc-100 hover:text-zinc-300 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-sm md:hidden pt-20"
          >
            <div className="flex flex-col items-center gap-8 pt-20">
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-zinc-400 hover:text-zinc-100 transition-colors text-lg font-sans"
                  >
                    {item.icon}
                    <span>{item.label.toUpperCase()}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
