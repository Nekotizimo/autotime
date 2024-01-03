import { React, createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import ContentEditable from 'react-contenteditable';
import durationToText from "../utilities/durationToText";
import textToDurationSecs from '../utilities/textToDurationSecs';

const TimerNumbers = (props) => {
  const timeCERef = createRef();

  const handleTimeBlur = (e) => {
    const time = new Date();
    const newDuration = textToDurationSecs(e.target.textContent);
    if (newDuration === undefined) { // invalid newDuration
      time.setSeconds(time.getSeconds() + props.durationInSecs); // use previous duration
      props.restart(time, false);
      alert("invalid time"); // TODO : notification
    } else {
      time.setSeconds(time.getSeconds() + newDuration);
      props.restart(time, false);
      props.setTimerDuration(props.id, newDuration);
    }
    // console.log("time blur");
  }

  return (
    <div className='timer-numbers editable'>
      <ContentEditable 
        disabled={props.started} 
        innerRef={timeCERef} 
        html={durationToText(props.totalSeconds)}
        onBlur={handleTimeBlur} 
        className='content-editable' 
        tagName="h2" />
    {!props.started && <FontAwesomeIcon icon={faEdit} fixedWidth pull="right" color='gray' />}
  </div>);
}

export default TimerNumbers;
