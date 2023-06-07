import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  es: {
    translation: {
      "Explora la propiedad": "Explora la propiedad",
      "Escoge tu depa": "Escoge tu depa",
    },
  },
  en: {
    translation: {
      "Explora la propiedad": "Explore the property",
      "Escoge tu depa": "Choose your apartment",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
