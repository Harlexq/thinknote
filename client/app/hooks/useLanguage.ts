import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../lib/hook";
import { useCallback } from "react";
import { fetchLanguages } from "../lib/services/languageService";

const useLanguage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { error, languages, loading } = useAppSelector(
    (state) => state.language
  );

  const currentLanguage = i18n.language;

  const changeLanguage = async (lng: string) => {
    if (lng !== currentLanguage) {
      await i18n.changeLanguage(lng);
    }
  };

  const getLanguages = useCallback(async () => {
    await dispatch(fetchLanguages());
  }, [dispatch]);

  return {
    t,
    i18n,
    currentLanguage,
    changeLanguage,

    error,
    languages,
    loading,

    getLanguages,
  };
};

export default useLanguage;
