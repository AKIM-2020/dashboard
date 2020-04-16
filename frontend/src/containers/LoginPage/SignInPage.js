import React, { useState } from "react";
import styles from './SignIn.module.sass'
import { userActions } from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const SignIn = ({ login }) => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    return <div className={styles.wrapper}>
        <div className={styles.formContent}>
            <div>
                <h2 className={styles.active}> Sign In </h2>
                <h2 className={styles.inactive}> Sign Up </h2>
            </div>

            <form>
                <input className={styles.input}
                       type="text"
                       id="login"
                       name="login"
                       placeholder="login"
                       onChange={event => setUserName(event.target.value)}
                />
                <input className={styles.input}
                       type="text"
                       id="password"
                       name="login"
                       placeholder="password"
                       onChange={event => setUserPassword(event.target.value)}
                />
                <input className={styles.input} type="submit" value="Log In"
                       onClick={ () => login(userName, userPassword) }
                />
            </form>

            <div className={styles.formFooter}>
                <a href="#">Forgot Password?</a>
            </div>
        </div>
    </div>
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...userActions }, dispatch);

export default connect(null, mapDispatchToProps)(SignIn)
