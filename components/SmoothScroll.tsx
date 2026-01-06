'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
      setIsMobile(mobile);
      return mobile;
    };

    const mobile = checkMobile();

    // Only initialize Lenis on desktop
    if (!mobile) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      // Integrate Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Use GSAP ticker for smooth animation frame updates
      const rafCallback = (time: number) => {
        lenis.raf(time * 1000);
      };
      
      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);

      // Handle resize
      const handleResize = () => {
        if (checkMobile() && lenisRef.current) {
          lenisRef.current.destroy();
          lenisRef.current = null;
          gsap.ticker.remove(rafCallback);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (lenisRef.current) {
          lenisRef.current.destroy();
          gsap.ticker.remove(rafCallback);
        }
      };
    }
  }, []);

  return <>{children}</>;
}
