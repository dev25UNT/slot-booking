import React from "react";
import logo from "../../src/Vector.svg";
import { useNavigate } from "react-router-dom";

const loginUsers = [
  "User1@gmail.com",
  "User2@gmail.com",
  "User3@gmail.com",
  "User4@gmail.com",
];
const loginPasswords = ["Password1", "Password2", "Password3", "Password4"];

const LoginPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.email.value) {
      alert("Email is required");
    } else if (!e.target.email.value) {
      alert("Valid email is required");
    } else if (!e.target.password.value) {
      alert("Password is required");
    } else if (
      loginUsers.includes(e.target.email.value) &&
      loginPasswords.includes(e.target.password.value)
    ) {
      alert("Successfully logged in");
      e.target.email.value = "";
      e.target.password.value = "";
      navigate("/home");
    } else {
      alert("Wrong email or password combination");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    alert("Goes to registration page");
  };

  return (
    <div className="Login">
      <img src={logo} className="logo" alt="Business view - Reports" />
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="nome@email.com.br" />
        </div>
        <div className="input-group">
          <label htmlFor="password">PASSWORD</label>
          <input type="password" name="password" />
        </div>
        <button className="primary">SIGN IN</button>
      </form>
      <button className="secondary" onClick={handleClick}>
        REGISTER
      </button>
    </div>
  );
};

export default LoginPage;
