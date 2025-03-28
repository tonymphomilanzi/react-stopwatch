import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TimeDisplay from "./components/TimeDisplay";
import Controls from "./components/Controls";
import Modal from "./components/Modal"; // Import the Modal component

const Stopwatch = () => {
  const [time, setTime] = useState(0); // For Stopwatch
  const [remainingTime, setRemainingTime] = useState(0); // For Countdown
  const [isRunning, setIsRunning] = useState(false);
  const [isCountdownMode, setIsCountdownMode] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility

  useEffect(() => {
    let interval;
    if (isRunning && !isCountdownMode) {
      // Stopwatch Logic
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (isCountdownMode && isCountdownActive) {
      // Countdown Logic
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setIsModalOpen(true); // Show the modal when time is up
            setIsRunning(false); // Stop the countdown
            return 0;
          }
          return prevTime - 10;
        });
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, isCountdownMode, isCountdownActive]);

  const toggleMode = () => {
    setIsCountdownMode(!isCountdownMode);
    setIsRunning(false);
    setIsCountdownActive(false);
    setTime(0);
    setRemainingTime(0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal when the "Close" button is clicked
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-xl shadow-xl text-center"
      >
        <h1 className="text-4xl font-bold mb-6">
          {isCountdownMode ? "Countdown Timer" : "Stopwatch"}
        </h1>
        <TimeDisplay
          time={isCountdownMode ? remainingTime : time}
          isCountdownMode={isCountdownMode}
        />
        <div className="flex space-x-4">
          <Controls
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            setTime={setTime}
            setRemainingTime={setRemainingTime}
            setIsCountdownActive={setIsCountdownActive}
            isCountdownMode={isCountdownMode}
          />
          <button
            onClick={toggleMode}
            className="px-6 py-2 rounded-lg text-lg font-semibold transition duration-300 bg-yellow-500 hover:bg-yellow-600"
          >
            Switch to {isCountdownMode ? "Stopwatch" : "Countdown"}
          </button>
        </div>
      </motion.div>

      {isModalOpen && <Modal onClose={handleCloseModal} />} {/* Show the modal when time's up */}
    </div>
  );
};

export default Stopwatch;
