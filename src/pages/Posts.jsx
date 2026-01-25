import React, { useEffect, useRef, useState } from "react";
import PostService from "../API/PostService";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/Loader/Loader";
import MyModal from "../components/UI/MyModal/MyModal";
import Pagination from "../components/UI/pagination/Pagination";
import { useFetching } from "../hooks/useFetching";
import { usePosts } from "../hooks/usePosts";
import { getPageCount } from "../utils/pages";

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({
      sort: '',    
      query: ''
  });
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()
  const observer = useRef()
       
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit));
  })

  useEffect( () => {
      var callback = (entries, observer) => {
          if (entries[0].isIntersecting) {
              console.log('div in the visibility zone')
              console.log('entries:', entries)
              console.log('entries[0]:', entries[0])
              console.log('entries[0].target:', entries[0].target)
              console.log('observer.current after creation:', observer.current)
              console.log('lastElement:', lastElement)
              console.log('lastElement.current:', lastElement.current)
              console.log('Same object?', entries[0].target === lastElement.current);
          }          
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current)
  }, [])



  useEffect( () => {
    fetchPosts(limit, page)
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }       

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !==post.id))
  }

  const changePage = (page) => {
    setPage(page)    
  }

  return (
    <div className="App">
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
      {postError &&
          <h1>Error ${postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="List of posts 1"/>
      <div ref={lastElement} style={{height: 20, background: 'red'}}/>
      {isPostsLoading &&
          <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
      }
      <Pagination
          page={page} 
          changePage={changePage}
          totalPages={totalPages}
          />
    </div>
  );
}

export default Posts; 
