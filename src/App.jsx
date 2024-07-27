import "./App.css";

import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import PreLoader from "./components/common/PreLoader";
import DashboardPage from "./pages/Dashboard/DashboardPage";

// Auth
const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const ForgotPasswordPage = lazy(() =>
  import("./pages/Auth/ForgotPasswordPage")
);
const ResetPasswordPage = lazy(() => import("./pages/Auth/ResetPasswordPage"));

const ProfileLayout = lazy(() => import("./pages/Profile/ProfileLayout"));
const EnquiryDetailsPage = lazy(() =>
  import("./pages/Enquiry/EnquiryDetailsPage")
);
const EnquiryListPage = lazy(() => import("./pages/Enquiry/EnquiryListPage"));
const AddTimelinePage = lazy(() => import("./pages/Timeline/AddTimelinePage"));
const AddSkillPage = lazy(() => import("./pages/Skill/AddSkillPage"));
const AddProjectPage = lazy(() => import("./pages/Project/AddProjectPage"));
const ManageSkillPage = lazy(() => import("./pages/Skill/ManageSkillPage"));
const ManageTimelinePage = lazy(() =>
  import("./pages/Timeline/ManageTimelinePage")
);
const ManageProjectPage = lazy(() =>
  import("./pages/Project/ManageProjectPage")
);
const ViewProjectPage = lazy(() => import("./pages/Project/ViewProjectPage"));
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

  // Scroll to Top Component
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />

        {authUser && (
          <>
            <Sidebar />
            <Header />
          </>
        )}

        <Suspense
          fallback={
            <div className="min-h-[100vh] flex items-center justify-center">
              <PreLoader />
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={authUser ? <DashboardPage /> : <Navigate to="/login" />}
            />

            <Route
              path="/profile"
              element={authUser ? <ProfileLayout /> : <Navigate to="/login" />}
            />

            {/* Project */}
            <Route
              path="/project/add"
              element={authUser ? <AddProjectPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/project/edit/:id"
              element={authUser ? <AddProjectPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/project/:id"
              element={
                authUser ? <ViewProjectPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/project/manage"
              element={
                authUser ? <ManageProjectPage /> : <Navigate to="/login" />
              }
            />

            {/* Skill */}
            <Route
              path="/skill/add"
              element={authUser ? <AddSkillPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/skill/edit/:id"
              element={authUser ? <AddSkillPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/skill/manage"
              element={
                authUser ? <ManageSkillPage /> : <Navigate to="/login" />
              }
            />

            {/* Timeline */}
            <Route
              path="/timeline/add"
              element={
                authUser ? <AddTimelinePage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/timeline/edit/:id"
              element={
                authUser ? <AddTimelinePage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/timeline/manage"
              element={
                authUser ? <ManageTimelinePage /> : <Navigate to="/login" />
              }
            />

            {/* Enquiries */}
            <Route
              path="/enquiries/:id"
              element={
                authUser ? <EnquiryDetailsPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/enquiries"
              element={
                authUser ? <EnquiryListPage /> : <Navigate to="/login" />
              }
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
        </Suspense>

        <Toaster
          toastOptions={{
            style: {
              background: "#363636",
              color: "#fffbfb",
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
