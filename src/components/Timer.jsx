import { useState, useEffect, createRef, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
// import ControlledInput from './ControlledInput';
import ContentEditable from 'react-contenteditable';
import durationToText from "../utilities/durationToText";
import textToDurationSecs from "../utilities/textToDurationSecs";
import { useTimer } from 'react-timer-hook';
import TimerName from './TimerName';

const Timer = ({ name, durationInSecs, setTimerName, setTimerDuration, id, expiryTimestamp }) => {
  const [started, setStarted] = useState(false);
  const [over, setOver] = useState(false);
  const nameCERef = createRef();
  const nameRef = useRef(name);
  const timeCERef = createRef();
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
    autoStart: false
  });


  const handleStart = () => {
    setOver(false);
    if (started) {
      resume();
    } else {
      start();
      setStarted(true);
    }
  };

  const handlePause = () => {
    pause();
  };

  const handleStop = () => {
    setStarted(false);
    setOver(false);
    const time = new Date();
    time.setSeconds(time.getSeconds() + durationInSecs); // 6:30 minutes timer
    restart(time, false);
  }

  

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
        <TimerName 
          started={started} 
          nameCERef={nameCERef} 
          nameRef={nameRef}
          setTimerName={setTimerName}
          id={id}>
        </TimerName>
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
          {!started && <FontAwesomeIcon icon={faEdit} fixedWidth pull="right" color='gray' />}
        </div>

        {/* <h2 className='timer-numbers'>{durationToText(timeRemaining)}</h2> */}
      </div>
      <div className='btn-container'>
        <button
          className="btn stop-btn"
          disabled={!started}
          onClick={handleStop}></button>
        {!isRunning &&
          <button
            className="btn start-btn"
            disabled={over}
            onClick={handleStart}></button>}
        {isRunning &&
          <button
            className="btn pause-btn"
            onClick={handlePause}></button>}
      </div>
    </div>
  )
};

export default Timer;