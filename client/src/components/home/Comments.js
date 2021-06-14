import react,{useState,useEffect} from 'react'
import CommentDisplay from './comments/CommentDisplay'



function Comments({post}){

    const [comments,setComments] = useState([])
    const [showComments,setShowComments] = useState([])
    const [next ,setnext] = useState(2)
    const [replyCm,setReplyCm] = useState([])
    
    useEffect(()=>{
        const newCm = post.comments.filter(cm=> !cm.reply)
        setComments(newCm)
        if(newCm.length - next >=0)
        setShowComments(newCm.slice(newCm.length - next))
        else
        setShowComments(newCm.slice(0))

    },[post.comments,next])
    useEffect(()=>{
        const replyCm = post.comments.filter(cm=> cm.reply)
        setReplyCm(replyCm)
    },[post.comments])

return <>
 {  
     showComments.map(comment => (
    <CommentDisplay key ={comment._id} comment = {comment} post ={post} replyCm = {replyCm.filter(item => item.reply === comment._id)}/>
    ))
 }
    {comments.length - next > 0 
        ? <div className = 'p-2 border-top' style = {{cursor:'pointer',color:'crimson'}} onClick = {()=>{setnext(next+10)}} >
            See more comments
        </div>
        : comments.length>2  && <div className = 'p-2 border-top' style = {{cursor:'pointer',color:'crimson'}} onClick = {()=>{setnext(2)}} >
            Hide comments
          </div>
    }  
 
    
</>
}

export default Comments