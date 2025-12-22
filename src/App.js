import React, { useRef, useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css'
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'aa', body: 'zz'}, 
    { id: 2, title: 'gg', body: 'yy'}, 
    { id: 3, title: 'bb', body: 'cc'}
  ])
  const [selectedSort, setSelectedSort] = useState('')

    // Log initial state
    console.log('=== INITIAL STATE ===');
    console.log('selectedSort initial:', selectedSort);
    console.log('posts initial:', posts);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
            
  }
  
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !==post.id))
  }

  const sortPosts = (sort) => {
    console.log('\n=== STEP 1: sortPosts called ===');
    console.log('sort parameter (from MySelect):', sort);
    console.log('selectedSort BEFORE setSelectedSort:', selectedSort);
    
    setSelectedSort(sort)
    
    console.log('=== STEP 2: Sorting logic ===');
    console.log('Current posts:', posts);
    console.log('Sorting by field:', sort);
    
    const sortedPosts = [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
    
    console.log('Sorted posts:', sortedPosts);
    console.log('Calling setPosts with sorted array...');
    
    setPosts(sortedPosts)
    
    // Note: selectedSort won't update here yet - setState is async!
    console.log('Note: selectedSort value here is still:', selectedSort, 
                '(setState is asynchronous)');
  }

  // Add this useEffect to see the state after it updates
  React.useEffect(() => {
    console.log('\n=== STEP 3: State updated (useEffect) ===');
    console.log('selectedSort AFTER update:', selectedSort);
    console.log('posts AFTER update:', posts);
  }, [selectedSort, posts])

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <div>
          <MySelect
              value={selectedSort}
              onChange={sortPosts}
              defaultValue="Sorting"
              options={[
                {value: 'title', name: 'By title'},
                {value: 'body', name: 'By body'}
              ]}
          />
      </div>
      {posts.length
          ?
          <PostList remove={removePost} posts={posts} title="List of posts 1"/>
          :
          <h1 style={{textAlign: "center"}}>
              No posts found!
          </h1>
      }
      
    </div>
  );
}

export default App; 
