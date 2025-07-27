import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hook";
import { fetchCountries } from "../lib/services/countryService";
import { selectCountry } from "../lib/slices/countrySlice";
import { Country } from "../lib/models/Country";

const useCountry = () => {
  const dispatch = useAppDispatch();
  const { data, error, loading, selectedCountry } = useAppSelector(
    (state) => state.country
  );

  const getCountries = useCallback(async () => {
    await dispatch(fetchCountries());
  }, [dispatch]);

  const countries = data?.countries;
  const totalCountry = data?.total;

  const onSelectCountry = useCallback(
    (country: Country) => {
      dispatch(selectCountry(country));
    },
    [dispatch]
  );

  return {
    data,
    countries,
    totalCountry,
    error,
    loading,
    selectedCountry,
    getCountries,
    onSelectCountry,
  };
};

export default useCountry;
