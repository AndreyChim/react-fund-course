import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(5)
  console.log(count)
  console.log(setCount)
  return (
    <div className="App">
      {/* <h1>{likes}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={() => console.log (likes -=1)}>Deccrement</button> */}
    </div>
  );
}

export default App;
