import { NotebookPen, Send } from "lucide-react";
import Link from "next/link";

const SearchContent = () => {
  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full scroll-box">
      <div className="space-y-3">
        <p className="font-bold text-xs text-white-alpha">Today</p>
        <Link
          href="/"
          className="flex items-center justify-between group transition-all duration-300 ease-in-out hover:bg-white/10 rounded-md p-2"
        >
          <div className="flex items-center gap-3">
            <NotebookPen
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
            <p className="font-medium">Sokrates</p>
          </div>
          <div className="">
            <Send
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
          </div>
        </Link>
        <Link
          href="/"
          className="flex items-center justify-between group transition-all duration-300 ease-in-out hover:bg-white/10 rounded-md p-2"
        >
          <div className="flex items-center gap-3">
            <NotebookPen
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
            <p className="font-medium">Sokrates</p>
          </div>
          <div className="">
            <Send
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
          </div>
        </Link>
        <Link
          href="/"
          className="flex items-center justify-between group transition-all duration-300 ease-in-out hover:bg-white/10 rounded-md p-2"
        >
          <div className="flex items-center gap-3">
            <NotebookPen
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
            <p className="font-medium">Sokrates</p>
          </div>
          <div className="">
            <Send
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
          </div>
        </Link>
      </div>
      <div className="space-y-3">
        <p className="font-bold text-xs text-white-alpha">Past week</p>
        <Link
          href="/"
          className="flex items-center justify-between group transition-all duration-300 ease-in-out hover:bg-white/10 rounded-md p-2"
        >
          <div className="flex items-center gap-3">
            <NotebookPen
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
            <p className="font-medium">Sokrates</p>
          </div>
          <div className="">
            <Send
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
          </div>
        </Link>
        <Link
          href="/"
          className="flex items-center justify-between group transition-all duration-300 ease-in-out hover:bg-white/10 rounded-md p-2"
        >
          <div className="flex items-center gap-3">
            <NotebookPen
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
            <p className="font-medium">Sokrates</p>
          </div>
          <div className="">
            <Send
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
          </div>
        </Link>
        <Link
          href="/"
          className="flex items-center justify-between group transition-all duration-300 ease-in-out hover:bg-white/10 rounded-md p-2"
        >
          <div className="flex items-center gap-3">
            <NotebookPen
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
            <p className="font-medium">Sokrates</p>
          </div>
          <div className="">
            <Send
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
          </div>
        </Link>
      </div>
      <div className="space-y-3">
        <p className="font-bold text-xs text-white-alpha">Past 30 days</p>
        <Link
          href="/"
          className="flex items-center justify-between group transition-all duration-300 ease-in-out hover:bg-white/10 rounded-md p-2"
        >
          <div className="flex items-center gap-3">
            <NotebookPen
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
            <p className="font-medium">Sokrates</p>
          </div>
          <div className="">
            <Send
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
          </div>
        </Link>
        <Link
          href="/"
          className="flex items-center justify-between group transition-all duration-300 ease-in-out hover:bg-white/10 rounded-md p-2"
        >
          <div className="flex items-center gap-3">
            <NotebookPen
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
            <p className="font-medium">Sokrates</p>
          </div>
          <div className="">
            <Send
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
          </div>
        </Link>
        <Link
          href="/"
          className="flex items-center justify-between group transition-all duration-300 ease-in-out hover:bg-white/10 rounded-md p-2"
        >
          <div className="flex items-center gap-3">
            <NotebookPen
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
            <p className="font-medium">Sokrates</p>
          </div>
          <div className="">
            <Send
              size={18}
              className="text-white-alpha transition-all duration-300 ease-in-out group-hover:text-white"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SearchContent;
