import { useState } from 'react';
import './App.css';
import Timer from './components/Timer';

function App() {
  const [timers, setTimers] = useState([
    {name: "Poached Egg", durationInSeconds: 390, id: 1},
    {name: "Plank", durationInSeconds: 45, id: 2},
    {name: "how long i last", durationInSeconds: 5, id: 3},
  ]);

  return (
    <div>
      {timers.map((timer) => {
        const {name, durationInSeconds, id} = timer;
        return (
          <Timer
            name={name}
            durationInSecs={durationInSeconds}
            key={id}
          />
        )
      })}
    </div>
  );
}

export default App;
