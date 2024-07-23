import { Link } from "react-router-dom";
import { useState } from "react";
import useLogout from "@/hooks/useLogout";
import {
  FolderGit,
  History,
  LayoutDashboard,
  LogOut,
  MessageSquareMore,
  Package2,
  PencilRuler,
  User,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Add Project", icon: FolderGit, path: "/project/add" },
  { name: "Add Skill", icon: PencilRuler, path: "/skill/add" },
  { name: "Add Timeline", icon: History, path: "/timeline/add" },
  { name: "Enquires", icon: MessageSquareMore, path: "/enquiries" },
  { name: "Account", icon: User, path: "/profile" },
];

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const { logoutMutation } = useLogout();

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50">
      {/* Top Icon */}
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to={"/"}
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base mb-4"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>

        {navItems.map(({ name, icon: Icon, path }) => (
          <Link
            key={name}
            to={path}
            onClick={() => setActive(name)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              active === name
                ? "bg-muted text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            } md:h-8 md:w-8`}
          >
            <Icon className="h-5 w-5" />
            <span className="sr-only">{name}</span>
          </Link>
        ))}
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5 mb-1">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          onClick={() => logoutMutation()}
        >
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
