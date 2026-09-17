import React, { useState } from "react";
import "../styles/AuthForm.scss";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {setUser, setAccessToken} = useAuth();
  const navigate = useNavigate();
  const [loading, setloading] = useState({
    login : false,
    registration : false 
  });

  const [Login, setLogin] = useState({
    email : "",
    pwd : ""
  });

  const [signUp, setSignUp] = useState({
    email : "",
    pwd : "",
    name : ""
  });

  const handleLogin = async (e) =>{
    try {
      e.preventDefault();
      setloading({...loading, login : true})
      const {data} = await API.post("/api/auth/login", {
        email : Login.email,
        password : Login.pwd
      });
      setAccessToken(data.accessToken);
      setUser(data.user);
      toast.success("Successfully login");
      navigate("/")
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      setloading({...loading, login : false})
    }
  }
  const onchangeLogin = e => {
    setLogin({...Login, [e.target.name] : e.target.value})
  }
  const onchangeRegister = e => {
    setSignUp({...signUp, [e.target.name] : e.target.value})
  }
  const handleCreateAccount = async (e)=>{
    e.preventDefault();
    const {email, pwd, name} = signUp;
    setloading({...loading, registration : true})
    try {
      await API.put("/api/auth/register", {email, password : pwd, name});
      toast.success("Registered!!!");
      
    } catch (error) {
      toast.error(error.response.data.message)
    } finally{
      setloading({...loading, registration : false})
    }   
  }

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="auth-container">
      <div className="card-wrapper">
        <div className={`auth-card ${isLogin ? "" : "flip"}`}>
          
          {/* LOGIN */}
          <div className="front">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input type="email" placeholder="Email" required name="email" onChange={onchangeLogin}/>
              <input type="password" placeholder="Password" required  name="pwd" onChange={onchangeLogin}/>
              <button type="submit">
                {loading.login ? "loading..." : "Login"}
              </button>
            </form>
            <p className="toggle-text">
              Don't have an account? 
              <span onClick={toggleForm}> Sign Up</span>
            </p>
          </div>

          {/* SIGNUP */}
          <div className="back">
            <h2>Create Account</h2>
            <form onSubmit={handleCreateAccount}>
              <input type="text" placeholder="Full Name" required name="name" onChange={onchangeRegister}/>
              <input type="email" placeholder="Email" required  name="email" onChange={onchangeRegister}/>
              <input type="password" placeholder="Password" required  name="pwd" onChange={onchangeRegister}/>
              <input type="password" placeholder="Confirm Password" required name="c_pwd" onChange={onchangeRegister}/>
              <button type="submit">
                {loading.registration ? "loading..." : "Sign Up"}
              </button>
            </form>
            <p className="toggle-text">
              Already have an account?
              <span onClick={toggleForm}> Login</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthForm;