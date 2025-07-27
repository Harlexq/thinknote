import { LucideIcon } from "lucide-react";
import { ComponentProps } from "react";

export interface NavLinkProps extends ComponentProps<"a"> {
  icon?: LucideIcon;
  href: string;
  label: string;
}
