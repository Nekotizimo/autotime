import React, { useState, useRef, createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import ContentEditable from 'react-contenteditable';
import { getFunctions, httpsCallable } from "firebase/functions";
import naturalTextToDurationSecs from '../utilities/naturalTextToDurationSecs.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhuXUl0U4FXaTqiV3B2Kbi27zcBdIL5m8",
  authDomain: "kc-smart-timers.firebaseapp.com",
  projectId: "kc-smart-timers",
  storageBucket: "kc-smart-timers.appspot.com",
  messagingSenderId: "692655789255",
  appId: "1:692655789255:web:d593e7bc6aa74b2044dae2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app ,'europe-west1');
const getAutocompleteResults = httpsCallable(functions, 'getAutocompleteResults');
const searchGoogle = httpsCallable(functions, "searchGoogle");
const queryQA = httpsCallable(functions, "queryQA");

const TimerName = (props) => {
  const nameCERef = createRef();
  const nameRef = useRef(props.name);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [inputTimer, setInputTimer] = useState(null);
  const setTimerName = props.setTimerName;
  const setTimerDuration = props.setTimerDuration;
  const id = props.id;

  const handleNameChange = (e) => {
    const curName = e.target.value;
    nameRef.current = curName;

    clearTimeout(inputTimer);
    let timeout = setTimeout(async () => {

      console.log("Fetching results...");
      const autocompRes = getAutocompleteResults({ q: `how long to ${curName}` });
      const autocompList = (await autocompRes).data;
      setAutocompleteResults(autocompList);
      console.log("autocompleteResults:", autocompList)

      var autocompletedQuery = `how long to ${curName}${autocompList[0] ? autocompList[0] : ""}?`;
      autocompletedQuery = autocompletedQuery.replace(/\&nbsp;/g, '');
      const searchRes = searchGoogle({ q: autocompletedQuery});
      const snippets = (await searchRes).data;
      console.log("snippets:" , snippets[0], snippets[1]);
      
      const QARes = queryQA({"inputs": {
        "question": autocompletedQuery,
        "context": snippets[0]
      }});
      // console.log(QARes);
      const score = (await QARes).data.score;
      const answer = (await QARes).data.answer;
      console.log(score, answer);
      if (score > 0.5) {
        const durationSecs = naturalTextToDurationSecs(answer);
        if (durationSecs === undefined) {
          alert("Google is doodoo");
        } else {
          console.log("Seconds to set:", durationSecs);
          setTimerDuration(durationSecs);
        }
      } else {
        alert("Not sure what time to set :(")
      }
      
    }, 300);
    setInputTimer(timeout);
  }
  const handleNameBlur = (e) => {
    setTimerName(e.target.textContent);
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