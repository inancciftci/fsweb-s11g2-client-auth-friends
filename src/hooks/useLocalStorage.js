import { useState } from "react";

export default function useLocalStorage(defaultValue, key = "s11g2") {
  const [value, setValue] = useState(() => {
    const localVal = JSON.parse(localStorage.getItem(key));

    if (localVal === null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      console.log("LS initialized with Default Data:", defaultValue);
      return defaultValue;
    } else {
      console.log("LS initialized with Exisitin Data:", localVal);
      return localVal;
    }
  });
  const setLocalStorage = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setLocalStorage];
}
