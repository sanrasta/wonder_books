"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

type Recipient = "none" | "her" | "him" | "us";

const recipients = [
  { id: "her", emoji: "👩", label: "For Her", color: "from-pink-400 to-rose-400" },
  { id: "him", emoji: "👨", label: "For Him", color: "from-blue-400 to-indigo-400" },
  { id: "us", emoji: "💑", label: "For Us", color: "from-rose-400 to-pink-400" },
];

const storyThemes = [
  { id: "paris", emoji: "🗼", label: "Paris Romance", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400" },
  { id: "beach", emoji: "🌅", label: "Sunset Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400" },
  { id: "journey", emoji: "✈️", label: "Our Journey", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=400" },
  { id: "home", emoji: "🏡", label: "Coming Home", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=400" },
];

export default function LoveStoryCreator() {
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState<Recipient>("none");
  const [theme, setTheme] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages((prev) => [...prev, event.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #fda4af 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative">
        {/* Progress Bar */}
        <div className="relative h-2 md:h-3 bg-rose-100 rounded-full mb-16 md:mb-20 overflow-visible">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-400 to-pink-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          
          {/* Heart indicator */}
          <motion.div
            className="absolute -top-8 md:-top-10 flex flex-col items-center"
            animate={{ left: `${progress}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ x: "-50%" }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-2xl md:text-3xl"
            >
              💕
            </motion.span>
          </motion.div>
          
          {/* End heart */}
          <div className="absolute -top-8 md:-top-10 right-0 text-2xl md:text-3xl">
            💝
          </div>
        </div>

        {/* Main Card */}
        <motion.div
          layout
          className="bg-white/80 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-xl shadow-rose-200/50 border border-rose-100 relative"
        >
          {/* Decorative heart */}
          <motion.div
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-6 -right-6 md:-top-8 md:-right-8 w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-xl md:text-3xl text-white shadow-lg"
          >
            ♥
          </motion.div>

          <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-6 md:mb-8">
            Create Your Love Story 💕
          </h2>

          <AnimatePresence mode="wait">
            {/* Step 1: Recipient Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 md:space-y-10"
              >
                <p className="text-lg md:text-xl font-medium text-rose-400">
                  Who is this love story for?
                </p>
                <div className="grid grid-cols-3 gap-3 md:gap-6">
                  {recipients.map((r) => (
                    <motion.button
                      key={r.id}
                      onClick={() => setRecipient(r.id as Recipient)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 md:p-8 rounded-2xl md:rounded-[2rem] border-2 transition-all ${
                        recipient === r.id
                          ? "border-rose-300 bg-gradient-to-br " + r.color + " text-white"
                          : "border-rose-100 bg-white hover:border-rose-200"
                      }`}
                    >
                      <div className="text-4xl md:text-6xl mb-2 md:mb-4">{r.emoji}</div>
                      <div className={`font-bold text-xs md:text-base ${
                        recipient === r.id ? "text-white" : "text-rose-900"
                      }`}>
                        {r.label}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Photo Upload */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 md:space-y-10"
              >
                <p className="text-lg md:text-xl font-medium text-rose-400">
                  Add your favorite photos together
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedImages.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="aspect-square rounded-2xl overflow-hidden border-4 border-rose-200 relative"
                    >
                      <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => setUploadedImages((prev) => prev.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-rose-500 hover:bg-white"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  
                  <motion.button
                    onClick={() => fileInputRef.current?.click()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="aspect-square rounded-2xl border-4 border-dashed border-rose-200 bg-rose-50/50 flex flex-col items-center justify-center gap-2 hover:bg-rose-50 transition-colors"
                  >
                    <span className="text-3xl">📷</span>
                    <span className="text-rose-400 font-medium text-sm">Add Photo</span>
                  </motion.button>
                </div>

                <p className="text-rose-300 text-sm text-center">
                  Upload 3-10 photos for the best results
                </p>
              </motion.div>
            )}

            {/* Step 3: Theme Selection */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 md:space-y-10"
              >
                <p className="text-lg md:text-xl font-medium text-rose-400">
                  Choose your story theme
                </p>
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                  {storyThemes.map((t) => (
                    <motion.button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative overflow-hidden rounded-2xl md:rounded-[2rem] border-2 transition-all aspect-[4/3] ${
                        theme === t.id
                          ? "border-rose-400 ring-4 ring-rose-200"
                          : "border-rose-100 hover:border-rose-200"
                      }`}
                    >
                      <img
                        src={t.image}
                        alt={t.label}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-rose-900/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-left">
                        <div className="text-2xl md:text-3xl mb-1">{t.emoji}</div>
                        <div className="font-bold text-sm md:text-base">{t.label}</div>
                      </div>
                      {theme === t.id && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-rose-500">
                          ✓
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 md:mt-12 flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep((prev) => prev - 1)}
              className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-rose-400 ${
                step === 1 ? "invisible" : ""
              }`}
            >
              ← Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 2 }}
              onClick={() => step < totalSteps && setStep((prev) => prev + 1)}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold shadow-lg shadow-rose-300/50 text-lg md:text-xl"
            >
              {step === totalSteps ? "Create Our Book 💕" : "Continue 💕"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

