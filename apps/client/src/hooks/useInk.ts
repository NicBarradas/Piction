import { useState, useCallback } from 'react';

interface UseInkReturn {
  ink: number;
  setInk: React.Dispatch<React.SetStateAction<number>>;
  addInk: (amount: number) => void;
}

/**
 * Custom hook to track ink usage in drawing
 */
const useInk = (): UseInkReturn => {
  const [ink, setInk] = useState<number>(0);
  
  // Function to add ink (from a stroke)
  const addInk = useCallback((amount: number) => {
    setInk(prevInk => prevInk + amount);
  }, []);
  
  return { ink, setInk, addInk };
};

export default useInk; 