import React, { useState } from "react";
import "../styles/Login.scss";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/state";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:3001/auth/login",{
        method: "POST",
        body: JSON.stringify({email, password}),
      });

      const LoggedIn = await response.json();

      if(LoggedIn){
        dispatch(
          setLogin({
            user: LoggedIn.user,
            token: LoggedIn.token
          })
        )
        navigate("/");
      }
    }catch(err){
      console.log("Login failed!", err.message);
    }
  }
  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <a href="/register">Don't have an account? Register</a>
      </div>
    </div>
  );
};

export default LoginPage;
