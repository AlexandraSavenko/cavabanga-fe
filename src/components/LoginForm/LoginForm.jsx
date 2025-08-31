import css from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { useState } from "react";
import clsx from "clsx";
import { getUserFavourites } from "../../redux/recipes/operations";

export default function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPassShown, setIsPassShown] = useState(false);
        const togglePassVisibility = () => {
            setIsPassShown(!isPassShown);
        }
    const loginForm = {
        email: "",
        password: ""
    };
    const loginValidSchema = Yup.object().shape({
        email: Yup.string().email("Must be a valid email").max(128, "Email must not exceed 128 characters.").required("Email is a required field"),
        password: Yup.string().min(8, "Password must be at least 8 characters long.").max(128, "Password must not exceed 128 characters.").required("Password is required"),
    });
    const handleSubmit = async(values, actions) => {
        const res = await dispatch(login(values));
        if (login.fulfilled.match(res)) {
            dispatch(getUserFavourites())
            actions.resetForm();
            navigate('/');
        }
    };

    return (
        <div className={css.container}>
            <h3 className={css.header}>Login</h3>
            <Formik
                initialValues={loginForm}
                validationSchema={loginValidSchema}
                onSubmit={handleSubmit}
            >
                {({ errors }) => (
                    <Form className={css.form}>
                        <div className={css.fieldWrapper}>
                            <label className={css.label} htmlFor="emailId">Enter your email address</label>
                            <Field className={clsx(css.field, errors.email && css.errorField)} type="email" name="email" id="emailId" placeholder="email@gmail.com" />
                            <ErrorMessage className={css.error} name="email" component="span" />
                        </div>
                        <div className={css.fieldWrapper}>
                            <label className={css.label} htmlFor="passwordId">Enter your password</label>
                            <Field className={clsx(css.field, errors.password && css.errorField)} type={isPassShown ? "text" : "password"} name="password" id="passwordId" placeholder="********" />
                            <ErrorMessage className={css.error} name="password" component="span" />
                            <button type="button" className={css.passToggleButton} onClick={togglePassVisibility}>
                                <svg className={clsx(css.icon, errors.password && css.errorIcon)} width={24} height={24}>
                                <use href={isPassShown ? '/icons.svg#icon-password-hide' : '/icons.svg#icon-password-show'}></use>
                                </svg>
                            </button>
                        </div>
                        <button type="submit" className={css.btn}>Login</button>
                    </Form>
                )}
            </Formik >
            <div className={css.linkWrapper}>
                <p className={css.alt}>Don't have an account? </p>
                <Link className={css.link} to='/auth/register'>Register</Link>
            </div>
        </div>
    )
};