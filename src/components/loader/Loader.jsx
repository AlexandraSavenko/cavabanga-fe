<<<<<<< Updated upstream
import React from 'react'
import css from "./Loader.module.css"
import { ClockLoader } from 'react-spinners'


const Loader = () => {
    
  return (
    <div className={css.wrap}>
        <ClockLoader size={100} color='#3d2218' />
    </div>
  )
}

export default Loader
=======
import css from "./Loader.module.css";

const Loader = () => {
  return <div className={css.loader}>Завантаження...</div>; // Текст українською
};

export default Loader;
>>>>>>> Stashed changes
