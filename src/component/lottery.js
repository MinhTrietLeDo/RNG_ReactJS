// import logo from './logo.svg';
import './../App.css';
import React, { useState, useEffect } from 'react';

function Lottery() {
  const [data, setData] = useState([]);
  const [MaTrungThuong, setMaTrungThuong] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData().catch(console.error); // Call the function
    console.log("Array:", data)
  }, []); // 


  // Define the data fetching function
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001'); // Adjust this URL to your API endpoint
      const data = await response.json();
      setData(data);
      setLoading(false)

    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false)
    }
  };

  if (loading) {

  } else {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

}

export default Lottery;
