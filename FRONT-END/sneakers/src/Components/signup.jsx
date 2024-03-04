import React, { useState } from "react";
import "./signup.css";
import { Link } from 'react-router-dom'; 

export default function Form() {
  const [field, setField] = useState({
    userName: "", 
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmit] = useState(false);
  const [validate, setValidation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (field.userName && field.email && field.password && field.confirmPassword) {
      if (field.password === field.confirmPassword) {
        if (validateEmail(field.email)) {
          setValidation(true);
        } else {
          setValidation(false);
        }
      } else {
        setValidation(false);
      }
    }
    setSubmit(true);
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div>
    <div className="center-container">
      <div className="form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          {submitted && validate ? (
            <div className="success-message">Registration successful!</div>
          ) : null}

          <input
            id="user-name"
            className="form-field"
            type="text"
            placeholder="User Name"
            name="userName"
            value={field.userName}
            onChange={(e) => {
              setField({ ...field, userName: e.target.value });
            }}
          />
          {submitted && !field.userName ? <span>Please enter your User Name</span> : null}

          <input
            id="email"
            className="form-field"
            type="text"
            placeholder="Email"
            name="email"
            value={field.email}
            onChange={(e) => {
              setField({ ...field, email: e.target.value });
            }}
          />
          {submitted && !field.email ? <span>Please enter your email</span> : null}
          {submitted && field.email && !validateEmail(field.email) ? (
            <span>Please enter a valid email</span>
          ) : null}

          <input
            id="password"
            className="form-field"
            type="password"
            placeholder="Password"
            name="password"
            value={field.password}
            onChange={(e) => {
              setField({ ...field, password: e.target.value });
            }}
          />
          {submitted && !field.password ? <span>Please enter your password</span> : null}

          <input
            id="confirm-password"
            className="form-field"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={field.confirmPassword}
            onChange={(e) => {
              setField({ ...field, confirmPassword: e.target.value });
            }}
          />
          {submitted && field.password !== field.confirmPassword ? (
            <span>Passwords do not match</span>
          ) : null}
          <Link to = "/Home">
          <button className="form-field" type="submit">Sign Up</button>
          </Link>
        </form>
      </div>
    </div>
    </div>
  );
}