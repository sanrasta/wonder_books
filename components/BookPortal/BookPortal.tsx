"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function BookPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const rightPagesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  // Flipping page refs
  const page1Ref = useRef<HTMLDivElement>(null); // front=5, back=10
  const page2Ref = useRef<HTMLDivElement>(null); // front=11, back=18
  const page3Ref = useRef<HTMLDivElement>(null); // front=19, back=2
  const coverBackRef = useRef<HTMLDivElement>(null); // Cover's back (4.png)
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (!containerRef.current || !bookRef.current || !titleRef.current || !scrollIndicatorRef.current) return;

    const isMobile = window.innerWidth < 768;
    const bookXStart = isMobile ? 0 : 0;
    const bookXOpen = isMobile ? -10 : 175;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(bookRef.current, { transformStyle: "preserve-3d", transformOrigin: "50% 50%", xPercent: -50, left: "50%", opacity: 1 });
      gsap.set(coverRef.current, { rotateY: 0, transformStyle: "preserve-3d" });
      gsap.set(ctaRef.current, { opacity: 0, y: 30, pointerEvents: "none" });
      
      // Right pages start hidden
      if (rightPagesRef.current) {
        gsap.set(rightPagesRef.current, { opacity: 0 });
      }
      
      // Flipping pages start at rotateY: 0
      if (!isMobile && page1Ref.current && page2Ref.current && page3Ref.current) {
        gsap.set(page1Ref.current, { rotateY: 0, transformStyle: "preserve-3d" });
        gsap.set(page2Ref.current, { rotateY: 0, transformStyle: "preserve-3d" });
        gsap.set(page3Ref.current, { rotateY: 0, transformStyle: "preserve-3d" });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: 1,
        },
      });

      if (isMobile) {
        // ===== MOBILE: Simple cover zoom =====
        gsap.set(bookRef.current, { y: 100, scale: 0.8, opacity: 0 });
        
        tl.to(bookRef.current, { y: 0, scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" });
        tl.to(titleRef.current, { opacity: 0, y: -50, duration: 0.1, ease: "power2.in" }, 0.2);
        tl.to(scrollIndicatorRef.current, { opacity: 0, y: 50, duration: 0.1, ease: "power2.in" }, 0.2);
        tl.to(bookRef.current, { scale: 12, x: -400, y: -100, duration: 0.5, ease: "power2.inOut" }, 0.3);
        tl.to(".starry-bg", { opacity: 0, duration: 0.05 }, 0.45);
        tl.to(bookRef.current, { filter: "blur(12px)", duration: 0.15, ease: "power2.inOut" }, 0.50);
        
        if (ctaRef.current) {
          tl.fromTo(ctaRef.current,
            { y: 50, opacity: 0, pointerEvents: "none" },
            { y: 0, opacity: 1, pointerEvents: "auto", duration: 0.15, ease: "back.out(1.7)" },
            0.60
          );
        }

      } else {
        // ===== DESKTOP: Book opens, pages flip, then zooms =====
        
        // Phase 1: Book floats up (0-15%)
        tl.fromTo(bookRef.current,
          { y: 100, scale: 0.7, opacity: 0, x: bookXStart },
          { y: 0, scale: 1, opacity: 1, x: bookXStart, duration: 0.15, ease: "power2.out" }
        );

        // Phase 2: Cover opens (15-35%)
        tl.to(coverRef.current, { rotateY: -160, duration: 0.2, ease: "power2.inOut" }, 0.15);
        
        // Right pages fade in as cover opens
        if (rightPagesRef.current) {
          tl.to(rightPagesRef.current, { opacity: 1, duration: 0.15, ease: "power2.out" }, 0.18);
        }
        
        // Shift book to center
        tl.to(bookRef.current, { x: bookXOpen, duration: 0.2, ease: "power2.inOut" }, 0.15);
        
        // Fade title/indicator
        tl.to(titleRef.current, { opacity: 0, y: -50, duration: 0.05, ease: "power2.in" }, 0.30);
        tl.to(scrollIndicatorRef.current, { opacity: 0, y: 50, duration: 0.05, ease: "power2.in" }, 0.30);

        // Phase 3: Page flips - pages rotate and their backs show the new left page
        
        // Flip 1: 5 rotates to show 10 on back (38-48%)
        tl.to(page1Ref.current, { rotateY: -180, duration: 0.1, ease: "power2.inOut" }, 0.38);
        // Fade cover back when flip is ~50% done (page is covering it)
        if (coverBackRef.current) {
          tl.to(coverBackRef.current, { opacity: 0, duration: 0.02 }, 0.43);
        }
        // Lower page1's z-index after flip ends
        tl.to(page1Ref.current, { zIndex: 5, duration: 0.001 }, 0.49);

        // Flip 2: 11 rotates to show 18 on back (50-60%)
        tl.to(page2Ref.current, { rotateY: -180, duration: 0.1, ease: "power2.inOut" }, 0.50);
        // Lower page2's z-index so page3's back can show on top
        tl.to(page2Ref.current, { zIndex: 6, duration: 0.01 }, 0.61);

        // Flip 3: 19 rotates to show 2 on back (62-72%)
        tl.to(page3Ref.current, { rotateY: -180, duration: 0.1, ease: "power2.inOut" }, 0.62);

        // Phase 4: Zoom into final spread 2|3 (74-90%)
        tl.to(bookRef.current, 
          { scale: 8, x: 0, y: -50, transformOrigin: "0% 50%", duration: 0.16, ease: "power2.inOut" }, 
          0.74
        );
        
        tl.to(".starry-bg", { opacity: 0, duration: 0.05 }, 0.78);
        tl.to(bookRef.current, { filter: "blur(12px)", duration: 0.1, ease: "power2.inOut" }, 0.80);
        
        if (ctaRef.current) {
          tl.fromTo(ctaRef.current,
            { y: 50, opacity: 0, pointerEvents: "none" },
            { y: 0, opacity: 1, pointerEvents: "auto", duration: 0.1, ease: "back.out(1.7)" },
            0.88
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  return (
    <div className="relative bg-indigo-950 isolate z-20">
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

            {/* The Book */}
            <div
              ref={bookRef}
              className="book-exterior relative flex"
              style={{ transformStyle: "preserve-3d" }}
            >

              {/* ========== RIGHT PAGES STACK ========== */}
              <div 
                ref={rightPagesRef}
                className="hidden md:block relative w-[400px] h-[400px] opacity-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Bottom: Final right page - 3.png */}
                <div className="absolute inset-0 z-[1] rounded-r-2xl overflow-hidden shadow-xl">
                  <Image src="/Sura (20 x 20 cm)/3.png" alt="Page 3" fill className="object-cover" />
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/20 to-transparent" />
                </div>

                {/* Page 3: front=19, back=2 - z-[12] higher than cover */}
                <div 
                  ref={page3Ref}
                  className="absolute inset-0 z-[12] origin-left"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div 
                    className="absolute inset-0 rounded-r-2xl overflow-hidden shadow-xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Image src="/Sura (20 x 20 cm)/19.png" alt="Page 19" fill className="object-cover" />
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/20 to-transparent" />
                  </div>
                  <div 
                    className="absolute inset-0 rounded-l-2xl overflow-hidden shadow-xl"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <Image src="/Sura (20 x 20 cm)/2.png" alt="Page 2" fill className="object-cover" />
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-black/20 to-transparent" />
                  </div>
                </div>

                {/* Page 2: front=11, back=18 - z-[13] */}
                <div 
                  ref={page2Ref}
                  className="absolute inset-0 z-[13] origin-left"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div 
                    className="absolute inset-0 rounded-r-2xl overflow-hidden shadow-xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Image src="/Sura (20 x 20 cm)/11.png" alt="Page 11" fill className="object-cover" />
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/20 to-transparent" />
                  </div>
                  <div 
                    className="absolute inset-0 rounded-l-2xl overflow-hidden shadow-xl"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <Image src="/Sura (20 x 20 cm)/18.png" alt="Page 18" fill className="object-cover" />
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-black/20 to-transparent" />
                  </div>
                </div>

                {/* Page 1: front=5, back=10 - z-[14] highest flipping page */}
                <div 
                  ref={page1Ref}
                  className="absolute inset-0 z-[14] origin-left"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div 
                    className="absolute inset-0 rounded-r-2xl overflow-hidden shadow-xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Image src="/Sura (20 x 20 cm)/5.png" alt="Page 5" fill className="object-cover" />
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/20 to-transparent" />
                  </div>
                  <div 
                    className="absolute inset-0 rounded-l-2xl overflow-hidden shadow-xl"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <Image src="/Sura (20 x 20 cm)/10.png" alt="Page 10" fill className="object-cover" />
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-black/20 to-transparent" />
                  </div>
                </div>
              </div>

              {/* ========== BOOK COVER ========== */}
              <div
                ref={coverRef}
                className="relative md:absolute md:top-0 md:left-0 w-[280px] md:w-[400px] h-[280px] md:h-[400px] origin-left z-[10]"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* FRONT of cover */}
                <div 
                  className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src="/Sura (20 x 20 cm)/1.png.jpeg"
                    alt="Book Cover"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute left-0 top-0 bottom-0 w-3 md:w-4 bg-gradient-to-r from-black/30 to-transparent rounded-l-lg" />
                </div>
                
                {/* BACK of cover - 4.png */}
                <div 
                  ref={coverBackRef}
                  className="absolute inset-0 rounded-2xl hidden md:block overflow-hidden"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <Image
                    src="/Sura (20 x 20 cm)/4.png"
                    alt="Page 4"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-black/20 to-transparent" />
                </div>
              </div>

              {/* Book Spine */}
              <div 
                className="absolute left-0 top-0 h-[400px] w-6 bg-gradient-to-b from-indigo-700 via-purple-700 to-indigo-800 shadow-xl z-[9] hidden md:block"
                style={{ transform: "translateX(-12px) rotateY(90deg)", transformOrigin: "right" }}
              />
            </div>

          </div>
        </div>

        {/* CTA Button */}
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
