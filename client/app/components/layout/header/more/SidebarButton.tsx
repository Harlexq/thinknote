"use client";

import { Button } from "@/app/components/shdcn/ui/button";
import { Tooltip, TooltipContent } from "@/app/components/shdcn/ui/tooltip";
import useSidebar from "@/app/hooks/useSidebar";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Menu } from "lucide-react";

const SidebarButton = () => {
  const { onOpen } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" type="button" onClick={onOpen} variant="ghost">
          <Menu />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Sidebarı Aç</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SidebarButton;
