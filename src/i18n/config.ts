import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translations
import enTranslations from '../locales/en/translation.json'
import esTranslations from '../locales/es/translation.json'
import enProjects from '../locales/en/projects.json'
import esProjects from '../locales/es/projects.json'

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations,
        projects: enProjects
      },
      es: {
        translation: esTranslations,
        projects: esProjects
      }
    },
    fallbackLng: 'en', // Default language
    lng: 'en', // Force English as initial language
    debug: false,
    interpolation: {
      escapeValue: false // React already escapes values
    },
    detection: {
      // Order of language detection - prioritize localStorage, then default to English
      order: ['localStorage', 'navigator'],
      // Cache user language
      caches: ['localStorage'],
      // Default to English if no language detected
      lookupLocalStorage: 'i18nextLng'
    }
  })

export default i18n
