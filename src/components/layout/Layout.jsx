import React, { Suspense } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import css from "./Layout.module.css"
import SearchBox from "../SearchBox/SearchBox"
import { useLocation } from "react-router-dom";
import LoaderPortal from "../loaderPortal/LoaderPortal";

const Layout = ({children}) => {
  const location = useLocation().pathname
  const isOnMain = location === "/"
  return (
    <>
      <Header />
      {isOnMain && <SearchBox /> }
      <div className={`${css.contentWrap} container`}>
          {children}
      </div>
      <Footer />
      <LoaderPortal />
    </>
  );
};

export default Layout;
