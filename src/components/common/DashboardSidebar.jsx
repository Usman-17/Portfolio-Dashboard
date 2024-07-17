import { Link } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import { useState } from "react";

import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package2,
  PencilRuler,
  User,
} from "lucide-react";
// imports End

const DashboardSidebar = () => {
  const [active, setActive] = useState("");
  const { logoutMutation } = useLogout();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50">
        {/* Top Icon */}
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base mb-4">
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          <Link
            to="/dashboard"
            onClick={() => setActive("Dashboard")}
            aria-label="Dashboard"
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
              active === "Dashboard"
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            } md:h-9 md:w-9 md:text-lg`}
          >
            <Home className="h-6 w-6 transition-transform transform group-hover:scale-110" />
            <span className="sr-only">Dashboard</span>
          </Link>

          <Link
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              active === "Add Project"
                ? "text-accent-foreground bg-accent"
                : "text-muted-foreground"
            }  transition-colors hover:text-foreground md:h-8 md:w-8`}
            onClick={() => setActive("Add Project")}
          >
            <FolderGit className="h-5 w-5" />
            <span className="sr-only">Add Project</span>
          </Link>

          <Link
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              active === "Add Skill"
                ? "text-accent-foreground bg-accent"
                : "text-muted-foreground"
            }  transition-colors hover:text-foreground md:h-8 md:w-8`}
            onClick={() => setActive("Add Skill")}
          >
            <PencilRuler className="h-5 w-5" />
            <span className="sr-only">Add Skill</span>
          </Link>

          <Link
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              active === "Add Uses"
                ? "text-accent-foreground bg-accent"
                : "text-muted-foreground"
            }  transition-colors hover:text-foreground md:h-8 md:w-8`}
            onClick={() => setActive("Add Uses")}
          >
            <LayoutGrid className="h-5 w-5" />
            <span className="sr-only">Add Uses</span>
          </Link>

          <Link
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              active === "Add Timeline"
                ? "text-accent-foreground bg-accent"
                : "text-muted-foreground"
            }  transition-colors hover:text-foreground md:h-8 md:w-8`}
            onClick={() => setActive("Add Timeline")}
          >
            <History className="h-5 w-5" />
            <span className="sr-only">Add Timeline</span>
          </Link>

          <Link
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              active === "Messages"
                ? "text-accent-foreground bg-accent"
                : "text-muted-foreground"
            }  transition-colors hover:text-foreground md:h-8 md:w-8`}
            onClick={() => setActive("Messages")}
          >
            <MessageSquareMore className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Link>

          <Link
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              active === "Account"
                ? "text-accent-foreground bg-accent"
                : "text-muted-foreground"
            }  transition-colors hover:text-foreground md:h-8 md:w-8`}
            onClick={() => setActive("Account")}
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Link>
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
            <LogOut className="h-5 w-5" onClick={() => logoutMutation()} />
            <span className="sr-only">Logout</span>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;
