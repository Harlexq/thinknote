import { ReactNode } from "react";

const NavTitle = ({ children }: { children: ReactNode }) => {
  return <p className="text-[10px] font-bold text-white">{children}</p>;
};

export default NavTitle;
