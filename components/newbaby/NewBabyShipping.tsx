"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function NewBabyShipping() {
  const [currency, setCurrency] = useState("USD");

  return (
    <section className="py-16 md:py-24 bg-pink-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <span className="absolute top-1/4 left-1/4 text-6xl text-pink-300 rotate-12">👶</span>
        <span className="absolute bottom-1/3 right-1/4 text-8xl text-pink-200 -rotate-12">🍼</span>
        <span className="absolute top-1/2 left-3/4 text-5xl text-pink-400 rotate-6">🧸</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full mb-4 border border-pink-200 text-pink-700 font-fredoka text-sm">
            <span className="text-xl">👶</span> Baby Edition
          </div>
          <h3 className="text-3xl md:text-4xl font-bold font-fredoka text-pink-900 mb-4">
            A Gift They'll Treasure Forever
          </h3>
          <p className="text-lg text-pink-700 max-w-2xl mx-auto">
            Perfect for baby showers, birth announcements, or first birthdays. A keepsake the whole family will cherish.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white"
          >
            <Image
              src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1000"
              alt="New baby"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent flex items-end p-6">
              <p className="text-white text-xl font-semibold font-fredoka">
                "Welcome to the world, little one!"
              </p>
            </div>
          </motion.div>

          {/* Shipping Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-left space-y-6"
          >
            <div className="flex items-center gap-4 bg-pink-100 p-4 rounded-xl border border-pink-200">
              <span className="text-4xl">🎀</span>
              <div>
                <h4 className="font-bold text-pink-900 text-lg">Perfect Baby Shower Gift!</h4>
                <p className="text-pink-700 text-sm">A unique keepsake for the family.</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Shipping Options */}
              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <p className="font-semibold text-pink-800">Express Delivery</p>
                    <p className="text-sm text-pink-600">2-3 business days</p>
                  </div>
                </div>
                <span className="font-bold text-pink-900">+$9.99</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📦</span>
                  <div>
                    <p className="font-semibold text-pink-800">Standard Shipping</p>
                    <p className="text-sm text-pink-600">5-7 business days</p>
                  </div>
                </div>
                <span className="font-bold text-pink-900">FREE</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-pink-100 rounded-xl shadow-sm border border-pink-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="font-semibold text-pink-800">Gift Box Packaging</p>
                    <p className="text-sm text-pink-600">Baby-themed gift box</p>
                  </div>
                </div>
                <span className="font-bold text-pink-900">+$5.99</span>
              </div>
            </div>

            {/* Currency Switcher */}
            <div className="relative inline-block text-left w-full">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md appearance-none bg-white shadow-sm"
              >
                <option value="USD">🇺🇸 USD ($)</option>
                <option value="EUR">🇪🇺 EUR (€)</option>
                <option value="GBP">🇬🇧 GBP (£)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              Create Baby Welcome Book 👶
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

