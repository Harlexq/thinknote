"use client";
import { useEffect } from "react";
import SearchModalContent from "../components/common/SearchModalContent";
import LayoutResizable from "../components/layout/layoutResizable/LayoutResizable";
import { socket } from "../lib/socket";
import SidebarProvider from "../providers/SidebarProvider";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SidebarProvider>
      <main>
        <LayoutResizable>{children}</LayoutResizable>
        <SearchModalContent />
      </main>
    </SidebarProvider>
  );
}
