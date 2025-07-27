import SidebarHeader from "./more/SidebarHeader";
import SidebarNav from "./more/SidebarNav";

const Sidebar = () => {
  return (
    <aside className="w-full h-full bg-dark-gray py-4 flex flex-col">
      <SidebarHeader />
      <SidebarNav />
    </aside>
  );
};

export default Sidebar;
