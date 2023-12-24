import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import ControlledInput from './ControlledInput';

const Timer = ({name, durationInSecs, setTimerName, id}) => {
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [over, setOver] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(durationInSecs);

  const tick = () => {
    if (!running || !started) {
      return;
    }
    if (timeRemaining === 0) {
      setRunning(false);
      setOver(true);
      alert("Done: " + name);
    } else {
      setTimeRemaining(timeRemaining - 1);
    }
  };

  const durationToText = (durationInSeconds) => {
    var res = "";
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;
    if (hours > 0) {
        res += hours.toString() + ":";
    }
    if (minutes < 10) {
        res += "0";
    }
    res += minutes.toString() + ":";
    if (seconds < 10) {
        res += "0";
    }
    res += seconds.toString();
    // console.log(res);
    return res;
  };

  useEffect(() => {
    let ticker = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(ticker);
    };
  });

  const handleStart = () => {
    setStarted(true);
    setRunning(true);
    setOver(false);
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleStop = () => {
    setStarted(false);
    setRunning(false);
    setOver(false);
    setTimeRemaining(durationInSecs);
  }

  const handleNameChange = (e) => {
    setTimerName(id, e.target.value);
  }



  return (
    <div className="timer">
      <div>
        <div className='timer-name editable'>
          <ControlledInput
            value={name}
            onChange={handleNameChange}/>
          <FontAwesomeIcon icon={faEdit} fixedWidth pull="right" color='gray'/>
        </div>
        <h2>{durationToText(timeRemaining)}</h2>
      </div>
      <div>
        <button 
          className="btn stop-btn" 
          disabled={!started} 
          onClick={handleStop}></button>
        { !running && 
        <button 
          className="btn start-btn" 
          disabled={over} 
          onClick={handleStart}></button> }
        { running && 
        <button 
          className="btn pause-btn" 
          onClick={handlePause}></button> }
      </div>
    </div>
  )
};

export default Timer;