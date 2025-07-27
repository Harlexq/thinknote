"use client";
import NavButton from "@/app/components/layout/sidebar/more/navButtons/NavButton";
import useSearch from "@/app/hooks/useSearch";
import { Home, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const ActionsNav = () => {
  const { handleOpenSearch } = useSearch();
  const router = useRouter();

  const actionsNav = [
    {
      id: 1,
      icon: Search,
      label: "Search",
      onClick: () => handleOpenSearch(),
    },
    {
      id: 2,
      icon: Home,
      label: "Home",
      onClick: () => router.push("/"),
    },
  ];

  return (
    <div className="space-y-1">
      {actionsNav.map((nav) => (
        <NavButton
          key={nav.id}
          icon={nav.icon}
          label={nav.label}
          onClick={nav.onClick}
        />
      ))}
    </div>
  );
};

export default ActionsNav;
