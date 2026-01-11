import React, { useRef } from 'react'
import PostItem from './PostItem'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const PostList = ({ posts, title, remove }) => {
  const nodeRefs = useRef({})
  
  posts.forEach(post => {
    
    if (!nodeRefs.current[post.id]) {
      nodeRefs.current[post.id] = React.createRef()
    }

    console.log('post.id:', post.id)
    console.log('nodeRefs.current[post.id]:', nodeRefs.current[post.id])
    console.log('nodeRefs.current[post.id].current:', nodeRefs.current[post.id].current)

    if (nodeRefs.current[post.id].current) {
      console.log('✅ DOM Element attached!')
      console.log('  Constructor:', nodeRefs.current[post.id].current.constructor?.name)
      console.log('  Tag name:', nodeRefs.current[post.id].current.tagName)
      console.log('  Classes:', nodeRefs.current[post.id].current.className)
      console.log('  Parent:', nodeRefs.current[post.id].current.parentElement?.tagName)
    } 
    
  })

  console.log('nodeRefs.current:', nodeRefs.current)
  
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