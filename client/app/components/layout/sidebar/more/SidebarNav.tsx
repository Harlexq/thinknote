import ActionsNavContent from "./navContent/ActionsNavContent";
import PagesNavContent from "./navContent/PagesNavContent";

const SidebarNav = () => {
  return (
    <nav className="space-y-6 my-6 overflow-y-auto px-4">
      <ActionsNavContent />
      <PagesNavContent />
    </nav>
  );
};

export default SidebarNav;
