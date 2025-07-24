"use client";
import useSearch from "@/app/hooks/useSearch";
import { Search } from "lucide-react";
import { MouseEvent } from "react";

const SearchButton = () => {
  const { sought, handleOpenSearch } = useSearch();

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    handleOpenSearch();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-md transition-all duration-300 ease-in-out text-white-alpha hover:text-white bg-dark-gray border border-gray-charcoal w-full h-full cursor-pointer text-left px-4 py-2 flex items-center justify-between"
    >
      {sought ? sought : <p>Search your notes...</p>}
      <Search size={20} />
    </button>
  );
};

export default SearchButton;
