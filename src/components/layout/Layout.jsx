import React, { Suspense } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import css from "./Layout.module.css"
import SearchBox from "../SearchBox/SearchBox"


const Layout = ({children}) => {
  return (
    <div id="root">
      <Header />
      { <SearchBox /> }
      <div className={`${css.contentWrap} container`}>
          {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
