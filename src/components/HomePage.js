// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/back_ground2.jpeg';
import logo from '../images/todo.png';

const HomePage = () => {
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
            // color: #6462de; /* Change color on hover */
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
        <div 
          className="text-center p-4" 
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.3)', 
            borderRadius: '20px', 
            padding: '20px', 
            minWidth: '400px', 
            maxWidth: '700px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)', 
            backdropFilter: 'blur(3px)' 
          }}
        >
          <h1 className="mb-4" style={{ color: 'black', fontWeight: 'bold' }}>TODO APP</h1>
          <p className="mb-3" style={{ color: 'black', fontStyle: 'italic' }}>This simple note-taking app helps you manage your daily tasks.</p>
          <p className="mb-4" style={{ color: 'black', fontStyle: 'italic' }}>If you don't have an account yet, create one now.</p>
          <div className="d-grid gap-3">
            <Link to="/login" className="btn btn-dark btn-lg" style={{ borderRadius: '30px', width: '100%', fontWeight: 'bold' }}>
                <i className="fas fa-sign-in-alt"></i>Login
                </Link>
                <Link to="/register" className="btn btn-dark btn-lg mt-3" style={{ borderRadius: '30px', width: '100%', fontWeight: 'bold' }}>
                <i className="fas fa-user-plus"></i>Register
                </Link>
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
    </>
  );
};

export default HomePage;
