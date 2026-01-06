"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function HeroSection() {
  const [sliderVal, setSliderVal] = useState(50);

  return (
    <section className="relative pt-28 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-10 md:mb-16"
      >
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-indigo-950 mb-4 md:mb-6 leading-tight">
          Turn your <span className="text-[#FFB7A1]">dreams</span>
          <br />
          into a real book.
        </h1>
        <p className="text-base md:text-xl text-indigo-900/50 max-w-2xl mx-auto font-medium px-4">
          Upload a photo, pick an adventure, and watch your child become the hero
          of their very own hardbound storybook.
        </p>
      </motion.div>

      {/* Magic Mirror */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative magic-mirror-container aspect-[4/3] md:aspect-video bg-white border-8 md:border-[12px] border-white shadow-2xl overflow-hidden group"
      >
        {/* Boring Reality Side - Child in normal setting */}
        <div
          className="absolute inset-0 grayscale contrast-75 brightness-110"
          style={{ clipPath: `inset(0 ${100 - sliderVal}% 0 0)` }}
        >
          <img
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Child in everyday setting"
          />
          <div className="absolute top-4 left-4 md:top-10 md:left-10 bg-white/80 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm">
            BORING MONDAY
          </div>
        </div>

        {/* Magic Storybook Side - Fantasy/magical scene */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Magical fantasy world"
          />
          <div className="absolute top-4 right-4 md:top-10 md:right-10 bg-indigo-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm">
            WONDER WORLD
          </div>

          {/* Floating Story Quote - Hidden on small mobile */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:block absolute bottom-8 right-8 md:bottom-20 md:right-20"
          >
            <div className="bg-white/90 p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-xl text-indigo-900 max-w-[200px] md:max-w-none">
              <p className="font-bold italic text-sm md:text-base">
                &ldquo;Once upon a time, Leo found a hidden door...&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

        {/* Slider Control */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderVal}
          onChange={(e) => setSliderVal(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />

        {/* Slider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white z-10 pointer-events-none shadow-xl"
          style={{ left: `${sliderVal}%` }}
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-indigo-200"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-indigo-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Hint - Mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex justify-center mt-8 md:hidden"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-indigo-300 text-sm font-medium flex flex-col items-center gap-2"
        >
          <span>Swipe to explore</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
