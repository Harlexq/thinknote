import SearchModalContent from "../components/common/SearchModalContent";
import LayoutResizable from "../components/layout/layoutResizable/LayoutResizable";
import SidebarProvider from "../providers/SidebarProvider";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <main>
        <LayoutResizable>{children}</LayoutResizable>
        <SearchModalContent />
      </main>
    </SidebarProvider>
  );
}
