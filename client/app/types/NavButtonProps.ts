import { LucideIcon } from "lucide-react";
import { ComponentProps } from "react";

export interface NavButtonProps extends ComponentProps<"button"> {
  icon: LucideIcon;
  label: string;
}
