import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import useAuth from "./hooks/useAuth.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Layout from "./components/Layout.jsx";

const Router = () => {
  const { auth } = useAuth();

  const PrivateRoute = ({ ...rest }) =>
    auth?.token ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: rest.location }} replace />
    );

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
