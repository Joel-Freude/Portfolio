"use client";

import React, { useEffect, useState } from "react";

export default function WelcomeAnimation({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRemove, setShouldRemove] = useState(false);
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [showName, setShowName] = useState(false);
  const [fadeWordsYellow, setFadeWordsYellow] = useState(false);

  const words = ["Welcome", "to", "my", "Portfolio"];

  useEffect(() => {
    setIsVisible(true);
    
    // Show words one by one
    const wordInterval = setInterval(() => {
      setVisibleWordCount((prev) => {
        if (prev < words.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 500);

    // Fade words to yellow after all words are visible
    const yellowFadeTimer = setTimeout(() => {
      setFadeWordsYellow(true);
    }, words.length * 500 + 800);

    // Show name after yellow fade
    const nameTimer = setTimeout(() => {
      setShowName(true);
    }, words.length * 500 + 800 + 800);

    // Remove animation after showing name for 2 seconds
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRemove(true);
        onAnimationComplete();
      }, 1000);
    }, words.length * 500 + 800 + 800 + 2000);

    return () => {
      clearInterval(wordInterval);
      clearTimeout(yellowFadeTimer);
      clearTimeout(nameTimer);
      clearTimeout(removeTimer);
    };
  }, [onAnimationComplete]);

  if (shouldRemove) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-zinc-950 z-100 pointer-events-none transition-opacity duration-1000 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="text-center">
        <h1 
          className="text-5xl md:text-7xl font-bold flex flex-wrap justify-center gap-4"
          style={{ fontFamily: 'var(--font-gued)' }}
        >
          {words.map((word, index) => (
            <span
              key={word}
              className={`transition-all duration-700 ease-out ${
                index < visibleWordCount 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              } ${
                fadeWordsYellow 
                  ? 'text-yellow-400 opacity-0 -translate-y-4' 
                  : 'text-zinc-100'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {word}
            </span>
          ))}
        </h1>
        <p 
          className={`text-xl md:text-2xl text-zinc-400 mt-8 transition-all duration-1000 ease-out ${
            showName ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontFamily: 'var(--font-vlorentine)' }}
        >
          Fofie Jounewe Joel Freude
        </p>
      </div>
    </div>
  );
}

export function PageLabelAnimation({ label, onAnimationComplete }: { label: string; onAnimationComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleLetterCount, setVisibleLetterCount] = useState(0);
  const [exitingLetterIndex, setExitingLetterIndex] = useState(999);

  useEffect(() => {
    setIsVisible(true);
    setExitingLetterIndex(999);
    
    // Show letters one by one
    const letterInterval = setInterval(() => {
      setVisibleLetterCount((prev) => {
        if (prev < label.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 100);

    // Hide letters one by one in reverse order after all are visible and a pause
    const exitTimer = setTimeout(() => {
      setExitingLetterIndex(label.length);
      const exitInterval = setInterval(() => {
        setExitingLetterIndex((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          return prev;
        });
      }, 100);

      // Remove animation after exit completes
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
        onAnimationComplete();
      }, label.length * 100 + 500);

      return () => {
        clearInterval(exitInterval);
        clearTimeout(removeTimer);
      };
    }, label.length * 100 + 500);

    return () => {
      clearInterval(letterInterval);
      clearTimeout(exitTimer);
    };
  }, [label, onAnimationComplete]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-zinc-950 z-50 pointer-events-none ${
      isVisible ? '' : 'hidden'
    }`}>
      <h1 
        className="text-7xl md:text-9xl font-bold text-zinc-100"
        style={{ fontFamily: 'var(--font-gued)' }}
      >
        {label.split('').map((letter, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-300 ease-out ${
              index < visibleLetterCount && index < exitingLetterIndex
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-8'
            }`}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </h1>
    </div>
  );
}
