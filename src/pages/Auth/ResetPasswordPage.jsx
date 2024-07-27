import resetPassworImg from "../../assets/reset-password.svg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import AnimationWrapper from "@/components/common/AnimationWrapper";

import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import End

const ResetPasswordPage = () => {
  const [isShow, setIsShow] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const { token } = useParams();
  const queryClient = useQueryClient();

  const { mutate: resetPasswordMutation, isPending } = useMutation({
    mutationFn: async ({ newPassword }) => {
      const res = await fetch(`/api/v1/user/reset-password/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Reset password failed. Please try again."
        );
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Password reset successfully.");
      navigate("/login");
    },

    onError: (error) => {
      toast.error(error.message || "An error occurred. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPasswordMutation({ newPassword });
  };

  const togglePassword = () => {
    setIsShow(!isShow);
  };

  return (
    <AnimationWrapper>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2">
        <div className="min-h-[100vh] flex items-center justify-center">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center mb-2">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="text-xs md:text-sm px-6 text-muted-foreground">
                Enter a new password to access your account.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 px-3 lg:px-0">
                {/* Password */}
                <div className="grid gap-1">
                  <Label
                    htmlFor="password"
                    className="text-base font-semibold text-gray-800"
                  >
                    Password
                  </Label>

                  <div className="relative">
                    <Input
                      type={isShow ? "text" : "password"}
                      required
                      id="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter a new password"
                    />

                    <div
                      onClick={togglePassword}
                      className="absolute top-1/2 right-5 transform -translate-y-1/2 flex items-center justify-center cursor-pointer text-gray-700"
                    >
                      {isShow ? <Eye size={18} /> : <EyeOff size={18} />}
                    </div>
                  </div>
                </div>

                {/* Button */}
                {isPending ? (
                  <LoadingSpinner content={"Submitting..."} />
                ) : (
                  <Button type="submit" className="w-full" disabled={isPending}>
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Image Side */}
        <div className="hidden bg-muted lg:block">
          <img
            src={resetPassworImg}
            alt="Image"
            className="h-[100vh] w-full object-cover dark:brightness-[0.2] dark:grayscale"
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default ResetPasswordPage;
