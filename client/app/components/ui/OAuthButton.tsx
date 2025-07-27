"use client";
import { OAuthButtonProps } from "@/app/types/OAuthButtonProps";
import { cn } from "@/app/utils/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

const OAuthButton: FC<OAuthButtonProps> = ({
  provider,
  onClick,
  loading,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "cursor-pointer w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border transition-all",
        "bg-darkness border-gray-charcoal text-white",
        "hover:bg-gray-charcoal hover:border-white/20",
        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-dark-gray",
        "disabled:opacity-50 disabled:cursor-not-allowed"
      )}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          <Image
            src={provider.icon}
            alt={provider.name}
            width={18}
            height={18}
          />
          <span className="font-medium">Continue with {provider.name}</span>
        </>
      )}
    </button>
  );
};

export default OAuthButton;
