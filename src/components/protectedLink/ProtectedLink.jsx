// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getRecipeList } from "../../redux/recipes/operations";

const ProtectedLink = ({ to, children, isLoggedIn, openLoginModal }) => {
  // const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); 
      openLoginModal();   
    } else {
      navigate(to);  
      // dispatch(getRecipeList())     
    }
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default ProtectedLink;