import { cn } from "@/app/utils/utils";
import { Search, X } from "lucide-react";
import { useRef, useState } from "react";

const SearchInput = () => {
  const [focused, setFocues] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleValueClear = () => {
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full border-b border-gray-charcoal relative group flex-1">
      <input
        ref={inputRef}
        type="text"
        value={value}
        autoFocus
        onFocus={() => setFocues(true)}
        onBlur={() => setFocues(false)}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          "w-full h-full p-4 text-white outline-none transition-all duration-300 ease-in-out placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out group-hover:placeholder:text-white",
          {
            "placeholder:text-white-alpha": !focused || !value,
            "placeholder:text-white": focused || value,
          }
        )}
        placeholder="Search your notes..."
      />
      <div className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center gap-3">
        {value ? (
          <button
            type="button"
            onClick={handleValueClear}
            className="w-6 h-6 bg-black rounded-full flex items-center justify-center cursor-pointer"
          >
            <X size={14} strokeWidth={3} />
          </button>
        ) : null}
        <Search
          size={22}
          className={cn(
            "transition-all cursor-pointer duration-300 ease-in-out group-hover:text-white",
            {
              "text-white-alpha": !focused || !value,
              "text-white": focused || value,
            }
          )}
        />
      </div>
    </div>
  );
};

export default SearchInput;
