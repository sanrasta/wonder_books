'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  MagicBookWizardProps, 
  FormData, 
  ThemeConfig, 
  WizardTranslations,
  Locale 
} from './types';
import { getTheme } from './themes';
import { detectLocale, getTranslations, t } from './translations';

// Icons as simple SVG components to avoid external dependencies
const UploadIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Email validation helper
const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Pack Card Component
interface PackCardProps {
  pack: { id: number; name: string; pages: number; price: number; popular?: boolean; icon: string };
  selected: boolean;
  onSelect: () => void;
  theme: ThemeConfig;
  translations: WizardTranslations;
}

function PackCard({ pack, selected, onSelect, theme, translations }: PackCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={`relative p-6 rounded-[2rem] border-4 transition-all w-full text-left ${
        selected
          ? 'border-current shadow-xl scale-[1.02]'
          : 'bg-white border-transparent hover:border-gray-100'
      }`}
      style={{
        backgroundColor: selected ? theme.colors.backgroundAlt : 'white',
        borderColor: selected ? theme.colors.primary : undefined,
      }}
    >
      {pack.popular && (
        <div 
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wide"
          style={{ backgroundColor: theme.colors.accent }}
        >
          {translations.mostPopular}
        </div>
      )}
      <div className="text-4xl mb-3">{pack.icon}</div>
      <div className="font-bold text-lg font-fredoka" style={{ color: theme.colors.text }}>
        {pack.name}
      </div>
      <div className="text-sm opacity-60" style={{ color: theme.colors.textMuted }}>
        {t(translations.packPages, { count: pack.pages })}
      </div>
      <div className="mt-3 text-2xl font-bold font-fredoka" style={{ color: theme.colors.primary }}>
        ${pack.price}
      </div>
    </motion.button>
  );
}

// Main Wizard Component
export default function MagicBookWizard({ 
  theme: themeVariant, 
  onComplete,
  className = '' 
}: MagicBookWizardProps) {
  const [step, setStep] = useState(1);
  const [locale, setLocale] = useState<Locale>('en');
  const [isGenerating, setIsGenerating] = useState(false);
  const [magicCover, setMagicCover] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const theme = useMemo(() => getTheme(themeVariant), [themeVariant]);
  const translations = useMemo(() => getTranslations(themeVariant, locale), [themeVariant, locale]);

  const [formData, setFormData] = useState<FormData>({
    pack: 2,
    childName: '',
    childAge: '',
    gender: theme.genderOptions[0]?.id || '',
    yourName: '',
    partnerName: '',
    milestone: '',
    recipient: theme.genderOptions[0]?.id || '',
    photo: null,
    email: '',
    contactName: '',
    phone: '',
  });

  // Detect locale on mount
  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  // Clean up photo preview URL on unmount
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(currentData => ({ ...currentData, ...updates }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
      updateFormData({ photo: file });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
      updateFormData({ photo: file });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleGenerateMagic = () => {
    if (!formData.photo || !isEmailValid(formData.email)) return;

    setIsGenerating(true);

    // HERE: Trigger API to save the lead immediately
    // await saveLeadToDB({ email: formData.email, photo: formData.photo, theme: themeVariant });

    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      // Mock cover image based on theme
      const coverUrl = themeVariant === 'valentines'
        ? 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=60'
        : 'https://images.unsplash.com/photo-1633469924738-52101af51d87?w=800&auto=format&fit=crop&q=60';
      setMagicCover(coverUrl);
    }, 3000);
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(formData);
    }
  };

  const goNext = () => setStep(s => Math.min(theme.stepCount, s + 1));
  const goBack = () => setStep(s => Math.max(1, s - 1));

  // Progress indicator character based on theme
  const progressCharacter = themeVariant === 'valentines' 
    ? ['💑', '📸', '✍️', '💝'][step - 1] 
    : ['🎒', '👤', '📸', '📦'][step - 1];
  const goalIcon = themeVariant === 'valentines' ? '💝' : '🏰';

  return (
    <section 
      className={`min-h-screen py-20 px-4 flex items-center justify-center font-quicksand ${className}`}
      style={{ background: `linear-gradient(to bottom, ${theme.colors.backgroundAlt}, ${theme.colors.highlight})` }}
    >
      <div className="w-full max-w-lg">
        
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3 px-2">
            <span className="text-sm font-medium" style={{ color: theme.colors.textMuted }}>
              {t(translations.stepOf, { current: step, total: theme.stepCount })}
            </span>
            <span className="text-2xl">{goalIcon}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-3 bg-white/50 rounded-full overflow-visible">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${(step / theme.stepCount) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute top-0 left-0 h-full rounded-full"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: `calc(${(step / theme.stepCount) * 100}% - 1rem)` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute -top-8 text-3xl"
              style={{ left: 0 }}
            >
              {progressCharacter}
            </motion.div>
          </div>
        </div>

        {/* Main Card */}
        <motion.div 
          className="backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-xl border border-white/50 relative overflow-hidden"
          style={{ backgroundColor: theme.colors.cardBg }}
        >
          {/* Decorative sparkle */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: theme.colors.highlight }}
          >
            ✨
          </motion.div>

          <AnimatePresence mode="wait">
            
            {/* Step 1: Pack Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold font-fredoka" style={{ color: theme.colors.text }}>
                    {translations.step1Title}
                  </h2>
                  <p className="mt-2" style={{ color: theme.colors.textMuted }}>
                    {translations.step1Subtitle}
                  </p>
                </div>

                <div className="grid gap-4">
                  {theme.packs.map((pack) => (
                    <PackCard
                      key={pack.id}
                      pack={pack}
                      selected={formData.pack === pack.id}
                      onSelect={() => updateFormData({ pack: pack.id })}
                      theme={theme}
                      translations={translations}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Details (Different for Kids vs Valentine's) */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold font-fredoka" style={{ color: theme.colors.text }}>
                    {translations.step2Title}
                  </h2>
                  <p className="mt-2" style={{ color: theme.colors.textMuted }}>
                    {translations.step2Subtitle}
                  </p>
                </div>

                {themeVariant === 'kids' ? (
                  // Kids Form
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                        {translations.nameLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.childName}
                        onChange={(e) => updateFormData({ childName: e.target.value })}
                        placeholder={translations.namePlaceholder}
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-current outline-none text-lg"
                        style={{ borderColor: formData.childName ? theme.colors.primary : undefined }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                        {translations.ageLabel}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={formData.childAge}
                        onChange={(e) => updateFormData({ childAge: e.target.value })}
                        placeholder={translations.agePlaceholder}
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-current outline-none text-lg"
                        style={{ borderColor: formData.childAge ? theme.colors.primary : undefined }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                        {translations.genderLabel}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {theme.genderOptions.map((option) => (
                          <motion.button
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateFormData({ gender: option.id })}
                            className={`p-4 rounded-2xl border-4 transition-all flex flex-col items-center gap-2 ${
                              formData.gender === option.id
                                ? 'border-current shadow-lg'
                                : 'bg-white border-transparent hover:border-gray-100'
                            }`}
                            style={{
                              backgroundColor: formData.gender === option.id ? theme.colors.backgroundAlt : 'white',
                              borderColor: formData.gender === option.id ? theme.colors.primary : undefined,
                            }}
                          >
                            <span className="text-3xl">{option.icon}</span>
                            <span className="font-bold" style={{ color: theme.colors.text }}>{option.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Valentine's Form
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                          {translations.nameLabel}
                        </label>
                        <input
                          type="text"
                          value={formData.yourName}
                          onChange={(e) => updateFormData({ yourName: e.target.value })}
                          placeholder={translations.namePlaceholder}
                          className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-current outline-none"
                          style={{ borderColor: formData.yourName ? theme.colors.primary : undefined }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                          {translations.partnerNameLabel}
                        </label>
                        <input
                          type="text"
                          value={formData.partnerName}
                          onChange={(e) => updateFormData({ partnerName: e.target.value })}
                          placeholder={translations.partnerNamePlaceholder}
                          className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-current outline-none"
                          style={{ borderColor: formData.partnerName ? theme.colors.primary : undefined }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                        {translations.milestoneLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.milestone}
                        onChange={(e) => updateFormData({ milestone: e.target.value })}
                        placeholder={translations.milestonePlaceholder}
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-current outline-none"
                        style={{ borderColor: formData.milestone ? theme.colors.primary : undefined }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                        {translations.genderLabel}
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {theme.genderOptions.map((option) => (
                          <motion.button
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateFormData({ recipient: option.id })}
                            className={`p-4 rounded-2xl border-4 transition-all flex flex-col items-center gap-2 ${
                              formData.recipient === option.id
                                ? 'border-current shadow-lg'
                                : 'bg-white border-transparent hover:border-gray-100'
                            }`}
                            style={{
                              backgroundColor: formData.recipient === option.id ? theme.colors.backgroundAlt : 'white',
                              borderColor: formData.recipient === option.id ? theme.colors.primary : undefined,
                            }}
                          >
                            <span className="text-2xl">{option.icon}</span>
                            <span className="font-bold text-sm" style={{ color: theme.colors.text }}>{option.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Photo Upload + Email Gate */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-center"
              >
                {/* Pre-generation state */}
                {!magicCover && !isGenerating ? (
                  <>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold font-fredoka" style={{ color: theme.colors.text }}>
                        {translations.step3Title}
                      </h2>
                      <p className="mt-2" style={{ color: theme.colors.textMuted }}>
                        {translations.step3Subtitle}
                      </p>
                    </div>

                    {/* Photo Upload Area */}
                    {!photoPreview ? (
                      <label
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="block w-full aspect-video rounded-[2rem] border-4 border-dashed cursor-pointer flex flex-col items-center justify-center group transition-colors"
                        style={{ 
                          borderColor: theme.colors.primary,
                          backgroundColor: theme.colors.backgroundAlt,
                        }}
                      >
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="bg-white p-4 rounded-full shadow-lg mb-4"
                        >
                          <div style={{ color: theme.colors.primary }}>
                            <UploadIcon />
                          </div>
                        </motion.div>
                        <span className="font-bold" style={{ color: theme.colors.primary }}>
                          {translations.uploadPrompt}
                        </span>
                        <span className="text-sm mt-1" style={{ color: theme.colors.textMuted }}>
                          {translations.uploadHint}
                        </span>
                      </label>
                    ) : (
                      // Photo Preview (Circular)
                      <div className="relative w-32 h-32 mx-auto rounded-full border-4 border-white shadow-xl overflow-hidden">
                        <Image
                          src={photoPreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => {
                            if (photoPreview) URL.revokeObjectURL(photoPreview);
                            setPhotoPreview(null);
                            updateFormData({ photo: null });
                          }}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-bold opacity-0 hover:opacity-100 transition-opacity"
                        >
                          {translations.changePhoto}
                        </button>
                      </div>
                    )}

                    {/* Email Gate (appears after photo upload) */}
                    <AnimatePresence>
                      {photoPreview && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div 
                            className="p-5 rounded-2xl text-left mb-4 shadow-inner"
                            style={{ backgroundColor: theme.colors.highlight }}
                          >
                            <div className="flex items-center gap-2 mb-2 font-bold" style={{ color: theme.colors.text }}>
                              <LockIcon />
                              <span className="text-sm">{translations.emailGateTitle}</span>
                            </div>
                            <p className="text-xs mb-4" style={{ color: theme.colors.textMuted }}>
                              {translations.emailGateDescription}
                            </p>

                            <div className="relative">
                              <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: theme.colors.textMuted }}>
                                <MailIcon />
                              </div>
                              <input
                                type="email"
                                placeholder={translations.emailPlaceholder}
                                value={formData.email}
                                onChange={(e) => updateFormData({ email: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 outline-none transition-colors"
                                style={{ 
                                  borderColor: isEmailValid(formData.email) ? theme.colors.primary : '#E5E7EB',
                                }}
                              />
                            </div>
                          </div>

                          <motion.button
                            whileHover={isEmailValid(formData.email) ? { scale: 1.02, y: -2 } : {}}
                            whileTap={isEmailValid(formData.email) ? { scale: 0.98 } : {}}
                            onClick={handleGenerateMagic}
                            disabled={!isEmailValid(formData.email)}
                            className={`w-full p-4 rounded-full font-bold text-white text-lg shadow-xl flex items-center justify-center gap-2 transition-all ${
                              !isEmailValid(formData.email) ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            style={{ 
                              backgroundColor: isEmailValid(formData.email) ? theme.colors.accent : '#D1D5DB',
                            }}
                          >
                            <SparklesIcon />
                            {translations.generateButton}
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : isGenerating ? (
                  // Loading State
                  <div className="py-12 flex flex-col items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                      className="text-6xl mb-6"
                    >
                      🪄
                    </motion.div>
                    <h3 className="text-xl font-bold font-fredoka" style={{ color: theme.colors.primary }}>
                      {translations.generatingTitle}
                    </h3>
                    <p className="mt-2 text-sm" style={{ color: theme.colors.textMuted }}>
                      {translations.sendingTo} <br />
                      <span className="font-bold" style={{ color: theme.colors.primary }}>{formData.email}</span>
                    </p>
                    <div className="w-full bg-gray-200 h-3 rounded-full mt-6 relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3 }}
                        className="absolute h-full rounded-full"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                    </div>
                  </div>
                ) : (
                  // Result State
                  <div className="relative">
                    <h2 className="text-2xl font-bold font-fredoka mb-4" style={{ color: theme.colors.text }}>
                      {translations.resultTitle} 🎉
                    </h2>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="relative aspect-[3/4] w-3/4 mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-white"
                      style={{ transform: 'rotate(1deg)' }}
                    >
                      <Image
                        src={magicCover!}
                        alt="Magic Cover"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 4: Contact Details */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold font-fredoka" style={{ color: theme.colors.text }}>
                    {translations.step4Title}
                  </h2>
                  <p className="mt-2" style={{ color: theme.colors.textMuted }}>
                    {translations.step4Subtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                      {translations.contactNameLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => updateFormData({ contactName: e.target.value })}
                      placeholder={translations.contactNamePlaceholder}
                      className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-current outline-none text-lg"
                      style={{ borderColor: formData.contactName ? theme.colors.primary : undefined }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                      {translations.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData({ phone: e.target.value })}
                      placeholder={translations.phonePlaceholder}
                      className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-current outline-none text-lg"
                      style={{ borderColor: formData.phone ? theme.colors.primary : undefined }}
                    />
                  </div>
                </div>

                {/* Email confirmation badge */}
                {formData.email && (
                  <div 
                    className="flex items-center gap-2 p-3 rounded-xl text-sm"
                    style={{ backgroundColor: theme.colors.highlight, color: theme.colors.text }}
                  >
                    <MailIcon />
                    <span>Email: <strong>{formData.email}</strong></span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goBack}
                className="p-4 rounded-full bg-white border border-gray-200 hover:bg-gray-50"
                style={{ color: theme.colors.textMuted }}
              >
                <ArrowLeftIcon />
              </motion.button>
            )}

            {/* Continue button (not shown on step 3 until cover is generated) */}
            {step !== 3 && (
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={step === 4 ? handleComplete : goNext}
                className="flex-1 p-4 rounded-full font-bold text-white text-lg shadow-xl"
                style={{ backgroundColor: theme.colors.accent }}
              >
                {step === 4 ? translations.finalize : translations.continue}
              </motion.button>
            )}

            {/* Special button for step 3 when cover is done */}
            {step === 3 && magicCover && (
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={goNext}
                className="flex-1 p-4 rounded-full font-bold text-white text-lg shadow-xl animate-pulse"
                style={{ backgroundColor: theme.colors.primary }}
              >
                {translations.finalize} ({translations.finalizeSubtitle})
                <ChevronRightIcon />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

