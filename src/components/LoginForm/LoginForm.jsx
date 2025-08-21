import css from "./LoginForm.module.css";

export default function LoginForm () {
    // const loginForm = {
    //     email: "",
    //     password: ""
    // };
    return (
        <div className={css.container}>
            <h3 className={css.header}>Login</h3>
            <form>
                <button className={css.btn}>Login</button>
            </form>
            <p>Don't have an account?</p>
            {/* <Link className={css.link} to='auth/register'>Register</Link> */}
        </div>
    )
};