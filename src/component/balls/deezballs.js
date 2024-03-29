import React, { useState, useEffect } from "react";
import "./balls.css";

const LotteryItem = ({ number, decrypting, index, color }) => {
  const [currentNumber, setCurrentNumber] = useState("?");
  const [decryptingDone, setDecryptingDone] = useState("");

  const randomNumber = () => {
    setCurrentNumber(Math.round(Math.random() * 9));
  };

  useEffect(() => {
    // console.log("decrypting state:",decrypting,"\ndecryptingDone:", decryptingDone)
    let timer;
    if (decrypting) {
      setDecryptingDone("");
      timer = setInterval(randomNumber, 60);

      const timeout = setTimeout(() => {
        setCurrentNumber(number);
        setDecryptingDone("done");
        clearInterval(timer);
      }, 2000 + 2000 * index);

      return () => {
        clearTimeout(timeout);
        clearInterval(timer);
      };
    }
    console.log(number);
  }, [decrypting, number, index]);

  return (
    <div className={`ball ${color} ${decryptingDone}`}>{currentNumber}</div>
  );
};

export default LotteryItem;
