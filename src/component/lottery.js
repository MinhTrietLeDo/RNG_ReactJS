// import logo from './logo.svg';
import './../App.css';
import React, { useState, useEffect } from 'react';
import Loading from './loading';
import fetchWithTimeout from '../config/config';

function Lottery() {
  const [data, setData] = useState([]);
  const [MaTrungThuong, setMaTrungThuong] = useState(null);
  const [loading, setLoading] = useState(true)
  const [usedIndices, setUsedIndices] = useState(new Set());

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const fetchData = async () => {
    // setLoading(true);
    try {
      const response = await fetchWithTimeout('http://localhost:3001', {}, 5000);
      const data = await response.json();
      if (typeof data !== 'undefined') {
        setData(data.map(item => item.MaTrungThuong));
        setLoading(false);
      } else {
        alert('Cannot communicate with the server');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data')
    }
  };

  const handleRandomize = () => {
    // This will shuffle the array and pick the first item
    const availableData = data.filter((_, index) => !usedIndices.has(index));
    
    if (availableData.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableData.length);
      setMaTrungThuong(availableData[randomIndex]);

      // Mark this index as used
      const actualIndex = data.indexOf(availableData[randomIndex]);
      setUsedIndices(new Set(usedIndices).add(actualIndex));
    } else {
      alert("No more unique items to randomize!");
    }
  };

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
        <header className="header">
          <h1>TRƯỜNG ĐẠI HỌC TÔN ĐỨC THẮNG</h1>

          <img src={require('../assets/Logo-tron.png')} alt="Logo" className='logo_img' />

        </header>
        <main className="main-content">
          <h2>Ngày hội tư vấn tuyển sinh đại học năm 2024</h2>
          <div className="content-area">
            {/* Add your content here */}
            <p>{MaTrungThuong}</p>
            <button onClick={handleRandomize}>Nhấn số...</button>
          </div>
        </main>
        <footer className="footer">
          {/* Add footer content here */}
        </footer>
      </div>
    );
  }

}

export default Lottery;

