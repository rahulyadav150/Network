import react, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {createComment} from '../../../redux/Actions/commentAction'

function InputComment({children,post,onReply,setOnReply}){
  

    const [content, setContent] = useState('')
    const {Auth} = useSelector(state => state)
    const dispatch = useDispatch()
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!content.trim()){
          if(setOnReply)  setOnReply(false)
          return;
        
        }
        setContent('')
        const newComment = {
          content,
          likes : [],
          user : Auth.user,
          createdAt : new Date().toISOString(),
          reply : onReply && onReply.commentId,
          tag : onReply && onReply.user
          

        }
        
        
       console.log("newComment",newComment)
        dispatch(createComment({newComment,post,Auth}))
        if(setOnReply)  setOnReply(false)

    }
return <>
  <form className = 'card-footer comment_input' onSubmit = {handleSubmit}>
    {children}
    <input type = 'text' placeholder = "Add your comment..." 
    value = {content} 
    onChange ={e => setContent(e.target.value)} />
    <button type = 'submit' className = 'postBtn'>
        Post
    </button>
  </form>
</>
}

export default  InputComment