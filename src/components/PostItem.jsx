import React from 'react'

const PostItem = (props) => {  // the component can accept some input data, props
  console.log('props', props)  // to console: props {} i; {} - a function argument into which we can pass something from the outside
  return (
    <div className="post">
      <div className="post__content">
         <strong>{props.post.id}. {props.post.title} </strong>  {/* we access the object's field to props name post: props.post.id*/}
        <div>
          {props.post.body}
        </div>
      </div>
      <div className="post__btns">
        <button>Delete</button>
      </div>
    </div>
  )
}

export default PostItem
