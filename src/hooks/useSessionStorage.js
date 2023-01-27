import { useState } from "react";

const useSessionStorage = (key, initialValue) => {
  const [stroedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  }, []);

  const setValue = (value) => {
    try {
      const valueToStore =
        typeof value === "function" ? value(stroedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [stroedValue, setValue];
};

export default useSessionStorage;
