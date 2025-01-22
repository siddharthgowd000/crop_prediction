"use client"; 

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import axios from 'axios'; 
import image from '@/images/logo.jpg'; 
import './signup.css'; 
const Signup = () => {
  const [fullname, setFullname] = useState(''); // Changed to fullname
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSignup = async (event) => {
    event.preventDefault();
    
    const signupData = {
      username: fullname, // Use fullname here
      email: email,
      fullname: password, 
    };

    try {
      const response = await axios.post('http://localhost:5000/signup', signupData);
      router.push('/login');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="signup-container w-[500px] flex justify-center">
      <div className="signup-box ">
        <div className="logo">
          <Image src={image} alt="Logo" width={100} height={100} />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form id="signupForm" onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="fullname">Full Name*</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)} // Update state here
              required
            />
          </div>
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
