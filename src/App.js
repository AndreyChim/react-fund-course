import React, { useMemo, useRef, useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState('')

  // sorted array
  const sortedPosts = useMemo(() => {
    console.log('The sortedPosts function has completed')
    if(selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
  }
    return posts;
  }, [selectedSort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, posts])

  const createPost = (newPost) =>
    setPosts([...posts, newPost])
            
  // we get the post from the child component
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !==post.id))
  }

  const sortPosts = (sort) => {
      setSelectedSort(sort)
  }
    
  // Add this useEffect to see the state after it updates
  // React.useEffect(() => {
  //   console.log('\n=== STEP 3: State updated (useEffect) ===');
  //   console.log('selectedSort AFTER update:', selectedSort);
  //   console.log('posts AFTER update:', posts);
  // }, [selectedSort, posts])

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <div>
          <MyInput
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search"
          />
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
      {sortedAndSearchedPosts.length
          ?
          <PostList remove={removePost} posts={sortedAndSearchedPosts} title="List of posts 1"/>
          :
          <h1 style={{textAlign: "center"}}>
              No posts found!
          </h1>
      }
      
    </div>
  );
}

export default App; 
