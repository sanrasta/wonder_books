"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type ThemeVariant = "kids" | "valentines" | "worldcup";

interface MagicMirrorProps {
  theme: ThemeVariant;
}

const themes = {
  kids: {
    headline: (
      <>
        Turn your <span className="text-[#FFB7A1]">dreams</span>
        <br />
        into a real book.
      </>
    ),
    subheadline:
      "Upload a photo, pick an adventure, and watch your child become the hero of their very own hardbound storybook.",
    beforeImage:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=2000",
    afterImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000",
    beforeLabel: "BORING MONDAY",
    afterLabel: "WONDER WORLD",
    quote: '"Once upon a time, Leo found a hidden door..."',
    accentColor: "indigo",
    labelBgBefore: "bg-white/80",
    labelBgAfter: "bg-indigo-500 text-white",
    sliderBorder: "border-indigo-200",
    sliderIcon: "text-indigo-400",
    headlineColor: "text-indigo-950",
    subheadlineColor: "text-indigo-900/50",
    scrollHintColor: "text-indigo-300",
  },
  valentines: {
    headline: (
      <>
        Turn your <span className="text-rose-400">love story</span>
        <br />
        into a keepsake.
      </>
    ),
    subheadline:
      "Upload a couple photo and watch your love story transform into a beautifully illustrated book you'll treasure forever.",
    beforeImage:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=2000",
    afterImage:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=2000",
    beforeLabel: "YOUR PHOTO",
    afterLabel: "YOUR BOOK",
    quote: '"The moment I saw you, I knew our story was just beginning..."',
    accentColor: "rose",
    labelBgBefore: "bg-white/80",
    labelBgAfter: "bg-rose-500 text-white",
    sliderBorder: "border-rose-200",
    sliderIcon: "text-rose-400",
    headlineColor: "text-gray-900",
    subheadlineColor: "text-gray-600",
    scrollHintColor: "text-rose-300",
  },
  worldcup: {
    headline: (
      <>
        Become a <span className="text-emerald-500">World Cup</span>
        <br />
        Champion.
      </>
    ),
    subheadline:
      "Upload your photo and step onto the world stage. Watch yourself lift the trophy in your very own illustrated World Cup story.",
    beforeImage:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000",
    afterImage:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=2000",
    beforeLabel: "YOUR PHOTO",
    afterLabel: "WORLD CHAMPION",
    quote: '"And in the 90th minute, the crowd roars your name..."',
    accentColor: "emerald",
    labelBgBefore: "bg-white/80",
    labelBgAfter: "bg-emerald-500 text-white",
    sliderBorder: "border-emerald-200",
    sliderIcon: "text-emerald-500",
    headlineColor: "text-gray-900",
    subheadlineColor: "text-gray-600",
    scrollHintColor: "text-emerald-400",
  },
};

export default function MagicMirror({ theme }: MagicMirrorProps) {
  const [sliderVal, setSliderVal] = useState(50);
  const t = themes[theme];

  return (
    <section className="relative pt-28 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-10 md:mb-16"
      >
        <h1
          className={`text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight font-fredoka ${t.headlineColor}`}
        >
          {t.headline}
        </h1>
        <p
          className={`text-base md:text-xl max-w-2xl mx-auto font-medium px-4 ${t.subheadlineColor}`}
        >
          {t.subheadline}
        </p>
      </motion.div>

      {/* Magic Mirror */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative magic-mirror-container aspect-[4/3] md:aspect-video bg-white border-8 md:border-[12px] border-white shadow-2xl overflow-hidden group rounded-2xl md:rounded-3xl"
      >
        {/* Before Side - Photo */}
        <div
          className="absolute inset-0 grayscale contrast-75 brightness-110"
          style={{ clipPath: `inset(0 ${100 - sliderVal}% 0 0)` }}
        >
          <img
            src={t.beforeImage}
            className="w-full h-full object-cover"
            alt="Before transformation"
          />
          <div
            className={`absolute top-4 left-4 md:top-10 md:left-10 ${t.labelBgBefore} px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm`}
          >
            {t.beforeLabel}
          </div>
        </div>

        {/* After Side - Book/Magic */}
        <div className="absolute inset-0">
          <img
            src={t.afterImage}
            className="w-full h-full object-cover"
            alt="After transformation"
          />
          <div
            className={`absolute top-4 right-4 md:top-10 md:right-10 ${t.labelBgAfter} px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm`}
          >
            {t.afterLabel}
          </div>

          {/* Floating Story Quote - Hidden on small mobile */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:block absolute bottom-8 right-8 md:bottom-20 md:right-20"
          >
            <div
              className={`bg-white/90 p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-xl max-w-[200px] md:max-w-none ${
                theme === "valentines" ? "text-rose-900" : "text-indigo-900"
              }`}
            >
              <p className="font-bold italic text-sm md:text-base">{t.quote}</p>
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
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 ${t.sliderBorder}`}
          >
            {theme === "valentines" ? (
              <span className="text-rose-400 text-lg md:text-xl">♥</span>
            ) : theme === "worldcup" ? (
              <span className="text-emerald-500 text-lg md:text-xl">⚽</span>
            ) : (
              <svg
                className={`w-5 h-5 md:w-6 md:h-6 ${t.sliderIcon}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            )}
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
          className={`${t.scrollHintColor} text-sm font-medium flex flex-col items-center gap-2`}
        >
          <span>Swipe to explore</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

