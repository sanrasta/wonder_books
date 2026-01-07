"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function DogTrainingFooter() {
  return (
    <footer className="bg-gradient-to-b from-orange-900 to-orange-950 text-white py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-xl">
                🐕
              </div>
              <span className="text-2xl font-bold">WonderTales</span>
            </div>
            <p className="text-orange-200 mb-4 max-w-md">
              Turn your furry best friend into the hero of their very own illustrated storybook adventure. A pawsome gift for dog lovers everywhere.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-orange-800 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors"
              >
                📸
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-orange-800 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors"
              >
                🐦
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-orange-800 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors"
              >
                📘
              </motion.a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 text-orange-300">Quick Links</h4>
            <ul className="space-y-2 text-orange-200">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Create Your Book
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-orange-300">Support</h4>
            <ul className="space-y-2 text-orange-200">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-orange-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-orange-300 text-sm">
            © 2026 WonderTales. Made with 🦴 for dog lovers.
          </p>
          <div className="flex gap-6 text-orange-300 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

