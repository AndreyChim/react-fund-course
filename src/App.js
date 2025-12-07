import React, { useRef, useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css'
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript', body: 'Description'}, // pass an array of objects as the default value
    { id: 2, title: 'Javascript 2', body: 'Description'}, // object structure like props
    { id: 3, title: 'Javascript 3', body: 'Description'}
  ])
  
  const [post, setPost] = useState({title: '', body: ''})
  
  const addNewPost = (e) => {
    e.preventDefault()
    setPosts([...posts, {...post, id: Date.now()}])
    setPost({title: '', body: ''})
    // The created object is added to the posts array.
    // We don't change the state directly.
    // We call the function setPosts and pass it a new array, 
    // where we expand the old array with existing posts 
    // and add the new post to the end.
  }


  return (
    <div className="App">
      <form>
        {/*Controlled component*/}
        <MyInput
            value={post.title} 
            onChange={e => setPost({...post, title: e.target.value})}
            type="text"
            placeholder="Name of post"
        />
          <MyInput
              value={post.body} 
              onChange={e => setPost({...post, body: e.target.value})}
              type="text"
              placeholder="Description of post"
          />
          <MyButton type="submit" onClick={addNewPost}>Create a post</MyButton>
      </form>
      <PostList posts={posts} title="List of posts 1"/>
    </div>
  );
}

export default App; 