// src/components/Register.js

import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import backgroundImage from '../images/back_ground2.jpeg';
import Input from './form/Input';

const Register = () => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const { setAlertClassName, setAlertMessage } = useOutletContext();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        let payload = {
            first_name: first_name,
            last_name: last_name,
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

        fetch(`${process.env.REACT_APP_BACKEND}/register`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setAlertClassName("alert-danger");
                    setAlertMessage(data.message);
                } else {
                    setAlertClassName("d-none");
                    setAlertMessage("Registration successful. Please log in.");
                    navigate("/login");
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
                        min-width: 450px;
                        max-width: 800px;
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
                        <h1 className="mb-4" style={{ color: 'black', fontWeight: 'bold' }}>Sign Up</h1>
                        <form onSubmit={handleSubmit}>
                            <Input 
                                title="First name"
                                type="firstname"
                                className="form-control input-field"
                                name="firstname"
                                autoComplete="firstname-new"
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                            <Input 
                                title="Last name"
                                type="last_name"
                                className="form-control input-field"
                                name="last_name"
                                autoComplete="last_name-new"
                                onChange={(event) => setLastName(event.target.value)}
                            />
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

                            <Input 
                                title="Confirm Password"
                                type="password"
                                className="form-control input-field"
                                name="confirmPassword"
                                autoComplete="password-new"
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                            {errorMessage && <div className="alert alert-danger small">{errorMessage}</div>}
                            <div className="d-grid gap-3">
                                <button type="submit" className="btn btn-dark btn-lg full-width" style={{ borderRadius: '30px', fontWeight: 'bold', marginBottom: '20px' }}>
                                    Register
                                </button>
                            </div>
                        </form>
                        <div className="account-link-container mt-3">
                            <Link to="/login" className="account-link" style={{ fontStyle: "italic" }}>
                                *I already have an account
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

export default Register;
