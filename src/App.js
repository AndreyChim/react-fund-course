import React from "react";

function App() {
  let likes = 5;

  function increment() {
    likes +=1;
    console.log (likes)
  }
  return (
    <div className="App">
      <h1>{likes}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={() => console.log (likes -=1)}>Deccrement</button>
    </div>
  );
}

export default App;
