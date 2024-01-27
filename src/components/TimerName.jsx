import React, { useState, useRef, createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import ContentEditable from 'react-contenteditable';
import { getFunctions, httpsCallable } from "firebase/functions";

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

  const handleNameChange = (e) => {
    nameRef.current = e.target.value;

    clearTimeout(inputTimer);
    let timeout = setTimeout(() => {
      console.log("Fetching results...");
      const res = getAutocompleteResults({ q: `how long to ${e.target.value}` });
      res.then((res) => {
        setAutocompleteResults(res.data);
        console.log("autocompleteResults:", res.data)
        const autocompletedQuery = `how long to ${e.target.value}${res.data[0] ? res.data[0] : ""}?`;
        const searchResults = searchGoogle({ q: autocompletedQuery});
        searchResults.then((searchResults) => {
          console.log("searchResults:" , searchResults);
          queryQA({"inputs": {
            "question": autocompletedQuery,
            "context": searchResults.data[0]
          }}).then((response) => {
            console.log(JSON.stringify(response));
          });
        });
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