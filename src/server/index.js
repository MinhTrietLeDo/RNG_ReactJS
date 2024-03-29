// const express = require("express");
// const sql = require("mssql");
// const cors = require("cors");
// const app = express();

// app.use(cors());
// app.use(express.json())

// const config = {
//   user: "ndc",
//   password: "ndc@123",
//   server: "192.168.6.121\\MSSQLSERVER2017", // You could omit \\MSSQLSERVER2017 if it's a default instance
//   database: "DCCSDailyTracking",
//   options: {
//     encrypt: false,
//     trustServerCertificate: false, // Change to true if you have issues with certificate validation
//   },
// };

// // root path
// app.get("/getData", async (req, res) => {
//   try {
//     await sql.connect(config);
//     const getSQL = "SELECT * FROM MaTrungThuongOpenDay2024 WHERE IsActive = 0";
//     const result = await sql.query(getSQL);
//     res.json(result.recordset);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// // app.post("/update", async (req, res) => {
// //   try {
// //     await sql.connect(config);
// //     const { ID } = req.body; // Destructure ID from the request body
// //     const numericId = parseInt(ID, 10); // Convert to integer
// //     if (!ID) {
// //       return res.status(400).send({ message: "No ID provided" });
// //     }

// //     // Use parameterized queries to avoid SQL injection
// //     const result =
// //       await sql.query`update MaTrungThuongOpenDay2024 set IsActive = 1 where ID = ${numericId}`;

// //     return res.json({ message: "Update successful", result });
// //   } catch (error) {
// //     console.error("Database update error:", error);
// //     return res.status(500).send({ message: "Update failed", error });
// //   }
// // });

// app.put("/updateData", async (req, res) => {
//   try {
//     // Kết nối tới cơ sở dữ liệu
//     await sql.connect(config);

//     // Lấy dữ liệu từ yêu cầu
//     const id = req.body.id;
//     // const newData = 1;

//     // Tạo truy vấn SQL update
//     const request = new sql.Request();
//     request.input("id", sql.Int, id);
//     const result = await request.query(
//       "UPDATE MaTrungThuongOpenDay2024 SET IsActive = 1 WHERE ID = @id"
//     );

//     // Đóng kết nối
//     sql.close();

//     // Phản hồi cho ứng dụng React Native với kết quả
//     res.json({ success: true }); // Hoặc bạn có thể trả về bất kỳ dữ liệu nào phù hợp với ứng dụng của bạn
//   } catch (error) {
//     console.error("Error: ", error);
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
