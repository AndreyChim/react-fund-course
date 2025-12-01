import React, { useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css'
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript', body: 'Description'}, // pass an array of objects as the default value
    { id: 2, title: 'Javascript 2', body: 'Description'}, // object structure like props
    { id: 3, title: 'Javascript 3', body: 'Description'}
  ])
  const [posts2, setPosts2] = useState([
    { id: 1, title: 'Ruby', body: 'Description'}, // pass an array of objects as the default value
    { id: 2, title: 'Ruby 2', body: 'Description'}, // object structure like props
    { id: 3, title: 'Ruby 3', body: 'Description'}
  ])
  // Check original posts array
  // console.log('Posts in App:', posts)

  // We need to convert an array of regular objects into an array of React elements
  // We call the map function on the list of posts 
  // We pass a callback to the map function, where we transform each post object into a React element.
  
  // <PostItem post={post} />
  // becomes:
  /* <PostItem post={{id: 1, title: 'Javascript', body: 'Description'}} /> */
  // Keys allow React algorithms to render more efficiently and redraw not the entire list, but only those elements that have changed.

  return (
    <div className="App">
       <PostList posts={posts} title="List of posts 1"/>
       <PostList posts={posts2} title="List of posts 2"/>
    </div>
  );
}

// When React sees this JSX:
/* <PostList posts={posts}/> */

// It essentially calls:
// React.createElement(PostList, { posts: posts })

// Which creates a React element with:
// {
//   type: PostList,
//   props: {
//     posts: postsArray  // The actual array from App's state
//   }
// }

export default App; 
