import css from "./AuthPage.module.css"
import { useParams } from "react-router-dom"
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm"
import LoginForm from "../../components/LoginForm/LoginForm"
import { useSelector, useDispatch } from "react-redux"
import { selectAuthError, selectIsLoading } from "../../redux/auth/selectors"
import Loader from "../../components/loader/Loader"
import { useEffect } from "react"
import {clearAuthError} from "../../redux/auth/slice"
import ModalErrorCommon from "../../components/ModalErrorGeneral/ModalErrorCommon"

export default function AuthPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearAuthError())
    }, [dispatch]);
    const { authType } = useParams()
    const error = useSelector(selectAuthError);
    const isLoading = useSelector(selectIsLoading);
    return (
        <div className={css.container}>
            {authType === "register" && <RegistrationForm />}
            {authType === "login" && <LoginForm />}
            {isLoading && <Loader />}
            {error && <ModalErrorCommon>
                <p className={css.title}>Authentification Error</p>
                <p className={css.text}>
                    We couldn't process your request. Make sure your information is correct, or try again later.
                </p>
                <p>{error.message}</p>
            </ModalErrorCommon>}
        </div>
    )
};