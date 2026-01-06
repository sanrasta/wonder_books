"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ValentinesFooter() {
  return (
    <footer className="bg-gradient-to-b from-rose-900 to-rose-950 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-xl"
              >
                ♥
              </motion.div>
              <span className="text-2xl font-bold">WonderTales</span>
            </div>
            <p className="text-rose-300 text-sm max-w-xs mb-6">
              Creating personalized love stories that become treasured keepsakes 
              for couples around the world.
            </p>
            
            {/* Back to Kids Site */}
            <Link href="/" className="inline-flex items-center gap-2 text-rose-300 hover:text-white transition-colors text-sm">
              <span>←</span>
              <span>Back to Kids Books</span>
            </Link>
          </div>

          {/* Links */}
          <div>
            <h5 className="font-bold text-lg mb-4">Quick Links</h5>
            <ul className="space-y-2 text-rose-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Pricing</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Examples</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-bold text-lg mb-4">Support</h5>
            <ul className="space-y-2 text-rose-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Shipping Info</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Returns</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-rose-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-rose-400 text-sm">
            © 2025 WonderTales. All rights reserved.
          </p>
          <p className="text-rose-400 text-sm flex items-center gap-2">
            Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-rose-400"
            >
              ♥
            </motion.span>
            for lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

