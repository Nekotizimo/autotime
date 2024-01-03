import { useState, createRef, useRef } from 'react';
import { useTimer } from 'react-timer-hook';
import TimerName from './TimerName';
import TimerNumbers from './TimerNumbers';

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
        <TimerNumbers 
          started={started} 
          timeCERef={timeCERef} 
          totalSeconds={totalSeconds} 
          durationInSecs={durationInSecs}
          restart={restart}
          setTimerDuration={setTimerDuration}
          id={id}>
        </TimerNumbers>

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