
import {useSelector,useDispatch } from 'react-redux'
import PostCard from '../PostCard'
import LoadMoreBtn from '../LoadMoreBtn'
import { useState } from 'react'
import {getDataAPI }from '../../utils/fetchdata'
import {postTypes} from '../../redux/Actions/postAction'


function Posts(){
    const {HomePosts,Auth} =  useSelector(state=>state)
    const [load,setLoad] = useState(false)
    const dispatch = useDispatch()
  

    const handleLoadMore = async () =>{
        setLoad(true)
       const res = await getDataAPI(`posts?limit=${HomePosts.page*3}&page=${HomePosts.page}`,Auth.token)
        dispatch({type:postTypes.getPosts,payload : res.data})
        setLoad(false)

    }

    return <>
    <div className = 'posts' >
        {
            HomePosts.posts.map(post=>(
            <PostCard key = {post._id} post = {post} />

            ))
        }
        {  load && <img className='d-block mx-auto my-4' style={{width:'100px'}} 
             src='https://i.gifer.com/ZZ5H.gif' alt = 'loading...' />
        }
        <LoadMoreBtn page = {HomePosts.page} result = {HomePosts.result} load = {load} handleLoadMore = {handleLoadMore} />
    </div> 
    </>
}

export default Posts;