import * as React from "react";

import { cn } from "@/app/utils/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-white-alpha hover:placeholder:text-white selection:bg-primary selection:text-primary-foreground dark:bg-dark-gray border-gray-charcoal flex w-full min-w-0 rounded-md border bg-dark-gray px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "transition-all duration-300 ease-in-out",
        "hover:border-[color:oklch(0.5_0.008_286.50)]",
        "focus:border-[color:oklch(0.42_0.015_286.32)]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
