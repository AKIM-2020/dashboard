import React from "react";
import styles from './SignIn.module.sass'
import { userActions } from "../../actions";

export const SignIn = () => {
    return <div className={styles.wrapper}>
        <div className={styles.formContent}>
            <div>
                <h2 className={styles.active}> Sign In </h2>
                <h2 className={styles.inactive}> Sign Up </h2>
            </div>

            <form>
                <input className={styles.input} type="text" id="login" name="login" placeholder="login"/>
                <input className={styles.input} type="text" id="password" name="login" placeholder="password"/>
                <input className={styles.input} type="submit" value="Log In" onClick={ userActions.login }/>
            </form>

            <div className={styles.formFooter}>
                <a href="#">Forgot Password?</a>
            </div>
        </div>
    </div>
};
