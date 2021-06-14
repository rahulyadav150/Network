import react,{useState,useEffect} from 'react'
import PostThumb from '../PostThumb'
import LoadMoreBtn from '../LoadMoreBtn'
import {getDataAPI} from '../../utils/fetchdata'
import {profileTypes} from '../../redux/Actions/profileAction'

function Posts({id,Profile,Auth,dispatch}){
    const [user,setUser] = useState({posts:[],result:0,page:2})
    const [load,setLoad] = useState(false)
    


    useEffect(()=>{
      setLoad(true)
      Profile.userPosts.forEach(element => {
        if(element._id === id)
        { 
          setUser(element)
        
        }
      setLoad(false)
        
    })},[Profile.userPosts,id])

    const handleLoadMore = async () => {
      setLoad(true)
      const res = await getDataAPI(`/user_post/${id}?limit=${user.page*3}&page=${user.page}`,Auth.token)
   
      dispatch({ type: profileTypes.UpdateUserPosts, payload: {...res.data,_id:id,page:user.page+1}})
      setLoad(false)
      
       
        
    }
    return <>
       <PostThumb posts = {user.posts} result = {user.result} />
       {
             load && <img className='d-block mx-auto my-4' style={{width:'100px'}} 
             src='https://i.gifer.com/ZZ5H.gif' alt = 'loading...' />
       }
       <LoadMoreBtn page = {user.page} result ={user.result} load ={load} handleLoadMore = {handleLoadMore} />
    </>
}
export  default Posts;