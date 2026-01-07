"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const previewPages = [
  {
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop&q=60",
    title: "The Cover",
    description: "Your pup as the hero",
  },
  {
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=60",
    title: "The Adventure Begins",
    description: "Chapter 1 of their journey",
  },
  {
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&auto=format&fit=crop&q=60",
    title: "Making Friends",
    description: "Meeting other characters",
  },
  {
    image: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=800&auto=format&fit=crop&q=60",
    title: "The Hero Moment",
    description: "Saving the day",
  },
];

// Inline SVG components for navigation
const ChevronLeft = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function DogTrainingBookPreview() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % previewPages.length);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + previewPages.length) % previewPages.length);

  return (
    <section id="preview" className="py-16 md:py-24 px-4 bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">
      {/* Decorative paw prints */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-orange-500"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${10 + Math.floor(i / 4) * 35}%`,
              fontSize: `${24 + (i % 3) * 8}px`,
              transform: `rotate(${(i * 30) % 360}deg)`,
            }}
          >
            🐾
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-fredoka mb-4 text-gray-900">
            Sneak Peek Inside 📖
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every page features your furry friend as the star of an amazing adventure
          </p>
        </motion.div>

        {/* Book Preview */}
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevPage}
            className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors"
          >
            <ChevronLeft />
          </motion.button>

          <motion.div
            key={currentPage}
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Book Frame */}
            <div className="bg-white p-3 md:p-4 rounded-lg shadow-2xl">
              <div className="relative w-64 md:w-80 aspect-[3/4] rounded overflow-hidden">
                <Image
                  src={previewPages[currentPage].image}
                  alt={previewPages[currentPage].title}
                  fill
                  className="object-cover"
                />
                {/* Page overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg">{previewPages[currentPage].title}</h3>
                  <p className="text-sm opacity-80">{previewPages[currentPage].description}</p>
                </div>
              </div>
            </div>

            {/* Page number */}
            <div className="text-center mt-4 text-orange-500 font-medium">
              Page {currentPage + 1} of {previewPages.length}
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextPage}
            className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors"
          >
            <ChevronRight />
          </motion.button>
        </div>

        {/* Page indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {previewPages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentPage ? "bg-orange-500 w-6" : "bg-orange-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

