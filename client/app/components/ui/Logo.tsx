import { LogoProps } from "@/app/types/LogoProps";
import { cn } from "@/app/utils/utils";
import { cva } from "class-variance-authority";
import { FC } from "react";

const logoVariants = cva("italic font-medium tracking-wider text-white", {
  variants: {
    size: {
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-4xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const Logo: FC<LogoProps> = ({ size, className }) => {
  return <h1 className={cn(logoVariants({ size, className }))}>ThinkNote</h1>;
};

export { Logo, logoVariants };
