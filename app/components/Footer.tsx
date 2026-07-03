"use client";

import { Mail, Heart, ArrowRight, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="w-full bg-zinc-950 text-zinc-300 py-16 px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-32 mb-16 ">
          {/* Contact*/}
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-bold text-white mb-4 font-serif" >
              Joel Freude.
            </h2>
            <p className="text-sm text-zinc-400 mb-6 font-sans">
              Contact me for your next project
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 ">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-400 font-sans"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-black rounded-lg border border-zinc-500 hover:bg-white transition-colors flex items-center justify-center font-sans"
              >
                <ArrowRight className="w-5 h-5 text-zinc-500 hover:text-black transition-colors" />
              </button>
            </form>
          </div>

          <div className="flex gap-30 ml-96">
            {/* Navigation Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6 font-serif">Navigation</h4>
                <ul className="space-y-3 font-sans">
                  <li>
                    <Link href="/" className="text-sm hover:text-white transition-colors font-medium">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-sm hover:text-white transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/education" className="text-sm hover:text-white transition-colors">
                      Education
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" className="text-sm hover:text-white transition-colors">
                      Projects
                    </Link>
                  </li>
                  
                  <li>
                    <Link href="/contact" className="text-sm hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>


            {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6 font-serif">Contact</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0 font-sans" />
                    <div>
                      <p className="text-sm text-zinc-400 font-sans">Yaoundé, Cameroon</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-orange-400 flex-shrink-0 font-sans" />
                    <a href="mailto:contact@example.com" className="text-sm text-zinc-400 hover:text-white transition-colors font-sans">
                      fofie_joel&#64;yahoo.fr
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-orange-400 flex-shrink-0 font-sans" />
                    <p className="text-sm text-zinc-400 font-sans">+237 650812141</p>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://github.com/Joel-Freude"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/joelfofie/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://x.com/JoelFofie"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-zinc-500 flex items-center gap-2 font-sans">
              © {new Date().getFullYear()} FOFIE JOUNEWE JOEL FREUDE. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
