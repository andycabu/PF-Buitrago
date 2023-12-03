import { useState } from "react";

export function useInputState(initialState) {
  const [input, setInput] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return [input, handleChange, setInput];
}

export default useInputState;
