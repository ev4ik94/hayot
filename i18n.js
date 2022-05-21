import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from './assets/locales/ru/common.json'
import uz from './assets/locales/uz/common.json'
import en from './assets/locales/en/common.json'


const resources = {
    ru: {
        translation: ru
    },

    en: {
        translation: en
    },

    uz: {
        translation: uz
    }
}


i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "ru",

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
