import "./../App.css";
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  HStack,
  Center,
} from "native-base";
import LotteryItem from "./balls/deezballs";

function Lottery() {
  const [data, setData] = useState([]);
  const [MaTrungThuong, setMaTrungThuong] = useState([0, 0, 0, 0]);
  const [usedIndices, setUsedIndices] = useState(new Set());
  const [effect, setEffect] = useState(false);
  const [isActive, setIsActive] = useState(true)
  useEffect(() => { }, []);

  const handleFileRead = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        // Assuming the first line is the header and actual data starts from the second line
        const lines = content.split('\n').slice(0);
        setData(lines);
        console.log('TEST: ', lines)
        setIsActive(false)
      };
      reader.readAsText(file);
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
        // setShowModal(true)
      }, 9100);
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      alert("No more unique items to randomize!");
    }
  }, [data, usedIndices]);

  // const updateData = async () => {
  //   try {
  //     const response = await fetch("http:localhost:3001/updateData", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: idToUpdate,
  //         newData: { IsActive: 1 },
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const result = await response.json();
  //     console.log("Update result:", result);
  //     // Handle the response
  //   } catch (error) {
  //     console.error("Error updating data:", error);
  //     // Handle the error
  //   }
  // };

  return (
    <div className="App">
      <header className="header">
        <div className="header-container">
          <img
            src={require("../assets/Logo-tron.png")}
            alt="Logo"
            className="logo_img"
          />
        </div>
      </header>
      <body className="body">
        <Box alignItems={"center"}>
          <Box
            width={"80%"}
            rounded="lg"
            overflow="hidden"
            borderColor="#c4c4c4"
            borderWidth="1"
            _dark={{
              borderColor: "#c4c4c4",
              backgroundColor: "#dadada",
            }}
            _web={{
              shadow: 3,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "#dadada",
            }}
            alignItems={"center"}
            margin={"1rem"}
          >
            <Box
              // maxWidth={"100%"}
              rounded="lg"
              overflow="hidden"
              textAlign={"center"}
              alignItems={"center"}
              margin={"1rem"}
              // backgroundColor={'black'}
              width={"80%"}
            >
              <HStack
                id="numbers"
                margin={"1rem"}
                padding={"1"}
                justifyContent={"space-around"}
                width={"55rem"}
                backgroundColor={"#FBF8F9"}
                height={"23rem"}
                borderRadius={15}
                maxWidth={"100%"}
                shadow={3}
              >
                <Center>
                  <LotteryItem
                    index="0"
                    color="red"
                    number={MaTrungThuong[0]}
                    decrypting={effect}
                  />
                </Center>
                <Center>
                  <LotteryItem
                    index="1"
                    color="blue"
                    number={MaTrungThuong[1]}
                    decrypting={effect}
                  />
                </Center>
                <Center>
                  <LotteryItem
                    index="2"
                    color="red"
                    number={MaTrungThuong[2]}
                    decrypting={effect}
                  />
                </Center>
                <Center>
                  <LotteryItem
                    index="3"
                    color="blue"
                    number={MaTrungThuong[3]}
                    decrypting={effect}
                  />
                </Center>
              </HStack>
            </Box>
            <button
              id="btn"
              className={effect ? "hide" : ""}
              onClick={handleRandomize}
            >
              Quay số
            </button>
          </Box>
        </Box>
      </body>
      {isActive ? (<input type="file" accept=".txt" onChange={handleFileRead} />) : null}
      <footer className="footer">{/* Add footer content here */}</footer>
    </div>
  );
}

export default Lottery;
