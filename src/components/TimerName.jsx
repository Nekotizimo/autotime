import React, { useState, useRef, createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import ContentEditable from 'react-contenteditable';
import axios from 'axios';

// TODO: hide API keys
const API_KEY = "AIzaSyDaOPUPg0SGCJq3tX7gjVH9YzQFl1q39yA";
const SEARCH_ENGINE_ID = "503ad2cc874b841f4";

const TimerName = (props) => {
  const nameCERef = createRef();
  const nameRef = useRef(props.name);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [inputTimer, setInputTimer] = useState(null);

  const handleNameChange = (e) => {
    nameRef.current = e.target.value;

    clearTimeout(inputTimer);
    let timeout = setTimeout(() => {
      console.log("Fetching results...");
      axios
        .get(
          `/autocomplete?q=how long to ${e.target.value}`
        )
        .then((res) => {
          console.log(res.data);
          setAutocompleteResults(res.data);
          axios
            .get('https://www.googleapis.com/customsearch/v1', {
              params: {
                "q": `how long to ${e.target.value}`,
                "key": API_KEY,
                "cx": SEARCH_ENGINE_ID
              }
            })
            .then((res) => {
              console.log(res.data["items"].map(e => e["snippet"]));
            })
        })
    }, 300);
    setInputTimer(timeout);
  }
  const handleNameBlur = (e) => {
    props.setTimerName(props.id, e.target.textContent);
  }

  return (
    <div className='timer-name editable'>
      <ContentEditable
        disabled={props.started}
        innerRef={nameCERef}
        html={nameRef.current}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        className='content-editable'
        tagName="h4"
      />
      {autocompleteResults[0] && <div>{autocompleteResults[0]}</div>}
      {!props.started && <FontAwesomeIcon icon={faEdit} fixedWidth pull="right" color='gray' />}
    </div>
  );
}

export default TimerName;