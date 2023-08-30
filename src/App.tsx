import React, { useContext } from "react";
import "./App.css";
import { Suspense, lazy } from "react";
import { Loader } from "./components/Loader/Loader";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "./modules/users/users.context";
import { Roles } from "./modules/users/users.roles";
const LazyLogInPage = lazy(() => import("./pages/LogInPage/LogInPage"));
const LazyRegistrationPage = lazy(
  () => import("./pages/RegistrationPage/RegistrationPage")
);
const LazyDashboardPage = lazy(
  () => import("./pages/DashboardPage/DashboardPage")
);
const LazyUserPage = lazy(() => import("./pages/UserPage/UserPage"));
const LazyCompanyPage = lazy(() => import("./pages/CompanyPage/CompanyPage"));

function App() {
  const { userInfo } = useContext(UserContext);

  function checkRole(role: number | null) {
    if (!userInfo)
      return (
        <>
          <Route path="/register" element={<LazyRegistrationPage />} />
          <Route path="/login" element={<LazyLogInPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      );
    else
      switch (role) {
        case Roles.ADMIN:
          return (
            <>
              <Route path="/company" element={<LazyCompanyPage />} />
              <Route path="/user" element={<LazyUserPage />} />
              <Route path="/dash" element={<LazyDashboardPage />} />
              <Route path="*" element={<Navigate to="/dash" replace />} />
            </>
          );
        case Roles.SHIFT_LEAD:
          return (
            <>
              <Route path="/user" element={<LazyUserPage />} />
              <Route path="/dash" element={<LazyDashboardPage />} />
              <Route path="*" element={<Navigate to="/dash" replace />} />
            </>
          );
        case Roles.EMPLOYEE:
          return (
            <>
              <Route path="/dash" element={<LazyDashboardPage />} />
              <Route path="*" element={<Navigate to="/dash" replace />} />
            </>
          );
        default:
          return (
            <>
              <Route path="/dash" element={<LazyDashboardPage />} />
              <Route path="*" element={<Navigate to="/dash" replace />} />
            </>
          );
      }
  }

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Routes>{checkRole(userInfo?.role)}</Routes>
      </Suspense>
    </div>
  );
}

export default App;
