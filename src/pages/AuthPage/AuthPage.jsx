import css from "./AuthPage.module.css"
import { useParams } from "react-router-dom"

export default function AuthPage() {
    const authType = useParams()
    return (
        <div className={css.container}>
            {authType === "register" && <RegisterForm />}
            {authType === "login" && <LoginForm />}
        </div>
    )
};