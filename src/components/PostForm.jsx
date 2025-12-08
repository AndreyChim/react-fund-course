import React from 'react'
import { useState } from 'react'
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost =  {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''})
        // The created object is added to the posts array.
        // We don't change the state directly.
        // We call the function setPosts and pass it a new array, 
        // where we expand the old array with existing posts 
        // and add the new post to the end.
      }

  return (
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
  )
}

export default PostForm
