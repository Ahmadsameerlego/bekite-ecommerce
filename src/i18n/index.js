import { createI18n } from 'vue-i18n'
import ar from '../locales/ar.json'
import en from '../locales/en.json'

// Get saved language from localStorage or default to Arabic
const savedLanguage = localStorage.getItem('language') || 'ar'

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: savedLanguage,
  fallbackLocale: 'ar',
  messages: {
    ar,
    en
  }
})

// Function to change language
export function setLanguage(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem('language', locale)
  
  // Update document direction
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = locale
  
  // Update document class for styling
  document.documentElement.classList.remove('rtl', 'ltr')
  document.documentElement.classList.add(locale === 'ar' ? 'rtl' : 'ltr')
}

// Initialize document direction on app start
setLanguage(savedLanguage)

export default i18n 