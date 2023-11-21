import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const Layout = () => {
  const { setAuth } = useAuth();

  return (
    <>
      <nav className="relative">
        <button
          className="absolute top-2 right-2 bg-gray-800 px-4 py-2 rounded-xl"
          onClick={() => setAuth()}
        >
          Log out
        </button>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
