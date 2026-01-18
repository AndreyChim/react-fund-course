import React, { useEffect, useState } from "react";
import PostService from "./API/PostService";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import Loader from "./components/UI/Loader/Loader";
import MyModal from "./components/UI/MyModal/MyModal";
import Pagination from "./components/UI/pagination/Pagination";
import { useFetching } from "./hooks/useFetching";
import { usePosts } from "./hooks/usePosts";
import './styles/App.css';
import { getPageCount } from "./utils/pages";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";

function App() {
  return (
    <BrowserRouter>
        <div className="navbar">
            <div className="navbar_links">
                <Link to="/about">About site</Link>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
        <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/posts' element={<Posts />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App; 
