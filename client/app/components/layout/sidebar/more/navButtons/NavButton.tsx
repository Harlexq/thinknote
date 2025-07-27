import { NavButtonProps } from "@/app/types/NavButtonProps";
import { FC } from "react";

const NavButton: FC<NavButtonProps> = ({ icon: Icon, label, ...props }) => {
  return (
    <button
      {...props}
      type="button"
      className="w-full flex items-center gap-3 cursor-pointer rounded-md text-left p-2 text-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-bold"
    >
      <Icon size={16} />
      <p>{label}</p>
    </button>
  );
};

export default NavButton;
