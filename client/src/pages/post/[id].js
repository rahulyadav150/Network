import react ,{useState , useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {getPost} from '../../redux/Actions/postAction'
import PostCard from '../../components/PostCard'


function  Post({post}){
    const {id} = useParams()
    const [detailPost,setPost] = useState([])
    const {Auth,DetailPost} = useSelector(state => state)
    const dispatch = useDispatch()
 
    useEffect(()=>{
        dispatch(getPost({DetailPost,id,Auth}))
        if(DetailPost.length>0)
        {
         const newArr = DetailPost.filter(item => item._id === id)
         setPost(newArr)
         console.log(newArr)
        }
    },[DetailPost,id,Auth,dispatch])
    return <>
        <div className = 'posts detailPost'>

       
          {
              detailPost.length === 0 && <img className='d-block mx-auto my-4' style={{width:'100px'}} 
               src='https://i.gifer.com/ZZ5H.gif' alt = 'loading...' />
              
          }
          {
              detailPost.map(item => (
                <PostCard key = {item._id} post = {item} />
              ))
          }
          </div>
    </>
}
export default Post