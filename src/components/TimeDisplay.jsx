import React from "react";

const TimeDisplay = ({ time, isCountdownMode }) => {
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${centiseconds.toString().padStart(2, "0")}`;
  };

  return (
    <p className="text-5xl font-mono mb-6">
      {formatTime(time)} {isCountdownMode}
    </p>
  );
};

export default TimeDisplay;
