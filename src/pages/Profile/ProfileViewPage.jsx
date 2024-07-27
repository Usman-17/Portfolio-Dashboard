import { Label } from "@/components/ui/label";
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

        <div className="grid gap-4">
          <div className="bg-gray-100 p-6 rounded-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
              {/* Profile Image */}
              <div className="grid gap-2 w-full">
                <Label className="mb-1">Profile Image</Label>
                <img
                  src={
                    (authUser &&
                      authUser?.profileImg &&
                      authUser.profileImg.url) ||
                    "/avatar-placeholder.png"
                  }
                  alt="avatar"
                  className="w-full h-auto sm:h-40 rounded-2xl object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Resume */}
              <div className="grid gap-2 w-full">
                <Label className="mb-1">Resume</Label>
                <img
                  src={
                    authUser && authUser?.resumeImg && authUser.resumeImg.url
                  }
                  alt="resume"
                  className="w-full h-auto sm:h-40 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
          {/* Name */}
          <div className="flex flex-row items-center gap-2 mt-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              Full Name:
            </h3>
            <p className="text-base sm:text-lg text-gray-700">
              {authUser?.fullName}
            </p>
          </div>
          {/* Email */}
          <div className="flex  flex-row items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              Email:
            </h3>
            <p className="text-base sm:text-lg text-gray-700">
              {authUser?.email}
            </p>
          </div>

          {/* Number */}
          <div className="flex flex-row items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              Phone Number:
            </h3>
            <p className="text-base sm:text-lg text-gray-700">
              {authUser?.mobile}
            </p>
          </div>

          <div className="mb-2">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Social Links:
            </h2>

            <ul className="list-disc list-inside pl-2 sm:pl-3 space-y-2">
              {/* LinkedIn */}
              {authUser.linkedInURL && (
                <li className="flex items-center gap-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                    LinkedIn:
                  </h3>
                  <a
                    href={authUser.linkedInURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm sm:text-base max-w-[200px] md:max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {authUser.linkedInURL}
                  </a>
                </li>
              )}

              {/* GitHub */}
              {authUser.githubURL && (
                <li className="flex items-center gap-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                    GitHub:
                  </h3>
                  <a
                    href={authUser.githubURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm sm:text-base max-w-[200px] md:max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {authUser.githubURL}
                  </a>
                </li>
              )}

              {/* Instagram */}
              {authUser.instagramURL && (
                <li className="flex items-center gap-x-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                    Instagram:
                  </h3>
                  <a
                    href={authUser.instagramURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm sm:text-base max-w-[200px] md:max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {authUser.instagramURL}
                  </a>
                </li>
              )}

              {/* Facebook */}
              {authUser.facebookURL && (
                <li className="flex items-center gap-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                    Facebook:
                  </h3>
                  <a
                    href={authUser.facebookURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm sm:text-base max-w-[200px] md:max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {authUser.facebookURL}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              About Me:
            </h3>
            <p className="text-base sm:text-lg text-gray-700">
              {authUser?.aboutMe}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewPage;
