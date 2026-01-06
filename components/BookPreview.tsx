"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function BookPreview() {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "Leo and the\nCrystal Cave",
      subtitle: "A Personalized Adventure",
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400",
      pageImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Chapter One:\nThe Secret Door",
      subtitle: "Where it all begins...",
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      pageImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Chapter Two:\nMeeting the Dragon",
      subtitle: "A new friend appears",
      coverImage: "https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&q=80&w=400",
      pageImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-bold mb-10 md:mb-16 text-indigo-900"
        >
          Peek Inside Your Magic...
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative inline-block w-full max-w-2xl"
        >
          {/* Wooden table surface */}
          <div className="absolute -inset-4 md:-inset-10 bg-amber-900/5 rounded-3xl md:rounded-[4rem] -rotate-1" />

          {/* The Book */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative bg-white shadow-2xl rounded-2xl md:rounded-r-3xl overflow-hidden flex"
          >
            {/* Left Page - Cover */}
            <div className="w-1/2 bg-indigo-600 p-4 md:p-12 text-white flex flex-col justify-end items-start text-left aspect-[3/4] md:aspect-[4/5] relative overflow-hidden">
              {/* Background image */}
              <div className="absolute inset-0">
                <motion.img
                  key={`cover-${currentPage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  src={pages[currentPage].coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600 via-indigo-600/80 to-indigo-600/40" />
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
                  className="text-indigo-100 font-medium text-xs md:text-base"
                >
                  {pages[currentPage].subtitle}
                </motion.p>
              </div>
            </div>

            {/* Right Page - Content Preview */}
            <div className="w-1/2 bg-[#fdfdfd] p-4 md:p-12 aspect-[3/4] md:aspect-[4/5] relative">
              <div className="absolute inset-0 opacity-10 map-texture" />
              <div className="relative z-10 text-left">
                {/* Illustration placeholder with real image */}
                <motion.div
                  key={`img-${currentPage}`}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-20 md:h-40 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl md:rounded-2xl mb-4 md:mb-6 overflow-hidden"
                >
                  <img
                    src={pages[currentPage].pageImage}
                    alt="Story illustration"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Text lines */}
                <div className="space-y-2 md:space-y-3">
                  <div className="h-2 md:h-3 bg-indigo-100 rounded-full w-full" />
                  <div className="h-2 md:h-3 bg-indigo-100 rounded-full w-5/6" />
                  <div className="h-2 md:h-3 bg-indigo-100 rounded-full w-4/6" />
                  <div className="h-2 md:h-3 bg-indigo-100 rounded-full w-full hidden md:block" />
                  <div className="h-2 md:h-3 bg-indigo-100 rounded-full w-3/4 hidden md:block" />
                </div>
              </div>
            </div>

            {/* Book Spine */}
            <div className="absolute top-0 bottom-0 left-[50%] -translate-x-1/2 w-2 md:w-4 bg-black/10 blur-[1px]" />
          </motion.div>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage((prev) => (prev > 0 ? prev - 1 : pages.length - 1))}
            className="absolute -left-2 md:-left-20 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full plump-shadow flex items-center justify-center text-xl md:text-3xl hover:bg-indigo-50 transition-colors z-20"
          >
            👈
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage((prev) => (prev < pages.length - 1 ? prev + 1 : 0))}
            className="absolute -right-2 md:-right-20 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full plump-shadow flex items-center justify-center text-xl md:text-3xl hover:bg-indigo-50 transition-colors z-20"
          >
            👉
          </motion.button>

          {/* Page Indicators */}
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  currentPage === idx
                    ? "bg-indigo-400 w-6 md:w-8"
                    : "bg-indigo-200 hover:bg-indigo-300"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
