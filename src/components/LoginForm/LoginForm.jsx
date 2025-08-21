import css from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

export default function LoginForm () {
    const loginForm = {
        email: "",
        password: ""
    };
    const loginValidSchema = Yup.object().shape({
        email: Yup.string().email("Must be a valid email").max(128, "Email must not exceed 128 characters.").required("Email is a required field"),
        password: Yup.string().min(8, "Password must be at least 8 characters long.").max(128, "Password must not exceed 128 characters.").required("Password is required"),
    });
    const handleSubmit = (values, actions) => {
        console.log("onSubmit");
        console.log(values);
        actions.resetForm();
    };

    return (
        <div className={css.container}>
            <h3 className={css.header}>Login</h3>
            <Formik
                initialValues={loginForm}
                validationSchema={loginValidSchema}
                onSubmit={handleSubmit}
            >
                <Form className={css.form}>
                    <label className={css.label} htmlFor="emailId">Enter your email address</label>
                    <Field className={css.field} type="email" name="email" id="emailId" placeholder="email@gmail.com"/>
                    <ErrorMessage className={css.error} name="email" component="span" />
                    <label className={css.label} htmlFor="passwordId">Enter your password</label>
                    <Field className={css.field} type="password" name="password" id="passwordId" placeholder="********"/>
                    <ErrorMessage className={css.error} name="password" component="span" />
                    <button className={css.btn}>Login</button>
                </Form>
            </Formik >
            <p>Don't have an account?</p>
            <Link className={css.link} to='/auth/register'>Register</Link>
        </div>
    )
};