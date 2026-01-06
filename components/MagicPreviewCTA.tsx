'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type ThemeVariant = 'kids' | 'valentines' | 'worldcup';

interface MagicPreviewCTAProps {
  theme: ThemeVariant;
}

const themes = {
  kids: {
    headline: 'See Your Child as the Hero',
    subheadline: 'Upload a photo and watch the magic happen — completely free',
    buttonText: 'Create My Free Magic Preview',
    buttonGlow: '#A5B4FC',
    buttonBg: 'linear-gradient(135deg, #A5B4FC 0%, #818CF8 100%)',
    accentColor: '#A5B4FC',
    modalTitle: 'Create Your Magic Preview',
    modalSubtitle: 'Just a few details and we\'ll generate your free cover',
    nameLabel: 'Child\'s Name',
    namePlaceholder: 'Emma',
    genderLabel: 'Hero Type',
    genderOptions: [
      { id: 'boy', label: 'Boy', icon: '👦' },
      { id: 'girl', label: 'Girl', icon: '👧' },
    ],
    emailPrompt: 'Where should we send your magic preview?',
    generateText: 'Generate My Magic Cover ✨',
    bgGradient: 'from-indigo-50 via-white to-purple-50',
    floatingIcons: ['✨', '🌟'],
  },
  valentines: {
    headline: 'See Your Love Story Come to Life',
    subheadline: 'Upload your couple photo and preview your romantic cover — free',
    buttonText: 'Create Our Free Preview',
    buttonGlow: '#F43F5E',
    buttonBg: 'linear-gradient(135deg, #F43F5E 0%, #EC4899 100%)',
    accentColor: '#F43F5E',
    modalTitle: 'Create Your Love Story Preview',
    modalSubtitle: 'Share your photo and we\'ll create something beautiful',
    nameLabel: 'Your Names',
    namePlaceholder: 'Alex & Jordan',
    genderLabel: 'This book is for...',
    genderOptions: [
      { id: 'her', label: 'For Her', icon: '👩' },
      { id: 'him', label: 'For Him', icon: '👨' },
      { id: 'us', label: 'For Us', icon: '💑' },
    ],
    emailPrompt: 'Where should we send your romantic preview?',
    generateText: 'Create Our Cover 💕',
    bgGradient: 'from-rose-50 via-white to-pink-50',
    floatingIcons: ['💕', '💘'],
  },
  worldcup: {
    headline: 'See Yourself Lifting the Trophy',
    subheadline: 'Upload your photo and become a World Cup champion — free preview',
    buttonText: 'Create My Champion Cover',
    buttonGlow: '#10B981',
    buttonBg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    accentColor: '#10B981',
    modalTitle: 'Create Your Champion Preview',
    modalSubtitle: 'Upload your photo and step onto the world stage',
    nameLabel: 'Player Name',
    namePlaceholder: 'Your Name',
    genderLabel: 'Your Role',
    genderOptions: [
      { id: 'striker', label: 'Striker', icon: '⚽' },
      { id: 'goalkeeper', label: 'Goalkeeper', icon: '🧤' },
      { id: 'captain', label: 'Captain', icon: '©️' },
    ],
    emailPrompt: 'Where should we send your champion preview?',
    generateText: 'Create My Cover ⚽',
    bgGradient: 'from-emerald-50 via-white to-green-50',
    floatingIcons: ['⚽', '🏆'],
  },
};

// Email validation
const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function MagicPreviewCTA({ theme }: MagicPreviewCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCover, setGeneratedCover] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    gender: themes[theme].genderOptions[0].id,
    photo: null as File | null,
    email: '',
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const t = themes[theme];

  // Cleanup photo preview URL
  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setFormData(prev => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleGenerate = () => {
    if (!formData.photo || !isEmailValid(formData.email)) return;
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      const mockCovers = {
        kids: 'https://images.unsplash.com/photo-1633469924738-52101af51d87?w=800&auto=format&fit=crop&q=60',
        valentines: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=60',
        worldcup: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=60',
      };
      setGeneratedCover(mockCovers[theme]);
      setStep(3);
    }, 3000);
  };

  const resetModal = () => {
    setStep(1);
    setIsGenerating(false);
    setGeneratedCover(null);
    setFormData({
      name: '',
      gender: themes[theme].genderOptions[0].id,
      photo: null,
      email: '',
    });
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(resetModal, 300);
  };

  return (
    <>
      {/* CTA Section */}
      <section className={`py-16 md:py-24 px-4 bg-gradient-to-b ${t.bgGradient}`}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating elements */}
          <div className="relative">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 left-10 text-4xl md:text-5xl hidden md:block"
            >
              {t.floatingIcons[0]}
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-4 right-10 text-4xl md:text-5xl hidden md:block"
            >
              {t.floatingIcons[1]}
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-fredoka mb-4 text-gray-900"
          >
            {t.headline}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            {t.subheadline}
          </motion.p>

          {/* Glowing CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative inline-block"
          >
            {/* Glow effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full blur-xl"
              style={{ backgroundColor: t.buttonGlow }}
            />
            
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="relative px-8 md:px-12 py-4 md:py-5 rounded-full text-white font-bold text-lg md:text-xl shadow-2xl"
              style={{ background: t.buttonBg }}
            >
              {t.buttonText}
            </motion.button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500"
          >
            <span className="flex items-center gap-1">
              <span className="text-green-500">✓</span> 100% Free Preview
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-500">✓</span> No Credit Card
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-500">✓</span> Instant Results
            </span>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 z-10"
              >
                ✕
              </button>

              {/* Decorative glow */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-30 -translate-y-1/2"
                style={{ backgroundColor: t.accentColor }}
              />

              <div className="relative p-6 md:p-8">
                {/* Step 1 & 2: Form */}
                {step < 3 && !isGenerating && (
                  <>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold font-fredoka text-gray-900 mb-2">
                        {t.modalTitle}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {t.modalSubtitle}
                      </p>
                    </div>

                    {/* Photo Upload */}
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photo
                      </label>
                      {!photoPreview ? (
                        <label 
                          className="flex flex-col items-center justify-center w-full h-40 rounded-2xl border-2 border-dashed cursor-pointer transition-colors hover:bg-gray-50"
                          style={{ borderColor: t.accentColor }}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                          <span className="text-4xl mb-2">📸</span>
                          <span className="text-sm text-gray-500">Tap to upload photo</span>
                        </label>
                      ) : (
                        <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden">
                          <Image src={photoPreview} alt="Preview" fill className="object-cover" />
                          <button
                            onClick={() => {
                              if (photoPreview) URL.revokeObjectURL(photoPreview);
                              setPhotoPreview(null);
                              setFormData(prev => ({ ...prev, photo: null }));
                            }}
                            className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium opacity-0 hover:opacity-100 transition-opacity"
                          >
                            Change
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Name Input */}
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.nameLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={t.namePlaceholder}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-current outline-none transition-colors"
                        style={{ borderColor: formData.name ? t.accentColor : undefined }}
                      />
                    </div>

                    {/* Gender/Recipient Selection */}
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.genderLabel}
                      </label>
                      <div className={`grid gap-2 ${t.genderOptions.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {t.genderOptions.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setFormData(prev => ({ ...prev, gender: option.id }))}
                            className={`p-3 rounded-xl border-2 transition-all ${
                              formData.gender === option.id
                                ? 'border-current shadow-md'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            style={{ 
                              borderColor: formData.gender === option.id ? t.accentColor : undefined,
                              backgroundColor: formData.gender === option.id ? `${t.accentColor}10` : undefined,
                            }}
                          >
                            <span className="text-2xl block mb-1">{option.icon}</span>
                            <span className="text-xs font-medium">{option.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Email - The Gate */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.emailPrompt}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-current outline-none transition-colors"
                        style={{ borderColor: isEmailValid(formData.email) ? t.accentColor : undefined }}
                      />
                    </div>

                    {/* Generate Button */}
                    <motion.button
                      whileHover={formData.photo && isEmailValid(formData.email) ? { scale: 1.02 } : {}}
                      whileTap={formData.photo && isEmailValid(formData.email) ? { scale: 0.98 } : {}}
                      onClick={handleGenerate}
                      disabled={!formData.photo || !isEmailValid(formData.email)}
                      className={`w-full py-4 rounded-full font-bold text-white text-lg transition-all ${
                        !formData.photo || !isEmailValid(formData.email) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      style={{ background: t.buttonBg }}
                    >
                      {t.generateText}
                    </motion.button>
                  </>
                )}

                {/* Generating State */}
                {isGenerating && (
                  <div className="py-12 text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="text-6xl mb-6 inline-block"
                    >
                      🪄
                    </motion.div>
                    <h3 className="text-xl font-bold font-fredoka text-gray-900 mb-2">
                      Creating your magic...
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Sending preview to <strong style={{ color: t.accentColor }}>{formData.email}</strong>
                    </p>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, ease: 'easeInOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: t.accentColor }}
                      />
                    </div>
                  </div>
                )}

                {/* Result State */}
                {step === 3 && generatedCover && (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', damping: 20 }}
                    >
                      <h3 className="text-2xl font-bold font-fredoka text-gray-900 mb-2">
                        Your Magic Preview! 🎉
                      </h3>
                      <p className="text-gray-500 text-sm mb-6">
                        We've also sent this to your email
                      </p>
                      
                      <div className="relative aspect-[3/4] w-48 mx-auto rounded-xl overflow-hidden shadow-2xl mb-6">
                        <Image src={generatedCover} alt="Generated Cover" fill className="object-cover" />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={closeModal}
                        className="w-full py-4 rounded-full font-bold text-white text-lg"
                        style={{ background: t.buttonBg }}
                      >
                        Continue to Full Book →
                      </motion.button>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

