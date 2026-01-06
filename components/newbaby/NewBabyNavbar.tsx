"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "Create", href: "#create" },
  { label: "Shipping", href: "#shipping" },
  { label: "Preview", href: "#preview" },
];

export default function NewBabyNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl px-2">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="bg-white/80 backdrop-blur-xl rounded-full px-4 md:px-8 py-3 md:py-4 flex justify-between items-center shadow-lg shadow-pink-200/50 border border-pink-100"
        >
          {/* Logo */}
          <button onClick={scrollToTop} className="flex items-center gap-2 cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl"
            >
              👶
            </motion.div>
            <span className="text-lg md:text-2xl font-bold tracking-tight bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              WonderTales
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 font-semibold text-pink-400">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="hover:text-pink-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Login Button - Desktop */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 4 }}
            onClick={() => setShowLogin(true)}
            className="hidden md:block bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-pink-300/50"
          >
            Login
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-pink-400 rounded-full block"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-pink-400 rounded-full block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-pink-400 rounded-full block"
            />
          </button>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl mt-2 p-6 flex flex-col gap-4 text-center shadow-lg border border-pink-100">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-lg font-semibold text-pink-500 hover:text-pink-700 py-2"
                  >
                    {link.label}
                  </button>
                ))}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsOpen(false);
                    setShowLogin(true);
                  }}
                  className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-full font-bold shadow-lg mt-2"
                >
                  Login
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowLogin(false)}
          >
            <div className="absolute inset-0 bg-pink-950/50 backdrop-blur-sm" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-[2rem] p-8 md:p-12 w-full max-w-md shadow-2xl"
            >
              <button
                onClick={() => setShowLogin(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 hover:bg-pink-100 transition-colors"
              >
                ✕
              </button>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-2xl text-white"
              >
                👶
              </motion.div>

              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-xl">
                  👶
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  WonderTales
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-pink-900 mb-2">
                Welcome back! 🎀
              </h2>
              <p className="text-pink-400 mb-8">
                Sign in to continue creating magic
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-pink-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-pink-100 focus:border-pink-300 outline-none transition-colors text-pink-900 placeholder:text-pink-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-pink-900 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-pink-100 focus:border-pink-300 outline-none transition-colors text-pink-900 placeholder:text-pink-200"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98, y: 2 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-pink-300/50 mt-4"
                >
                  Sign In 👶
                </motion.button>
              </form>

              <p className="text-center mt-6 text-pink-400">
                Don&apos;t have an account?{" "}
                <button className="text-pink-600 font-bold hover:underline">
                  Sign up free
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
