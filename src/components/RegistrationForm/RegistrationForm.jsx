import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

export default function RegistrationForm () {
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

    const handleSubmit = (values, actions) => {
        console.log("onSubmit");
        console.log(values);
        actions.resetForm();
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
                <Form className={css.form}>
                    <label className={css.label} htmlFor="emailId">Enter your email address</label>
                    < Field className={css.field} type="email" name="email" id="emailId" placeholder="email@gmail.com"/>
                    <ErrorMessage className={css.error} name="email" component="span" />
                    <label className={css.label} htmlFor="nameId">Enter your name</label>
                    < Field className={css.field} type="text" name="name" id="nameId" placeholder="Max"/>
                    <ErrorMessage className={css.error} name="name" component="span" />
                    <label className={css.label} htmlFor="passwordId">Create a strong password</label>
                    < Field className={css.field} type="password" name="password" id="passwordId" placeholder="********"/>
                    <ErrorMessage className={css.error} name="password" component="span" />
                    <label className={css.label} htmlFor="confirmPasId">Repeat your password</label>
                    < Field className={css.field} type="password" name="confirmPassword" id="confirmPasId" placeholder="********"/>
                    <ErrorMessage className={css.error} name="confirmPassword" component="span" />
                    <button className={css.btn} type="submit">Create account</button>
                </Form>
            </Formik >
            <p className={css.alt}>Already have an account?</p>
            <Link className={css.link} to='/auth/login'>Log in</Link>
        </div>
    )
};