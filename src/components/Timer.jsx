import { useState, useEffect, createRef, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
// import ControlledInput from './ControlledInput';
import ContentEditable from 'react-contenteditable';
import durationToText from "../utilities/durationToText";
import textToDurationSecs from "../utilities/textToDurationSecs";
import { useTimer } from 'react-timer-hook';

const Timer = ({name, durationInSecs, setTimerName, setTimerDuration, id, expiryTimestamp}) => {
  // const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [over, setOver] = useState(false);
  // const [timeRemaining, setTimeRemaining] = useState(durationInSecs);
  const nameCERef = createRef();
  const nameRef = useRef(name);
  const timeCERef = createRef();
  // const timeRemainingTextRef = useRef(durationToText(durationInSecs));
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ 
    expiryTimestamp, 
    onExpire: () => {
      setOver(true);
    }, 
    autoStart: false });

  // const tick = () => {
  //   console.log("tick");
  //   if (!running || !started) {
  //     return;
  //   }
  //   if (timeRemaining === 0) {
  //     setRunning(false);
  //     setOver(true);
  //     alert("Done: " + name);
  //   } else {
  //     setTimeRemaining(timeRemaining - 1);
  //   }
  // };

  // useEffect(() => {
  //   console.log("effect: timeRemaining");
  //   timeRemainingTextRef.current = durationToText(timeRemaining);
  // }, [timeRemaining])

  // useEffect(() => {
  //   let ticker = setInterval(() => tick(), 1000);
  //   return () => {
  //     clearInterval(ticker);
  //   };
  // });

  const handleStart = () => {
    // setStarted(true);
    // setRunning(true);
    setOver(false);
    if (started) {
      resume();
    } else {
      start();
      setStarted(true);
    }
  };

  const handlePause = () => {
    // setRunning(false);
    pause();
  };

  const handleStop = () => {
    setStarted(false);
    // setRunning(false);
    setOver(false);
    // setTimeRemaining(durationInSecs);
    const time = new Date();
    time.setSeconds(time.getSeconds() + durationInSecs); // 6:30 minutes timer
    restart(time, false);
  }

  const handleNameChange = (e) => {
    nameRef.current = e.target.value;
    // console.log(nameRef.current);
    // setTimerName(id, e.target.value);
  }
  const handleNameBlur = (e) => {
    // console.log(e);
    setTimerName(id, e.target.textContent);
  }

  // const handleTimeChange = (e) => {
  //   // timeRemainingTextRef.current = e.target.value;
  //   console.log("time(ref)change");
  // }
  const handleTimeBlur = (e) => {
    const time = new Date();
    const newDuration = textToDurationSecs(e.target.textContent);
    if (newDuration === undefined) { // invalid newDuration
      time.setSeconds(time.getSeconds() + durationInSecs); // use previous duration
      restart(time, false);
      alert("invalid time"); // TODO : notification
    } else {
      time.setSeconds(time.getSeconds() + newDuration); 
      restart(time, false);
      setTimerDuration(id, newDuration);
    }
    // console.log("time blur");
  }


  return (
    <div className="timer">
      <div>
        <div className='timer-name editable'>
          {/* <ControlledInput
            value={name}
            onChange={handleNameChange}/> */}
          <ContentEditable
            disabled={started}
            innerRef={nameCERef}
            html={nameRef.current}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            className='content-editable'
            tagName="h4"
          />
          { !started && <FontAwesomeIcon icon={faEdit} fixedWidth pull="right" color='gray'/> }
        </div>
        <div className='timer-numbers editable'>
          <ContentEditable
            disabled={started}
            innerRef={timeCERef}
            html={durationToText(totalSeconds)}
            // onChange={handleTimeChange}
            onBlur={handleTimeBlur}
            className='content-editable'
            tagName="h2"
          />
          { !started && <FontAwesomeIcon icon={faEdit} fixedWidth pull="right" color='gray'/> }
        </div>
       
        {/* <h2 className='timer-numbers'>{durationToText(timeRemaining)}</h2> */}
      </div>
      <div className='btn-container'>
        <button 
          className="btn stop-btn" 
          disabled={!started} 
          onClick={handleStop}></button>
        { !isRunning && 
        <button 
          className="btn start-btn" 
          disabled={over} 
          onClick={handleStart}></button> }
        { isRunning && 
        <button 
          className="btn pause-btn" 
          onClick={handlePause}></button> }
      </div>
    </div>
  )
};

export default Timer;