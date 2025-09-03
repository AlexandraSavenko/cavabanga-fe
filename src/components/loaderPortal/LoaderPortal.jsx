import { useSelector } from "react-redux";
import { createPortal } from 'react-dom';
import Loader from "../loader/Loader";
import css from "./portalLoader.module.css";
import { selectLoading } from "../../redux/recipes/selectors";
import { selectFilterLoading } from "../../redux/filters/selectors";
import { selectIsLoading } from "../../redux/auth/selectors";

const LoaderPortal = () => {
  const recipeLoading = useSelector(selectLoading);
  const filLoading = useSelector(selectFilterLoading);
  const authLoading = useSelector(selectIsLoading)
  return createPortal(
    (recipeLoading || filLoading || authLoading) && (
      <div className={css.loaderPortal}>
        <Loader color='#ffffff' />,
      </div>
    ),
        document.body
      )};


export default LoaderPortal;