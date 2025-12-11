import React, { useRef, useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css'
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript', body: 'Description'}, // pass an array of objects as the default value
    { id: 2, title: 'Javascript 2', body: 'Description'}, // object structure like props
    { id: 3, title: 'Javascript 3', body: 'Description'}
  ])
  debugger;
  
  const createPost = (newPost) => {
    debugger; // Pauses execution here
    console.log('Before setPosts - posts:', posts);
    console.log('Parameter newPost:', newPost);
    
    // const updatedPosts = [...posts, newPost];
    // debugger; // Check updatedPosts
    
    // setPosts(updatedPosts);
    // debugger; // State hasn't updated yet (async)
    
    setPosts([...posts, newPost])
    debugger;
        
  }
    // console.log('newPost:', newPost)
    debugger;
    console.log('new posts:', posts)

    // We get the post from the child component
    const removePost = (post) => {
      setPosts(posts.filter(p => p.id !==post.id))
    }

    // We pass the function createPost as a prop to the PostForm component
    // PostForm create={createPost}
    // Equivalent to: create={function(newPost) { setPosts([...posts, newPost]) }}
  return (
    <div className="App">
      <PostForm create={createPost}/>
      <PostList remove={removePost} posts={posts} title="List of posts 1"/>
    </div>
  );
}

export default App; 

// What Actually Happens (Step by Step):

// 1. User types in form inputs
//    -> PostForm's state: {title: 'React Hooks', body: 'Learn useState'}

// 2. User clicks "Create a post" button
//    -> addNewPost function runs
//    -> Creates object: {title: 'React Hooks', body: 'Learn useState', id: 1659876543210}

// 3. create(newPost) is called
//    -> This calls App.jsx's createPost({title: 'React Hooks', body: 'Learn useState', id: 1659876543210})

// 4. App.jsx's createPost executes:
//    const createPost = (newPost) => {
//        // newPost now equals {title: 'React Hooks', body: 'Learn useState', id: 1659876543210}
//        setPosts([...posts, newPost])
//    }

// 5. React updates state:
//    Old posts: [{id:1, title:'Javascript', body:'Description'}, ...]
//    + newPost: {id:1659876543210, title:'React Hooks', body:'Learn useState'}
//    = New posts array with 4 items

// Timing:

// Parent defines function (parameter named 'newPost')
// const createPost = (newPost) => { /* ... */ }
// Parameter 'newPost' exists but has no value yet

// Child calls function (provides argument)
// create({title: 'React', body: 'Tutorial', id: 123})
// Now parent's 'newPost' parameter = {title: 'React', body: 'Tutorial', id: 123}

// It's Like a Phone Call:

// Parent: "Here's my phone number (function), call me with your message (argument)"
/* <PostForm callParent={createPost} /> */

// Child: "OK, I'll call with my data"
// callParent({message: "Here's my new post!"})

// Parent receives the call: 
// createPost(message) { // message = "Here's my new post!" }

// Therefore:
// the newPost parameter in App.jsx gets its value when PostForm.jsx calls create(newPost) with an actual object as the argument