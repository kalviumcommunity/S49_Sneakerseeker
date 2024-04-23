import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 

export default function Log() {
  const [field, setField] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmit] = useState(false);
  const [validate, setValidation] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: field.email,
        password: field.password,
        action: "login", 
      });

      
      if (response.data.message === "Login successful") {
        setValidation(true);
        Cookies.set("username", field.email,{expires:1});
        setError("");
        navigate("/Home");
      } else {
        setValidation(false);
        setError("Invalid credentials");
      }
    } catch (err) {
      setValidation(false);
      setError("Email or Password is invalid");
      console.error(err);
    }
  };

  return (
    <div>
      <div className="form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          {submitted && !validate && error && (
            <div className="error-message">{error}</div>
          )}

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
          {submitted && !field.email && (
            <span>Please enter your Email</span>
          )}

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
          {submitted && !field.password && (
            <span>Please enter your password</span>
          )}
          <button className="form-field" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}