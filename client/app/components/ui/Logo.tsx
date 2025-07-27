import { LogoProps } from "@/app/types/LogoProps";
import { cn } from "@/app/utils/utils";
import { cva } from "class-variance-authority";
import { FC } from "react";

const logoVariants = cva("italic font-medium tracking-wider", {
  variants: {
    size: {
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-4xl",
    },
    mode: {
      light: "text-[#fff]",
      black: "text-[#000]",
    },
  },
  defaultVariants: {
    size: "md",
    mode: "light",
  },
});

const Logo: FC<LogoProps> = ({ size, className, mode }) => {
  return (
    <h1 className={cn(logoVariants({ size, className, mode }))}>ThinkNote</h1>
  );
};

export { Logo, logoVariants };
