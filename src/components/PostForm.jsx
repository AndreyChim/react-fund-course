import React from 'react'
import { useState } from 'react'
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''})

    debugger;
    const addNewPost = (e) => {
        e.preventDefault()
        debugger; // Check form state

        const newPost =  {
            ...post, 
            id: Date.now()
        }
        debugger; // Check newPost object
        console.log('post:', post)
        console.log('newPost:', newPost)
        console.log('create:', create)

        // we receive the create prop (which is the createPost function) 
        // and use it in the addNewPost function

        create(newPost) // THIS is where the parameter gets its value!

        // Here we are calling the `create` prop, which is the `createPost` function
        // from App.jsx, and passing the `newPost` object as an argument.

        debugger; 
        setPost({title: '', body: ''})
        debugger; // Check form reset
        
      }
      debugger;
      
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
