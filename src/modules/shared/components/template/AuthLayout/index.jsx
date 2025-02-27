import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation(); // Get current route

  // Define paths where navigation should be displayed
  const showNav = ["/auth/login", "/auth/signup"].includes(location.pathname);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-white">
      {/* Container */}
      <div className="bg-white p-16 rounded-4xl w-2/5">
        {/* Navigation Links */}
        {showNav && (
          <nav className="flex border-2 rounded-full justify-between p-2 w-2/3 border-gray-300 mx-auto">
            <Link
              to="/auth/login"
              className={`px-12 py-2 rounded-full transition-all duration-300 ease-in-out ${
                location.pathname === "/auth/login"
                  ? "bg-blue-600 text-white scale-105"
                  : ""
              }`}
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className={`px-12 py-2 rounded-full transition-all duration-300 ease-in-out ${
                location.pathname === "/auth/signup"
                  ? "bg-blue-600 text-white scale-105"
                  : ""
              }`}
            >
              Register
            </Link>
          </nav>
        )}

        {/* Render Child Routes */}
        <div className="mt-6 w-full px-4 transition-opacity duration-500 ease-in-out animate-fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
