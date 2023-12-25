import { useState } from 'react';
import './App.css';
import Timer from './components/Timer';

function App() {
  const [timers, setTimers] = useState([
    {name: "Poached Egg", durationInSeconds: 390, id: 1},
    {name: "Plank", durationInSeconds: 45, id: 2},
    {name: "how long i last", durationInSeconds: 5, id: 3},
  ]);

  const setTimerName = (id, name) => {
    setTimers(timers.map(t => (t.id === id ? {...t, name: name} : t)));
    // console.log(timers);
  }
  const setTimerDuration = (id, durationSecs) => {
    setTimers(timers.map(t => (t.id === id ? {...t, durationInSeconds: durationSecs} : t)));
    // console.log(timers);
  }

  

  return (
    <div>
      {timers.map((timer) => {
        const {name, durationInSeconds, id} = timer;
        const time = new Date();
        time.setSeconds(time.getSeconds() + durationInSeconds); 
        return (
          <Timer
            name={name}
            durationInSecs={durationInSeconds}
            setTimerName={setTimerName}
            setTimerDuration={setTimerDuration}
            id={id}
            key={id}
            expiryTimestamp={time}
          />
        )
      })}
    </div>
  );
}

export default App;
