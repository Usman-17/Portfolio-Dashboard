import { useState } from "react";

import loginImg from "../../assets/login.svg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import AnimationWrapper from "@/components/common/AnimationWrapper";
// import End

const LoginPage = () => {
  const [isShow, setIsShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const res = await fetch("/api/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok)
          throw new Error(data.error || "Login failed. Please try again.");
      } catch (error) {
        throw new Error(error);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: () => {
      toast.error("Invalid email or password");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ email, password });
  };

  const togglePassword = () => {
    setIsShow(!isShow);
  };
  return (
    <AnimationWrapper>
      <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
        <div className="min-h-screen flex items-center justify-center">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center mb-2">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-sm md:text-base px-6 text-muted-foreground">
                Enter your email and password below to access your account.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 px-3 lg:px-0">
                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-base">
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

                {/* Password */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password" className="text-base">
                      Password
                    </Label>
                    <Link
                      to={"/forgot-password"}
                      className="ml-auto inline-block text-xs font-semibold hover:text-rose-600 hover:underline transition duration-75 ease-in-out"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      type={isShow ? "text" : "password"}
                      required
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <div
                      onClick={togglePassword}
                      className="absolute top-1/2 right-5 transform -translate-y-1/2 flex items-center justify-center cursor-pointer text-gray-700"
                    >
                      {password && (
                        <>{isShow ? <Eye size={18} /> : <EyeOff size={18} />}</>
                      )}
                    </div>
                  </div>
                </div>

                {/* Login Button */}
                {isPending ? (
                  <LoadingSpinner content={"Logging in..."} />
                ) : (
                  <Button type="submit" className="w-full" disabled={isPending}>
                    Login
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Image Side */}
        <div className="hidden bg-muted lg:block">
          <img
            src={loginImg}
            alt="Image"
            className="h-[100vh] object-cover dark:brightness-[0.2] dark:grayscale "
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default LoginPage;
