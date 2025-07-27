import { FC } from "react";
import { motion } from "motion/react";
import { cva } from "class-variance-authority";
import { AlertProps } from "@/app/types/AlertProps";
import { cn } from "@/app/utils/utils";

const alertVariants = cva(
  "flex items-center px-4 py-3 text-sm border rounded-lg",
  {
    variants: {
      variant: {
        info: "text-black border-black bg-white",
        danger: "text-red-700 border-red-700 bg-red-100",
        success: "text-green-700 border-green-700 bg-green-100",
        warning: "text-yellow-700 border-yellow-700 bg-yellow-100",
        primary: "text-blue-700 border-blue-700 bg-blue-100",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const Alert: FC<AlertProps> = ({ children, variant }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className={cn(alertVariants({ variant }))}
    >
      <svg
        className="shrink-0 inline w-4 h-4 me-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="text-start">{children}</div>
    </motion.div>
  );
};

export { Alert, alertVariants };
