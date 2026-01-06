"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-12 md:py-20 bg-indigo-950 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <motion.div
                whileHover={{ rotate: 20 }}
                className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl rotate-12 flex items-center justify-center text-indigo-900 font-bold text-lg md:text-2xl"
              >
                W
              </motion.div>
              <span className="text-xl md:text-2xl font-bold tracking-tight">
                WonderTales
              </span>
            </div>
            <p className="text-indigo-200/60 max-w-sm mb-6 md:mb-8 text-sm md:text-base">
              Creating magical moments for families around the globe, one
              personalized story at a time.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3 md:gap-4">
              {["📸", "📘", "🐦"].map((emoji, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer text-lg"
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h5 className="font-bold mb-4 md:mb-6 text-sm md:text-base">Explore</h5>
            <ul className="space-y-3 md:space-y-4 text-indigo-200/60 font-medium text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Forest
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Safety Workshop
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h5 className="font-bold mb-4 md:mb-6 text-sm md:text-base">Support</h5>
            <ul className="space-y-3 md:space-y-4 text-indigo-200/60 font-medium text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping Map
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Refund Fairy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-indigo-200/40 text-xs md:text-sm">
          <p>© 2025 WonderTales. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Made with <span className="text-red-400">♥</span> for little dreamers
          </p>
        </div>
      </div>

      {/* Decorative background blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -bottom-24 -left-24 w-72 md:w-96 h-72 md:h-96 bg-indigo-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        className="absolute -top-24 -right-24 w-48 md:w-72 h-48 md:h-72 bg-purple-500/10 rounded-full blur-3xl"
      />
    </footer>
  );
}

