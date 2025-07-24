import { createContext } from "react";

export interface SidebarContextType {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);
