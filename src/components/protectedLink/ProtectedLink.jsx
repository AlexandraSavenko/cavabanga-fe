import { useNavigate } from "react-router-dom";

const ProtectedLink = ({ to, children, isLoggedIn, openLoginModal }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); 
      openLoginModal();   
    } else {
      navigate(to);       
    }
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default ProtectedLink;