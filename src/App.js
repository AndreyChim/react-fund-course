import React, { useState } from "react";
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
  
  const [title, setTitle] = useState('')
  console.log('title:', title, 'setTitle:', setTitle)
  console.log('MyInput Props:', {
    value: title,
    type: 'text',
    placeholder: 'Name of post',
    name: undefined,  // You're not passing name
    id: undefined,    // You're not passing id
    className: undefined, // You're not passing className
    checked: undefined,   // Not applicable for text input
    disabled: undefined   // You're not passing disabled
  })
  const addNewPost = (e) => {
    e.preventDefault()
    console.log(title)
  }

  return (
    <div className="App">
      <form>
        {/*Controlled component*/}
        <MyInput
            value={title} 
            onChange={e => {
                console.log('Event fired!');
                console.log('Type of e:', typeof e);
                console.log('Is e an object?', e && typeof e === 'object');
                console.log('All e properties, Object.keys(e):', Object.keys(e));
                console.log('Input value:', e.target.value);
                console.log('Previous title:', title);
                console.log('Full event object:', e);
                console.log('Input value:', e.target.value);
                console.log('Input type:', e.target.type);
                console.log('Input placeholder:', e.target.placeholder);
                console.log('Event type:', e.type);
                setTitle(e.target.value);    
            }}
            type="text"
            placeholder="Name of post"
        />
          <MyInput type="text" placeholder="Description of post"/>
          <MyButton type="submit" onClick={addNewPost}>Create a post</MyButton>
      </form>
      <PostList posts={posts} title="List of posts 1"/>
    </div>
  );
}

export default App; 