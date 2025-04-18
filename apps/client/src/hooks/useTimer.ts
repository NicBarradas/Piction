import { useState, useRef, useCallback, useEffect } from 'react';

interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

/**
 * Custom hook for tracking time in milliseconds
 */
const useTimer = (): UseTimerReturn => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  // Use refs to track the timer interval and start time
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  
  // Start the timer
  const startTimer = useCallback(() => {
    // If already running, do nothing
    if (isRunning) return;
    
    // Record current timestamp
    startTimeRef.current = Date.now() - time;
    setIsRunning(true);
    
    // Start interval to update time
    timerRef.current = window.setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 10); // Update every 10ms for smoother display
  }, [isRunning, time]);
  
  // Stop the timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  }, []);
  
  // Reset the timer
  const resetTimer = useCallback(() => {
    stopTimer();
    setTime(0);
  }, [stopTimer]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  return { time, isRunning, startTimer, stopTimer, resetTimer };
};

export default useTimer; 