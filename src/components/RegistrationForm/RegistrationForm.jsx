import css from "./RegistrationForm.module.css";

export default function RegistrationForm () {
    // const regForm = {
    //     name: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: ""
    //     checkbox:???
    // };
    return (
        <div className={css.container}>
            <h3 className={css.header}>Register</h3>
            <p className={css.descr}>Join our community of culinary enthusiasts, save your favorite recipes, and share your cooking creations</p>
            <form>
                <button className={css.btn}>Create account</button>
            </form>
            <p>Already have an account?</p>
            {/* <Link className={css.link} to='/auth/login'>Log in</Link> */}
        </div>
    )
};