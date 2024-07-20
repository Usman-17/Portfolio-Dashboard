import LoadingSpinner from "@/components/common/LoadingSpinner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// Imports End

const UpdateProfilePage = () => {
  const [formData, setFormData] = useState({
    profileImg: "",
    resumeImg: "",
    fullName: "",
    email: "",
    mobile: "",
    aboutMe: "",
    githubURL: "",
    instagramURL: "",
    facebookURL: "",
    linkedInURL: "",
  });

  const queryClient = useQueryClient();

  const {
    mutateAsync: updateProfile,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/v1/user/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update user profile");
      }
      return data;
    },

    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: () => {
      toast.error(error.message);
    },
  });

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  useEffect(() => {
    if (authUser) {
      setFormData({
        profileImg: authUser.profileImg.url || "",
        resumeImg: authUser.resumeImg.url || "",
        fullName: authUser.fullName || "",
        email: authUser.email || "",
        mobile: authUser.mobile || "",
        aboutMe: authUser.aboutMe || "",
        githubURL: authUser.githubURL || "",
        instagramURL: authUser.instagramURL || "",
        facebookURL: authUser.facebookURL || "",
        linkedInURL: authUser.linkedInURL || "",
      });
    }
  }, [authUser]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPending) {
      updateProfile(formData);
    }
  };

  return (
    <div className="container mx-auto px-0 sm:px-4 py-5 sm:py-0">
      <div className="max-w-4xl mx-auto">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold sm:font-bold text-gray-800">
            Update Profile
          </h1>
          <p className="text-xs sm:text-sm mb-7 text-gray-600">
            Update your Profile
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="flex gap-2 sm:gap-10 w-full justify-between sm:justify-start items-center overflow-hidden">
            {/* Profile Image */}
            <div className="grid gap-2 w-40 sm:w-60">
              <Label className="mb-1">Profile Image</Label>
              <img
                src={
                  formData.profileImg
                    ? formData.profileImg
                    : "/avatar-placeholder.png"
                }
                alt="profile"
                className="w-40 h-40 sm:w-60 sm:h-60 rounded-sm object-contain"
              />
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="avatar-update-btn w-36 sm:w-full text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Resume */}
            {/* <div className="grid gap-2 w-40 sm:w-60">
              <Label className="mb-1">Resume</Label>
              <img
                src={
                  formData.resumeImg
                    ? formData.resumeImg
                    : "/avatar-placeholder.png"
                }
                alt="profile"
                className="w-40 h-40 sm:w-60 sm:h-60 rounded-sm object-contain"
              />

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  // onChange={profileImgHandler}
                  className="avatar-update-btn w-40 sm:w-full text-sm sm:text-base"
                />
              </div>
            </div> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            <div className="grid gap-2">
              <Label htmlFor="fullName" className="text-gray-700">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mobile" className="text-gray-700">
              Phone Number
            </Label>
            <Input
              id="mobile"
              name="mobile"
              type="text"
              minLength={11}
              maxLength={11}
              placeholder="Enter your phone number"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="aboutMe" className="text-gray-700">
              About Me
            </Label>
            <Textarea
              id="aboutMe"
              name="aboutMe"
              placeholder="Tell us about yourself"
              value={formData.aboutMe}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="githubURL" className="text-gray-700">
                GitHub
              </Label>
              <Input
                id="githubURL"
                name="githubURL"
                type="text"
                placeholder="Enter your GitHub URL"
                value={formData.githubURL}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instagramURL" className="text-gray-700">
                Instagram
              </Label>
              <Input
                id="instagramURL"
                name="instagramURL"
                type="text"
                placeholder="Enter your Instagram URL"
                value={formData.instagramURL}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="facebookURL" className="text-gray-700">
                Facebook
              </Label>
              <Input
                id="facebookURL"
                name="facebookURL"
                type="text"
                placeholder="Enter your Facebook URL"
                value={formData.facebookURL}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="linkedInURL" className="text-gray-700">
                LinkedIn
              </Label>
              <Input
                id="linkedInURL"
                name="linkedInURL"
                type="text"
                placeholder="Enter your LinkedIn URL"
                value={formData.linkedInURL}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {isError && <div className="text-red-500">{error.message}</div>}

          {/* Update Button */}
          <div className="my-3">
            {isPending ? (
              <LoadingSpinner content={"Updating..."} />
            ) : (
              <Button type="submit" className="w-full" disabled={isPending}>
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
