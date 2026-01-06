"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NewBabyFooter() {
  return (
    <footer className="bg-pink-800 text-pink-100 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="md:col-span-1">
          <Link href="/" className="text-white text-3xl font-bold font-fredoka flex items-center gap-2 mb-4">
            <span className="text-4xl">👶</span> WonderTales
          </Link>
          <p className="text-pink-200 text-sm mb-4">
            Creating personalized welcome stories that celebrate new arrivals and cherish family moments.
          </p>
          <div className="flex space-x-4 text-pink-300">
            <motion.a whileHover={{ scale: 1.1 }} href="#" className="hover:text-white transition-colors">
              <span className="text-xl">📸</span>
            </motion.a>
            <motion.a whileHover={{ scale: 1.1 }} href="#" className="hover:text-white transition-colors">
              <span className="text-xl">📘</span>
            </motion.a>
            <motion.a whileHover={{ scale: 1.1 }} href="#" className="hover:text-white transition-colors">
              <span className="text-xl">🐦</span>
            </motion.a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-lg font-bold text-white mb-4">Quick Links</h5>
          <ul className="space-y-2 text-pink-200">
            <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            <li><Link href="#examples" className="hover:text-white transition-colors">Examples</Link></li>
            <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h5 className="text-lg font-bold text-white mb-4">Support</h5>
          <ul className="space-y-2 text-pink-200">
            <li><Link href="#help" className="hover:text-white transition-colors">Help Center</Link></li>
            <li><Link href="#shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
            <li><Link href="#returns" className="hover:text-white transition-colors">Returns</Link></li>
            <li><Link href="#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Book Types */}
        <div>
          <h5 className="text-lg font-bold text-white mb-4">Baby Books</h5>
          <ul className="space-y-2 text-pink-200">
            <li><Link href="#" className="hover:text-white transition-colors">👶 Welcome Baby</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">👧 Big Sister Story</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">👦 Big Brother Story</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">👨‍👩‍👧 Family Welcome</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-pink-700 pt-8 text-center text-pink-300 text-sm">
        <p>&copy; 2025 WonderTales. All rights reserved.</p>
        <p className="mt-1">Made with <span className="text-pink-400">💕</span> for growing families</p>
      </div>
    </footer>
  );
}

