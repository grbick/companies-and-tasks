import { lazy } from "react";
import { User } from "./users.types";
import { Roles } from "./users.roles";

import { Navigate, Route } from "react-router-dom";

const LazyLogInPage = lazy(() => import("../../pages/LogInPage/LogInPage"));
const LazyRegistrationPage = lazy(
  () => import("../../pages/RegistrationPage/RegistrationPage")
);
const LazyDashboardPage = lazy(
  () => import("../../pages/DashboardPage/DashboardPage")
);
const LazyUserPage = lazy(() => import("../../pages/UserPage/UserPage"));
const LazyCompanyPage = lazy(
  () => import("../../pages/CompanyPage/CompanyPage")
);

export function checkRole(userInfo: User) {
  if (!userInfo)
    return (
      <>
        <Route path="/register" element={<LazyRegistrationPage />} />
        <Route path="/login" element={<LazyLogInPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </>
    );
  else
    switch (userInfo.role) {
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
