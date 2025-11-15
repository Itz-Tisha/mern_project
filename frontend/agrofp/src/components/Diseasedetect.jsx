import React, { useState } from 'react';
import axios from 'axios';
import Farmerheader from './Farmerheader';
import Expertheader from './Expertheader';
import { useEffect } from 'react';
 import '../assets/Diseasedetect.css';
const Diseasedetect = () => {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isfarmer, setIsfarmer] = useState(false);
  useEffect(() => {
  const storedUsertype = localStorage.getItem('usertype');
  if (storedUsertype === 'farmer') {
    setIsfarmer(true);
  }
}, []);

  // Convert uploaded image to base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); 
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image!");

    try {
      setLoading(true);
      setResults([]);

      const base64Image = await toBase64(image);

      const requestBody = {
        images: [base64Image],
      };

      // const response = await axios.post(
      //   'https://plant.id/api/v3/health_assessment?health=only',
      //   requestBody,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Api-Key': 'nQa4Ok2DrO0VuQYs3SnmAlzAEYKtTPDWn4J5xjCmCT8fo0RSYh' 
      //     }
      //   }
      // );
      const response = await axios.post('http://localhost:9579/detect-disease', requestBody);


      console.log("Full API response:", response.data);

      const suggestions = response.data?.result?.disease?.suggestions || [];

      if (suggestions.length > 0) {
        setResults(suggestions);
      } else {
        setResults([
          {
            name: "No disease detected",
            probability: 0,
            details: { description: "Your plant looks healthy!" }
          }
        ]);
      }

    } catch (error) {
      console.error("Error during detection:", error.response?.data || error.message);
      alert("Detection failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     {isfarmer ? <Farmerheader /> : <Expertheader />}
    <div style={{ padding: '20px' }}>
      <h2>🌿 Plant Disease Detection</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        disabled={loading}
      />

      <br /><br />

     <button className="detect-btn" onClick={handleSubmit} disabled={loading || !image}>
        {loading ? "Detecting..." : "Detect Disease"}
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Detection Results:</h3>
          {results.map((disease, index) => (
            <div key={index} style={{
              marginBottom: '20px',
              padding: '15px',
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}>
              <h4>{disease.name}</h4>
              <p><strong>Confidence:</strong> {(disease.probability * 100).toFixed(2)}%</p>
              <p><strong>Description:</strong> {disease.details?.description || "No description available."}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
  
};

export default Diseasedetect;
