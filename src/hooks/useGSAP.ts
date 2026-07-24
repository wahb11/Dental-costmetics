"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = (
  callback: (context: gsap.Context) => void,
  deps: any[] = []
) => {
  const contextRef = useRef<gsap.Context>();

  useEffect(() => {
    contextRef.current = gsap.context(() => {
      callback(contextRef.current!);
    });

    return () => {
      contextRef.current?.revert();
    };
  }, deps);

  return contextRef;
};
