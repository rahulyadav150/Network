import react, { useEffect, useState } from 'react'
import CommentCard from './CommentCard'

function CommentDisplay({comment,post,replyCm}){
   const [showRep,setShowRep] = useState([])
   const [next,setnext] = useState(1)

   useEffect(()=>{
       if(replyCm.length-next>=0)
       setShowRep(replyCm.slice(replyCm.length-next))
       else
       setShowRep(replyCm)
   },[replyCm,next])

    return <>
  
    <div className = 'comment_display'>
        <CommentCard  comment = {comment} post = {post} commentId = {comment._id}>
            <div className = 'pl-4'>
               { showRep.map((item,index)=>(
                  
                  item.reply &&
                  <CommentCard key = {index} comment = {item} post = {post} commentId = {comment._id} />


               ))}
               {
                  replyCm.length - next > 0 
                ? <div style = {{cursor:'pointer',color:'crimson'}} onClick = {()=>{setnext(next+5)}} >
                  See more reply...
                  </div>
                : replyCm.length>1  && <div className = 'p-2 border-top' 
                   style = {{cursor:'pointer',color:'crimson'}} onClick = {()=>{setnext(1)}} >
                  Hide comments
                  </div>
               }
     
               
            </div>
        </CommentCard>

    </div>
    
    </>
}

export default CommentDisplay