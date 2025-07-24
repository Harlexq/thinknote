"use client";
import { OAuthButtonProps } from "@/app/types/OAuthButtonProps";
import { cn } from "@/app/utils/utils";
import Image from "next/image";
import { FC } from "react";

const OAuthButton: FC<OAuthButtonProps> = ({
  iconSrc,
  name,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      {...props}
      className={cn(
        "cursor-pointer w-full px-4 py-2 rounded-md flex items-center gap-3 border transition-colors duration-200",
        "bg-[#1E1E20] border-[#2a2a2e] text-[#e4e4e7]",
        "hover:border-[#3a3a3d] hover:bg-[#252529]",
        "focus:outline-none focus:ring-1 focus:ring-[#3f3f46]",
        className
      )}
    >
      <Image src={iconSrc} alt={name} width={20} height={20} />
      <span className="font-medium">{name}</span>
    </button>
  );
};

export default OAuthButton;
