import React, { useState } from "react";

const Controls = ({
  isRunning,
  setIsRunning,
  setTime,
  setRemainingTime,
  setIsCountdownActive,
  isCountdownMode,
}) => {
  const [userInput, setUserInput] = useState("");

  const handleStartStop = () => {
    if (isCountdownMode) {
      if (!isRunning && userInput !== "") {
        setRemainingTime(Number(userInput) * 60000); // Convert to milliseconds
        setIsCountdownActive(true);
      }
    }
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (isCountdownMode) {
      setIsCountdownActive(false); // Stop countdown if it's active
    }
  };

  const handleReset = () => {
    if (isCountdownMode) {
      setRemainingTime(0);
      setIsCountdownActive(false);
    } else {
      setTime(0);
    }
    setIsRunning(false);
  };

  return (
    <div className="flex space-x-4">
      {isCountdownMode && !isRunning && (
        <input
          type="number"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Set Time (mins)"
          className="px-6 py-2 rounded-lg border text-lg font-semibold bg-gray-800 text-white"
        />
      )}
      <button
        onClick={handleStartStop}
        className="px-6 py-2 rounded-lg text-lg font-semibold transition duration-300 bg-blue-500 hover:bg-blue-600"
      >
        {isRunning ? "Pause" : "Start"}
      </button>
      {isRunning && (
        <button
          onClick={handleStop}
          className="px-6 py-2 rounded-lg text-lg font-semibold transition duration-300 bg-yellow-500 hover:bg-yellow-600"
        >
          Stop
        </button>
      )}
      <button
        onClick={handleReset}
        className="px-6 py-2 rounded-lg text-lg font-semibold transition duration-300 bg-red-500 hover:bg-red-600"
      >
        Reset
      </button>
    </div>
  );
};

export default Controls;
