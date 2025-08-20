import React, { Suspense } from 'react';
// import css from "./Layout.module.css"

const Layout = ({children}) => {
  return (
    <div className="container">
      <Suspense>
        {children}
      </Suspense>
    </div>
  )
}

export default Layout
