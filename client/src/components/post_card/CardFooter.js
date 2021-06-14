import react,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Send from '../../images/send.svg'
import Like from '../Like'
import {useSelector,useDispatch} from 'react-redux'
import {postLike,postUnLike} from '../../redux/Actions/postAction'
import ShareModal from '../ShareModal'
import {BASE_URL} from '../../utils/config'
import {savePost,unSavePost} from '../../redux/Actions/postAction'



function CardFooter({post}){
    
    const [isLike,setIslike] = useState(false)
    const [loadLike,setLoadLike] = useState(false)
    const [isShare , setisShare] = useState(false)
    const [isSaved , setIsSaved] = useState(false)
    const dispatch = useDispatch()
    const {Auth,Theme} = useSelector(state => state)

     useEffect(()=>{
         if(post.likes.find((like)=> like._id === Auth.user._id))
         setIslike(true)
         else
         setIslike(false)
     },[post.likes,Auth.user._id])
  
    const handleLike = async () => {
        if(loadLike) return;
        setLoadLike(true)
         setIslike(true)
       await dispatch(postLike({post,Auth}))
         setLoadLike(false)
        


    }

    const handleUnLike = async () => {
        if(loadLike) return ;
        setLoadLike(true)
        setIslike(false)
        await dispatch(postUnLike({post,Auth}))
        setLoadLike(false)
    }
    const handleSavePost = async () =>{
        if(loadLike) return;
        setLoadLike(true)
        setIsSaved(true)
      await   dispatch(savePost({post,Auth}))
        setLoadLike(false)
    }
    const handleUnSavePost = async () =>{
        if(loadLike) return
        setLoadLike(true)
        setIsSaved(false)
       await dispatch(unSavePost({post,Auth}))
        setLoadLike(false)
    }
    useEffect(()=>{
        if(Auth.user.saved.find((id)=> id === post._id))
        setIsSaved(true)
        else
        setIsSaved(false)
    },[Auth.user.saved,post._id])



    return <>
     <div className = 'card_footer'>
        <div className = 'card_icon_menu'>
            <div>
                 <Like 
                 isLike = {isLike}
                 handleLike = {handleLike}
                 handleUnLike = {handleUnLike}
                 />
                 <Link to = {`/post/${post._id}`} className = 'text-dark'>
                     <i className = 'far fa-comment' />
                 </Link>
                 <img src = {Send} alt = 'Send' onClick = {() => setisShare(!isShare)} />
                 
             </div>
             {
                 isSaved ?
                 < i className = 'fas fa-bookmark text-info' onClick = {handleUnSavePost} />
                 : <i className = 'far fa-bookmark' onClick ={handleSavePost} />
             }
             
        </div>
         <div className = 'd-flex justify-content-between'>
             <h6 style={{padding:'0 25px',cursor:'pointer'}}>
                 {post.likes.length} likes
             </h6>
             <h6 style={{padding:'0 25px',cursor:'pointer'}}>
               {post.comments.length} comments
             </h6>
         </div>  
     </div>
     
     {
         isShare && <ShareModal url = {`${BASE_URL}/post/${post._id}`} Theme = {Theme}/> 
     }
    </>
}
export  default CardFooter;