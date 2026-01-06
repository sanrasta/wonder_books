"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

// Pre-defined positions for background elements to prevent hydration mismatches
const backgroundElements = [
  { left: '10%', top: '5%', emoji: '⚽', size: '30px' },
  { left: '85%', top: '10%', emoji: '🏆', size: '35px' },
  { left: '5%', top: '40%', emoji: '⚽', size: '25px' },
  { left: '92%', top: '35%', emoji: '🥅', size: '32px' },
  { left: '15%', top: '80%', emoji: '⚽', size: '28px' },
  { left: '80%', top: '75%', emoji: '🏆', size: '30px' },
  { left: '50%', top: '3%', emoji: '⚽', size: '22px' },
  { left: '30%', top: '90%', emoji: '🥇', size: '26px' },
];

export default function WorldCupBookPreview() {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "Your World Cup Story",
      subtitle: "The Road to Glory",
      pageImage: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Chapter One:\nThe Call Up",
      subtitle: "Selected for the national team...",
      pageImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Chapter Two:\nThe Final",
      subtitle: "90 minutes to make history...",
      pageImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Chapter Three:\nWorld Champion",
      subtitle: "Lifting the trophy...",
      pageImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=400",
    },
  ];

  const currentBook = pages[currentPage];

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        {backgroundElements.map((el, i) => (
          <div
            key={i}
            className="absolute text-emerald-500"
            style={{
              left: el.left,
              top: el.top,
              fontSize: el.size,
            }}
          >
            {el.emoji}
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold font-fredoka text-gray-900 mb-4">
            Preview Your Champion Story
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each book is beautifully illustrated with stadium atmospheres, dramatic moments, and your personal World Cup journey.
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center">
          {/* Book Display */}
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-md aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <Image
              src={currentBook.pageImage}
              alt="Story illustration"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent flex flex-col justify-end p-6 text-white">
              <h4 className="text-xl md:text-2xl font-bold font-fredoka mb-2 whitespace-pre-line">
                {currentBook.title}
              </h4>
              <p className="text-sm md:text-base text-emerald-100">
                {currentBook.subtitle}
              </p>
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPreviousPage}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-emerald-600 hover:bg-white transition-colors z-10"
            aria-label="Previous page"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNextPage}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-emerald-600 hover:bg-white transition-colors z-10"
            aria-label="Next page"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Page Indicators */}
          <div className="absolute -bottom-10 flex gap-2">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentPage ? "bg-emerald-500" : "bg-emerald-200 hover:bg-emerald-300"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Book Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-gray-800">
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">📖</span>
            <span className="font-bold text-lg">24 Pages</span>
            <span className="text-sm text-gray-500">Premium glossy paper</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">🏆</span>
            <span className="font-bold text-lg">Collector&apos;s Edition</span>
            <span className="text-sm text-gray-500">Hardcover finish</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">🎨</span>
            <span className="font-bold text-lg">AI Illustrated</span>
            <span className="text-sm text-gray-500">Stadium atmospheres</span>
          </div>
        </div>
      </div>
    </section>
  );
}

