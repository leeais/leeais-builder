import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from '@i18n/locales/en/translation.json';
import vi from '@i18n/locales/vi/translation.json';

const locales = RNLocalize.getLocales();
const localLanguage = locales.length > 0 ? locales[0].languageCode : 'en';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

async function loader() {
  // Get state language from storage here
  i18n.use(initReactI18next).init({
    resources,
    lng: localLanguage,
    debug: true,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
}

loader();

export default i18n;
