"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function WorldCupNavbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3"
      >
        <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-full px-4 md:px-8 py-3 shadow-lg border border-emerald-100 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-fredoka font-bold text-emerald-700 text-lg md:text-xl">
            <span className="text-2xl">⚽</span>
            <span>WonderTales</span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("create")}
              className="text-emerald-700 hover:text-emerald-900 font-medium transition-colors"
            >
              Create
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-emerald-700 hover:text-emerald-900 font-medium transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("preview")}
              className="text-emerald-700 hover:text-emerald-900 font-medium transition-colors"
            >
              Preview
            </button>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLoginOpen(true)}
            className="bg-emerald-500 text-white px-4 md:px-6 py-2 rounded-full font-bold text-sm md:text-base hover:bg-emerald-600 transition-colors"
          >
            Login
          </motion.button>
        </div>
      </motion.nav>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsLoginOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <span className="text-4xl mb-2 block">⚽</span>
                <h2 className="text-2xl font-bold font-fredoka text-gray-900 mb-2">
                  Welcome Back, Champion!
                </h2>
                <p className="text-gray-600">
                  Sign in to continue your World Cup story
                </p>
              </div>

              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 outline-none transition-colors"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors"
                >
                  Sign In
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-4">
                Don&apos;t have an account?{" "}
                <button className="text-emerald-600 font-medium hover:underline">
                  Create one
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

