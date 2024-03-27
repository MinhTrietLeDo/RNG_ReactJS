// import logo from './logo.svg';
import "./../App.css";
import React, { useState, useEffect, useCallback } from "react";
import Loading from "./loading";
import fetchWithTimeout from "../config/config";
import LogoComponent from "../assets/logo";
import { Heading, Button, Box, Text, VStack, HStack } from "native-base";
import LotteryItem from "./balls/deezballs";

function Lottery() {
  const [data, setData] = useState([]);
  const [MaTrungThuong, setMaTrungThuong] = useState([0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);
  const [usedIndices, setUsedIndices] = useState(new Set());
  const [effect, setEffect] = useState(false);

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchWithTimeout(
        "http://localhost:3001",
        {},
        5000
      );
      const data = await response.json();
      if (typeof data !== "undefined") {
        const splitData = data.map((item) => item.MaTrungThuong.split(""));
        setData(splitData);
        setLoading(false);

        console.log(splitData);
      } else {
        alert("Cannot communicate with the server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data");
    }
  };

  const handleRandomize = useCallback(() => {
    const availableData = data.filter((_, index) => !usedIndices.has(index));
    if (availableData.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableData.length);
      setMaTrungThuong(availableData[randomIndex]);

      // Mark this index as used
      const actualIndex = data.indexOf(availableData[randomIndex]);
      setUsedIndices((prevUsedIndices) =>
        new Set(prevUsedIndices).add(actualIndex)
      );

      setEffect(true);
      const timeoutId = setTimeout(() => {
        setEffect(false);
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      alert("No more unique items to randomize!");
    }
  }, [data, usedIndices]);

  if (loading) {
    return (
      <div
        id="main-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <div id="loading-container">
          <Loading height={"20%"} width={"20%"} />
          <div id="loading-text"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="header">
          {/* <LogoComponent/> */}
          <Box>
            <Heading color={"#ed232b"} bold>
              TRƯỜNG ĐẠI HỌC TÔN ĐỨC THẮNG
            </Heading>
            <Heading bold color={"#15489f"}>
              NGÀY HỘI TƯ VẤN TUYỂN SINH ĐẠI HỌC 2024
            </Heading>
          </Box>
          <LogoComponent />
          <img
            src={require("../assets/Logo-tron.png")}
            alt="Logo"
            className="logo_img"
          />
        </header>
        <Box alignItems={"center"}>
          <Heading
            bold
            // color={'#15489f'}
          >
            MINI GAME
          </Heading>
          <Box
            width={"50%"}
            rounded="lg"
            overflow="hidden"
            borderColor="#c4c4c4"
            borderWidth="1"
            _dark={{
              borderColor: "#c4c4c4",
              backgroundColor: "#dadada",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "#dadada",
            }}
            alignItems={"center"}
            margin={"1rem"}
          >
            <Box
              maxWidth={"50%"}
              rounded="lg"
              overflow="hidden"
              textAlign={"center"}
              // backgroundColor={'black'}
              alignItems={"center"}
              margin={"1rem"}
            >
              <HStack
                id="numbers"
                margin={"1rem"}
                padding={"1"}
                justifyContent={"space-evenly"}
                width={'100%'}
              >
                <LotteryItem
                  index="0"
                  color="blue"
                  number={MaTrungThuong[0]}
                  decrypting={effect}
                />
                <LotteryItem
                  index="1"
                  color="red"
                  number={MaTrungThuong[1]}
                  decrypting={effect}
                />
                <LotteryItem
                  index="2"
                  color="gray"
                  number={MaTrungThuong[2]}
                  decrypting={effect}
                />
                <LotteryItem
                  index="3"
                  color="green"
                  number={MaTrungThuong[3]}
                  decrypting={effect}
                />
              </HStack>
            </Box>
            <button
              id="btn"
              className={effect ? "hide" : ""}
              onClick={handleRandomize}
            >
              Nhận số
            </button>
          </Box>
        </Box>
        <footer className="footer">{/* Add footer content here */}</footer>
      </div>
    );
  }
}

export default Lottery;
