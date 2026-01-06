"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const currencies = [
  { code: "USD", symbol: "$", flag: "us", name: "US Dollar" },
  { code: "EUR", symbol: "€", flag: "eu", name: "Euro" },
  { code: "GBP", symbol: "£", flag: "gb", name: "British Pound" },
  { code: "CAD", symbol: "$", flag: "ca", name: "Canadian Dollar" },
  { code: "AUD", symbol: "$", flag: "au", name: "Australian Dollar" },
];

export default function ValentinesShipping() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [daysUntilValentines, setDaysUntilValentines] = useState(0);

  useEffect(() => {
    const valentinesDay = new Date(new Date().getFullYear(), 1, 14);
    const today = new Date();
    if (today > valentinesDay) {
      valentinesDay.setFullYear(valentinesDay.getFullYear() + 1);
    }
    const diffTime = valentinesDay.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilValentines(diffDays);
  }, []);

  const handleCurrencySelect = (currency: typeof currencies[0]) => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 to-pink-50" />
      
      <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative order-2 md:order-1"
        >
          <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-48 h-48 md:w-64 md:h-64 bg-rose-200/40 rounded-full blur-3xl" />
          
          <img
            src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=800"
            className="rounded-3xl md:rounded-[4rem] shadow-2xl shadow-rose-300/30 relative z-10 border-8 md:border-[16px] border-white w-full"
            alt="Gift wrapped book"
          />
          
          {/* Floating heart */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -right-4 md:right-0 z-20"
          >
            <span className="text-4xl md:text-6xl">💝</span>
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
          {/* Countdown Badge */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg text-white"
          >
            <span className="text-xl">⏰</span>
            <span className="font-bold text-sm md:text-base">
              {daysUntilValentines} days until Valentine&apos;s Day!
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-rose-950">
            Arrives in Time for Love
          </h2>

          <p className="text-base md:text-lg text-rose-400">
            Order now to guarantee your personalized love story arrives 
            beautifully gift-wrapped before Valentine&apos;s Day.
          </p>

          <div className="space-y-4">
            {/* Shipping Options */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl md:rounded-3xl border border-rose-100 shadow-lg"
            >
              <div className="flex items-center gap-3 md:gap-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-rose-400 to-pink-400 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl text-white">
                  🚀
                </div>
                <div>
                  <div className="font-bold text-rose-900 text-sm md:text-base">
                    Express Delivery
                  </div>
                  <div className="text-xs md:text-sm text-rose-400">
                    2-3 business days
                  </div>
                </div>
                <div className="ml-auto font-bold text-rose-500">
                  +$9.99
                </div>
              </div>
              
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-rose-100 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl">
                  📦
                </div>
                <div>
                  <div className="font-bold text-rose-900 text-sm md:text-base">
                    Standard Shipping
                  </div>
                  <div className="text-xs md:text-sm text-rose-400">
                    5-7 business days
                  </div>
                </div>
                <div className="ml-auto font-bold text-green-500">
                  FREE
                </div>
              </div>
            </motion.div>

            {/* Gift Wrap Badge */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-2xl border border-amber-200">
              <span className="text-2xl">🎁</span>
              <div>
                <div className="font-bold text-amber-800 text-sm">Complimentary Gift Wrapping</div>
                <div className="text-amber-600 text-xs">Elegant rose gold ribbon included</div>
              </div>
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border-2 border-rose-100 flex items-center gap-2 font-bold text-rose-900 cursor-pointer w-fit"
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
                  className="w-4 h-4 text-rose-400"
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

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden z-30 min-w-[200px]"
                  >
                    {currencies.map((currency) => (
                      <motion.button
                        key={currency.code}
                        whileHover={{ backgroundColor: "#FFF1F2" }}
                        onClick={() => handleCurrencySelect(currency)}
                        className={`w-full p-3 md:p-4 flex items-center gap-3 text-left ${
                          selectedCurrency.code === currency.code
                            ? "bg-rose-50"
                            : ""
                        }`}
                      >
                        <img
                          src={`https://flagcdn.com/w40/${currency.flag}.png`}
                          className="w-6 h-4 rounded-sm"
                          alt={currency.code}
                        />
                        <div>
                          <div className="font-bold text-rose-900 text-sm">
                            {currency.code} ({currency.symbol})
                          </div>
                          <div className="text-xs text-rose-400">
                            {currency.name}
                          </div>
                        </div>
                        {selectedCurrency.code === currency.code && (
                          <span className="ml-auto text-rose-500">✓</span>
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
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 md:py-6 rounded-full text-xl md:text-2xl font-bold shadow-xl shadow-rose-300/50"
          >
            Order Now — Get it by Feb 14 💕
          </motion.button>
        </motion.div>
      </div>

      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </section>
  );
}

