"use client";
import { ComponentProps, useState, useEffect, forwardRef } from "react";
import { Input } from "../shdcn/ui/input";
import { cn } from "@/app/utils/utils";
import Image from "next/image";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import useCountry from "@/app/hooks/useCountry";
import { Popover, PopoverContent, PopoverTrigger } from "../shdcn/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../shdcn/ui/command";
import { Country } from "@/app/lib/models/Country";

interface PhoneInputProps
  extends Omit<ComponentProps<"input">, "type" | "onChange" | "value"> {
  value?: string;
  onChange?: (value: string) => void;
  onCountryChange?: (countryId: number) => void;
  defaultCountryId?: number;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      value = "",
      onChange,
      onCountryChange,
      defaultCountryId = 212,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [phoneValue, setPhoneValue] = useState(value);

    const {
      data,
      countries,
      loading,
      getCountries,
      selectedCountry,
      onSelectCountry,
    } = useCountry();

    // Set default country on mount
    useEffect(() => {
      if (countries && countries.length > 0 && !selectedCountry) {
        const defaultCountry = countries.find((c) => c.id === defaultCountryId);
        if (defaultCountry) {
          onSelectCountry(defaultCountry);
          onCountryChange?.(defaultCountry.id);
        }
      }
    }, [
      countries,
      defaultCountryId,
      selectedCountry,
      onSelectCountry,
      onCountryChange,
    ]);

    const handlePopover = () => {
      if (!data) getCountries();
    };

    const getMask = () => {
      if (!selectedCountry || !selectedCountry.mask) return "(###)###-####";

      if (typeof selectedCountry.mask === "string") {
        return selectedCountry.mask;
      }

      if (Array.isArray(selectedCountry.mask)) {
        return selectedCountry.mask[0];
      }

      return "(###)###-####";
    };

    const applyMask = (value: string): string => {
      const digits = value.replace(/\D/g, "");

      if (!selectedCountry || !selectedCountry.mask) {
        const mask = getMask();
        return formatWithMask(digits, mask) || "";
      }

      if (typeof selectedCountry.mask === "string") {
        return formatWithMask(digits, selectedCountry.mask) || "";
      }

      if (Array.isArray(selectedCountry.mask)) {
        // Multiple masks - need to validate input
        const masks = selectedCountry.mask;
        let bestMatch: string | null = null;
        let bestMatchLength = 0;

        for (const mask of masks) {
          const formatted = formatWithMask(digits, mask, true);
          if (formatted !== null && formatted.length > bestMatchLength) {
            bestMatch = formatted;
            bestMatchLength = formatted.length;
          }
        }

        return bestMatch || "";
      }

      return "";
    };

    const formatWithMask = (
      digits: string,
      mask: string,
      validate = false
    ): string | null => {
      let result = "";
      let digitIndex = 0;

      for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
        if (mask[i] === "#") {
          result += digits[digitIndex];
          digitIndex++;
        } else {
          // This is a fixed character in the mask
          if (validate) {
            // In validation mode, check if the digit matches the fixed character
            if (digits[digitIndex] === mask[i]) {
              result += digits[digitIndex];
              digitIndex++;
            } else {
              // Digit doesn't match the required fixed character
              return null;
            }
          } else {
            // In non-validation mode, just add the mask character
            result += mask[i];
          }
        }
      }

      return result;
    };

    const isValidInput = (input: string): boolean => {
      if (!selectedCountry || !selectedCountry.mask) {
        return true;
      }

      if (typeof selectedCountry.mask === "string") {
        return true;
      }

      if (Array.isArray(selectedCountry.mask)) {
        const digits = input.replace(/\D/g, "");
        const masks = selectedCountry.mask;

        // Check if input matches or could match any mask
        for (const mask of masks) {
          let couldMatch = true;
          let digitIndex = 0;

          for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
            if (mask[i] === "#") {
              digitIndex++;
            } else if (mask[i] !== digits[digitIndex]) {
              couldMatch = false;
              break;
            } else {
              digitIndex++;
            }
          }

          if (couldMatch) {
            return true;
          }
        }

        return false;
      }

      return true;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const currentDigits = phoneValue.replace(/\D/g, "");
      const newDigits = inputValue.replace(/\D/g, "");

      // If deleting, allow it
      if (newDigits.length < currentDigits.length) {
        const formatted = applyMask(inputValue);
        setPhoneValue(formatted);
        onChange?.(formatted);
        return;
      }

      // Check if new input is valid
      if (!isValidInput(newDigits)) {
        // Invalid input, keep the previous value
        return;
      }

      const formatted = applyMask(inputValue);
      setPhoneValue(formatted);
      onChange?.(formatted);
    };

    useEffect(() => {
      if (value !== phoneValue) {
        setPhoneValue(value);
      }
    }, [value, phoneValue, setPhoneValue]);

    useEffect(() => {
      setPhoneValue("");
      onChange?.("");
    }, [setPhoneValue, onChange]);

    const getPlaceholder = () => {
      if (!selectedCountry || !selectedCountry.mask) return "(###)###-####";

      if (typeof selectedCountry.mask === "string") {
        return selectedCountry.mask;
      }

      if (Array.isArray(selectedCountry.mask)) {
        return selectedCountry.mask.join(" or ");
      }

      return "(###)###-####";
    };

    const handleCountrySelect = (country: Country) => {
      onSelectCountry(country);
      onCountryChange?.(country.id);
      setOpen(false);
    };

    return (
      <div className="relative">
        <div className="absolute top-0 h-full z-10">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild onClick={handlePopover}>
              <button
                type="button"
                className="h-full flex px-2 text-xs font-bold items-center gap-1 cursor-pointer"
              >
                {selectedCountry ? (
                  <>
                    <Image
                      src={selectedCountry.flag}
                      alt={selectedCountry.name}
                      width={20}
                      height={16}
                    />
                    {selectedCountry.code}
                  </>
                ) : (
                  <>
                    <Image
                      src="https://cdn.kcak11.com/CountryFlags/countries/tr.svg"
                      alt="Turkey"
                      width={20}
                      height={16}
                    />
                    +90
                  </>
                )}
                <ChevronDown size={18} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[300px]">
              <Command>
                <CommandInput placeholder="Search Country..." className="h-9" />
                <CommandList>
                  {loading ? (
                    <div className="flex justify-center items-center py-6">
                      <Loader2 size={20} className="animate-spin" />
                    </div>
                  ) : (
                    <>
                      {countries && countries.length > 0 ? (
                        <CommandGroup>
                          {countries.map((country) => (
                            <CommandItem
                              onSelect={() => handleCountrySelect(country)}
                              value={country.name}
                              key={country.id}
                              className="flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <Image
                                  src={country.flag}
                                  alt={country.name}
                                  width={20}
                                  height={16}
                                />
                                <span>{country.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  {country.code}
                                </span>
                                {selectedCountry?.id === country.id && (
                                  <Check className="h-4 w-4" />
                                )}
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      ) : (
                        <CommandEmpty>No countries found.</CommandEmpty>
                      )}
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Input
          ref={ref}
          type="tel"
          value={phoneValue}
          onChange={handleInputChange}
          placeholder={getPlaceholder()}
          className={cn("pl-[85px]", className)}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
