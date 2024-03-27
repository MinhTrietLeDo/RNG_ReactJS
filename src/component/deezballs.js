import React, { useState, useEffect } from 'react';
import './../App.css'

const LotteryItem = (props) => {
    const [number, setNumber] = useState('?');
    const [decryptingDone, setDecryptingDone] = useState('');

    const randomNumber = () => {
        setNumber(Math.round(Math.random() * 9));
    };

    useEffect(() => {
        let timer;
        if (props.decrypting) {
            setDecryptingDone('');
            timer = setInterval(randomNumber, 10);

            const timeout = setTimeout(() => {
                setNumber(props.number);
                setDecryptingDone('done');
                clearInterval(timer);
            }, 1000 * props.index + 1000);

            return () => {
                clearTimeout(timeout);
                clearInterval(timer);
            };
        }
        console.log(number)

    }, [props.decrypting, props.number, props.index]);

    return (
        <div className={`ball ${props.color} ${decryptingDone}`}>
            {number}
        </div>
    );
};

export default LotteryItem;
