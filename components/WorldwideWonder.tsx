"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const currencies = [
  { code: "USD", symbol: "$", flag: "us", name: "US Dollar" },
  { code: "EUR", symbol: "€", flag: "eu", name: "Euro" },
  { code: "GBP", symbol: "£", flag: "gb", name: "British Pound" },
  { code: "CAD", symbol: "$", flag: "ca", name: "Canadian Dollar" },
  { code: "AUD", symbol: "$", flag: "au", name: "Australian Dollar" },
  { code: "JPY", symbol: "¥", flag: "jp", name: "Japanese Yen" },
];

export default function WorldwideWonder() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const handleCurrencySelect = (currency: typeof currencies[0]) => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };

  return (
    <section className="py-16 md:py-24 map-texture">
      <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Map Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative order-2 md:order-1"
        >
          {/* Background blur */}
          <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-48 h-48 md:w-64 md:h-64 bg-indigo-100/40 rounded-full blur-3xl" />
          
          <img
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
            className="rounded-3xl md:rounded-[4rem] shadow-2xl rotate-2 md:rotate-3 relative z-10 border-8 md:border-[16px] border-white w-full"
            alt="World Map with pins"
          />
          
          {/* Floating plane */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -30, 0],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-4 md:left-0 z-20"
          >
            <span className="text-4xl md:text-6xl">✈️</span>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 md:space-y-8 order-1 md:order-2"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full shadow-sm text-xs md:text-sm font-bold text-indigo-500">
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
            SHIPPING FROM THE WONDER-WORKSHOP
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-indigo-950">
            Worldwide Wonder
          </h2>

          <p className="text-base md:text-lg text-indigo-900/60">
            We deliver to every corner of the map—from the peaks of Mount Everest
            to the cozy streets of London.
          </p>

          <div className="space-y-4">
            {/* Shipping Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-4 md:p-6 rounded-2xl md:rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 plump-shadow"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-100 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl">
                  🌍
                </div>
                <div>
                  <div className="font-bold text-indigo-900 text-sm md:text-base">
                    Ship to Any Kingdom
                  </div>
                  <div className="text-xs md:text-sm opacity-50">
                    Global shipping in 5-7 days
                  </div>
                </div>
              </div>
              <div className="bg-indigo-50 px-3 md:px-4 py-2 rounded-lg md:rounded-xl border-2 border-dashed border-indigo-200 font-bold text-indigo-400 uppercase text-[10px] md:text-xs tracking-widest">
                Passport Stamp
              </div>
            </motion.div>

            {/* Currency Selector with Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border-4 border-indigo-50 flex items-center gap-2 font-bold text-indigo-900 cursor-pointer w-fit"
              >
                <img
                  src={`https://flagcdn.com/w40/${selectedCurrency.flag}.png`}
                  className="w-5 md:w-6 h-3 md:h-4 rounded-sm"
                  alt={selectedCurrency.code}
                />
                <span className="text-sm md:text-base">
                  {selectedCurrency.code} ({selectedCurrency.symbol})
                </span>
                <motion.svg
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-xl border-4 border-indigo-50 overflow-hidden z-30 min-w-[200px]"
                  >
                    {currencies.map((currency) => (
                      <motion.button
                        key={currency.code}
                        whileHover={{ backgroundColor: "#EEF2FF" }}
                        onClick={() => handleCurrencySelect(currency)}
                        className={`w-full p-3 md:p-4 flex items-center gap-3 text-left ${
                          selectedCurrency.code === currency.code
                            ? "bg-indigo-50"
                            : ""
                        }`}
                      >
                        <img
                          src={`https://flagcdn.com/w40/${currency.flag}.png`}
                          className="w-6 h-4 rounded-sm"
                          alt={currency.code}
                        />
                        <div>
                          <div className="font-bold text-indigo-900 text-sm">
                            {currency.code} ({currency.symbol})
                          </div>
                          <div className="text-xs text-indigo-400">
                            {currency.name}
                          </div>
                        </div>
                        {selectedCurrency.code === currency.code && (
                          <span className="ml-auto text-indigo-500">✓</span>
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97, y: 2 }}
            className="w-full bg-[#A5B4FC] text-white py-4 md:py-6 rounded-full text-xl md:text-2xl font-bold plump-shadow"
          >
            Claim Your Book
          </motion.button>
        </motion.div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </section>
  );
}
