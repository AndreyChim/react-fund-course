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
import PostFilter from "./components/PostFilter";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'aa', body: 'zz'}, 
    { id: 2, title: 'gg', body: 'yy'}, 
    { id: 3, title: 'bb', body: 'cc'}
  ])

  // const [selectedSort, setSelectedSort] = useState('')
  // const [searchQuery, setSearchQuery] = useState('')

  // sorted array
  // const sortedPosts = useMemo(() => {
  //   console.log('The sortedPosts function has completed')
  //   if(selectedSort) {
  //     return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
  // }
  //   return posts;
  // }, [selectedSort, posts])

  const [filter, setFilter] = useState({
      sort: '',    // Sorting field (title/body)
      query: ''    // Search text
  });

  // filter.sort accesses the sort property from the filter object

  const sortedPosts = useMemo(() => {
    console.log('The sortedPosts function has completed')
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
  }
    return posts;
  }, [filter.sort, posts])


  // const sortedAndSearchedPosts = useMemo(() => {
  //     return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
  // }, [searchQuery, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
}, [filter.query, sortedPosts])

  const createPost = (newPost) =>
    setPosts([...posts, newPost])
            
  // we get the post from the child component
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !==post.id))
  }

  // we don't use this now

  // const sortPosts = (sort) => {
  //     setSelectedSort(sort)
  // }
    
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
      <PostFilter 
          filter={filter}
          setFilter={setFilter}      
      />
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
