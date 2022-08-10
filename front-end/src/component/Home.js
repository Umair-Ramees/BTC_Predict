import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Home() {
  const [pastPrice, setPastPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [value, setValue] = useState(0);
  const [halfminutes, setHalfMinutesState] = useState(0);

  const fetchBitcoinPrice = () => {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((res) => res.json())
      .then((data) => {
        setPrice(data.bpi.USD.rate_float);
        console.log("current Price", data.bpi.USD.rate_float);
      });
  };

  useEffect(() => {
    fetchBitcoinPrice();
    const interval = setInterval(() => {
      setHalfMinutesState((seconds) => seconds + 1);
      fetchBitcoinPrice();
    }, 30*1000);

    return () => clearInterval(interval);
  }, [halfminutes]);

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const retrievePrice = async () => {

    fetchBitcoinPrice()
    if (price === 0) { setPastPrice(price); }
    else setPastPrice(price);
    setPrice(price);
  }
  const compare = async (index) => {
    setPlaying(true);
    await sleep(60000);
    retrievePrice();
    setPlaying(false);
    console.log('index::', index);
    if (pastPrice <= price) {
      setValue(1);
    } else {
      setValue(0);
    }

    if (index === value) {
      setScore(score + 1);
      setKey(prevKey => prevKey + 1);
    } else {
      setScore(score - 1);
      setKey(prevKey => prevKey + 1);
    }
  }

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too lale...</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  return(
    <div className="gtp_widget">
      <div className="gtp_title">Guess the Price direction</div>

      <div className="gtp_instrument" data-code="BTCUSDT">
        <div className="gtp_instrument__icon"></div>
        <div className="gtp_instrument__item">
          <div className="gtp_instrument__name">Bitcoin</div>
          <div className="gtp_instrument__code">BTCUSDT</div>
        </div>
        <div className="gtp_instrument__quote">
          <div className="gtp_instrument__price">${price}</div>
          <div>Score: {score} </div>
        </div>
      </div>

      <div className="gtp_game">
        {/* <div className="gpt_actions"> */}
          <div className="timer-wrapper">
            <CountdownCircleTimer
              key={key}
              isPlaying={playing}
              duration={60}
              colors={['#00d664', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => [true, 1000]}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
        {/* </div> */}
        <div className="gpt_actions">
          <div className="gtp_btn-up" data-icid="button" data-icid-id="btn_wdg_guess_price_up" onClick={() => compare(1)}> Price Up</div>
          <div className="gtp_btn-down" data-icid="button" data-icid-id="btn_wdg_guess_price_down" onClick={() => compare(1)}>Price Down</div>
        </div>
        {/* <div className="gpt_actions">
          <a className="gtp_refresh" data-icid="button" data-icid-id="btn_wdg_guess_price_try_again">Try again</a>
        </div> */}
      </div>

    </div>
  // return (
  //   <div className="App">
  //     <div className="App-header">
  //       <div>
  //         <h2>Current Bitcoin Price: ${price}</h2>
  //       </div>
  //       <div>
  //         Score: {score}
  //       </div>
  //       <div className="timer-wrapper">
  //         <CountdownCircleTimer
  //           key={key}
  //           isPlaying={playing}
  //           duration={60}
  //           colors={['#004777', '#F7B801', '#A30000', '#A30000']}
  //           colorsTime={[7, 5, 2, 0]}
  //           onComplete={() => [true, 1000]}
  //         >
  //           {renderTime}
  //         </CountdownCircleTimer>
  //       </div>
  //       <div className='d-flex'>
  //         <button type='button' className='btn btn-primary mx-5' onClick={() => compare(1)}>Price Up</button>
  //         <button type='button' className='btn btn-danger mx-5' onClick={() => compare(0)}>Price Down</button>
  //       </div>
  //     </div>
  //   </div>
  );
}

export default Home;
