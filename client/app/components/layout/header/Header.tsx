"use client";
import useSidebar from "@/app/hooks/useSidebar";
import SidebarButton from "./more/SidebarButton";
import SearchButton from "./more/SearchButton";

const Header = () => {
  const { isOpen } = useSidebar();

  return (
    <header className="h-16 grid grid-cols-12 items-center">
      <div className="flex items-center gap-2 col-span-4">
        {isOpen ? null : <SidebarButton />}
        <h1>Header</h1>
      </div>
      <div className="col-span-4">
        <SearchButton />
      </div>
      <div className="col-span-4 flex justify-end">
        <p>Edited 1h ago</p>
      </div>
    </header>
  );
};

export default Header;
