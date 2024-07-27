import forgotPasswordImg from "../../assets/Forgot-password.svg";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import toast from "react-hot-toast";
import { Alert } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import AnimationWrapper from "@/components/common/AnimationWrapper";
// import End

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const { mutate: forgotPasswordMutation, isPending } = useMutation({
    mutationFn: async ({ email }) => {
      try {
        const res = await fetch("/api/v1/user/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok)
          throw new Error(data.error || "Request failed. Please try again.");
      } catch (error) {
        throw new Error(error.message);
      }
    },

    onSuccess: () => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      toast.success("Email sent successfully!");
    },
    onError: () => {
      toast.error("Invalid email");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPasswordMutation({ email });
  };

  return (
    <AnimationWrapper>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2">
        <div className="min-h-[100vh] flex items-center justify-center">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center mb-2">
              <h1 className="text-3xl font-bold">Forgot Password</h1>
              <p className="text-sm px-6 text-muted-foreground">
                Please enter your email to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 px-3 lg:px-0">
                {/* Email */}
                <div className="grid gap-1">
                  <Label
                    htmlFor="email"
                    className="text-base font-semibold text-gray-800"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    autoComplete="true"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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

            <div className="px-4 md:px-0">
              {showAlert && (
                <Alert
                  variant="success"
                  className="p-4 rounded border border-green-300 bg-green-50 text-gray-700 text-xs font-semibold"
                >
                  Email sent successfully! Please check your inbox.
                </Alert>
              )}
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="hidden bg-muted lg:block">
          <img
            src={forgotPasswordImg}
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

export default ForgotPasswordPage;
