import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { alertVariants } from "../components/ui/Alert";

export interface AlertProps extends VariantProps<typeof alertVariants> {
  children: ReactNode;
}
