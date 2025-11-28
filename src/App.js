import React, { useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css'
import PostItem from "./components/PostItem";

function App() {
  const [posts, setPosts] = useState([
    
  ])
  return (
    <div className="App">
      {/* <PostItem/> */}
      <PostItem value={"2222"} item={{title: 0}} number={1} />
      {/* to console: props {value: '2222', item: {…}, number: 1} */}
    </div>

    
  );
}

export default App; 
