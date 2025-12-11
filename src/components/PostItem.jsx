import React from 'react'
import MyButton from './UI/button/MyButton'

const PostItem = (props) => {  // the component can accept some input data, props
  // console.log('props', props)  // to console: props {} i; {} - a function argument into which we can pass something from the outside
  return (
    <div className="post">
      <div className="post__content">
         <strong>{props.number}. {props.post.title} </strong>  {/* we access the object's field to props name post: props.post.id*/}
        <div>
          {props.post.body}
        </div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => props.remove(props.post)}>
          Delete
        </MyButton>
      </div>
    </div>
  )
}

// const PostItem = ({ post }) => {  // Destructure props
//   return (
//     <div className="post">
//       <div className="post__content">
//         <strong>{post.id}. {post.title}</strong>  
//         <div>{post.body}</div>

export default PostItem
