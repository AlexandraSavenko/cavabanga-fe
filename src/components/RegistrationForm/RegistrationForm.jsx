import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import clsx from "clsx";
import { useState } from "react";

export default function RegistrationForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPassShown, setIsPassShown] = useState(false);
    const togglePassVisibility = () => {
        setIsPassShown(!isPassShown);
    }
    const [isConfPassShown, setIsConfPassShown] = useState(false);
    const toggleConfPassVisibility = () => {
        setIsConfPassShown(!isConfPassShown);
    }
    const regForm = {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        // terms: false
    };
    const RegValidSchema = Yup.object().shape({
        email: Yup.string().email("Must be a valid email").max(128, "Email must not exceed 128 characters.").required("Email is a required field"),
        name: Yup.string().max(16, "Name must not exceed 16 characters.").required("Name is a required field."),
        password: Yup.string().min(8, "Password must be at least 8 characters long.").max(128, "Password must not exceed 128 characters.").required("Password is required"),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "The passwords must match.").required("Please, confirm the password."),
        // terms: Yup.boolean().oneOf([true], "You must agree to the Terms of Service and Privacy Policy.")
    });

    const handleSubmit = async (values, actions) => {
        const { email, name, password } = values;
        const payload = { name, email, password };
        const res = await dispatch(register(payload));
        if (register.fulfilled.match(res)) {
            actions.resetForm();
            navigate('/');
        }
    };

    return (
        <div className={css.container}>
            <h3 className={css.header}>Register</h3>
            <p className={css.descr}>Join our community of culinary enthusiasts, save your favorite recipes, and share your cooking creations</p>
            <Formik
                initialValues={regForm}
                validationSchema={RegValidSchema}
                onSubmit={handleSubmit}
            >
            {({ errors }) => (
                <Form className={css.form}>
                    <div className={css.fieldWrapper}>
                        <label className={css.label} htmlFor="emailId">Enter your email address</label>
                        < Field className={clsx(css.field, errors.email && css.errorField)} type="email" name="email" id="emailId" placeholder="email@gmail.com" />
                        <ErrorMessage className={css.error} name="email" component="span" />
                    </div>
                    <div className={css.fieldWrapper}>
                        <label className={css.label} htmlFor="nameId">Enter your name</label>
                        < Field className={clsx(css.field, errors.name && css.errorField)} type="text" name="name" id="nameId" placeholder="Max"/>    
                        <ErrorMessage className={css.error} name="name" component="span" />
                    </div>
                    <div className={css.fieldWrapper}>
                        <label className={css.label} htmlFor="passwordId">Create a strong password</label>
                        < Field className={clsx(css.field, errors.password && css.errorField)} type={isPassShown ? "text" : "password"} name="password" id="passwordId" placeholder="********"/>
                        <ErrorMessage className={css.error} name="password" component="span" />
                            <button type="button" className={css.passToggleButton} onClick={togglePassVisibility}>
                            <svg className={clsx(css.icon, errors.password && css.errorIcon)} width={24} height={24}>
                            <use href={isPassShown ? '/icons.svg#icon-password-hide' : '/icons.svg#icon-password-hide'}></use>
                            </svg>
                        </button>
                    </div>
                    <div className={css.fieldWrapper}>
                        <label className={css.label} htmlFor="confirmPasId">Repeat your password</label>
                        < Field className={clsx(css.field, errors.confirmPassword && css.errorField)} type={isConfPassShown ? "text" : "password"} name="confirmPassword" id="confirmPasId" placeholder="********"/>
                            <ErrorMessage className={css.error} name="confirmPassword" component="span" />
                            <button type="button" className={css.passToggleButton} onClick={toggleConfPassVisibility}>
                                <svg className={clsx(css.icon, errors.confirmPassword && css.errorIcon)} width={24} height={24}>
                            <use href={isConfPassShown ? '/icons.svg#icon-password-hide' : '/icons.svg#icon-password-hide'}></use>
                            </svg>
                        </button>
                    </div>
                    {/* <label className={css.label} htmlFor="termsId">I agree to the Terms of Service and Privacy Policy</label>
                    <Field className={css.field} type="checkbox" name="terms" id="termsId" />
                    <ErrorMessage className={css.error} name="terms" component="span"/> */}
                    <button className={css.btn} type="submit">Create account</button>
                </Form>
            )}
            </Formik >
            <div className={css.linkWrapper}>
                <p className={css.alt}>Already have an account? </p>
                <Link className={css.link} to='/auth/login'>Log in</Link>
            </div>
        </div>
    )
};