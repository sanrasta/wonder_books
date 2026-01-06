'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { HowItWorksProps, ProcessStep, ProcessTheme } from './types';
import { getProcessTheme } from './themes';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Mobile Step Card Component
interface MobileStepCardProps {
  step: ProcessStep;
  theme: ProcessTheme;
  index: number;
}

function MobileStepCard({ step, theme, index }: MobileStepCardProps) {
  return (
    <div 
      className="rounded-xl p-4 mb-3"
      style={{ backgroundColor: theme.colors.card }}
    >
      {/* Step Number & Title Row */}
      <div className="flex items-center gap-2 mb-2">
        <span 
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{ backgroundColor: theme.colors.accent, color: 'white' }}
        >
          {index + 1}
        </span>
        <h3 
          className="text-base font-bold font-fredoka"
          style={{ color: theme.colors.text }}
        >
          {step.title}
        </h3>
      </div>

      {/* Image - Compact */}
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-2">
        <Image
          src={step.illustration}
          alt={step.title}
          fill
          className="object-cover"
        />
        {/* Overlay with subtitle */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
          <p className="text-white text-[11px] font-medium">
            {step.subtitle}
          </p>
        </div>
      </div>

      {/* Bullet Points - Compact */}
      <ul className="space-y-1">
        {step.bulletPoints.slice(0, 3).map((point, idx) => (
          <li 
            key={idx}
            className="flex items-start gap-1.5 text-[11px]"
          >
            <span 
              className="w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: theme.colors.accent }}
            >
              <svg className="w-1.5 h-1.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span style={{ color: theme.colors.text }}>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Desktop Step Content Component
interface StepContentProps {
  step: ProcessStep;
  theme: ProcessTheme;
  isActive: boolean;
}

function StepContent({ step, theme, isActive }: StepContentProps) {
  return (
    <div 
      className={`grid md:grid-cols-2 gap-8 items-center transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'
      }`}
    >
      {/* Text Content */}
      <div className="space-y-4">
        <div>
          <p 
            className="text-sm font-bold uppercase tracking-widest mb-2"
            style={{ color: theme.colors.accent }}
          >
            {step.subtitle}
          </p>
          <h3 
            className="text-2xl lg:text-3xl font-bold font-fredoka leading-tight"
            style={{ color: theme.colors.text }}
          >
            {step.description.split('.')[0]}.
          </h3>
        </div>
        
        <p 
          className="text-base leading-relaxed"
          style={{ color: theme.colors.textMuted }}
        >
          {step.description}
        </p>

        <ul className="space-y-2">
          {step.bulletPoints.map((point, index) => (
            <li 
              key={index}
              className="flex items-start gap-2"
            >
              <span 
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                style={{ backgroundColor: theme.colors.accent }}
              >
                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm" style={{ color: theme.colors.text }}>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Illustration */}
      <div className="relative hidden md:block">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={step.illustration}
            alt={step.title}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Decorative element */}
        <div 
          className="absolute -top-4 -right-4 w-14 h-14 rounded-xl rotate-12 flex items-center justify-center text-2xl shadow-lg"
          style={{ backgroundColor: theme.colors.backgroundAlt }}
        >
          {theme.variant === 'valentines' ? '💕' : theme.variant === 'worldcup' ? '⚽' : '✨'}
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function HowItWorks({ theme: themeVariant, className = '' }: HowItWorksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const theme = useMemo(() => getProcessTheme(themeVariant), [themeVariant]);
  const totalSteps = theme.steps.length;

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP animations - only on desktop
  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      // Main scroll trigger for the entire section
      const mainTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalSteps * 100}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const prog = self.progress;
          setProgress(Math.round(prog * 100));
          
          const stepProgress = prog * totalSteps;
          const newStep = Math.min(Math.floor(stepProgress), totalSteps - 1);
          setActiveStep(newStep);
        },
      });

      // Animate progress bar fill
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalSteps * 100}%`,
          scrub: true,
        },
      });

      // Animate indicator position
      gsap.to(indicatorRef.current, {
        left: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalSteps * 100}%`,
          scrub: true,
        },
      });

      return () => {
        mainTrigger.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [totalSteps, isMobile]);

  const currentStep = theme.steps[activeStep];

  // Mobile Layout
  if (isMobile) {
    return (
      <section
        className={`pt-20 pb-6 px-3 ${className}`}
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* Mobile Header */}
        <div className="mb-4">
          <h2 
            className="text-xl font-bold font-fredoka mb-1"
            style={{ color: theme.colors.text }}
          >
            {theme.sectionTitle}
          </h2>
          <p className="text-sm" style={{ color: theme.colors.textMuted }}>
            {theme.sectionSubtitle}
          </p>
        </div>

        {/* Mobile Steps */}
        {theme.steps.map((step, index) => (
          <MobileStepCard
            key={step.id}
            step={step}
            theme={theme}
            index={index}
          />
        ))}
      </section>
    );
  }

  // Desktop Layout with scroll animations
  return (
    <section
      ref={containerRef}
      className={`min-h-screen relative ${className}`}
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="h-screen flex flex-col">
        {/* Header with Progress */}
        <div className="pt-28 lg:pt-32 pb-3 px-6 lg:px-16">
          <div className="max-w-6xl mx-auto">
            {/* Section Title & Progress Bar Row */}
            <div className="flex items-center justify-between gap-6 mb-4">
              <h2 
                className="text-xl lg:text-2xl font-bold font-fredoka whitespace-nowrap"
                style={{ color: theme.colors.text }}
              >
                {currentStep?.title || theme.sectionTitle}
              </h2>
              
              {/* Progress Bar */}
              <div className="flex items-center gap-4 flex-1 max-w-xl">
                <div className="relative flex-1 h-2 rounded-full overflow-visible" style={{ backgroundColor: theme.colors.progressBar }}>
                  {/* Fill */}
                  <div
                    ref={progressRef}
                    className="absolute top-0 left-0 h-full rounded-full origin-left"
                    style={{ 
                      backgroundColor: theme.colors.progressFill,
                      transform: 'scaleX(0)',
                      width: '100%',
                    }}
                  />
                  {/* Sliding Indicator */}
                  <div
                    ref={indicatorRef}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg z-10"
                    style={{ 
                      backgroundColor: theme.colors.progressIndicator,
                      left: '0%',
                    }}
                  >
                    <div className="w-3 h-3 rounded-full bg-white flex items-center justify-center">
                      <div 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: theme.colors.progressFill }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {theme.steps.map((step, index) => (
                  <button
                    key={step.id}
                    className={`text-sm font-medium transition-all duration-300 ${
                      index === activeStep 
                        ? 'font-bold' 
                        : 'opacity-40'
                    }`}
                    style={{ 
                      color: index === activeStep ? theme.colors.text : theme.colors.textMuted 
                    }}
                  >
                    {index === activeStep ? (
                      <span className="flex items-center gap-1">
                        <span>STEP</span>
                        <span>{step.number}</span>
                      </span>
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Progress Percentage */}
              <div className="flex items-center gap-2">
                <span 
                  className="text-xs uppercase tracking-wider"
                  style={{ color: theme.colors.textMuted }}
                >
                  Progress
                </span>
                <span 
                  className="text-base font-bold font-fredoka"
                  style={{ color: theme.colors.accent }}
                >
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-6 lg:px-16 pb-4 overflow-hidden">
          <div 
            className="max-w-5xl mx-auto h-full rounded-2xl lg:rounded-3xl p-6 lg:p-8 relative"
            style={{ backgroundColor: theme.colors.card }}
          >
            {/* Step Contents */}
            {theme.steps.map((step, index) => (
              <StepContent
                key={step.id}
                step={step}
                theme={theme}
                isActive={index === activeStep}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
