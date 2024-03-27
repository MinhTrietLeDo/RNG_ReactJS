import { useState, useCallback } from 'react';

// Custom hook for generating non-repeating random strings
const useNonRepeatingRandomString = () => {
  const [generatedStrings, setGeneratedStrings] = useState(new Set());

  const generateRandomString = useCallback((length) => {
    if (!length || length <= 0) {
      throw new Error('String length must be greater than 0');
    }
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result;
    do {
      result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    } while (generatedStrings.has(result));

    setGeneratedStrings(prevStrings => new Set(prevStrings).add(result));
    return result;
  }, [generatedStrings]);

  return { generatedStrings, generateRandomString };
};

export default useNonRepeatingRandomString;
