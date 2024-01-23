import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function NotAuth() {
  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

          body {
            background: black;
            font-family: 'Roboto', sans-serif;
            margin: 0;
          }
        
          .oops-container {
            background: black;
            color: #90ee90;
            height: 90vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          
          .oops-icon {
            font-size: 7em;
            margin-bottom: 1px;
          }
          @media (min-width: 1000px) {
          .oops-text {
            margin-top: 15px;
            margin-bottom: 20px;
            font-size: 2.5em;
          }
          }
          @media (max-width: 1000px) {
          .oops-text {
            margin-top: 15px;
            margin-bottom: 20px;
            font-size: 2em;
          }
          }

          .login-button {
            font-size: 2em;
            padding: 10px 20px;
            border-radius: 8px;
            background-color: #90ee90;
            color: #fff;
            text-decoration: none;
            transition: background-color 0.3s;
            color:black;
          }

          .login-button:hover {
            background-color: #218838;
          }
        `}
      </style>

      <div className="container oops-container">
        <FaExclamationCircle className="oops-icon" />
        <p className="oops-text">Oops! Please login first.</p>
        <Link to="/login" className="btn btn-success login-button">
          Click here to Login
        </Link>
      </div>
    </>
  );
}

export default NotAuth;
