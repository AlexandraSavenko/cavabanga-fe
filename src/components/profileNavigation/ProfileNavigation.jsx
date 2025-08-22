import { NavLink } from "react-router-dom";
import styles from "./ProfileNavigation.module.css";

const ProfileNavigation = () => {
    return (
        <nav className={styles.nav}>
            <NavLink
                to="/profile/own"
                className={({ isActive }) => (isActive ? styles.active : styles.link)}
            >
                    My Recipes
            </NavLink>
            <NavLink
                to="/profile/favorites"
                className={({ isActive }) => (isActive ? styles.active : styles.link)}
            >
                    Saved Recipes
            </NavLink>
        </nav>
    );
};

export default ProfileNavigation;