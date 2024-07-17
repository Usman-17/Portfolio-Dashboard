import { useState } from "react";
import { Link } from "react-router-dom";

import useLogout from "@/hooks/useLogout";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  Menu,
  MessageSquareMore,
  Package2,
  PencilRuler,
  User,
} from "lucide-react";
// Imports End

const MobileMenu = () => {
  const [active, setActive] = useState("");
  const { logoutMutation } = useLogout();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="sm:hidden"
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="sm:max-w-xs">
        <nav className="grid gap-5 text-md font-medium">
          {/* Top Icon */}
          <Link
            to="#"
            onClick={() => setActive("Acme Inc")}
            aria-label="Acme Inc"
            className={`group flex h-10 w-10 items-center justify-center gap-2 ml-[-12px] rounded-full transition-colors ${
              active === "Acme Inc"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            } md:h-9 md:w-9 md:text-base`}
          >
            <Package2 className="h-5 w-5 transition-transform transform group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          {/* Dashboard */}
          <Link
            to="/dashboard" // Update with your actual route
            onClick={() => setActive("Dashboard")}
            aria-label="Dashboard"
            className={`flex items-center gap-4 px-1 ${
              active === "Dashboard"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/add-project" // Update with your actual route
            className={`flex items-center gap-4 px-1 ${
              active === "Add Project"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActive("Add Project")}
            aria-label="Add Project"
          >
            <FolderGit className="h-5 w-5" />
            Add Project
          </Link>
          <Link
            to="/add-skill" // Update with your actual route
            className={`flex items-center gap-4 px-1 ${
              active === "Add Skill"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActive("Add Skill")}
            aria-label="Add Skill"
          >
            <PencilRuler className="h-5 w-5" />
            Add Skill
          </Link>
          <Link
            to="/add-uses" // Update with your actual route
            className={`flex items-center gap-4 px-1 ${
              active === "Add Uses"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActive("Add Uses")}
            aria-label="Add Uses"
          >
            <LayoutGrid className="h-5 w-5" />
            Add Uses
          </Link>
          <Link
            to="/profile" // Update with your actual route
            className={`flex items-center gap-4 px-1 ${
              active === "Profile"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActive("Profile")}
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
            Profile
          </Link>
          <Link
            to="/timeline" // Update with your actual route
            className={`flex items-center gap-4 px-1 ${
              active === "Timeline"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActive("Timeline")}
            aria-label="Timeline"
          >
            <History className="h-5 w-5" />
            Timeline
          </Link>

          <Link
            to="/messages" // Update with your actual route
            className={`flex items-center gap-4 px-1 ${
              active === "Messages"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActive("Messages")}
            aria-label="Messages"
          >
            <MessageSquareMore className="h-5 w-5" />
            Messages
          </Link>
          <Link
            to="/logout" // Update with your actual route
            className="flex items-center gap-4 px-1 text-muted-foreground hover:text-foreground"
            aria-label="Logout"
            onClick={() => logoutMutation()}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
