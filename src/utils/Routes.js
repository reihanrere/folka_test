import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routesList from "./RoutesList";

const Dashboard = React.lazy(() => import("../pages/dashboard"));
const ProductDetail = React.lazy(() =>
  import("../pages/product/detailProduct")
);
const Login = React.lazy(() => import("../pages/auth/login"));
const Register = React.lazy(() => import("../pages/auth/register"));

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

function RoutePath() {
  return (
    <>
      <Routes>
        <Route
          path={routesList.dashboard.root}
          element={
            isAuthenticated() ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route path={routesList.auth.login} element={<Login />} />
        <Route path={routesList.auth.register} element={<Register />} />
        <Route
          path={routesList.product.detail}
          element={
            isAuthenticated() ? (
              <ProductDetail />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default RoutePath;
