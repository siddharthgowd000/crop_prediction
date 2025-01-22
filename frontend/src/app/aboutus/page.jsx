"use client"

import { useState } from 'react';
import Image from 'next/image';
import './aboutus.css'; // Ensure this CSS file is in the same directory

export default function AboutUs() {
  const [profileDropdown, setProfileDropdown] = useState(false);

  const toggleDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>Crop Prediction System</h1>
          </div>
          <nav>
            <ul>
              <li><a href="#">Newsstand</a></li>
              <li><a href="whoarewe.html">Who we are</a></li>
              <li><a href="profile.html">My profile</a></li>
              <li><a href="cropprediction.html" className="btn">My Soil</a></li>
            </ul>
          </nav>
          <div className="logo2" id="profileLogo" onClick={toggleDropdown}>
            <Image src="/images/logo.jpg" alt="Profile Image" width={40} height={40} />
          </div>
        </div>

        {profileDropdown && (
          <div className="profile-dropdown" id="profileDropdown">
            <ul>
              <li><a href="editprofile.html">Edit Profile</a></li>
              <li><a href="loginpage.html">Log out</a></li>
            </ul>
          </div>
        )}
      </header>

      {/* Back Button */}
      <div className="back-button">
        <a href="index.html">← Back</a>
      </div>

      <div className="about-container">
        <h2>Get best suggestion in 2 minutes</h2>
        <p>This website helps farmers to choose<br />the perfect crop to cultivate.</p>
      </div>

      <footer className="footer-container">
        <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
        <p>Crop Prediction System</p>
      </footer>
    </div>
  );
}
