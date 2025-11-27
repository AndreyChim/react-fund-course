import React, { useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css'
import PostItem from "./components/PostItem";

function App() {
  const [value, setValue] = useState('text to input')
  
  return (
    <div className="App">
      <PostItem/>
      <PostItem/>
      <PostItem/>
    </div>
  );
}

export default App;
