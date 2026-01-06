// Clean exports for the Wizard component

export { default as MagicBookWizard } from './MagicBookWizard';
export { getTheme, kidsTheme, valentinesTheme } from './themes';
export { detectLocale, getTranslations, t } from './translations';
export type { 
  ThemeVariant, 
  Locale, 
  FormData, 
  MagicBookWizardProps,
  ThemeConfig,
  WizardTranslations 
} from './types';

