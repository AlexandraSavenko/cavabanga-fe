import React from 'react';
import css from "./Home.module.css"
import Footer from '../../components/footer/Footer';

const Home = () => {
  return (
    <div className={css.wrap}>
      <h1>Home</h1>
      <Footer/>
      
    </div>
  )
}

export default Home
