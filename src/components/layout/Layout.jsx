import React, { Suspense } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
// import css from "./Layout.module.css"

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
