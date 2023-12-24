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

  return (
    <div>
      {timers.map((timer) => {
        const {name, durationInSeconds, id} = timer;
        return (
          <Timer
            name={name}
            durationInSecs={durationInSeconds}
            setTimerName={setTimerName}
            id={id}
            key={id}
          />
        )
      })}
    </div>
  );
}

export default App;
