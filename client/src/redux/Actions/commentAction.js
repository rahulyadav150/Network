import {Types} from './globalTypes'
import { postTypes } from './postAction'
import { deleteDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchdata'

export const createComment = ({newComment,post,Auth}) => async (dispatch) => {
    console.log("in creetae comment",newComment)
    const newPost = {...post,comments : [...post.comments,newComment]}
    const data = {...newComment,postId: post._id,postUserId : post.user._id}
    dispatch({type : postTypes.updatePost,payload : newPost})
    try{
    const res= await  postDataAPI('comment',data,Auth.token)
    console.log(res)
    const newdata = {...res.data.newComment,user : Auth.user,tag:newComment.tag}
    
    const newCommentedPost = {...post,comments : [...post.comments,newdata]}
    dispatch({type : postTypes.updatePost,payload : newCommentedPost})
    
     }catch(err){
         dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
     }

}

export const updateComment = ({comment,post,content,Auth}) => async (dispatch) =>{
     comment.content = content
     post.comments.map((item,index)=>{
         if(item._id === comment._id)
         post.comments[index] = comment
         return item;
     })
     
     dispatch({type : postTypes.updatePost,payload:post})
     try{
        await patchDataAPI(`comment/${comment._id}`,{content},Auth.token)
     }catch(err){
        dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
     }

} 
export const deleteComment = ({post,comment,Auth}) => async (dispatch) =>{
    const deleteArr = [...post.comments.filter(cm => cm.reply === comment._id),comment]

    const newPost = {
        ...post,
        comments : post.comments.filter(cm => !deleteArr.find(da => da._id ===cm._id))
    }
    dispatch({type : postTypes.updatePost,payload:newPost})
    try {
        deleteArr.forEach(async comment =>{
            await deleteDataAPI(`comment/${comment._id}`,Auth.token)  
        })
      
    } catch (err) {
        dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
        
    }
    

}

export const commentLike = ({comment,post,Auth}) => async (dispatch)=>{
    comment.likes = [...comment.likes,Auth.user]
    post.comments.map((item,index)=>{
        if(item._id === comment._id)
        post.comments[index] = comment
        return item;
    })
    dispatch({type : postTypes.updatePost,payload:post})
    try{

       await patchDataAPI(`comment/${comment._id}/like`,null,Auth.token)
       
    }catch(err){
        dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
    }

}

export const commentUnLike = ({comment,post,Auth}) => async (dispatch)=>{
    comment.likes = comment.likes.filter(like => like._id !== Auth.user._id)
    post.comments.map((item,index)=>{
        if(item._id === comment._id)
        post.comments[index] = comment
        return item
    })
    dispatch({type : postTypes.updatePost,payload:post})
    try{

       await patchDataAPI(`comment/${comment._id}/unlike`,null,Auth.token)
       
    }catch(err){
        dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
    }

}
