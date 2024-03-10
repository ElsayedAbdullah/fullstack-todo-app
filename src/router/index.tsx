import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";
import RootLayout from "../pages/Layout";
import ErrorHandler from "../components/errors/ErrorHandler";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ProfilePage from "../pages/Profile";
import Todos from "../pages/Todos";

const userData = JSON.parse(localStorage.getItem("loggedInUser")!);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute isAllowed={userData?.jwt} redirectPath="/login">
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute isAllowed={userData} redirectPath="/">
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="todos"
          element={
            <ProtectedRoute isAllowed={userData} redirectPath="/">
              <Todos />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!userData} redirectPath="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute isAllowed={!userData} redirectPath="/login">
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
