"use client";

import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../lib/i18n";

const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, [setMounted, mounted]);

  if (!mounted) return <p>Yükleniyor...</p>;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
