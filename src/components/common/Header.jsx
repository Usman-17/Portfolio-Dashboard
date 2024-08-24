import MobileMenu from "@/components/common/MobileMenu";
import ProfileDropdown from "./ProfileDropdown";

import { useQuery } from "@tanstack/react-query";
// imports End

const Header = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <header className="sticky lg:static top-0 flex items-center border-b sm:border-0 bg-background px-4 sm:px-6 h-16 z-50">
      <MobileMenu />

      <div className="flex items-center gap-4 sm:ml-16">
        <img
          src={
            (authUser && authUser?.profileImg && authUser.profileImg.url) ||
            "/avatar-placeholder.png"
          }
          alt="Profile Image"
          className="w-12 h-12 rounded-full object-contain border border-gray-300 p-0.5 max-[900px]:hidden"
          loading="lazy"
          decoding="async"
        />
        <h1 className="text-2xl hidden sm:flex">{authUser?.fullName}</h1>
      </div>

      <div className="ml-auto flex items-center sm:hidden">
        <ProfileDropdown authUser={authUser} />
      </div>
    </header>
  );
};

export default Header;
