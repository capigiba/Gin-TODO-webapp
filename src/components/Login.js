// src/components/Login.js

import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import backgroundImage from '../images/back_ground2.jpeg';
import Input from './form/Input';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { setJwtToken, setAlertClassName, setAlertMessage, toggleRefresh } = useOutletContext();

    const handleSubmit = (event) => {
        event.preventDefault();

        let payload = {
            email: email,
            password: password,
        };

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            credentials: "include",
            body: JSON.stringify(payload)
        };

        fetch(`${process.env.REACT_APP_BACKEND}/login`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setAlertClassName("alert-danger");
                    setAlertMessage(data.message);
                } else {
                    setJwtToken(data.access_token);
                    setAlertClassName("d-none");
                    setAlertMessage("");
                    toggleRefresh(true);
                    navigate("/");
                }
            })
            .catch(error => {
                setAlertClassName("alert-danger");
                setAlertMessage(error.toString());
            });
    };

    return (
        <>
            <style>
                {`
                    .btn-dark {
                        background-color: black;
                        border: 1px solid black;
                        color: white;
                    }
                    .btn-dark:hover {
                        background-color: transparent;
                        color: black;
                        border: 1px solid black;
                    }
                    .btn-dark .fas {
                        margin-right: 8px; /* Adjust the margin between icon and text */
                    }

                    .btn-icon {
                        background-color: transparent;
                        border: none;
                        color: black;
                        font-size: 24px;
                        margin: 0 10px;
                    }
                    .btn-icon:hover {
                        color: white;
                    }

                    .login-container {
                        background-color: white;
                        border-radius: 20px;
                        padding: 20px;
                        min-width: 400px;
                        max-width: 700px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
                        backdrop-filter: blur(3px);
                    }

                    .input-field {
                        border-radius: 10px;
                    }

                    .full-width {
                        width: 100%;
                    }

                    .account-link {
                        color: black;
                        text-decoration: none;
                    }

                    .account-link:hover {
                        text-decoration: underline;
                    }

                    .account-link-container {
                        text-align: right;
                    }

                    .divider {
                        display: flex;
                        align-items: center;
                        text-align: center;
                    }
                    .divider::before, .divider::after {
                        content: '';
                        flex: 1;
                        border-bottom: 1px solid #ccc;
                    }
                    .divider::before {
                        margin-right: .25em;
                    }
                    .divider::after {
                        margin-left: .25em;
                    }
                `}
            </style>
            <div 
                className="d-flex justify-content-center align-items-center vh-100" 
                style={{ 
                    backgroundImage: `url(${backgroundImage})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="login-container text-center p-4">
                                <h1 className="mb-4" style={{ color: 'black', fontWeight: 'bold' }}>Log In</h1>
                                <form onSubmit={handleSubmit}>
                                    <Input 
                                        title="Email Address"
                                        type="email"
                                        className="form-control input-field"
                                        name="email"
                                        autoComplete="email-new"
                                        onChange={(event) => setEmail(event.target.value)}
                                    />

                                    <Input 
                                        title="Password"
                                        type="password"
                                        className="form-control input-field"
                                        name="password"
                                        autoComplete="password-new"
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    <Link to="/##" className="account-link text-start small" style={{ fontStyle: "italic" }}>
                                        forgot your password?
                                    </Link>
                                    <div className="d-grid gap-3">
                                        <button type="submit" className="btn btn-dark btn-lg full-width" style={{ borderRadius: '30px', fontWeight: 'bold', marginBottom: '20px' }}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                                <div className="account-link-container">
                                    <Link to="/register" className="account-link" style={{ fontStyle: "italic" }}>
                                        *I don't have an account
                                    </Link>
                                </div>
                                <div className="divider my-4">
                                    <span>or</span>
                                </div>
                                <div className="mt-4">
                                    <Link to="/google-login" className="btn-icon">
                                        <i className="fab fa-google"></i>
                                    </Link>
                                    <Link to="/facebook-login" className="btn-icon">
                                        <i className="fab fa-facebook-f"></i>
                                    </Link>
                                    <Link to="/instagram-login" className="btn-icon">
                                        <i className="fab fa-instagram"></i>
                                    </Link>
                                    <Link to="/github-login" className="btn-icon">
                                        <i className="fab fa-github"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
