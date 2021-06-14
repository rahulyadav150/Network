import react,{useState,useEffect} from 'react'
import PostThumb from '../PostThumb'
import LoadMoreBtn from '../LoadMoreBtn'
import {getDataAPI} from '../../utils/fetchdata'
import { Types } from  '../../redux/Actions/globalTypes'



function Saved({Auth,dispatch}){
    const [savedPosts,setSavedPosts] = useState([])
    const [load,setLoad] = useState(false)
    const [result,setResult] = useState(2)
    const [page,setPage] = useState(2)
 

    useEffect( async ()=>{
      setLoad(true)
      try{
      const res = await getDataAPI('savedPosts',Auth.token)
      setSavedPosts(res.data.savedPosts)
      setResult(res.data.result)
      
      }catch(err){
          dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
      }
      setLoad(false)
        
    },[Auth.token,dispatch])

    const handleLoadMore = async () => {
      setLoad(true)
      try{
        const res = await getDataAPI(`/savedPosts?limit=${page*3}`,Auth.token)
        setSavedPosts(res.data.savedPosts)
        setResult(res.data.result)
        setPage(page+1)
        
      }catch(err){
        dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
      }
   setLoad(false)
      
       
        
    }
 return <>
      <PostThumb posts = {savedPosts} result = {result} />
       {
             load && <img className='d-block mx-auto my-4' style={{width:'100px'}} 
             src='https://i.gifer.com/ZZ5H.gif' alt = 'loading...' />
       }
       <LoadMoreBtn page = {page} result ={result} load ={load} handleLoadMore = {handleLoadMore} />

 </>

}
export default Saved