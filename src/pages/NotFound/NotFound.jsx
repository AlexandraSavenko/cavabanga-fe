import { Link } from "react-router-dom";
import css from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={css.notFoundWrapper}>
      <img
        src="../../../public/404-2x-min.png"
        alt="Not found"
        className={css.notFoundImg}
      />
      <h1 className={css.notFoundTitle}>404</h1>
      <h2 className={css.notFoundSubtitle}>Recipe not found</h2>
      <Link to="/" className={css.notFoundLink}>
        Back to Home
      </Link>
    </div>
  );
}
