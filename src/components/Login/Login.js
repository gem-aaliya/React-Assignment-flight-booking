import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
  });

  const [inputError, setInputError] = useState({
    usernameError: "",
    passwordError: "",
  });

  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateForm = () => {
    let isValid = true;

    if (!formInput.username) {
      setInputError((prevError) => ({
        ...prevError,
        usernameError: 'Username is required',
      }));
      isValid = false;
    } else {
      setInputError((prevError) => ({
        ...prevError,
        usernameError: '',
      }));
    }

    if (!formInput.password) {
      setInputError((prevError) => ({
        ...prevError,
        passwordError: 'Password is required',
      }));
      isValid = false;
    } else {
      setInputError((prevError) => ({
        ...prevError,
        passwordError: '',
      }));
    }

    return isValid;
  };


  const submitLogin = (event) => {
    event.preventDefault();

    
    if (!validateForm()) {
        return;
    }
    
    setFormError("");
    const correctUsername = "Admin";
    const correctPassword = "Admin@123";

    if (
      formInput.username === correctUsername &&
      formInput.password === correctPassword
    ) {
      localStorage.setItem("loggedInUser", true);
      navigate("/dashboard");
    } else {
      setFormError("Invalid username or password");
    }
  };

  const handleUserNameChange = (event) => {
    let value=event.target.value;
    setFormInput((prevState) => ({
      ...prevState,
      username: value, 
    }));
    if(!/^[a-zA-Z0-9]+$/.test(value)){
      setInputError((prevError) => ({
        ...prevError,
        usernameError: 'Username should contain only letters and numbers',
      }));
      }
      else if(value.length<5)
      {
        setInputError((prevError) => ({
          ...prevError,
          usernameError: 'Username should be at least 5 characters long',
        }));
      }
      else{
        setInputError((prevError) => ({
          ...prevError,
          usernameError: '',
        }));
      }
  };

  const handlePasswordChange = (event) => {
    const value=event.target.value
    setFormInput((prevState) => ({
      ...prevState,
      password: value, 
    }));
  
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[@$!%*?&#]/.test(value);
        if (value.length < 8) {
          setInputError((prevError) => ({
            ...prevError,
            passwordError: 'Password should be at least 8 characters long',
          }));
        } else if (!hasUppercase) {
          setInputError((prevError) => ({
            ...prevError,
            passwordError: 'Password must contain at least one uppercase letter',
          }));
        } else if (!hasLowercase) {
          setInputError((prevError) => ({
            ...prevError,
            passwordError: 'Password must contain at least one lowercase letter',
          }));
        } else if (!hasNumber) {
          setInputError((prevError) => ({
            ...prevError,
            passwordError: 'Password must contain at least one number',
          }));
        } else if (!hasSpecialChar) {
          setInputError((prevError) => ({
            ...prevError,
            passwordError: 'Password must contain at least one special character (@$!%*?&#)',
          }));
        } else {
          setInputError((prevError) => ({
            ...prevError,
            passwordError: '',
          }));
        }
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={submitLogin}>
        <div className="input-error">
          <label>
            Username <span>*</span>
          </label>
          <input
            type="text"
            name="username"
            value={formInput.username}
            onChange={handleUserNameChange}
            placeholder="Enter Username"
          />
          {inputError.usernameError && (
            <div className="error-message">{inputError.usernameError}</div>
          )}
        </div>
        <div className="input-error">
          <label>
            Password <span>*</span>
          </label>
          <div className="input-group">
            <input
              className="password-input"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formInput.password}
              onChange={handlePasswordChange}
              placeholder="Enter Password"
            />
            <button
              className="toggle-password toggle-Button"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {inputError.passwordError && (
            <div className="error-message">{inputError.passwordError}</div>
          )}
        </div>
        {formError && <div className="form-error">{formError}</div>}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
