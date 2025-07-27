import { DividerProps } from "@/app/types/DividerProps";
import { cn } from "@/app/utils/utils";
import { FC } from "react";

const Divider: FC<DividerProps> = ({ text, className }) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-px bg-gray-charcoal flex-1" />
      <p className="text-sm text-white-alpha">{text}</p>
      <div className="h-px bg-gray-charcoal flex-1" />
    </div>
  );
};

export default Divider;
