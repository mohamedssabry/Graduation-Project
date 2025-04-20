import React from "react";
import Navbar from "../../molecules/Navbar";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div className="">
      <Navbar />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
