"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const backgroundElements = [
  { left: '15%', top: '10%', fontSize: '40px', icon: '🎓' },
  { left: '80%', top: '20%', fontSize: '60px', icon: '📜' },
  { left: '30%', top: '70%', fontSize: '50px', icon: '📚' },
  { left: '60%', top: '85%', fontSize: '45px', icon: '🏆' },
  { left: '5%', top: '45%', fontSize: '30px', icon: '⭐' },
  { left: '90%', top: '60%', fontSize: '35px', icon: '🎓' },
];

export default function GraduationBookPreview() {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "The Journey Complete",
      subtitle: "A Story of Achievement",
      pageImage: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Chapter One:\nThe First Day",
      subtitle: "Where the adventure began",
      pageImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Chapter Two:\nThe Lessons Learned",
      subtitle: "Growing stronger every day",
      pageImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Chapter Three:\nThe Big Day",
      subtitle: "Walking across the stage",
      pageImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60",
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
            className="absolute text-blue-500"
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
          <h3 className="text-3xl md:text-4xl font-bold font-fredoka text-blue-900 mb-4">
            Preview Your Graduation Book
          </h3>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Each book beautifully illustrates their academic journey from first day to graduation day.
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
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent flex flex-col justify-end p-6 text-white">
              <h4 className="text-xl md:text-2xl font-bold font-fredoka mb-2 whitespace-pre-line">
                {currentBook.title}
              </h4>
              <p className="text-sm md:text-base text-blue-200">
                {currentBook.subtitle}
              </p>
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length)}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-blue-600 hover:bg-white transition-colors z-10"
            aria-label="Previous page"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentPage((prev) => (prev + 1) % pages.length)}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-blue-600 hover:bg-white transition-colors z-10"
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
                  index === currentPage ? "bg-blue-500" : "bg-blue-200 hover:bg-blue-300"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Book Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-blue-800">
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">📖</span>
            <span className="font-bold text-lg">24 Pages</span>
            <span className="text-sm text-blue-600">Their complete journey</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">🎓</span>
            <span className="font-bold text-lg">Premium Hardcover</span>
            <span className="text-sm text-blue-600">Keepsake quality</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">🎨</span>
            <span className="font-bold text-lg">AI Illustrated</span>
            <span className="text-sm text-blue-600">Personalized artwork</span>
          </div>
        </div>
      </div>
    </section>
  );
}

