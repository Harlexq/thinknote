"use client";
import useSearch from "@/app/hooks/useSearch";
import SearchModal from "../elements/modals/searchModal/SearchModal";

const SearchModalContent = () => {
  const { isOpenSearch } = useSearch();

  if (isOpenSearch) {
    return <SearchModal />;
  }
};

export default SearchModalContent;
