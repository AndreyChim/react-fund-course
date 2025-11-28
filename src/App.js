import React, { useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css'
import PostItem from "./components/PostItem";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript', body: 'Description'}, // pass an array of objects as the default value
    { id: 2, title: 'Javascript 2', body: 'Description'}, // object structure like props
    { id: 3, title: 'Javascript 3', body: 'Description'}
  ])

  // We need to convert an array of regular objects into an array of React elements
  // We call the map function on the list of posts 
  // We pass a callback to the map function, where we transform each post object into a React element.
  
  // <PostItem post={post} />
  // becomes:
  {/* <PostItem post={{id: 1, title: 'Javascript', body: 'Description'}} /> */}

  return (
    <div className="App">
       {posts.map(post =>  
       <PostItem post={post}/>
       )}
       </div>
  );
}

export default App; 
