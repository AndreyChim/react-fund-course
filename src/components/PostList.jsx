import React, { useRef } from 'react'
import PostItem from './PostItem'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const PostList = ({ posts, title, remove }) => {
  const nodeRefs = useRef({})

  // console.log('=== BEFORE PROCESSING ===')
  // console.log('1. posts array:', posts)
  // console.log('2. posts IDs only:', posts.map(p => p.id))
  
  posts.forEach(post => {
    
    if (!nodeRefs.current[post.id]) {
      nodeRefs.current[post.id] = React.createRef()
    }

    // console.log('post.id:', post.id)
    // console.log('nodeRefs.current[post.id]:', nodeRefs.current[post.id])
    // console.log('nodeRefs.current[post.id].current:', nodeRefs.current[post.id].current)

    if (nodeRefs.current[post.id].current) {
      // console.log('✅ DOM Element attached!')
      // console.log('  Constructor:', nodeRefs.current[post.id].current.constructor?.name)
      // console.log('  Tag name:', nodeRefs.current[post.id].current.tagName)
      // console.log('  Classes:', nodeRefs.current[post.id].current.className)
      // console.log('  Parent:', nodeRefs.current[post.id].current.parentElement?.tagName)
    } 
    
  })

  // console.log('3. nodeRefs.current BEFORE cleanup:', nodeRefs.current)
  // console.log('4. Keys in nodeRefs.current:', Object.keys(nodeRefs.current))
  // console.log('nodeRefs.current:', nodeRefs.current)
  // console.log('=== CLEANUP PROCESS ===')
  
  const currentIds = new Set(posts.map(p => p.id))

  // console.log('5. currentIds Set:', Array.from(currentIds))

  Object.keys(nodeRefs.current).forEach(id => {
    // console.log(`   Checking ref for ID: ${id}`)
    // console.log(`   Type of id: ${typeof id}`) 
    // console.log(`   After parseInt: ${parseInt(id)}`)
    // console.log(`   Is in currentIds? ${currentIds.has(parseInt(id))}`)

    if (!currentIds.has(parseInt(id))) {
      console.log(`   🗑️  Deleting nodeRefs.current[${id}]`)
      delete nodeRefs.current[id]
    }
  })

  // console.log('=== AFTER CLEANUP ===')
  // console.log('6. nodeRefs.current AFTER cleanup:', nodeRefs.current)
  // console.log('7. Keys remaining:', Object.keys(nodeRefs.current))

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