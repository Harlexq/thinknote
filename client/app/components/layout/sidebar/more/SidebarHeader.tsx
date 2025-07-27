import { Button } from "@/app/components/shdcn/ui/button";
import { Ellipsis, PencilLine } from "lucide-react";

const SidebarHeader = () => {
  return (
    <div className="mx-2 flex items-center gap-2 hover:bg-white/20 rounded-md p-2">
      <button
        type="button"
        className="cursor-pointer flex items-center justify-between w-full"
      >
        <div className="flex items-center gap-2">
          <div className="size-7 bg-white rounded-md"></div>
          <p className="font-semibold text-sm">Serhan Bakır</p>
        </div>
        <div className="size-7 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex items-center justify-center rounded-md font-medium transition-all">
          <Ellipsis size={17} />
        </div>
      </button>
      <Button type="button" size="icon" variant="default" className="size-7">
        <PencilLine size={17} />
      </Button>
    </div>
  );
};

export default SidebarHeader;
