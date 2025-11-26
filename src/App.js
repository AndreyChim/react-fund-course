import React, { useState } from "react";

function App() {
  const [likes, setLikes] = useState(5)
  const [value, setValue] = useState('text to input')
  
  function increment() {
    setLikes(likes +1)
  }

  function decrement() {
    setLikes(likes -1)

  }

  return (
    <div className="App">
      <h1>{likes}</h1>
      <h1>{value}</h1>
      <input 
          type="text" 
          value={value}
          onChange={event => {
            console.log("Full event object:", event);
            console.log("Event target:", event.target);
            console.log("Event target value:", event.target.value);
            console.log("Event target type:", event.target.type);
            console.log("Event target tag name:", event.target.tagName);
            setValue(event.target.value)
          }}
          />
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default App;
