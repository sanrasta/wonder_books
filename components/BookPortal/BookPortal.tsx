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
  
  // Photo transformation refs
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const sparkleTrailRef = useRef<HTMLDivElement>(null);
  
  const [isMounted, setIsMounted] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setScreenWidth(window.innerWidth);
    
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMounted || screenWidth === 0) return;
    if (!containerRef.current || !bookRef.current || !titleRef.current || !scrollIndicatorRef.current) return;

    const isMobile = screenWidth < 768;
    
    // Helper function to interpolate values based on screen width
    const lerp = (minWidth: number, maxWidth: number, minVal: number, maxVal: number) => {
      const clampedWidth = Math.max(minWidth, Math.min(maxWidth, screenWidth));
      const t = (clampedWidth - minWidth) / (maxWidth - minWidth);
      return minVal + t * (maxVal - minVal);
    };
    
    // Calculate responsive values
    // Mobile: 320px - 767px | Desktop: 768px - 1920px+
    const bookScale = isMobile 
      ? lerp(320, 767, 0.66, 0.91)    // Mobile: 0.66 to 0.91 (+20% bigger total)
      : lerp(768, 1920, 0.85, 1);     // Desktop: 0.85 to 1
    
    const bookXOpen = isMobile
      ? lerp(320, 767, 90, 130)       // Mobile: 90 to 130 (shifted right)
      : lerp(768, 1920, 140, 200);    // Desktop: 140 to 200
    
    const zoomScale = isMobile
      ? lerp(320, 767, 14, 10)        // Mobile: 14x to 10x (smaller screens need more zoom)
      : lerp(768, 1920, 10, 6);       // Desktop: 10x to 6x
    
    const scrollEnd = isMobile
      ? lerp(320, 767, 250, 350)      // Mobile: shorter scroll
      : lerp(768, 1920, 500, 700);    // Desktop: longer scroll
    
    // Photo circle - stays in place, then drops down before CTA
    const photoDropY = isMobile
      ? lerp(320, 767, 180, 250)      // Mobile: drop position (good)
      : lerp(768, 1920, 120, 180);    // Desktop: drop position (reduced ~100px more)
    
    const photoFinalScale = isMobile
      ? lerp(320, 767, 1.2, 1.4)      // Mobile: scale up slightly
      : lerp(768, 1920, 1.3, 1.6);    // Desktop: scale up slightly
    
    const bookXStart = 0;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(bookRef.current, { transformStyle: "preserve-3d", transformOrigin: "50% 50%", xPercent: -50, left: "50%", opacity: 1 });
      gsap.set(coverRef.current, { rotateY: 0, transformStyle: "preserve-3d" });
      gsap.set(ctaRef.current, { opacity: 0, y: 30, pointerEvents: "none" });
      
      // Right pages start hidden
      if (rightPagesRef.current) {
        gsap.set(rightPagesRef.current, { opacity: 0 });
      }
      
      // Flipping pages start at rotateY: 0 (both mobile and desktop)
      if (page1Ref.current && page2Ref.current && page3Ref.current) {
        gsap.set(page1Ref.current, { rotateY: 0, transformStyle: "preserve-3d" });
        gsap.set(page2Ref.current, { rotateY: 0, transformStyle: "preserve-3d" });
        gsap.set(page3Ref.current, { rotateY: 0, transformStyle: "preserve-3d" });
      }
      
      // Cover back starts hidden on mobile
      if (isMobile && coverBackRef.current) {
        gsap.set(coverBackRef.current, { opacity: 1 });
      }
      
      // Photo container starts hidden and centered
      if (photoContainerRef.current) {
        gsap.set(photoContainerRef.current, { 
          opacity: 0, 
          scale: 0.5, 
          y: 0,
          x: 0,
          xPercent: -50 // Center the element on its position
        });
      }
      if (sparkleTrailRef.current) {
        gsap.set(sparkleTrailRef.current, { opacity: 0, scale: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollEnd}%`,
          pin: true,
          scrub: 1,
        },
      });

      if (isMobile) {
        // ===== MOBILE: Book opens, fast page flips, then zooms =====
        gsap.set(bookRef.current, { y: 100, scale: bookScale, opacity: 0, x: 0 });
        
        // Phase 1: Book floats up (0-10%)
        tl.to(bookRef.current, { y: 0, scale: bookScale, opacity: 1, x: 0, duration: 0.1, ease: "power2.out" });
        
        // Phase 2: Cover opens fast (10-20%)
        tl.to(coverRef.current, { rotateY: -160, duration: 0.1, ease: "power2.inOut" }, 0.10);
        if (rightPagesRef.current) {
          tl.to(rightPagesRef.current, { opacity: 1, duration: 0.05, ease: "power2.out" }, 0.12);
        }
        tl.to(bookRef.current, { x: bookXOpen, duration: 0.1, ease: "power2.inOut" }, 0.10);
        
        // Fade title/indicator - photo appears at same time
        tl.to(titleRef.current, { opacity: 0, y: -50, duration: 0.05, ease: "power2.in" }, 0.18);
        tl.to(scrollIndicatorRef.current, { opacity: 0, y: 50, duration: 0.05, ease: "power2.in" }, 0.18);
        
        // Photo appears when title fades, stays in place pulsing
        if (photoContainerRef.current) {
          // Appear at title fade
          tl.to(photoContainerRef.current, { 
            opacity: 1, scale: 1, y: 0, duration: 0.05, ease: "back.out(1.7)" 
          }, 0.18);
          
          // Stay in place (just pulsing via CSS) until after blur, then drop down
          tl.to(photoContainerRef.current, { 
            y: photoDropY, scale: photoFinalScale, duration: 0.08, ease: "power2.inOut" 
          }, 0.52);
          
          // Transform: photo fades out, upload state fades in right before CTA
          tl.to(".photo-state", { opacity: 0, duration: 0.04, ease: "power2.inOut" }, 0.54);
          tl.to(".upload-state", { opacity: 1, duration: 0.04, ease: "power2.inOut" }, 0.54);
          tl.to(".photo-label", { opacity: 0, duration: 0.03, ease: "power2.in" }, 0.53);
        }
        
        // Trail - hide it since photo stays in place
        if (sparkleTrailRef.current) {
          gsap.set(sparkleTrailRef.current, { opacity: 0 });
        }

        // Phase 3: FAST page flips (20-45%)
        // Flip 1: 5 → 10 (20-27%)
        tl.to(page1Ref.current, { rotateY: -180, duration: 0.07, ease: "power2.inOut" }, 0.20);
        if (coverBackRef.current) {
          tl.to(coverBackRef.current, { opacity: 0, duration: 0.02 }, 0.24);
        }
        tl.to(page1Ref.current, { zIndex: 5, duration: 0.001 }, 0.28);

        // Flip 2: 11 → 18 (29-36%)
        tl.to(page2Ref.current, { rotateY: -180, duration: 0.07, ease: "power2.inOut" }, 0.29);
        tl.to(page2Ref.current, { zIndex: 6, duration: 0.001 }, 0.37);

        // Flip 3: 19 → 2 (38-45%)
        tl.to(page3Ref.current, { rotateY: -180, duration: 0.07, ease: "power2.inOut" }, 0.38);

        // Phase 4: Zoom into final spread (48-80%)
        // Don't change x - let it zoom from current position
        tl.to(bookRef.current, 
          { scale: zoomScale, y: -100, transformOrigin: "50% 50%", duration: 0.32, ease: "power2.inOut" }, 
          0.48
        );
        
        tl.to(".starry-bg", { opacity: 0, duration: 0.05 }, 0.50);
        tl.to(bookRef.current, { filter: "blur(12px)", duration: 0.08, ease: "power2.inOut" }, 0.52);
        
        if (ctaRef.current) {
          tl.fromTo(ctaRef.current,
            { y: 50, opacity: 0, pointerEvents: "none" },
            { y: 0, opacity: 1, pointerEvents: "auto", duration: 0.1, ease: "back.out(1.7)" },
            0.55
          );
        }

      } else {
        // ===== DESKTOP: Book opens, pages flip, then zooms =====
        
        // Phase 1: Book floats up (0-15%)
        tl.fromTo(bookRef.current,
          { y: 100, scale: bookScale * 0.7, opacity: 0, x: bookXStart },
          { y: 0, scale: bookScale, opacity: 1, x: bookXStart, duration: 0.15, ease: "power2.out" }
        );

        // Phase 2: Cover opens (15-35%)
        tl.to(coverRef.current, { rotateY: -160, duration: 0.2, ease: "power2.inOut" }, 0.15);
        
        // Right pages fade in as cover opens
        if (rightPagesRef.current) {
          tl.to(rightPagesRef.current, { opacity: 1, duration: 0.15, ease: "power2.out" }, 0.18);
        }
        
        // Shift book to center
        tl.to(bookRef.current, { x: bookXOpen, duration: 0.2, ease: "power2.inOut" }, 0.15);
        
        // Fade title/indicator first
        tl.to(titleRef.current, { opacity: 0, y: -50, duration: 0.05, ease: "power2.in" }, 0.30);
        tl.to(scrollIndicatorRef.current, { opacity: 0, y: 50, duration: 0.05, ease: "power2.in" }, 0.30);
        
        // Photo appears AFTER title is gone, stays in place pulsing
        if (photoContainerRef.current) {
          // Appear after title fades out (0.30 + 0.05 = 0.35, add small buffer)
          tl.to(photoContainerRef.current, { 
            opacity: 1, scale: 1, y: 0, duration: 0.05, ease: "back.out(1.7)" 
          }, 0.36);
          
          // Stay in place (just pulsing via CSS) until after blur, then drop down
          tl.to(photoContainerRef.current, { 
            y: photoDropY, scale: photoFinalScale, duration: 0.06, ease: "power2.inOut" 
          }, 0.76);
          
          // Transform: photo fades out, upload state fades in right before CTA
          tl.to(".photo-state", { opacity: 0, duration: 0.04, ease: "power2.inOut" }, 0.77);
          tl.to(".upload-state", { opacity: 1, duration: 0.04, ease: "power2.inOut" }, 0.77);
          tl.to(".photo-label", { opacity: 0, duration: 0.03, ease: "power2.in" }, 0.76);
        }
        
        // Trail - hide it since photo stays in place
        if (sparkleTrailRef.current) {
          gsap.set(sparkleTrailRef.current, { opacity: 0 });
        }

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
        // Don't change x - let it zoom from current position
        tl.to(bookRef.current, 
          { scale: zoomScale, y: -50, transformOrigin: "50% 50%", duration: 0.16, ease: "power2.inOut" }, 
          0.74
        );
        
        tl.to(".starry-bg", { opacity: 0, duration: 0.05 }, 0.75);
        tl.to(bookRef.current, { filter: "blur(12px)", duration: 0.06, ease: "power2.inOut" }, 0.76);
        
        if (ctaRef.current) {
          tl.fromTo(ctaRef.current,
            { y: 50, opacity: 0, pointerEvents: "none" },
            { y: 0, opacity: 1, pointerEvents: "auto", duration: 0.08, ease: "back.out(1.7)" },
            0.78
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMounted, screenWidth]);

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

        {/* Photo Circle - Transforms into Upload Circle */}
        <div
          ref={photoContainerRef}
          className="absolute z-40 top-[18%] md:top-[10%] left-1/2 -translate-x-1/2 opacity-0"
        >
          <div className="relative cursor-pointer group animate-float">
            {/* Animated glow ring */}
            <div className="absolute -inset-2 md:-inset-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-75 blur-md animate-pulse-glow" />
            
            {/* Circle container - holds both states */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-2xl overflow-hidden">
              {/* Photo state (fades out) */}
              <div className="photo-state absolute inset-0">
                <Image 
                  src="/Sura (20 x 20 cm)/1.png.jpeg" 
                  alt="Your child"
                  fill
                  className="object-cover object-center scale-150"
                />
              </div>
              
              {/* Upload state (fades in) */}
              <div className="upload-state absolute inset-0 bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 border-4 border-dashed border-white/60 rounded-full -m-1">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-white text-[8px] md:text-[10px] font-medium mt-0.5">Upload</span>
              </div>
            </div>
            
            {/* Label */}
            <div className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="photo-label bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full shadow-lg">
                Your Photo ✨
              </div>
            </div>
          </div>
        </div>

        {/* Magic Trail - Follows behind the photo */}
        <div
          ref={sparkleTrailRef}
          className="absolute z-25 top-[20%] md:top-[18%] right-[10%] md:right-[20%] opacity-0 pointer-events-none"
        >
          {/* Trailing sparkles that fade */}
          <div className="relative w-24 h-16 md:w-40 md:h-24">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${Math.max(4, 12 - i)}px`,
                  height: `${Math.max(4, 12 - i)}px`,
                  background: i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#a855f7' : '#6366f1',
                  left: `${i * 7}%`,
                  top: `${30 + Math.sin(i * 0.5) * 20}%`,
                  opacity: Math.max(0.2, 1 - i * 0.08),
                  filter: 'blur(1px)',
                  boxShadow: `0 0 ${8 - i * 0.5}px currentColor`,
                }}
              />
            ))}
            {/* Glowing trail line */}
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.3), transparent)',
                filter: 'blur(8px)',
                borderRadius: '50%',
              }}
            />
          </div>
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
                className="relative w-[280px] md:w-[400px] h-[280px] md:h-[400px] opacity-0"
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
                className="absolute top-0 left-0 w-[280px] md:w-[400px] h-[280px] md:h-[400px] origin-left z-[10]"
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
                  className="absolute inset-0 rounded-2xl overflow-hidden"
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

              {/* Book Spine - desktop only */}
              <div 
                className="absolute left-0 top-0 h-[400px] w-6 bg-gradient-to-b from-indigo-700 via-purple-700 to-indigo-800 shadow-xl z-[9] hidden md:block"
                style={{ transform: "translateX(-12px) rotateY(90deg)", transformOrigin: "right" }}
              />
            </div>

          </div>
        </div>

        {/* CTA Section - Text and Button only (photo circle merges into this) */}
        <div
          ref={ctaRef}
          className="absolute inset-0 flex items-center justify-center z-50 opacity-0 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-4 md:gap-6 mt-16 md:mt-20">
            {/* CTA Text */}
            <p className="text-white/90 text-sm md:text-lg font-medium text-center px-8 drop-shadow-lg">
              Upload your child&apos;s photo
            </p>
            
            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 md:px-10 md:py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-bold rounded-full shadow-2xl shadow-purple-500/40 text-base md:text-xl flex items-center gap-2 md:gap-3 hover:shadow-purple-500/60 transition-shadow pointer-events-auto"
            >
              <span className="text-lg md:text-xl">✨</span>
              Generate Free Book Cover
              <span className="text-lg md:text-xl">✨</span>
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
