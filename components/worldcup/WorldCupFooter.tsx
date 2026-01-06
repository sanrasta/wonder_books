"use client";

import Link from "next/link";

export default function WorldCupFooter() {
  return (
    <footer className="bg-gradient-to-b from-emerald-900 to-emerald-950 text-white py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚽</span>
              <span className="font-fredoka font-bold text-xl">WonderTales</span>
            </div>
            <p className="text-emerald-300 text-sm mb-4">
              Creating personalized World Cup stories that inspire dreams of footballing glory.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm"
            >
              <span>←</span>
              <span>Back to Kids Books</span>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold mb-4 text-emerald-100">Quick Links</h5>
            <ul className="space-y-2 text-emerald-300">
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
            <h5 className="font-bold mb-4 text-emerald-100">Support</h5>
            <ul className="space-y-2 text-emerald-300">
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

          {/* Featured Teams */}
          <div>
            <h5 className="font-bold mb-4 text-emerald-100">Popular Stories</h5>
            <ul className="space-y-2 text-emerald-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">🇧🇷 Brazil Champion</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">🇦🇷 Argentina Glory</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">🇫🇷 France Victory</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">🇩🇪 Germany Legend</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-emerald-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-emerald-400 text-sm">
            © 2025 WonderTales. All rights reserved.
          </p>
          <p className="text-emerald-400 text-sm flex items-center gap-1">
            Made with <span className="text-emerald-300">⚽</span> for football fans everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

