import { useState } from 'react';
import './App.css';
import Timer from './components/Timer';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});


function App() {
  const [timers, setTimers] = useState([
    {name: "Poached Egg", durationInSeconds: 390, id: 1},
    {name: "Plank", durationInSeconds: 45, id: 2},
    {name: "how long i last", durationInSeconds: 5, id: 3},
  ]);

  const updateTimersName = (id, name) => {
    setTimers(timers.map(t => (t.id === id ? {...t, name: name} : t)));
    // console.log(timers);
  }
  const updateTimersDuration = (id, durationSecs) => {
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
            updateTimersName={updateTimersName}
            updateTimersDuration={updateTimersDuration}
            id={id}
            key={id}
            expiryTimestamp={time}
          />
        )
      })}
      <CssBaseline />
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <StyledFab color="secondary" aria-label="add">
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
