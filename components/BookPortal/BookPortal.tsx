"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function BookPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const spreadRef = useRef<HTMLDivElement>(null); // Two-page spread
  const ctaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Mount check for animations
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Wait for portal to mount before setting up animations
    if (!isMounted) return;
    
    // Make sure all required refs are connected
    if (!containerRef.current || !bookRef.current || !titleRef.current || !scrollIndicatorRef.current) return;

    // Detect mobile for responsive positioning and zoom
    const isMobile = window.innerWidth < 768;
    // On mobile (0.6x base scale), need ~10x zoom to fill screen completely
    // On desktop (1x base scale), need ~5x zoom
    const zoomScale = isMobile ? 10 : 5;
    // Book X offset - smaller on mobile to keep it visible
    // Keep neutral so zoom stays centered; we'll center during zoom
    const bookXStart = isMobile ? 0 : 0;
    const bookXOpen = isMobile ? -10 : -10;

    const ctx = gsap.context(() => {
      // The hero-deck is now sticky via CSS, and BookPortal has higher z-index
      // so it naturally covers the hero as you scroll - no GSAP animation needed for deck effect

      // Ensure consistent starting states before timelines run
      gsap.set(bookRef.current, { transformStyle: "preserve-3d", transformOrigin: "50% 50%", xPercent: -50, left: "50%", opacity: 1 });
      gsap.set(coverRef.current, { rotateY: 0 });
      gsap.set(spreadRef.current, { opacity: 0 });
      gsap.set(ctaRef.current, { opacity: 0, y: 30, pointerEvents: "none" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
          // markers: true, // Uncomment for debugging
        },
      });

      if (isMobile) {
        // ===== MOBILE: Book zooms and BECOMES the background =====
        gsap.set(bookRef.current, { y: 100, scale: 0.8, opacity: 0 });
        
        // Phase 1: Book floats up (0-20%)
        tl.to(
          bookRef.current,
          { y: 0, scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" }
        );

        // Phase 2: Fade title/indicator (20-30%)
        tl.to(
          titleRef.current,
          { opacity: 0, y: -50, duration: 0.1, ease: "power2.in" },
          0.2
        );
        tl.to(
          scrollIndicatorRef.current,
          { opacity: 0, y: 50, duration: 0.1, ease: "power2.in" },
          0.2
        );
        
        // Phase 3: Book zooms HUGE - shifted left to show the page filling screen (30-80%)
        // The book stays visible - it becomes the background
        tl.to(
          bookRef.current,
          { scale: 12, x: -400, y: -100, duration: 0.5, ease: "power2.inOut" },
          0.3
        );
        
        // Fade out just the purple starry background (70-80%)
        tl.to(
          ".starry-bg",
          { opacity: 0, duration: 0.1 },
          0.7
        );
        
        // CTA appears on top of the zoomed book (80-100%)
        if (ctaRef.current) {
          tl.fromTo(
            ctaRef.current,
            { y: 50, opacity: 0, pointerEvents: "none" },
            { y: 0, opacity: 1, pointerEvents: "auto", duration: 0.15, ease: "back.out(1.7)" },
            0.8
          );
        }

      } else {
        // ===== DESKTOP: Book opens, zooms, and BECOMES the background =====
        // Phase 1: Book floats up (0-15%)
        tl.fromTo(
          bookRef.current,
          { y: 100, scale: 0.7, opacity: 0, x: bookXStart },
          { y: 0, scale: 1, opacity: 1, x: bookXStart, duration: 0.15, ease: "power2.out" }
        );

        // Phase 2: Book cover opens (15-35%)
        if (coverRef.current) {
          tl.to(
            coverRef.current,
            { rotateY: -160, duration: 0.2, ease: "power2.inOut" },
            0.15
          );
        }
        
        // Right page fades in as cover opens
        if (spreadRef.current) {
          tl.to(
            spreadRef.current,
            { opacity: 1, duration: 0.15, ease: "power2.out" },
            0.18
          );
        }
        
        // Shift book to center
        tl.to(
          bookRef.current,
          { x: bookXOpen, duration: 0.2, ease: "power2.inOut" },
          0.15
        );

        // Phase 3: Fade title/indicator (35-45%)
        tl.to(
          titleRef.current,
          { opacity: 0, y: -50, duration: 0.1, ease: "power2.in" },
          0.35
        );
        tl.to(
          scrollIndicatorRef.current,
          { opacity: 0, y: 50, duration: 0.1, ease: "power2.in" },
          0.35
        );

        // Phase 4: Book zooms HUGE - shifted left so right page fills screen (40-80%)
        // The book stays visible - the amber page becomes the full background
        tl.to(
          bookRef.current,
          { scale: 8, x: -500, y: -150, duration: 0.4, ease: "power2.inOut" },
          0.4
        );
        
        // Fade out just the purple starry background (70-80%)
        tl.to(
          ".starry-bg",
          { opacity: 0, duration: 0.1 },
          0.7
        );
        
        // CTA appears on top of the zoomed book (80-100%)
        if (ctaRef.current) {
          tl.fromTo(
            ctaRef.current,
            { y: 50, opacity: 0, pointerEvents: "none" },
            { y: 0, opacity: 1, pointerEvents: "auto", duration: 0.15, ease: "back.out(1.7)" },
            0.8
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  return (
    <div className="relative bg-indigo-950 isolate z-20">
      {/* Extended background wrapper to prevent white gap */}
      <div className="absolute inset-0 h-[calc(100vh+200px)] bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 pointer-events-none" />
      
      <section
        ref={containerRef}
        className="h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 relative overflow-hidden isolate z-20"
      >
        {/* Starry background */}
        <div className="starry-bg absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${i * 0.1}s`,
              opacity: 0.3 + (i % 5) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Section Title */}
      <div ref={titleRef} className="absolute top-8 left-0 right-0 text-center z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
          Step Into Your Story
        </h2>
        <p className="text-indigo-200 text-lg">Scroll to see the magic happen</p>
      </div>

      {/* Main Content Container */}
      <div className="absolute inset-0 flex items-center justify-center perspective-[1500px]">
        <div className="scaling-wrapper md:scale-100 origin-center">

        {/* The Book - Container that shifts left as book opens to stay centered */}
        <div
          ref={bookRef}
          className="book-exterior relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ===== RIGHT PAGE (Behind cover) - DESKTOP ONLY ===== */}
          <div className="hidden md:flex z-5">
            {/* RIGHT PAGE (Hero character) */}
            <div 
              ref={spreadRef}
              className="w-[350px] h-[480px] bg-gradient-to-br from-amber-100 to-orange-50 relative overflow-hidden rounded-2xl shadow-xl opacity-0"
            >
              {/* Spine shadow on left edge */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-amber-300/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-6xl mb-4 ring-4 ring-amber-200 shadow-lg">
                  🦸
                </div>
                <p className="text-indigo-900 font-bold text-xl mb-2">You, as the hero!</p>
                <p className="text-indigo-700 text-sm text-center">Your face, your adventure,<br/>your unforgettable story.</p>
                <div className="mt-4 space-y-2 w-full px-4 opacity-30">
                  <div className="h-2 bg-indigo-200 rounded-full w-full" />
                  <div className="h-2 bg-indigo-200 rounded-full w-4/5" />
                  <div className="h-2 bg-indigo-200 rounded-full w-3/5" />
                </div>
              </div>
            </div>
          </div>

          {/* ===== BOOK COVER ===== */}
          {/* On mobile: static cover that zooms. On desktop: opens with 3D rotation */}
          <div
            ref={coverRef}
            className="relative md:absolute md:top-0 md:left-0 w-[280px] md:w-[350px] h-[380px] md:h-[480px] origin-left z-30"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* FRONT of cover */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 md:p-8"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="text-5xl md:text-7xl mb-3 md:mb-4">📚</div>
              <h3 className="text-white text-lg md:text-2xl font-bold text-center mb-2">
                Your Magical<br/>Adventure
              </h3>
              <div className="w-12 md:w-16 h-1 bg-amber-400 rounded-full mb-3 md:mb-4" />
              <p className="text-indigo-200 text-xs md:text-sm">A Personalized Story</p>
              <div className="absolute top-3 md:top-4 right-3 md:right-4 text-xl md:text-2xl">⭐</div>
              <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-xl md:text-2xl">🌙</div>
              {/* Spine edge */}
              <div className="absolute left-0 top-0 bottom-0 w-3 md:w-4 bg-gradient-to-r from-indigo-900 to-transparent rounded-l-lg" />
            </div>
            
            {/* BACK of cover = FIRST PAGE (revealed when cover opens) - DESKTOP ONLY */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl hidden md:block"
              style={{ 
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {/* First page content - "Once upon a time..." */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="w-full h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-7xl">🏰</span>
                </div>
                <p className="text-indigo-800 font-bold text-center text-base">
                  Once upon a time...
                </p>
                <div className="mt-4 space-y-2 w-full px-4 opacity-40">
                  <div className="h-2 bg-indigo-200 rounded-full w-full" />
                  <div className="h-2 bg-indigo-200 rounded-full w-4/5" />
                  <div className="h-2 bg-indigo-200 rounded-full w-5/6" />
                </div>
              </div>
              {/* Spine edge on left */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-amber-300/50 to-transparent" />
            </div>
          </div>

          {/* Book Spine (3D depth) - DESKTOP ONLY */}
          <div 
            className="absolute left-0 top-0 h-[480px] w-6 bg-gradient-to-b from-indigo-700 via-purple-700 to-indigo-800 shadow-xl z-20 hidden md:block"
            style={{ transform: "translateX(-12px) rotateY(90deg)", transformOrigin: "right" }}
          />
        </div>

        </div>{/* End scaling wrapper */}
      </div>

      {/* CTA Button - positioned on top of zoomed book */}
      <div
        ref={ctaRef}
        className="absolute inset-0 flex items-center justify-center z-50 opacity-0 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-6">
          <p className="text-indigo-800 text-lg md:text-xl font-serif text-center px-8 drop-shadow-lg">
            Your story awaits...
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold rounded-full shadow-2xl shadow-indigo-500/40 text-lg md:text-2xl flex items-center gap-3 hover:shadow-indigo-500/60 transition-shadow pointer-events-auto"
          >
            <span className="text-xl md:text-2xl">✨</span>
            Write Your Own Adventure
            <span className="text-xl md:text-2xl">✨</span>
          </motion.button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm flex flex-col items-center gap-2">
        <span>Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
      </section>
    </div>
  );
}
