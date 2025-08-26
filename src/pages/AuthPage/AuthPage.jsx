import css from "./AuthPage.module.css"
import { useParams } from "react-router-dom"
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm"
import LoginForm from "../../components/LoginForm/LoginForm"
import {
    useSelector,
    useDispatch
} from "react-redux"
import {
    selectAuthError,
    selectIsLoading
} from "../../redux/auth/selectors"
import Loader from "../../components/loader/Loader"
import { useEffect } from "react"
import {clearAuthError} from "../../redux/auth/slice"
import ModalErrorCommon from "../../components/ModalErrorGeneral/ModalErrorCommon"

export default function AuthPage() {
    const { authType } = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("in useEffect");
        dispatch(clearAuthError())
    }, [dispatch]);
 
    const error = useSelector(selectAuthError);
    const isLoading = useSelector(selectIsLoading);
    if (error) {
        console.log("if(error) => error: ", error)
    };

  const handleCloseModal = () => {
    dispatch(clearAuthError())
  };
    return (
        <div className={css.container}>
            <ModalErrorCommon isopen={error} onClose={handleCloseModal}>
            <p className={css.title}>{`${error}`}</p>
            <p className={css.text}>
                We couldn't process your request. Make sure your information is correct, or try again later.
                </p>
            </ModalErrorCommon>
            {authType === "register" && <RegistrationForm />}
            {authType === "login" && <LoginForm />}
            {isLoading && <Loader />}
        </div>
    )
};