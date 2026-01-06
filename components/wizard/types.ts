// Wizard Types and Interfaces

export type ThemeVariant = 'kids' | 'valentines';
export type Locale = 'en' | 'fr' | 'es' | 'de';

export interface Pack {
  id: number;
  name: string;
  pages: number;
  price: number;
  popular?: boolean;
  icon: string;
}

export interface GenderOption {
  id: string;
  label: string;
  icon: string;
}

export interface ThemeConfig {
  variant: ThemeVariant;
  colors: {
    primary: string;
    primaryHover: string;
    accent: string;
    accentHover: string;
    background: string;
    backgroundAlt: string;
    cardBg: string;
    highlight: string;
    text: string;
    textMuted: string;
  };
  packs: Pack[];
  genderOptions: GenderOption[];
  stepCount: number;
}

export interface WizardTranslations {
  // Progress
  stepOf: string;
  
  // Step 1: Pack Selection
  step1Title: string;
  step1Subtitle: string;
  packPages: string;
  mostPopular: string;
  
  // Step 2: Details
  step2Title: string;
  step2Subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  ageLabel: string; // Kids only
  agePlaceholder: string;
  partnerNameLabel: string; // Valentine's only
  partnerNamePlaceholder: string;
  milestoneLabel: string; // Valentine's only
  milestonePlaceholder: string;
  genderLabel: string;
  
  // Step 3: Photo + Email Gate
  step3Title: string;
  step3Subtitle: string;
  uploadPrompt: string;
  uploadHint: string;
  changePhoto: string;
  emailGateTitle: string;
  emailGateDescription: string;
  emailPlaceholder: string;
  generateButton: string;
  generatingTitle: string;
  generatingSubtitle: string;
  sendingTo: string;
  resultTitle: string;
  
  // Step 4: Contact
  step4Title: string;
  step4Subtitle: string;
  contactNameLabel: string;
  contactNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  
  // Navigation
  back: string;
  continue: string;
  finalize: string;
  finalizeSubtitle: string;
}

export interface FormData {
  pack: number;
  // Kids-specific
  childName: string;
  childAge: string;
  gender: string;
  // Valentine's-specific
  yourName: string;
  partnerName: string;
  milestone: string;
  recipient: string;
  // Common
  photo: File | null;
  email: string;
  contactName: string;
  phone: string;
}

export interface MagicBookWizardProps {
  theme: ThemeVariant;
  onComplete?: (data: FormData) => void;
  className?: string;
}

