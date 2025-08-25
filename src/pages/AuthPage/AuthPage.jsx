import css from "./AuthPage.module.css"
import { useParams } from "react-router-dom"
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm"
import LoginForm from "../../components/LoginForm/LoginForm"
import { useSelector, useDispatch } from "react-redux"
import { selectIsAuthError, selectIsLoading } from "../../redux/auth/selectors"
import Loader from "../../components/loader/Loader"
import { useEffect } from "react"
import {clearAuthError} from "../../redux/auth/slice"

export default function AuthPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearAuthError())
    }, [dispatch]);
    const { authType } = useParams()
    const isError = useSelector(selectIsAuthError);
    const isLoading = useSelector(selectIsLoading);
    return (
        <div className={css.container}>
            {authType === "register" && <RegistrationForm />}
            {authType === "login" && <LoginForm />}
            {isLoading && <Loader/>}
            {isError && <AuthError/>}
        </div>
    )
};