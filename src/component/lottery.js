// import logo from './logo.svg';
import './../App.css';
import React, { useState, useEffect } from 'react';
import Loading from './loading';
import { fetchWithTimeout } from '../config/config';

function Lottery() {
  const [data, setData] = useState([]);
  const [MaTrungThuong, setMaTrungThuong] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);


  // const fetchData = async () => {
  //   try {
  //     const timeoutPromise = new Promise((_, reject) =>
  //       setTimeout(() => reject(new Error('Timeout after 5 seconds')), 5000)
  //     );
  //     const response = await Promise.race([
  //       fetch('http://localhost:3001'),
  //       timeoutPromise
  //     ]);

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const data = await response.json();
  //     if (typeof data !== 'undefined') {
  //       setLoading(false);
  //       setMaTrungThuong(data);
  //       console.log('123123123123')
  //     } else {
  //       alert('Cannot communicate with the server');
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //     console.error('Error fetching data:', error);
  //     alert('Failed to fetch data: ' + error.message);
  //   }
  // };

  const fetchData = async () => {
    // setLoading(true);
    try {
      const response = await fetchWithTimeout('http://192.168.6.121:3001/data', {}, 5000);
      const data = await response.json();
      setMaTrungThuong(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // setLoading(false);
    }
  };

  const randomNumber = () => {
    
  }

  if (loading) {
    return (
      <div
        id='main-container'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center'
        }} >
        <div id='loading-container'>
          <Loading height={'20%'} width={'20%'} />
          <div id='loading-text'>

          </div>
        </div>

      </div>
    )
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

