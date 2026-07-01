"use client";

import { useState, useEffect } from "react";

/**
 * Returns a function `getDelay(index?)` where:
 * - On page reload  → base = 0.5,  each index adds 0.5  (0.5, 1.0, 1.5 …)
 * - After a route transition → base = 3.5, each index adds 0.5  (3.5, 4.0, 4.5 …)
 */
export function useAnimationDelay() {
  const [base, setBase] = useState(0);

  useEffect(() => {
    const isRouteChange = sessionStorage.getItem("pageTransitionActive");
    if (isRouteChange === "true") {
      setBase(0.8);
      sessionStorage.removeItem("pageTransitionActive");
    }
  }, []);

  const getDelay = (index = 0) => base + index * 0.3;

  return getDelay;
}
