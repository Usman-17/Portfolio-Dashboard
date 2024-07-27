import LoadingSpinner from "@/components/common/LoadingSpinner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// imports End

const UpdatePasswordPage = () => {
  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmNewPassword, setIsConfirmNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const queryClient = useQueryClient();

  const {
    mutateAsync: updatePassword,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/v1/user/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update user password");
      }
      return data;
    },

    onSuccess: () => {
      toast.success("Password updated successfully");
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
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  }, [authUser]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword(formData);
  };

  const toggleCurrentPassword = () => {
    setIsShowCurrentPassword(!isShowCurrentPassword);
  };

  const toggleNewPassword = () => {
    setIsShowNewPassword(!isShowNewPassword);
  };

  const toggleConfirmPassword = () => {
    setIsConfirmNewPassword(!isShowConfirmNewPassword);
  };

  return (
    <div className="container mx-auto px-0 sm:px-4 py-5 sm:py-0">
      <div className="max-w-4xl mx-auto">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold sm:font-bold text-gray-800">
            Update Password
          </h1>
          <p className="text-xs sm:text-sm mb-7 text-gray-600">
            Update your Password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Current Password */}
          <div className="grid gap-2 max-w-[22rem]">
            <Label htmlFor="currentPassword" className="text-gray-700">
              Current Password
            </Label>
            <div className="relative">
              <Input
                type={isShowCurrentPassword ? "text" : "password"}
                required
                id="currentPassword"
                name="currentPassword"
                placeholder="Enter your password"
                className="border-gray-300"
                value={formData.currentPassword}
                onChange={handleInputChange}
              />
              <div
                onClick={toggleCurrentPassword}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 flex items-center justify-center cursor-pointer text-gray-700"
              >
                {formData.currentPassword && (
                  <>
                    {isShowCurrentPassword ? (
                      <Eye size={18} />
                    ) : (
                      <EyeOff size={18} />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* New Password */}
          <div className="grid gap-2 max-w-[22rem]">
            <Label htmlFor="newPassword" className="text-gray-700">
              New Password
            </Label>
            <div className="relative">
              <Input
                type={isShowNewPassword ? "text" : "password"}
                required
                id="newPassword"
                name="newPassword"
                placeholder="New Password"
                className="border-gray-300"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
              <div
                onClick={toggleNewPassword}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 flex items-center justify-center cursor-pointer text-gray-700"
              >
                {formData.newPassword && (
                  <>
                    {isShowNewPassword ? (
                      <Eye size={18} />
                    ) : (
                      <EyeOff size={18} />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="grid gap-2 max-w-[22rem]">
            <Label htmlFor="confirmNewPassword" className="text-gray-700">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                type={isShowConfirmNewPassword ? "text" : "password"}
                required
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                className="border-gray-300"
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
              />
              <div
                onClick={toggleConfirmPassword}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 flex items-center justify-center cursor-pointer text-gray-700"
              >
                {formData.confirmNewPassword && (
                  <>
                    {isShowConfirmNewPassword ? (
                      <Eye size={18} />
                    ) : (
                      <EyeOff size={18} />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {isError && <div className="text-red-500">{error.message}</div>}

          <div className="mt-2">
            {isPending ? (
              <LoadingSpinner content={"Updating..."} width="w-full sm:w-44" />
            ) : (
              <Button
                type="submit"
                className="w-full sm:w-44"
                disabled={isPending}
              >
                Update Password
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
