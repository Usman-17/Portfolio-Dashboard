import {
  Cloud,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  LogOut,
  Undo,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";

import useLogout from "@/hooks/useLogout";
// imports End

const ProfileDropdown = ({ authUser }) => {
  const { logoutMutation } = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          src={
            (authUser && authUser?.profileImg && authUser.profileImg.url) ||
            "/avatar-placeholder.png"
          }
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover border border-gray-300 p-0.5 transition-opacity duration-300 ease-in-out shadow-sm"
          loading="lazy"
          decoding="async"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link to={"/profile"}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>

          <Link to="https://muhammadusman-portfolio.vercel.app/">
            <DropdownMenuItem>
              <Undo className="mr-2 h-4 w-4" />
              <span>Portfolio</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {authUser.githubURL && (
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span>
              <Link to={authUser.githubURL}>GitHub</Link>
            </span>
          </DropdownMenuItem>
        )}

        {authUser.instagramURL && (
          <DropdownMenuItem>
            <Instagram className="mr-2 h-4 w-4" />
            <span>
              <Link to={authUser.instagramURL}>Instagram</Link>
            </span>
          </DropdownMenuItem>
        )}

        {authUser.facebookURL && (
          <DropdownMenuItem>
            <Facebook className="mr-2 h-4 w-4" />
            <span>
              <Link to={authUser.facebookURL}>Facebook</Link>
            </span>
          </DropdownMenuItem>
        )}

        {authUser.linkedInURL && (
          <DropdownMenuItem>
            <Linkedin className="mr-2 h-4 w-4" />
            <span>
              <Link to={authUser.linkedInURL}>LinkedIn</Link>
            </span>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => logoutMutation()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
