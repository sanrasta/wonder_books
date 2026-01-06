"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "Library", href: "#library" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gifts", href: "#gifts" },
];

export default function Navbar() {
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
          className="glass-card rounded-full px-4 md:px-8 py-3 md:py-4 flex justify-between items-center plump-shadow"
        >
          {/* Logo */}
          <button onClick={scrollToTop} className="flex items-center gap-2 cursor-pointer">
            <motion.div
              whileHover={{ rotate: 20, scale: 1.1 }}
              className="w-8 h-8 md:w-10 md:h-10 bg-indigo-400 rounded-xl rotate-12 flex items-center justify-center text-white font-bold text-xl md:text-2xl"
            >
              W
            </motion.div>
            <span className="text-lg md:text-2xl font-bold tracking-tight text-indigo-900">
              WonderTales
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 font-semibold text-indigo-900/60">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="hover:text-indigo-600 transition-colors"
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
            className="hidden md:block bg-[#FFB7A1] text-white px-6 py-2 rounded-full font-bold plump-shadow"
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
              className="w-6 h-0.5 bg-indigo-900 rounded-full block"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-indigo-900 rounded-full block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-indigo-900 rounded-full block"
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
              <div className="glass-card rounded-3xl mt-2 p-6 flex flex-col gap-4 text-center">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-lg font-semibold text-indigo-900/80 hover:text-indigo-600 py-2"
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
                  className="bg-[#FFB7A1] text-white px-6 py-3 rounded-full font-bold plump-shadow mt-2"
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
            {/* Backdrop */}
            <div className="absolute inset-0 bg-indigo-950/50 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-[2rem] p-8 md:p-12 w-full max-w-md shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setShowLogin(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400 hover:bg-indigo-100 transition-colors"
              >
                ✕
              </button>

              {/* Decorative sparkle */}
              <motion.div
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-16 h-16 bg-[#FEF3C7] rounded-full flex items-center justify-center text-2xl"
              >
                ✨
              </motion.div>

              {/* Logo */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-indigo-400 rounded-xl rotate-12 flex items-center justify-center text-white font-bold text-2xl">
                  W
                </div>
                <span className="text-2xl font-bold tracking-tight text-indigo-900">
                  WonderTales
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-2">
                Welcome back! 👋
              </h2>
              <p className="text-indigo-400 mb-8">
                Sign in to continue your magical journey
              </p>

              {/* Login Form */}
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-indigo-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-2xl border-4 border-indigo-50 focus:border-indigo-200 outline-none transition-colors text-indigo-900 placeholder:text-indigo-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-indigo-900 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-2xl border-4 border-indigo-50 focus:border-indigo-200 outline-none transition-colors text-indigo-900 placeholder:text-indigo-200"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded accent-indigo-500"
                    />
                    <span className="text-indigo-600">Remember me</span>
                  </label>
                  <button type="button" className="text-indigo-400 hover:text-indigo-600">
                    Forgot password?
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98, y: 2 }}
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-4 rounded-full font-bold text-lg plump-shadow mt-4"
                >
                  Sign In ✨
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-indigo-100" />
                <span className="text-indigo-300 text-sm">or continue with</span>
                <div className="flex-1 h-px bg-indigo-100" />
              </div>

              {/* Social login */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 rounded-2xl border-4 border-indigo-50 hover:border-indigo-100 flex items-center justify-center gap-2 font-bold text-indigo-900 transition-colors"
                >
                  <span className="text-xl">🍎</span>
                  Apple
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 rounded-2xl border-4 border-indigo-50 hover:border-indigo-100 flex items-center justify-center gap-2 font-bold text-indigo-900 transition-colors"
                >
                  <span className="text-xl">📧</span>
                  Google
                </motion.button>
              </div>

              {/* Sign up link */}
              <p className="text-center mt-6 text-indigo-400">
                Don&apos;t have an account?{" "}
                <button className="text-indigo-600 font-bold hover:underline">
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
