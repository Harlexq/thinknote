import { NavLinkProps } from "@/app/types/NavLinkProps";
import Link from "next/link";
import { FC, useState } from "react";
import { Button } from "../../../../shdcn/ui/button";
import {
  ArrowUp,
  ArrowUpRight,
  Copy,
  Ellipsis,
  FolderPen,
  Move,
  NotebookPen,
  Plus,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/shdcn/ui/dropdown-menu";
import { cn } from "@/app/utils/utils";

const NavPageLink: FC<NavLinkProps> = ({
  icon: Icon,
  label,
  href,
  ...props
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

  return (
    <Link
      href={href}
      {...props}
      className="w-full flex items-center justify-between group relative cursor-pointer rounded-md text-left p-2 text-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-bold"
    >
      <div className="flex items-center gap-2">
        {Icon ? <Icon size={16} /> : <NotebookPen size={16} />}
        <p>{label}</p>
      </div>
      <div
        className={cn("ease-in-out flex items-center gap-2", {
          "opacity-0 group-hover:opacity-100 transition-all duration-300":
            !isOpenDropdown,
          "opacity-100": isOpenDropdown,
        })}
      >
        <DropdownMenu onOpenChange={() => setIsOpenDropdown(!isOpenDropdown)}>
          <DropdownMenuTrigger className="outline-none">
            <div className="cursor-pointer size-5 rounded-sm flex items-center justify-center border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
              <Ellipsis size={16} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Page</DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-2">
                <Copy size={16} />
                Duplicate
              </div>
              <p className="text-xs text-white-alpha">Ctrl + D</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-2">
                <FolderPen size={16} />
                Rename
              </div>
              <p className="text-xs text-white-alpha">Ctrl + F2</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-2">
                <Move size={16} />
                Move to
              </div>
              <p className="text-xs text-white-alpha">Ctrl + P</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-2">
                <Trash size={16} />
                Trash
              </div>
              <p className="text-xs text-white-alpha">Ctrl + Backspace</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-2">
                <ArrowUpRight size={16} />
                Open is new tab
              </div>
              <p className="text-xs text-white-alpha flex items-center justify-center gap-1">
                Ctrl + <ArrowUp size={16} />
              </p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-5 rounded-sm"
        >
          <Plus size={16} />
        </Button>
      </div>
    </Link>
  );
};

export default NavPageLink;
