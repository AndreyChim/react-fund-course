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
      {/* <PostItem id={1} title={'Javascript'} body={'Description'} /> */}
      {/* to console: props {id: 1, title: 'Javascript', body: 'Description'}} */}
      <PostItem post={{ id: 1, title: 'Javascript', body: 'Description'}} /> 
      {/*We add a post props */}
      {/* props post: {id: 1, title: 'Javascript', body: 'Description'} */}
    </div>

    
  );
}

export default App; 
