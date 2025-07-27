import { ComponentProps } from "react";

export interface OAuthButtonProps extends ComponentProps<"button"> {
  provider: {
    id: string;
    name: string;
    icon: string;
  };
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}
