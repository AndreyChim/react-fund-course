import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'

const PostIdPage = () => {
  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])

  useEffect(() => {
    console.log("Post state updated:", post)
  }, [post]) 

    useEffect(() => {
    console.log("Comments state updated:", comments)
  }, [comments]) 

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    console.log('response:', response)
    console.log('response.data:', response.data)
    setPost(response.data)
  })
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id)
    setComments(response.data)
  })

  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, [])

  console.log('post:', post)
  console.log('comments:', comments)
  
  return (
    <div>
      <h1>You have opened the post page ID = {params.id}</h1>
      {isLoading
          ? <Loader/>  
          : <div>{post.id}. {post.title}</div>
      }
      <h1>
          Comments
      </h1>
      {isComLoading
          ? <Loader/>
          : <div>
              {comments.map(comm =>
                <div style={{marginTop: 15}}>
                    <h5>{comm.email}</h5>
                    <div>{comm.body}</div>
                </div>
              )}
          </div>
      }
    </div>
  )
}

export default PostIdPage
