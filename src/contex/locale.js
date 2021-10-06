import React, { useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import locales from "../locales";

export const SUPPORTED_LOCALES = {
  en: "en",
  ru: "ru",
};

const defaultLanguage = SUPPORTED_LOCALES.ru;
const supportedLanguages = Object.keys(SUPPORTED_LOCALES);
const localStorageItemName = "selected-language";

function getDefaultLanguage() {
  const prevLng = localStorage.getItem(localStorageItemName);

  if (supportedLanguages.includes(prevLng)) {
    return SUPPORTED_LOCALES[prevLng];
  }

  const navigatorLng = navigator.language.slice(0, 2);

  if (supportedLanguages.includes(navigatorLng)) {
    return SUPPORTED_LOCALES[navigatorLng];
  }

  return defaultLanguage;
}

export const LngContext = React.createContext();

export function LngProvider({ children }) {
  const [locale, changeLocale] = useState(defaultLanguage);
  const [messages, setMessages] = useState(locales[defaultLanguage]);

  // Loads previously selected language from localStorage or navigator
  useEffect(() => {
    const lng = getDefaultLanguage();

    if (supportedLanguages.includes(lng)) {
      changeLocale(lng);
      setMessages(locales[lng]);
    }
  }, []);

  const handleLocaleChange = (locale) => {
    if (!supportedLanguages.includes(locale)) {
      return;
    }

    changeLocale(locale);
    setMessages(locales[locale]);

    localStorage.setItem(localStorageItemName, locale);
  };

  return (
    <LngContext.Provider
      value={{ locale, changeLocale: handleLocaleChange, messages }}
    >
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </LngContext.Provider>
  );
}
