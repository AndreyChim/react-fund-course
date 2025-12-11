import React from 'react'
import PostItem from './PostItem'

const PostList = ({posts, title, remove}) => {
  console.log('posts:', posts)
  console.log('title:', title)
  console.log('remove:', remove)
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>
          {title}
      </h1>
       {posts.map((post, index) =>  
          <PostItem remove={remove} number={index + 1} post={post} key={post.id}/>
       )}
    </div>
  )
}

export default PostList
