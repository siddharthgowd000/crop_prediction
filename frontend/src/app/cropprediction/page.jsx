"use client"

import { useState } from 'react';
import Image from 'next/image';
import './cropprediction.css'; // Make sure this CSS file is in the same directory

export default function CropPrediction() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [basketItems, setBasketItems] = useState([]);

  const toggleDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  const predictCrop = () => {
    const nValue = document.getElementById('nValue').value;
    const pValue = document.getElementById('pValue').value;
    const kValue = document.getElementById('kValue').value;
    const phValue = document.getElementById('phValue').value;
    const humidityValue = document.getElementById('humidityValue').value;
    const rainfallValue = document.getElementById('rainfallValue').value;

    const predictedCrop = 'Wheat';
    const accuracy = 95;
    const date = new Date().toLocaleDateString();
    const imageUrl = 'https://images.unsplash.com/photo-1574065408507-6ba7e7b8e4a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

    const newItem = {
      imageUrl,
      predictedCrop,
      accuracy,
      date,
    };

    setBasketItems([...basketItems, newItem]);
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
              <li><a href="whoarewe">Who we are</a></li>
              <li><a href="#">My profile</a></li>
              <li><a href="home" className="btn">My Soil</a></li>
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

      <div className="back-button">
        <a href="index.html">← Back</a>
      </div>

      <main>
        <section className="container">
          <div className="basket">
            <h2><b>Basket</b></h2>
            <hr />
            {basketItems.map((item, index) => (
              <div key={index} className="item">
                <img src={item.imageUrl} alt={item.predictedCrop} />
                <div className="item-details">
                  <h3>Predicted Crop: {item.predictedCrop}</h3>
                  <div className="details">Accuracy: {item.accuracy}%</div>
                  <div className="details">Date: {item.date}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="soil-container">
            <div className="soil-report">
              <h2>Soil Report</h2>
              <hr />
              <div className="report-item">
                <span>N</span>
                <input type="number" defaultValue="24" id="nValue" />
              </div>
              <div className="report-item">
                <span>P</span>
                <input type="number" defaultValue="39" id="pValue" />
              </div>
              <div className="report-item">
                <span>K</span>
                <input type="number" defaultValue="21" id="kValue" />
              </div>
              <div className="report-item">
                <span>PH</span>
                <input type="number" defaultValue="5" id="phValue" />
              </div>
              <div className="report-item">
                <span>Humidity</span>
                <input type="number" defaultValue="56" id="humidityValue" />
              </div>
              <div className="report-item">
                <span>Rainfall</span>
                <input type="number" defaultValue="100" id="rainfallValue" />
              </div>
              <button className="button" onClick={predictCrop}>Predict Crop</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
