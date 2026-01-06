"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

type Gender = "none" | "girl" | "boy" | "pet";

const characters = [
  { id: "girl", emoji: "👧", label: "Little Girl", color: "#FFB7A1" },
  { id: "boy", emoji: "👦", label: "Little Boy", color: "#A5B4FC" },
  { id: "pet", emoji: "🐕", label: "A Furry Friend", color: "#A7F3D0" },
];

const adventures = [
  { id: "space", emoji: "🚀", label: "Space Explorer", image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400" },
  { id: "ocean", emoji: "🧜", label: "Ocean Kingdom", image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=400" },
  { id: "dragon", emoji: "🐉", label: "Dragon Quest", image: "https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&q=80&w=400" },
  { id: "fairy", emoji: "🧚", label: "Fairy Garden", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400" },
];

export default function StoryPotion() {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<Gender>("none");
  const [adventure, setAdventure] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#A7F3D0]/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Progress Bar */}
        <div className="relative h-3 md:h-4 bg-white/50 rounded-full mb-16 md:mb-20 overflow-visible">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#A5B4FC] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          
          {/* Running Character */}
          <motion.div
            className="absolute -top-10 md:-top-12 flex flex-col items-center"
            animate={{ left: `${progress}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ x: "-50%" }}
          >
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="text-3xl md:text-4xl"
            >
              🏃
            </motion.span>
          </motion.div>
          
          {/* Castle at end */}
          <div className="absolute -top-10 md:-top-12 right-0 text-3xl md:text-4xl">
            🏰
          </div>
        </div>

        {/* Main Card */}
        <motion.div
          layout
          className="glass-card rounded-3xl md:rounded-[3rem] p-6 md:p-12 plump-shadow relative"
        >
          {/* Sparkle decoration */}
          <motion.div
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-6 -right-6 md:-top-8 md:-right-8 w-16 h-16 md:w-24 md:h-24 bg-[#FEF3C7] rounded-full flex items-center justify-center text-2xl md:text-4xl plump-shadow"
          >
            ✨
          </motion.div>

          <h2 className="text-2xl md:text-4xl font-bold text-indigo-900 mb-6 md:mb-8">
            The Story Potion 🧪
          </h2>

          <AnimatePresence mode="wait">
            {/* Step 1: Character Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 md:space-y-10"
              >
                <p className="text-lg md:text-xl font-medium text-indigo-900/60">
                  Who is our brave adventurer?
                </p>
                <div className="grid grid-cols-3 gap-3 md:gap-6">
                  {characters.map((char) => (
                    <motion.button
                      key={char.id}
                      onClick={() => setGender(char.id as Gender)}
                      whileHover={{ scale: 1.05, rotate: [-2, 2, -2] }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 md:p-8 rounded-2xl md:rounded-[2rem] border-4 transition-all ${
                        gender === char.id
                          ? "border-indigo-300 scale-105"
                          : "border-transparent hover:border-indigo-100"
                      }`}
                      style={{
                        backgroundColor: gender === char.id ? char.color : "white",
                      }}
                    >
                      <div className="text-4xl md:text-6xl mb-2 md:mb-4">{char.emoji}</div>
                      <div className="font-bold text-xs md:text-base text-indigo-900">
                        {char.label}
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
                <p className="text-lg md:text-xl font-medium text-indigo-900/60">
                  Drop a photo into the Magic Frame!
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <motion.div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  animate={isDragging ? { scale: 1.02, borderColor: "#A5B4FC" } : {}}
                  className={`border-8 border-dashed rounded-3xl md:rounded-[3rem] h-64 md:h-80 flex flex-col items-center justify-center group hover:bg-white transition-colors cursor-pointer relative overflow-hidden ${
                    uploadedImage ? "border-green-300 bg-green-50/50" : "border-indigo-100 bg-indigo-50/50"
                  }`}
                >
                  {uploadedImage ? (
                    <>
                      <img
                        src={uploadedImage}
                        alt="Uploaded preview"
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                      />
                      <div className="relative z-10 text-center">
                        <div className="text-4xl md:text-5xl mb-4">✅</div>
                        <p className="font-bold text-green-600 text-center px-4 text-sm md:text-base">
                          Photo uploaded successfully!
                        </p>
                        <p className="text-green-500 text-xs md:text-sm mt-2">
                          Tap to change photo
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl md:text-5xl mb-4"
                      >
                        🖼️
                      </motion.div>
                      <p className="font-bold text-indigo-300 text-center px-4 text-sm md:text-base">
                        Tap to upload or drag & drop
                      </p>
                      <p className="text-indigo-200 text-xs md:text-sm mt-2">
                        Sparkles will appear!
                      </p>
                    </>
                  )}
                  
                  {/* Decorative sparkles */}
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 left-4 text-indigo-200"
                  >
                    ✦
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute bottom-10 right-10 md:right-20 text-indigo-200"
                  >
                    ✦
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute top-1/3 right-8 text-indigo-200"
                  >
                    ✦
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 3: Adventure Selection */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 md:space-y-10"
              >
                <p className="text-lg md:text-xl font-medium text-indigo-900/60">
                  Choose your magical adventure!
                </p>
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                  {adventures.map((adv) => (
                    <motion.button
                      key={adv.id}
                      onClick={() => setAdventure(adv.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative overflow-hidden p-5 md:p-8 rounded-2xl md:rounded-[2rem] border-4 transition-all ${
                        adventure === adv.id
                          ? "border-indigo-300"
                          : "border-transparent hover:border-indigo-100"
                      }`}
                    >
                      {/* Background image */}
                      <div className="absolute inset-0">
                        <img
                          src={adv.image}
                          alt={adv.label}
                          className={`w-full h-full object-cover transition-all ${
                            adventure === adv.id ? "opacity-40" : "opacity-20"
                          }`}
                        />
                        <div className={`absolute inset-0 ${
                          adventure === adv.id 
                            ? "bg-[#A5B4FC]/70" 
                            : "bg-white/80"
                        }`} />
                      </div>
                      
                      <div className="relative z-10">
                        <div className="text-4xl md:text-6xl mb-2 md:mb-4">{adv.emoji}</div>
                        <div className={`font-bold text-sm md:text-base ${
                          adventure === adv.id ? "text-white" : "text-indigo-900"
                        }`}>
                          {adv.label}
                        </div>
                      </div>
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
              className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-indigo-400 ${
                step === 1 ? "invisible" : ""
              }`}
            >
              ← Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 2 }}
              onClick={() => step < totalSteps && setStep((prev) => prev + 1)}
              className="bg-indigo-500 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold plump-shadow text-lg md:text-xl"
            >
              {step === totalSteps ? "Create My Book ✨" : "Continue ✨"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
