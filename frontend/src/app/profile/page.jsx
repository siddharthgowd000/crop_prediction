"use client"

import { useState } from 'react';
import Image from 'next/image';
import './profile.css'; // Ensure this CSS file is in the same directory
import im from "@/images/logo.jpg"

export default function EditProfile() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
  });

  const toggleDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    window.location.href = 'profile.html';
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
              <li><a href="aboutus">Who we are</a></li>
              <li><a href="#">My profile</a></li>
              <li><a href="cropprediction" className="btn">My Soil</a></li>
            </ul>
          </nav>
            {/* <Image src={im} alt="Profile Image" width={60} height={30} /> */}
            <div className="flex justify-end pr-24 text-green-800 m-5" id="profileDropdown">
            <ul>
              <li className="bg-yellow-300 px-4 py-2 rounded-lg mb-2"><a href="profile/edit">Edit Profile</a></li>
              <li className="bg-yellow-300 px-4 py-2 rounded-lg text-center"><a href="login">Log out</a></li>
            </ul>
          </div>
        </div>
      </header>

      <div className="back-button">
        <a href="index.html">← Back</a>
      </div>

      <section className="edit-profile-section">
        <div className="edit-profile-container flex flex-col items-center">
          <h2>My Profile</h2>
          <div className="profile-image flex self-center">
            <Image src={im} alt="Profile Image" width={100} height={100} />
          </div>
          <form id="editProfileForm" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label htmlFor="phone">Contact Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-around mt-8">
            <button className="border border-green-900 px-5 py-2 rounded-lg" type="button" onClick={handleSave}>Save</button>
            <button className="border border-green-900 px-5 py-2 rounded-lg" type="button" onClick={handleCancel}>Cancel</button>
            </div>
            
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 Crop Prediction System. All Rights Reserved.</p><br />
          <p>Crop Prediction System</p>
        </div>
      </footer>
    </div>
  );
}
