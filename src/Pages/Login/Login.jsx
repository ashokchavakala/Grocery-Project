import React, { useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login() {
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginDetails({ ...loginDetails, [name]: value })
    };

    const handleLoginBtn = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/users/login', loginDetails).then(response => {
            console.log(response);
            navigate('/dashboard')
        }).catch((err) => {
            console.log(err);
            setShowErrorMessage(true)
        })
        console.log(loginDetails);
    };
    return (
        <>
            <div className={styles.bg_color}>

                <div><h2 className={styles.logo1}>Grocery</h2><h2 className={styles.logo2}> Mart</h2></div>

                <div className={styles.loginPage}>
                    <div className={styles.loginForm}>
                        <div className={styles.heading}>Login in to Grocery Mart</div>
                        <form>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" placeholder='Enter email'
                                    className={styles.input_email_password}
                                    value={loginDetails.email}
                                    onChange={handleInputChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" placeholder='Enter password'
                                    className={styles.input_email_password}
                                    value={loginDetails.password}
                                    onChange={handleInputChange} required />
                            </div>
                            <button type="submit" className={styles.login_btn} onClick={handleLoginBtn}>Login</button>
                        </form><br />
                        <div className={styles.forgotPassword}>
                            <a href="#" className={styles.forgot_link}>Forgot Password?</a>
                            <span> . </span>
                            <a href="#" className={styles.signup_link}><Link to="/register">Sign up for Grocery Mart</Link></a>
                        </div>
                        {showErrorMessage && <p className='alert alert-danger text-center' >Invalid email or password</p>}                    </div>
                </div>

            </div>

        </>

    )
}

export default Login
