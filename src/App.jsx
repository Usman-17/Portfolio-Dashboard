import "./App.css";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import PreLoader from "./components/common/PreLoader";
// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import Sidebar from "./components/common/Sidebar";
import Header from "./components/common/Header";
import ProfileLayout from "./pages/Profile/ProfileLayout";
import EnquiryDetailsPage from "./pages/Enquiry/EnquiryDetailsPage";
import EnquiryListPage from "./pages/Enquiry/EnquiryListPage";
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
        {authUser && (
          <>
            <Sidebar />
            <Header />
          </>
        )}

        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />

          <Route
            path="/profile"
            element={authUser ? <ProfileLayout /> : <Navigate to="/login" />}
          />

          <Route
            path="/enquiries/:id"
            element={
              authUser ? <EnquiryDetailsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/enquiries"
            element={authUser ? <EnquiryListPage /> : <Navigate to="/login" />}
          />

          {/* Auth */}
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />

          <Route
            path="/forgot-password"
            element={
              !authUser ? <ForgotPasswordPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              !authUser ? <ResetPasswordPage /> : <Navigate to="/login" />
            }
          />
        </Routes>

        <Toaster
          toastOptions={{
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
