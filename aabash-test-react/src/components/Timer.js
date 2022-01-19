import React, { useState, useEffect } from 'react';

const INITIAL_COUNT = 0

const Timer = () => {
  const [hours, setHours] = useState(INITIAL_COUNT);
  const [minutes, setMinutes] = useState(INITIAL_COUNT);
  const [seconds, setSeconds] = useState(INITIAL_COUNT);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function stop() {
    setHours(INITIAL_COUNT);
    setMinutes(INITIAL_COUNT);
    setSeconds(INITIAL_COUNT);
    setIsActive(false);
  }

  function reset() {
    setHours(INITIAL_COUNT);
    setMinutes(INITIAL_COUNT);
    setSeconds(INITIAL_COUNT);
    setIsActive(true);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);

        if (seconds === 60) {
          setMinutes(minutes => minutes + 1);
          
          setSeconds(INITIAL_COUNT);
        }

        if (minutes === 60) {
          setHours(hours => hours + 1);
          setMinutes(INITIAL_COUNT);
        }
      }, 1000);
    } else if (!isActive && seconds !== INITIAL_COUNT) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, hours]);

  return (
    <>
      <div className="time">
        <span className="counter">{hours}</span>hours
        <span className="counter">{minutes}</span>minutes
        <span className="counter">{seconds}</span>seconds
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button button-stop" onClick={stop}>
          Stop
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </>
  );
};

export default Timer;