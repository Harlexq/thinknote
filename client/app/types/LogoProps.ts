import { VariantProps } from "class-variance-authority";
import { logoVariants } from "../components/ui/Logo";

export interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
}
