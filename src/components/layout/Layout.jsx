import React, { Suspense } from 'react';
import Footer from '../footer/Footer';
// import css from "./Layout.module.css"

const Layout = ({children}) => {
  return ( <div>
    <div className="container">
      <Suspense>
        {children}
      </Suspense>
    </div>
    <Footer/>
    </div>
  )
}

export default Layout
