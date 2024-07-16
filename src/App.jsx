import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import PreLoader from "./components/common/PreLoader";
// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
// Imports End

const App = () => {
  // fetch Authentication User Data
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/v1/auth/me");
        const data = await res.json();
        if (data.error) return null;

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center">
        <PreLoader />
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />

          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
        </Routes>

        <Toaster
          toastOptions={{
            duration: 1600,
            style: {
              background: "#363636",
              color: "#f3f3f3",
              fontFamily: "poppins",
              fontSize: "12px",
            },
          }}
        />
      </BrowserRouter>
    </>
  );
};

export default App;
