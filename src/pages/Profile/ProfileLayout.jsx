import { useState } from "react";
import { Link } from "react-router-dom";

import ProfileViewPage from "./ProfileViewPage";
import UpdateProfilePage from "./UpdateProfilePage";
import UpdatePasswordPage from "./UpdatePasswordPage";
import AnimationWrapper from "@/components/common/AnimationWrapper";
// imports End

const ProfileLayout = () => {
  const [selectedPage, setSelectedPage] = useState("Profile");

  return (
    <AnimationWrapper transition={{ duration: 0.2 }}>
      <main className="flex flex-1 flex-col gap-4 bg-muted/20  md:gap-8 py-4 sm:py-10 px-4 sm:px-20">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            {/* Profile */}
            <Link
              onClick={() => setSelectedPage("Profile")}
              className={
                selectedPage === "Profile" ? " font-semibold text-primary" : ""
              }
            >
              Profile
            </Link>

            {/* Update Profile */}
            <Link
              onClick={() => setSelectedPage("Update Profile")}
              className={
                selectedPage === "Update Profile"
                  ? " font-semibold text-primary"
                  : ""
              }
            >
              Update Profile
            </Link>

            {/* Update Password */}
            <Link
              onClick={() => setSelectedPage("Update Password")}
              className={
                selectedPage === "Update Password"
                  ? " font-semibold text-primary"
                  : ""
              }
            >
              Update Password
            </Link>
          </nav>

          <div className="grid gap-6">
            {(() => {
              switch (selectedPage) {
                case "Profile":
                  return <ProfileViewPage />;
                case "Update Profile":
                  return <UpdateProfilePage />;
                case "Update Password":
                  return <UpdatePasswordPage />;
                default:
                  return <ProfileViewPage />;
              }
            })()}
          </div>
        </div>
      </main>
    </AnimationWrapper>
  );
};

export default ProfileLayout;
