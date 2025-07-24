import useSearch from "@/app/hooks/useSearch";
import { useEffect, useRef } from "react";
import SearchInput from "./more/SearchInput";
import SearchContent from "./more/SearchContent";

const SearchModal = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { handleCloseSearch } = useSearch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleCloseSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseSearch]);

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[999]">
      <div
        ref={modalRef}
        className="w-xl flex flex-col h-[600px] relative z-20 bg-dark-gray border border-gray-charcoal shadow-2xl rounded-lg"
      >
        <SearchInput />
        <SearchContent />
      </div>
      <div className="absolute inset-0 bg-black/50 w-full h-full cursor-pointer z-10"></div>
    </div>
  );
};

export default SearchModal;
