import "./login.css";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import axios from "../../config/axiosConfig";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

// import Cookies from "universal-cookie";

function Login() {
  // const handleLogin = () => {
  //   alert("Login clicked");
  // };
  // const cookies = new Cookies();

  // cookies.set("myCat", "Pacman", { path: "/" });
  // console.log(cookies.get("myCat"));
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [user, setUser] = useState(null);
  console.log(user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validatePassword = () => {
    if (password.length >= 6 && password.length <= 16) {
      return true;
    } else return false;
  };
  const handleSubmit = (e) => {
    console.log("button Clicked.");
    e.preventDefault();
    if (validateEmail()) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
    if (validatePassword()) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
      setPasswordErrorMessage("Password should contain at least six character");
    }
    if (validEmail && validatePassword()) {
      axios
        .get("auth/signin", {
          params: {
            email: email,
            password: password,
          },
        })
        .then((res) => {
          // console.log(res);
          setUser(res.data);
        });
    }
  };
  return (
    <div className="limiter">
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-pic js-tilt" data-tilt>
            <img src="images/img-01.png" alt="IMG" />
          </div>

          <div className="login-right">
            <div className="login-header">
              <h1>Sign In</h1>
            </div>
            <div
              className={validEmail ? "input-helper" : "input-helper vibrate"}
            >
              <input
                type="text"
                className="input"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onFocus={(e) => {
                  e.preventDefault();
                  setValidEmail(true);
                }}
              />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <MdEmail />
              </span>
            </div>
            {!validEmail && (
              <div className="error-message">email not valid</div>
            )}

            <div
              className={
                validPassword ? "input-helper" : "input-helper vibrate"
              }
            >
              <input
                type="password"
                className="input"
                name="pass"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onFocus={(e) => {
                  e.preventDefault();
                  setValidPassword(true);
                }}
              />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FaLock />
              </span>
            </div>
            {!validPassword && (
              <div className="error-message">{passwordErrorMessage}</div>
            )}

            <div className="footer">
              {/* <button className="btn" onClick={handleLogin}>
                Login
              </button> */}
              {!validEmail || !validPassword ? (
                <Button
                  className="btn"
                  disabled="true"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  className="btn"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
              )}
            </div>
            <div className="text-center mt-2">
              <span className="txt1">Forgot</span>
              <Link className="txt2 btn-link" to="/">
                Username / Password ?
              </Link>
            </div>

            <div className="text-center">
              {/* <a className="txt2" href="#"> */}
              <Link className="txt2 btn-link" to="/signup">
                Create Account
              </Link>
              <i
                className="fa fa-long-arrow-right m-l-5"
                aria-hidden="true"
              ></i>
              {/* </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
