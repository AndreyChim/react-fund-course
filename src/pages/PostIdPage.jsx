import React from 'react'
import { useParams } from 'react-router-dom'

const PostIdPage = () => {
  const params = useParams()
  console.log('params:', params)
  console.log('params.id:', params.id)
  return (
    <div>
      <h1>You have opened the post page</h1>
    </div>
  )
}

export default PostIdPage
