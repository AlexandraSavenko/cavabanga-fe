import { useSelector } from "react-redux";
import { createPortal } from 'react-dom';
import Loader from "../loader/Loader";
import css from "./portalLoader.module.css";

const LoaderPortal = () => {
  const isLoading = useSelector((state) => state.recipes.isToggleFavoritesLoading);
  return createPortal(
    isLoading && (
      <div className={css.loaderPortal}>
        <Loader color='#ffffff' />,
      </div>
    ),
        document.body
      )};


export default LoaderPortal;