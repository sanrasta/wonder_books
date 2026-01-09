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
  const photoRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGPathElement>(null);
  const interiorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    const ctx = gsap.context(() => {
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

      // Phase 1: Book floats up and scales in (0-15%)
      // Start shifted right to center the closed book (cover hides left page)
      tl.fromTo(
        bookRef.current,
        { y: 100, scale: 0.7, opacity: 0, x: 140 },
        { y: 0, scale: 1, opacity: 1, x: 140, duration: 0.15, ease: "power2.out" }
      );

      // Phase 2: Book cover opens (15-40%)
      tl.to(
        coverRef.current,
        { rotateY: -160, duration: 0.25, ease: "power2.inOut" },
        0.15
      );
      
      // Right page fades in as cover opens (no sliding!)
      tl.to(
        spreadRef.current,
        { opacity: 1, duration: 0.2, ease: "power2.out" },
        0.2
      );
      
      // Shift book left as cover opens (center the spine)
      tl.to(
        bookRef.current,
        { x: -140, duration: 0.25, ease: "power2.inOut" },
        0.15
      );

      // Phase 3: Photo floats in from the left (40-50%)
      tl.fromTo(
        photoRef.current,
        { x: -200, opacity: 0, scale: 0.5, rotate: -15 },
        { x: 0, opacity: 1, scale: 1, rotate: 0, duration: 0.1, ease: "back.out(1.7)" },
        0.4
      );

      // Phase 4: Arrow draws itself with loops (50-70%)
      tl.fromTo(
        arrowRef.current,
        { strokeDashoffset: 1200 },
        { strokeDashoffset: 0, duration: 0.2, ease: "power1.inOut" },
        0.5
      );

      // Phase 5: Zoom into the book (70-85%)
      tl.to(
        bookRef.current,
        { scale: 2.5, y: -100, duration: 0.15, ease: "power2.in" },
        0.7
      );

      // Fade out photo and arrow during zoom
      tl.to(
        [photoRef.current, ".arrow-container"],
        { opacity: 0, duration: 0.1 },
        0.7
      );

      // Phase 6: Fade to interior world (85-90%)
      tl.to(
        ".book-exterior",
        { opacity: 0, duration: 0.05 },
        0.85
      );
      tl.fromTo(
        interiorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.05 },
        0.85
      );

      // Phase 7: CTA button appears (90-100%)
      tl.fromTo(
        ctaRef.current,
        { y: 50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.1, ease: "back.out(1.7)" },
        0.9
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile: Simplified non-scroll version
  if (isMobile) {
    return (
      <section className="py-16 bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 overflow-hidden">
        <div className="max-w-md mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            Step Into Your Story
          </h2>
          
          {/* Simple book display */}
          <div className="relative mb-8">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute -top-4 -left-2 w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden z-20"
            >
              <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center text-3xl">
                👤
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute top-8 left-16 text-4xl z-10"
            >
              ✨➡️
            </motion.div>

            {/* Open Book - Two Page Spread */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex">
                {/* Left page - Story/Scene */}
                <div className="w-1/2 aspect-[3/4] bg-gradient-to-br from-amber-50 to-amber-100 p-3 flex flex-col items-center justify-center relative">
                  {/* Illustration placeholder */}
                  <div className="w-full h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-3xl">🏰</span>
                  </div>
                  <p className="text-[10px] text-indigo-800 font-medium text-center">Once upon a time...</p>
                  {/* Page edge */}
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-black/10 to-transparent" />
                </div>
                
                {/* Center binding */}
                <div className="w-1 bg-amber-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5" />
                </div>
                
                {/* Right page with character */}
                <div className="w-1/2 aspect-[3/4] bg-gradient-to-br from-amber-100 to-orange-50 p-3 flex flex-col items-center justify-center relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-2xl mb-2 ring-2 ring-amber-200">
                    🦸
                  </div>
                  <p className="text-[10px] text-indigo-900 font-medium">You, as the hero!</p>
                  {/* Connection indicator */}
                  <div className="absolute top-2 left-2 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[8px] animate-pulse">
                    ✨
                  </div>
                  {/* Page edge */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/10 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-full shadow-lg shadow-orange-500/30 text-lg"
          >
            ✨ Write Your Own Adventure
          </motion.button>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 overflow-hidden relative"
    >
      {/* Starry background */}
      <div className="absolute inset-0 overflow-hidden">
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
      <div className="absolute top-8 left-0 right-0 text-center z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
          Step Into Your Story
        </h2>
        <p className="text-indigo-200 text-lg">Scroll to see the magic happen</p>
      </div>

      {/* Main Content Container */}
      <div className="absolute inset-0 flex items-center justify-center perspective-[1500px]">
        
        {/* Floating Photo (User's Image) */}
        <div
          ref={photoRef}
          className="absolute top-1/4 left-[15%] z-30 opacity-0"
        >
          <div className="relative">
            {/* Photo frame */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-amber-200 to-amber-400">
              {/* Placeholder person */}
              <div className="w-full h-full flex items-center justify-center text-6xl">
                👤
              </div>
            </div>
            {/* "You" label */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-lg">
              <span className="text-indigo-900 font-bold text-sm">You!</span>
            </div>
            {/* Sparkle */}
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
          </div>
        </div>

        {/* Animated Arrow - adjusted for wider two-page book */}
        <svg
          className="arrow-container absolute top-1/4 left-[12%] w-[400px] h-[250px] z-20 pointer-events-none"
          viewBox="0 0 400 250"
          fill="none"
        >
          {/* Whimsical looping arrow path - longer to reach right page */}
          <path
            ref={arrowRef}
            d="M 30 80 C 80 40, 120 100, 150 60 C 180 20, 220 80, 200 110 C 180 140, 230 180, 290 130 C 350 80, 380 150, 360 180 L 380 170 M 360 180 L 350 160"
            stroke="url(#arrowGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1200"
            strokeDashoffset="1200"
            className="drop-shadow-lg"
          />
          {/* Sparkles along the path */}
          <circle cx="150" cy="60" r="5" fill="#fbbf24" className="animate-pulse" />
          <circle cx="200" cy="110" r="4" fill="#f472b6" className="animate-pulse" style={{ animationDelay: "0.2s" }} />
          <circle cx="290" cy="130" r="5" fill="#818cf8" className="animate-pulse" style={{ animationDelay: "0.4s" }} />
          <circle cx="360" cy="180" r="4" fill="#a855f7" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
          
          <defs>
            <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="33%" stopColor="#f472b6" />
              <stop offset="66%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* The Book - Container that shifts left as book opens to stay centered */}
        <div
          ref={bookRef}
          className="book-exterior relative opacity-0 flex"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ===== RIGHT PAGE (Behind cover) ===== */}
          <div className="flex z-5">
            {/* RIGHT PAGE (Hero character - arrow points here) */}
            <div 
              ref={spreadRef}
              className="w-[280px] md:w-[350px] h-[380px] md:h-[480px] bg-gradient-to-br from-amber-100 to-orange-50 relative overflow-hidden rounded-r-lg shadow-xl opacity-0"
            >
              {/* Spine shadow on left edge */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-amber-300/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-5xl md:text-6xl mb-4 ring-4 ring-amber-200 shadow-lg">
                  🦸
                </div>
                <p className="text-indigo-900 font-bold text-lg md:text-xl mb-2">You, as the hero!</p>
                <p className="text-indigo-700 text-sm text-center">Your face, your adventure,<br/>your unforgettable story.</p>
                <div className="mt-4 space-y-2 w-full px-4 opacity-30">
                  <div className="h-2 bg-indigo-200 rounded-full w-full" />
                  <div className="h-2 bg-indigo-200 rounded-full w-4/5" />
                  <div className="h-2 bg-indigo-200 rounded-full w-3/5" />
                </div>
              </div>
              {/* Arrow target indicator */}
              <div className="absolute top-8 left-8 w-8 h-8 bg-yellow-400/50 rounded-full animate-ping" />
              <div className="absolute top-8 left-8 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm">✨</div>
            </div>
          </div>

          {/* ===== BOOK COVER (Rotates open from left spine, covers the spread initially) ===== */}
          <div
            ref={coverRef}
            className="absolute top-0 left-0 w-[280px] md:w-[350px] h-[380px] md:h-[480px] origin-left z-30"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* FRONT of cover */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-lg shadow-2xl flex flex-col items-center justify-center p-8"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="text-6xl md:text-7xl mb-4">📚</div>
              <h3 className="text-white text-xl md:text-2xl font-bold text-center mb-2">
                Your Magical<br/>Adventure
              </h3>
              <div className="w-16 h-1 bg-amber-400 rounded-full mb-4" />
              <p className="text-indigo-200 text-sm">A Personalized Story</p>
              <div className="absolute top-4 right-4 text-2xl">⭐</div>
              <div className="absolute bottom-4 left-4 text-2xl">🌙</div>
              {/* Spine edge */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-indigo-900 to-transparent rounded-l-lg" />
            </div>
            
            {/* BACK of cover = FIRST PAGE (revealed when cover opens) */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 rounded-r-lg overflow-hidden"
              style={{ 
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {/* First page content - "Once upon a time..." */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="w-full h-48 md:h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-6xl md:text-7xl">🏰</span>
                </div>
                <p className="text-indigo-800 font-bold text-center text-sm md:text-base">
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

          {/* Book Spine (3D depth) */}
          <div 
            className="absolute left-0 top-0 h-[380px] md:h-[480px] w-6 bg-gradient-to-b from-indigo-700 via-purple-700 to-indigo-800 shadow-xl z-20"
            style={{ transform: "translateX(-12px) rotateY(90deg)", transformOrigin: "right" }}
          />
        </div>

        {/* Interior World (revealed after zoom) */}
        <div
          ref={interiorRef}
          className="absolute inset-0 opacity-0 flex items-center justify-center pointer-events-none"
        >
          {/* Magical interior gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200" />
          
          {/* Floating magical elements */}
          <div className="absolute top-1/4 left-1/4 text-6xl animate-float">📖</div>
          <div className="absolute top-1/3 right-1/4 text-5xl animate-float" style={{ animationDelay: "0.5s" }}>✨</div>
          <div className="absolute bottom-1/3 left-1/3 text-4xl animate-float" style={{ animationDelay: "1s" }}>🌟</div>
          <div className="absolute bottom-1/4 right-1/3 text-5xl animate-float" style={{ animationDelay: "1.5s" }}>🎭</div>
          
          {/* Central message */}
          <div className="relative z-10 text-center">
            <h3 className="text-4xl md:text-6xl font-bold text-indigo-900 mb-4">
              You&apos;re Inside!
            </h3>
            <p className="text-xl md:text-2xl text-indigo-700">
              Now create your own adventure...
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div
          ref={ctaRef}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-0 z-40"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white font-bold rounded-full shadow-2xl shadow-orange-500/40 text-xl md:text-2xl flex items-center gap-3 hover:shadow-orange-500/60 transition-shadow"
          >
            <span className="text-2xl">✨</span>
            Write Your Own Adventure
            <span className="text-2xl">✨</span>
          </motion.button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm flex flex-col items-center gap-2">
        <span>Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
