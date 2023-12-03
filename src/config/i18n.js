// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "../../public/locales/en/translation.json";
import translationES from "../../public/locales/es/translation.json";
import translationCA from "../../public/locales/ca/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
  ca: {
    translation: translationCA,
  },
};

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: "en-EN",
});

export default i18n;
