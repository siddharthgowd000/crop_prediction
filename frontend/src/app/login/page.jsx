"use client";

import { useState } from 'react';
import Image from 'next/image';
import image from "../../images/logo.jpg";
import './login.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async(event) => {
    event.preventDefault();

    const loginData = {
      email : email
    }

    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signin`, loginData)
      router.replace('/home');
    }
    catch(error){
      if(error.response){
        setErrorMessage(error.response.data.message);
      }
      else{
        setErrorMessage("An error occured please try againn later.")
      }
    }
    

    
  };






  return (
    <div className="login-container w-[500px] flex flex-col items-center justify-center">
      <div className="login-box py-5 flex flex-col items-center justify-center w-5/6">
        <div className="logo">
          <Image src={image} alt="Logo" width={100} height={100} />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form id="loginForm" className="flex flex-col justify-center items-center w-full" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="signup-link">
            <a href="/signup">Don't have an account? SIGN UP</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
