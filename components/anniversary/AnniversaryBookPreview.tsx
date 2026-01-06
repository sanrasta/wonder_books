"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const backgroundElements = [
  { left: '15%', top: '10%', fontSize: '40px', icon: '💍' },
  { left: '80%', top: '20%', fontSize: '60px', icon: '💝' },
  { left: '30%', top: '70%', fontSize: '50px', icon: '🥂' },
  { left: '60%', top: '85%', fontSize: '45px', icon: '💕' },
  { left: '5%', top: '45%', fontSize: '30px', icon: '✨' },
  { left: '90%', top: '60%', fontSize: '35px', icon: '💍' },
];

export default function AnniversaryBookPreview() {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "Our Love Story",
      subtitle: "A Journey Through the Years",
      pageImage: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Chapter One:\nWhen We First Met",
      subtitle: "The beginning of forever",
      pageImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Chapter Two:\nThe Adventures Together",
      subtitle: "Memories we've made along the way",
      pageImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Chapter Three:\nForever and Always",
      subtitle: "The story continues...",
      pageImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60",
    },
  ];

  const currentBook = pages[currentPage];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        {backgroundElements.map((el, i) => (
          <div
            key={i}
            className="absolute text-amber-500"
            style={{
              left: el.left,
              top: el.top,
              fontSize: el.fontSize,
            }}
          >
            {el.icon}
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
          <h3 className="text-3xl md:text-4xl font-bold font-fredoka text-amber-900 mb-4">
            Preview Your Anniversary Book
          </h3>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Each book beautifully illustrates your journey together, from the first meeting to forever.
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
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent flex flex-col justify-end p-6 text-white">
              <h4 className="text-xl md:text-2xl font-bold font-fredoka mb-2 whitespace-pre-line">
                {currentBook.title}
              </h4>
              <p className="text-sm md:text-base text-amber-200">
                {currentBook.subtitle}
              </p>
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length)}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-amber-600 hover:bg-white transition-colors z-10"
            aria-label="Previous page"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentPage((prev) => (prev + 1) % pages.length)}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-amber-600 hover:bg-white transition-colors z-10"
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
                  index === currentPage ? "bg-amber-500" : "bg-amber-200 hover:bg-amber-300"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Book Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-amber-800">
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">📖</span>
            <span className="font-bold text-lg">24 Pages</span>
            <span className="text-sm text-amber-600">Of your love story</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">💍</span>
            <span className="font-bold text-lg">Luxury Finish</span>
            <span className="text-sm text-amber-600">Premium hardcover</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">🎨</span>
            <span className="font-bold text-lg">AI Illustrated</span>
            <span className="text-sm text-amber-600">Personalized artwork</span>
          </div>
        </div>
      </div>
    </section>
  );
}

