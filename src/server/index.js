const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();

app.use(cors());

const config = {
  user: 'ndc',
  password: 'ndc@123',
  server: '192.168.6.121\\MSSQLSERVER2017', // You could omit \\MSSQLSERVER2017 if it's a default instance
  database: 'DCCSDailyTracking',
  options: {
    encrypt: false, 
    trustServerCertificate: false // Change to true if you have issues with certificate validation
  }
};

// root path
app.get('/', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`SELECT MaTrungThuong FROM MaTrungThuongOpenDay2024`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
