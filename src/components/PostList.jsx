import React, { useRef } from 'react'
import PostItem from './PostItem'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const PostList = ({ posts, title, remove }) => {
  const nodeRefs = useRef({})

  posts.forEach(post => {
    if (!nodeRefs.current[post.id]) {
      nodeRefs.current[post.id] = React.createRef()
    }
  })

  if (!posts.length) {
    return (
      <h1 style={{ textAlign: "center" }}>
        No posts found!
      </h1>
    )
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        {title}
      </h1>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition
            key={post.id}
            nodeRef={nodeRefs.current[post.id]}
            timeout={500}
            classNames="post"
          >
            <div ref={nodeRefs.current[post.id]}>
              <PostItem remove={remove} number={index + 1} post={post} />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

export default PostList