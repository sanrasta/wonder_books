// Types for the How It Works scroll section

export type ThemeVariant = 'kids' | 'valentines' | 'worldcup' | 'birthday' | 'graduation' | 'newbaby' | 'anniversary' | 'dogtraining';

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: string[];
  illustration: string; // URL or path to illustration
}

export interface PricingTier {
  id: string;
  name: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface ProcessTheme {
  variant: ThemeVariant;
  colors: {
    background: string;
    backgroundAlt: string;
    card: string;
    progressBar: string;
    progressFill: string;
    progressIndicator: string;
    text: string;
    textMuted: string;
    accent: string;
    accentText: string;
    pricingBg: string;
    pricingCard: string;
    pricingCardAlt: string;
  };
  sectionTitle: string;
  sectionSubtitle: string;
  steps: ProcessStep[];
  pricing: {
    title: string;
    subtitle: string;
    tiers: PricingTier[];
  };
}

export interface HowItWorksProps {
  theme: ThemeVariant;
  className?: string;
}

