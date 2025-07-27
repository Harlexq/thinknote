"use client";
import NavPageLink from "@/app/components/layout/sidebar/more/navButtons/NavPageLink";
import { Plus } from "lucide-react";

const PagesNav = () => {

  const actionsNav = [
    {
      id: 1,
      label: "Tarih",
      icon: Plus,
      href: "/",
    },
    {
      id: 2,
      label: "Felsefe",
      href: "/",
    },
  ];

  return (
    <div className="space-y-1">
      {actionsNav.map((nav) => (
        <NavPageLink
          key={nav.id}
          icon={nav.icon}
          href={nav.href}
          label={nav.label}
        />
      ))}
    </div>
  );
};

export default PagesNav;
