"use client";
import { MouseEvent, ReactNode, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../shdcn/ui/resizable";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import useSidebar from "@/app/hooks/useSidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../shdcn/ui/tooltip";

const LayoutResizable = ({ children }: { children: ReactNode }) => {
  const { onClose, isOpen } = useSidebar();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup direction="horizontal">
        {isOpen ? (
          <>
            <ResizablePanel
              defaultSize={15}
              minSize={15}
              maxSize={20}
              className="h-screen bg-dark-gray"
            >
              <Sidebar />
            </ResizablePanel>
            <div
              className="relative group"
              onContextMenu={handleContextMenu}
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
            >
              <ResizableHandle
                className="bg-gray-charcoal w-0.5 h-full z-20"
                withHandle
              />
              <Tooltip open={tooltipOpen}>
                <TooltipTrigger asChild>
                  <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 h-full w-0.5 cursor-e-resize z-10" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Right click to close sidebar</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </>
        ) : null}
        <ResizablePanel defaultSize={isOpen ? 85 : 100} className="px-5">
          <Header />
          <div className="max-w-4xl mx-auto">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default LayoutResizable;
