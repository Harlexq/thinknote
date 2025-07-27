import { NavLinkProps } from "@/app/types/NavLinkProps";
import { NotebookPen } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const NavLink: FC<NavLinkProps> = ({ icon: Icon, label, href, ...props }) => {
  return (
    <Link
      href={href}
      {...props}
      className="w-full flex items-center gap-3 cursor-pointer rounded-md text-left p-2 text-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-bold"
    >
      {Icon ? <Icon size={16} /> : <NotebookPen size={16} />}
      <p>{label}</p>
    </Link>
  );
};

export default NavLink;
