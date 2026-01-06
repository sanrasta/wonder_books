"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ValentinesBookPreview() {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "Our Love Story",
      subtitle: "A Tale of Two Hearts",
      coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400",
      pageImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Chapter One:\nThe First Glance",
      subtitle: "Where it all began...",
      coverImage: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&q=80&w=400",
      pageImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Chapter Two:\nFalling Deeper",
      subtitle: "When I knew you were the one",
      coverImage: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80&w=400",
      pageImage: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&q=80&w=400",
    },
  ];

  // Fixed heart positions to avoid hydration mismatch
  const backgroundHearts = [
    { left: 5, top: 15, size: 35 }, { left: 12, top: 75, size: 28 },
    { left: 20, top: 40, size: 45 }, { left: 28, top: 90, size: 32 },
    { left: 35, top: 25, size: 50 }, { left: 42, top: 60, size: 38 },
    { left: 50, top: 10, size: 42 }, { left: 58, top: 80, size: 30 },
    { left: 65, top: 35, size: 55 }, { left: 72, top: 55, size: 25 },
    { left: 78, top: 20, size: 40 }, { left: 85, top: 70, size: 48 },
    { left: 92, top: 45, size: 33 }, { left: 8, top: 85, size: 52 },
    { left: 18, top: 5, size: 36 }, { left: 38, top: 95, size: 44 },
    { left: 55, top: 50, size: 29 }, { left: 68, top: 8, size: 46 },
    { left: 82, top: 65, size: 35 }, { left: 95, top: 30, size: 40 },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background hearts */}
      <div className="absolute inset-0 opacity-5">
        {backgroundHearts.map((heart, i) => (
          <div
            key={i}
            className="absolute text-rose-500"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              fontSize: `${heart.size}px`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-16"
        >
          <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Preview Your Love Story
          </h3>
          <p className="text-rose-400 max-w-xl mx-auto">
            Each book is beautifully illustrated and printed on premium paper 
            with a luxurious hardcover finish.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative inline-block w-full max-w-2xl"
        >
          {/* Book shadow */}
          <div className="absolute -inset-4 md:-inset-10 bg-rose-100/50 rounded-3xl md:rounded-[4rem] -rotate-1" />

          {/* The Book */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative bg-white shadow-2xl shadow-rose-200/50 rounded-2xl md:rounded-r-3xl overflow-hidden flex"
          >
            {/* Left Page - Cover */}
            <div className="w-1/2 bg-gradient-to-br from-rose-500 to-pink-500 p-4 md:p-12 text-white flex flex-col justify-end items-start text-left aspect-[3/4] md:aspect-[4/5] relative overflow-hidden">
              <div className="absolute inset-0">
                <motion.img
                  key={`cover-${currentPage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  src={pages[currentPage].coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-600 via-rose-500/80 to-rose-500/40" />
              </div>
              
              <div className="relative z-10">
                <motion.h4
                  key={currentPage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg md:text-4xl font-bold mb-2 md:mb-4 whitespace-pre-line leading-tight"
                >
                  {pages[currentPage].title}
                </motion.h4>
                <div className="w-8 md:w-12 h-0.5 md:h-1 bg-white/30 rounded-full mb-2 md:mb-4" />
                <motion.p
                  key={`sub-${currentPage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-rose-100 font-medium text-xs md:text-base"
                >
                  {pages[currentPage].subtitle}
                </motion.p>
              </div>
            </div>

            {/* Right Page - Content Preview */}
            <div className="w-1/2 bg-[#fffbfb] p-4 md:p-12 aspect-[3/4] md:aspect-[4/5] relative">
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #f43f5e 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }} />
              <div className="relative z-10 text-left">
                <motion.div
                  key={`img-${currentPage}`}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-20 md:h-40 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl md:rounded-2xl mb-4 md:mb-6 overflow-hidden border border-rose-100"
                >
                  <img
                    src={pages[currentPage].pageImage}
                    alt="Story illustration"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Text lines */}
                <div className="space-y-2 md:space-y-3">
                  <div className="h-2 md:h-3 bg-rose-100 rounded-full w-full" />
                  <div className="h-2 md:h-3 bg-rose-100 rounded-full w-5/6" />
                  <div className="h-2 md:h-3 bg-rose-100 rounded-full w-4/6" />
                  <div className="h-2 md:h-3 bg-rose-100 rounded-full w-full hidden md:block" />
                  <div className="h-2 md:h-3 bg-rose-100 rounded-full w-3/4 hidden md:block" />
                </div>
              </div>
            </div>

            {/* Book Spine */}
            <div className="absolute top-0 bottom-0 left-[50%] -translate-x-1/2 w-2 md:w-4 bg-rose-900/10 blur-[1px]" />
          </motion.div>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage((prev) => (prev > 0 ? prev - 1 : pages.length - 1))}
            className="absolute -left-2 md:-left-20 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-lg shadow-rose-200/50 flex items-center justify-center text-xl md:text-2xl hover:bg-rose-50 transition-colors z-20 border border-rose-100"
          >
            ←
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage((prev) => (prev < pages.length - 1 ? prev + 1 : 0))}
            className="absolute -right-2 md:-right-20 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-lg shadow-rose-200/50 flex items-center justify-center text-xl md:text-2xl hover:bg-rose-50 transition-colors z-20 border border-rose-100"
          >
            →
          </motion.button>

          {/* Page Indicators */}
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  currentPage === idx
                    ? "bg-rose-400 w-6 md:w-8"
                    : "bg-rose-200 hover:bg-rose-300"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl mb-2">📖</div>
            <div className="font-bold text-rose-900 text-sm md:text-base">32 Pages</div>
            <div className="text-rose-400 text-xs">Premium paper</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl mb-2">✨</div>
            <div className="font-bold text-rose-900 text-sm md:text-base">Hardcover</div>
            <div className="text-rose-400 text-xs">Luxurious finish</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl mb-2">🎨</div>
            <div className="font-bold text-rose-900 text-sm md:text-base">AI Illustrated</div>
            <div className="text-rose-400 text-xs">Unique artwork</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

