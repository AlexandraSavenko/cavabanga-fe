import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/selectors";


const RestrictedRoute = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}

export default RestrictedRoute;