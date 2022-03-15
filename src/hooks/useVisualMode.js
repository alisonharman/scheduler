import { useState } from 'react';

export default function useVisualMode(initial) {
  // takes in an inital mode as a string
  // set the mode state with the mode provided
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setMode(mode);
    if (replace) {
      setHistory(prev => ([...prev.slice(0, -1), mode]))
    }
    else {
      setHistory(prev => ([...prev, mode]))
    }
  }

  function back() {
    // only change mode if array has a length greater than one, else mode stays the same
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  }

  return { mode, transition, back };
}