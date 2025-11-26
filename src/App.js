import React, { useState } from "react";

function App() {
  const state = useState(0)
  console.log(state)
  return (
    <div className="App">
      {/* <h1>{likes}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={() => console.log (likes -=1)}>Deccrement</button> */}
    </div>
  );
}

export default App;
