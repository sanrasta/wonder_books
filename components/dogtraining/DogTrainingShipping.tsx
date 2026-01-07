"use client";

import { motion } from "framer-motion";

const shippingFeatures = [
  {
    icon: "📦",
    title: "Premium Packaging",
    description: "Your book arrives in a sturdy, beautiful gift box",
  },
  {
    icon: "🌍",
    title: "Worldwide Delivery",
    description: "We ship to over 100 countries with tracking",
  },
  {
    icon: "⚡",
    title: "Express Options",
    description: "Need it fast? Choose express 3-5 day delivery",
  },
  {
    icon: "🎁",
    title: "Gift Ready",
    description: "Add a personalized note for that special touch",
  },
];

export default function DogTrainingShipping() {
  return (
    <section id="shipping" className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-fredoka mb-4 text-gray-900">
            From Our Pack to Yours 🐾
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every book is printed on-demand and shipped directly to your door. Perfect for dog lovers everywhere.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shippingFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow"
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Shipping Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Free Shipping on Orders Over $50
          </h3>
          <p className="text-orange-100 mb-6 max-w-xl mx-auto">
            Standard shipping takes 7-10 business days. Express shipping available for an additional fee.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 rounded-full px-6 py-2 backdrop-blur-sm">
              🇺🇸 USA: 5-7 days
            </div>
            <div className="bg-white/20 rounded-full px-6 py-2 backdrop-blur-sm">
              🇪🇺 Europe: 7-10 days
            </div>
            <div className="bg-white/20 rounded-full px-6 py-2 backdrop-blur-sm">
              🌏 Worldwide: 10-14 days
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

