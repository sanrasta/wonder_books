"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const currencies = [
  { code: "USD", symbol: "$", flag: "https://flagcdn.com/us.svg", name: "USD" },
  { code: "EUR", symbol: "€", flag: "https://flagcdn.com/eu.svg", name: "EUR" },
  { code: "GBP", symbol: "£", flag: "https://flagcdn.com/gb.svg", name: "GBP" },
  { code: "BRL", symbol: "R$", flag: "https://flagcdn.com/br.svg", name: "BRL" },
  { code: "ARS", symbol: "$", flag: "https://flagcdn.com/ar.svg", name: "ARS" },
  { code: "MXN", symbol: "$", flag: "https://flagcdn.com/mx.svg", name: "MXN" },
];

export default function WorldCupShipping() {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-50 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23059669' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800"
                  alt="World Cup Trophy"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg"
              >
                🏆 Champion Edition
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            {/* Countdown-style badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full mb-6 border border-emerald-200">
              <span className="text-emerald-700">⚽</span>
              <span className="font-fredoka text-emerald-800 text-sm md:text-base">
                Perfect for any football fan!
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold font-fredoka text-gray-900 mb-4">
              Shipped Worldwide
            </h2>
            <p className="text-gray-600 mb-8">
              Your personalized World Cup story will be printed on premium paper and shipped directly to your door, anywhere in the world.
            </p>

            {/* Shipping Options */}
            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-2xl p-4 shadow-md border border-emerald-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <p className="font-bold text-gray-900">Express Delivery</p>
                      <p className="text-sm text-gray-500">2-3 business days</p>
                    </div>
                  </div>
                  <span className="text-emerald-600 font-bold">+$9.99</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md border border-emerald-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📦</span>
                    <div>
                      <p className="font-bold text-gray-900">Standard Shipping</p>
                      <p className="text-sm text-gray-500">5-7 business days</p>
                    </div>
                  </div>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
              </div>

              {/* Certificate of Glory */}
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏅</span>
                  <div>
                    <p className="font-bold text-emerald-800">Certificate of Glory</p>
                    <p className="text-sm text-emerald-600">Included with Legend package</p>
                  </div>
                </div>
              </div>

              {/* Currency Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-200 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={selectedCurrency.flag}
                      alt={selectedCurrency.code}
                      width={20}
                      height={15}
                      className="rounded-sm"
                    />
                    <span className="font-medium text-gray-700">
                      {selectedCurrency.code} ({selectedCurrency.symbol})
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20"
                  >
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-emerald-50 transition-colors"
                      >
                        <Image
                          src={currency.flag}
                          alt={currency.code}
                          width={20}
                          height={15}
                          className="rounded-sm"
                        />
                        <span className="font-medium text-gray-700">
                          {currency.code} ({currency.symbol})
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Order Now — Become a Champion ⚽
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

