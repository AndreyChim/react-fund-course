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
import MyModal from "./components/UI/MyModal/MyModal";
import { usePosts } from "./hooks/usePosts";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([])

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
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }       

  async function fetchPosts() {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      console.log(response.data)
  }

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
      <button onClick={fetchPosts}>Get posts</button>
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
          Create a post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
          filter={filter}
          setFilter={setFilter}      
      />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="List of posts 1"/>
    </div>
  );
}

export default App; 
