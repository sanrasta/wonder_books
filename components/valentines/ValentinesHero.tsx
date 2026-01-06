"use client";

import { motion } from "framer-motion";

// Fixed heart positions to avoid hydration mismatch
const floatingHearts = [
  { left: 5, top: 10, size: 15, duration: 4.5, delay: 0.2 },
  { left: 15, top: 80, size: 12, duration: 5.2, delay: 1.1 },
  { left: 25, top: 30, size: 18, duration: 4.8, delay: 0.5 },
  { left: 35, top: 60, size: 14, duration: 5.5, delay: 1.8 },
  { left: 45, top: 15, size: 20, duration: 4.2, delay: 0.8 },
  { left: 55, top: 85, size: 11, duration: 5.0, delay: 1.4 },
  { left: 65, top: 45, size: 16, duration: 4.6, delay: 0.3 },
  { left: 75, top: 70, size: 13, duration: 5.3, delay: 1.6 },
  { left: 85, top: 25, size: 19, duration: 4.4, delay: 0.9 },
  { left: 92, top: 55, size: 15, duration: 5.1, delay: 1.2 },
  { left: 8, top: 50, size: 17, duration: 4.9, delay: 0.6 },
  { left: 50, top: 5, size: 14, duration: 5.4, delay: 1.0 },
];

export default function ValentinesHero() {
  return (
    <section className="relative pt-28 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((heart, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-200"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              fontSize: `${heart.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-10 md:mb-16 relative z-10"
      >
        {/* Valentine's Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-rose-100 px-4 py-2 rounded-full mb-6 border border-rose-200"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-rose-500"
          >
            ♥
          </motion.span>
          <span className="text-rose-600 font-semibold text-sm">
            Valentine&apos;s Day Special
          </span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-rose-950 mb-4 md:mb-6 leading-tight">
          Turn your <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">love story</span>
          <br />
          into a keepsake.
        </h1>
        <p className="text-base md:text-xl text-rose-400 max-w-2xl mx-auto font-medium px-4">
          Create a personalized storybook featuring you and your partner. 
          The perfect gift that captures your unique journey together.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95, y: 2 }}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-rose-300/50"
          >
            Create Your Book 💕
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-rose-500 px-8 py-4 rounded-full font-bold text-lg border-2 border-rose-200 hover:border-rose-300 transition-colors"
          >
            See Examples
          </motion.button>
        </div>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative max-w-4xl mx-auto"
      >
        {/* Main Image Container */}
        <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-rose-300/30 border-8 md:border-[12px] border-white">
          <img
            src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=2000"
            alt="Couple holding hands at sunset"
            className="w-full aspect-[16/10] object-cover"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 via-transparent to-transparent" />
          
          {/* Floating Quote */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 right-6 md:bottom-10 md:right-10 bg-white/95 backdrop-blur-sm p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl max-w-[200px] md:max-w-xs"
          >
            <p className="text-rose-900 font-medium italic text-sm md:text-base">
              &ldquo;The moment I saw you, I knew our story was just beginning...&rdquo;
            </p>
            <div className="mt-2 text-rose-400 text-xs md:text-sm font-semibold">
              — From Chapter One
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-8 -left-8 md:-top-12 md:-left-12 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-xl opacity-60"
        />
        <motion.div
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 w-24 h-24 md:w-40 md:h-40 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-xl opacity-60"
        />
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12 text-rose-400 text-sm font-medium"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">📦</span>
          <span>Free Shipping</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <span>Express Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">💝</span>
          <span>Gift Wrapped</span>
        </div>
      </motion.div>
    </section>
  );
}

