import { useEffect, useRef } from "react";

/**
 * Custom timer hook that triggers a callback after a specified time.
 * @param {number} minutes - Time in minutes after which the callback will be triggered.
 * @param {function} callback - Function to be called when the timer expires.
 */
const useTimer = (minutes, callback) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!minutes || !callback) return;

    const totalSeconds = minutes * 60;
    let remainingSeconds = totalSeconds;

    intervalRef.current = setInterval(() => {
      remainingSeconds -= 1;
      if (remainingSeconds <= 0) {
        clearInterval(intervalRef.current);
        callback();
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [minutes, callback]);
};

export default useTimer;
