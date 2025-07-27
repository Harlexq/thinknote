import React, { ComponentProps, FC, useState } from "react";
import { Input } from "../shdcn/ui/input";
import { cn } from "@/app/utils/utils";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput: FC<Omit<ComponentProps<"input">, "type">> = ({
  className,
  ...props
}) => {
  const [isPasswordType, setIsPasswordType] = useState<boolean>(true);

  return (
    <div className="relative">
      <Input
        type={isPasswordType ? "password" : "text"}
        className={cn(className)}
        {...props}
      />
      <div className="absolute top-1/2 right-1 -translate-y-1/2">
        <button
          type="button"
          className="cursor-pointer p-1"
          onClick={() => setIsPasswordType(!isPasswordType)}
        >
          {isPasswordType ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
