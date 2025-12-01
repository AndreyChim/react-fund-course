// import React, { useEffect} from 'react'
import React from 'react'
import PostItem from './PostItem'

const PostList = ({posts, title}) => {
  
  // useEffect(() => {
  //   console.log('Posts in PostList:', posts)
  // }, [posts]) // This will log whenever posts changes

    // const PostList = (props) => {
    // Check the entire props object
    // console.log('Full props object:', props)
    
    // Check specific properties of props
    // console.log('props.posts', props.posts)
    // console.log('0 item of array', props.posts[0])
    // console.log('Type of props:', typeof props)
    // console.log('Keys in props:', Object.keys(props))

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>
          {title}
      </h1>
       {posts.map(post =>  
          <PostItem post={post} key={post.id}/>
       )}
    </div>
  )
}

// Then when PostList renders and calls:
/* <PostItem post={post} key={post.id}/> */

// React creates:
// {
//   type: PostItem, 
//   props: {
//     post: postObject  // The individual post object
//   },
//   key: post.id
// }

// PostList.jsx receives:
// props = {
//   posts: [
//     {id:1, title:'Javascript', body:'Description'},
//     {id:2, title:'Javascript 2', body:'Description'} 
//   ]
// }

// First iteration of map:
// post = {id:1, title:'Javascript', body:'Description'}
/* <PostItem post={{id:1, title:'Javascript', body:'Description'}} key={1}/> */

// PostItem.jsx receives:
// props = {
//   post: {id:1, title:'Javascript', body:'Description'}
// }

// const PostList = ({ posts }) => {  // Destructure props
//   return (
//     <div>
//       <h1 style={{textAlign: 'center'}}>List of posts</h1>
//       {posts.map(post =>  
//         <PostItem post={post} key={post.id}/>
//       )}
//     </div>
//   )
// }

export default PostList
