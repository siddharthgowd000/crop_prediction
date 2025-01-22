"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import './fertilizers.css'; // Ensure the CSS file is in the same directory
import im from "@/images/logo.jpg"
import axios from 'axios';

export default function FertilizerPrediction() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [basketItems, setBasketItems] = useState([]);
  const [messageError, setMessageError] = useState([]);

  const toggleDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

 

  // const predictFertilizer = () => {


  

  //   // const predictedFertilizer = 'Urea';
  //   // const accuracy = 95;
  //   // const date = new Date().toLocaleDateString();
  //   // const imageUrl = 'https://images.unsplash.com/photo-1574065408507-6ba7e7b8e4a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  //   // const newItem = {
  //   //   imageUrl,
  //   //   predictedFertilizer,
  //   //   accuracy,
  //   //   date,
  //   // };

  //   setBasketItems([...basketItems, newItem]);
  // };

 

  const predictFertilizer = async() =>{

    const n = document.getElementById('nValue').value;
    const p = document.getElementById('pValue').value;
    const k = document.getElementById('kValue').value;
    const ph = document.getElementById('phValue').value;
    const humidity = document.getElementById('humidityValue').value;
    const rainfall = document.getElementById('rainfallValue').value;
    const temperature = document.getElementById('temperatureValue').val;

    const predictData = {
      n ,
      p,
      k,
      temperature,
      humidity,
      ph, 
      rainfall,
    }

    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/predict`, predictData)
      setBasketItems(prevItems => [...prevItems, response.data.cropname])
    }catch(error){
      if(error.response){
        setMessageError(error.response)
      }
      else{
        setMessageError("An error occured try again.")
      }
    }

  }


  useEffect(()=>{


  }, [])
 

  return (
    <div className="overflow-none">
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>Crop Prediction System</h1>
          </div>
          <nav>
            <ul>
              <li><a href="#">News stand</a></li>
              <li><a href="aboutus">Who we are</a></li>
              <li><a href="profile">My profile</a></li>
              <li><a href="cropprediction" className="btn">My Soil</a></li>
            </ul>
          </nav>
          <div className="logo2" id="profileLogo" onClick={toggleDropdown}>
            <Image src={im} alt="Profile Image" width={40} height={40} />
          </div>
        </div>

        {profileDropdown && (
          <div className="profile-dropdown text-green-300" id="profileDropdown">
            <ul>
              <li className="text-green-300"><a href="edit">Edit Profile</a></li>
              <li><a href="login">Log out</a></li>
            </ul>
          </div>
        )}
      </header>

      <div className="back-button">
        <a>← Back</a>
      </div>

      <main>
        <section className="container">
          <div className="basket">
            <h2 className="text-green-800"><b>Basket</b></h2>
            <hr />
            {basketItems.map((item, index) => (
              <div key={index} className="item">
                <img src={item.imageUrl} alt={item.predictedFertilizer} />
                <div className="item-details text-green-800">
                  <h3>Predicted Crop: {item.cropname}</h3>
                  {/* <div className="details">Accuracy: {item.accuracy}%</div>
                  <div className="details">Date: {item.date}</div> */}
                </div>
              </div>
            ))}
          </div>

          <div className="soil-container text-green-600">
            <div className="soil-report">
              <h2 className="text-green-800">Soil Report</h2>
              <hr />
              <div className="report-item">
                <span>N</span>
                <input type="number" defaultValue="0" id="nValue" />
              </div>
              <div className="report-item">
                <span>P</span>
                <input type="number" defaultValue="0" id="pValue" />
              </div>
              <div className="report-item">
                <span>K</span>
                <input type="number" defaultValue="0" id="kValue" />
              </div>
              <div className="report-item">
                <span>PH</span>
                <input type="number" defaultValue="0" id="phValue" />
              </div>
              <div className="report-item">
                <span>Temperature</span>
                <input type="number" defaultValue="0" id="temperatureValue" />
              </div>
              <div className="report-item">
                <span>Humidity</span>
                <input type="number" defaultValue="0" id="humidityValue" />
              </div>
              <div className="report-item">
                <span>Rainfall</span>
                <input type="number" defaultValue="0" id="rainfallValue" />
              </div>
              {messageError && (<h2 className="text-red-400 text-md m-3 p-2 text-center">{messageError}</h2>)}
              <button className="button" onClick={predictFertilizer}>Predict Fertilizers</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 Crop Prediction System. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
