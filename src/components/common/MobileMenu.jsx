import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  FolderGit,
  History,
  LayoutGrid,
  Menu,
  MessageSquareMore,
  Package2,
  PencilRuler,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutGrid, path: "/" },
  { name: "Add Project", icon: FolderGit, path: "/project/add" },
  { name: "Add Skill", icon: PencilRuler, path: "/skill/add" },
  { name: "Timeline", icon: History, path: "/timeline/add" },
  { name: "Enquiries", icon: MessageSquareMore, path: "/enquiries" },
];

const MobileMenu = () => {
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (name) => {
    setActive(name);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
          <Link
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

          {navItems.map(({ name, icon: Icon, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => handleLinkClick(name)}
              aria-label={name}
              className={`flex items-center gap-4 px-1 ${
                active === name
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
