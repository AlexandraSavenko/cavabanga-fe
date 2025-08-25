import React, { Suspense } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import css from "./Layout.module.css"
import Home from "../../pages/home/Home";

const Layout = () => {
  return (
    <div id="root">
      <Header />
      <div className={`${css.contentWrap} container`}>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
