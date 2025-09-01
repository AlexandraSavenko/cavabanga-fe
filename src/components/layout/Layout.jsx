import React, { Suspense } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import css from "./Layout.module.css"
import SearchBox from "../SearchBox/SearchBox"
import { useLocation } from "react-router-dom";


const Layout = ({children}) => {
  const location = useLocation().pathname
  const isOnMain = location === "/"
  return (
    <div id="root">
      <Header />
      {isOnMain && <SearchBox /> }
      <div className={`${css.contentWrap} container`}>
          {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
