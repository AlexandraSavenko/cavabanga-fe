import css from "./AuthPage.module.css"
import { useParams } from "react-router-dom"
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm"
import LoginForm from "../../components/LoginForm/LoginForm"

export default function AuthPage() {
    const { authType } = useParams()
    return (
        <div className={css.container}>
            {authType === "register" && <RegistrationForm />}
            {authType === "login" && <LoginForm />}
        </div>
    )
};