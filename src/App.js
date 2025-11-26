import React from "react";

function App() {
  let likes = 5;
  return (
    <div className="App">
      <h1>{likes}</h1>
      <button onClick={() => console.log (likes +=1)}>Increment</button>
      <button onClick={() => console.log (likes -=1)}>Deccrement</button>
    </div>
  );
}

export default App;
