import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";

const ProfileViewPage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className="container mx-auto px-0 sm:px-4 py-5 sm:py-0">
      <div className="max-w-6xl mx-auto">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold sm:font-bold text-gray-800">
            Profile
          </h1>
          <p className="text-xs sm:text-sm mb-7 text-gray-600">
            Full Profile Preview
          </p>
        </div>

        <div className="grid gap-6">
          <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
            {/* Profile Image */}
            <div className="grid gap-2 w-full sm:w-80">
              <Label className="mb-1">Profile Image</Label>
              <img
                src={
                  (authUser &&
                    authUser?.profileImg &&
                    authUser.profileImg.url) ||
                  "/avatar-placeholder.png"
                }
                alt="avatar"
                className="w-full h-auto sm:h-96 rounded-2xl object-contain"
                loading="lazy"
              />
            </div>

            {/* Resume */}
            <div className="grid gap-2 w-full sm:w-96">
              <Label className="mb-1">Resume</Label>
              <img
                src={authUser && authUser?.resumeImg && authUser.resumeImg.url}
                alt="resume"
                className="w-full h-auto sm:h-96 rounded-2xl object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                defaultValue={authUser.fullName}
                disabled
                className="input-style"
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" defaultValue={authUser.email} disabled />
            </div>
          </div>

          {/* Mobile */}
          <div className="grid gap-2">
            <Label>Phone Number</Label>
            <Input type="text" defaultValue={authUser.mobile} disabled />
          </div>

          {/* About Me */}
          <div className="grid gap-2">
            <Label>About Me</Label>
            <Textarea defaultValue={authUser.aboutMe} disabled />
          </div>

          {/* LinkedIn URL & GitHub URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label>LinkedIn</Label>
              <Input type="text" defaultValue={authUser.linkedInURL} disabled />
            </div>
            <div className="grid gap-2">
              <Label>GitHub</Label>
              <Input type="text" defaultValue={authUser.githubURL} disabled />
            </div>
          </div>

          {/* Facebook & Instagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div className="grid gap-2">
              <Label>Instagram</Label>
              <Input
                type="text"
                defaultValue={authUser.instagramURL}
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label>Facebook</Label>
              <Input type="text" defaultValue={authUser.facebookURL} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewPage;
