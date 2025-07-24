import { ComponentProps } from "react";

export interface OAuthButtonProps extends ComponentProps<"button"> {
  iconSrc: string;
  name: string;
  onClick: () => void;
}
