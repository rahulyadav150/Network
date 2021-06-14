import {Types} from './globalTypes'
import {postDataAPI,getDataAPI,patchDataAPI,deleteDataAPI} from '../../utils/fetchdata'
import {imageUpload} from '../../utils/imageUpload'
import {profileTypes} from '../../redux/Actions/profileAction' 



export const postTypes = {

    createPost :'CREATE_POST',
    loading : 'LOADING_POST',
    getPosts: 'GET_POSTS',
    updatePost:'UPDATE_POST',
    likePost : 'LIKE_POST',
    unLikePost : 'UNLIKE_POST',
    GetPost : 'GET_POST',
    deletePost : 'DELETE_POST'
}

export const createPost = (images,content,Auth) => async dispatch =>{
    try{

        let media = []
        dispatch({type:Types.Alert,payload:{loading:true}})
        if(images.length>0) media = await imageUpload(images)
     
        dispatch({type:Types.Alert,payload:{loading:true}})
        const res = await postDataAPI('posts',{content,images:media},Auth.token)
        dispatch({type:postTypes.createPost,payload:res.data.newPost})
        dispatch({type:Types.Alert,payload:{loading:false}})
    }catch(err){
        
        dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
    }
}
export const getPosts = (token) => async dispatch =>{
    try{    
            dispatch({type:postTypes.loading,payload:true})
            const res = await getDataAPI('posts',token)
            dispatch({type:postTypes.getPosts,payload:res.data})  // here getPost is action Type
            dispatch({type:postTypes.loading,payload:false})



       }catch(err){
        dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})

    }
}

export const updatePost = (images,content,Auth,Status) => async dispatch =>{
    try{

        let media = []
        const newImageURL = images.filter(image => !image.url)
        const oldImageUrl = images.filter(image => image.url)
        if(Status.content === content &&
            newImageURL.length === 0 &&
            oldImageUrl.length === Status.images.length)
            return ;
        dispatch({type:Types.Alert,payload:{loading:true}})
        if(newImageURL.length>0) media = await imageUpload(newImageURL)
        
         media = [...media, ...oldImageUrl] 
         const res = await patchDataAPI(`post/${Status._id}`,{content,images:media},Auth.token)
           

        dispatch({type:postTypes.updatePost,payload:res.data.newPost})
        dispatch({type:Types.Alert,payload:{loading:false}})
        dispatch({type:Types.Alert,payload:{success:res.data.msg}})
    }catch(err){
        
        dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
    }
}

export const postLike =  ({post,Auth}) => async dispatch =>{
    try{
        
        const newPost = { ...post ,likes : [...post.likes,Auth.user]}
       
         await patchDataAPI(`post/${post._id}/like`,null,Auth.token)
        dispatch({type:postTypes.updatePost,payload:newPost})
      
  


    }catch(err){
      
        dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
    }
}

export const postUnLike = ({post,Auth}) => async dispatch =>{
    try{
        
        const updatedLikeUser = post.likes.filter((user) => user._id !== Auth.user._id )
        const newPost = { ...post ,likes : updatedLikeUser}
       
         await patchDataAPI(`post/${post._id}/unlike`,null,Auth.token)
        dispatch({type:postTypes.updatePost,payload:newPost})
  


    }catch(err){
       
        dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
    }
}

export const getPost = ({DetailPost,id,Auth}) => async (dispatch) =>{
    if(DetailPost.every(post => post._id !==id))
    {
        try {
            const post = await getDataAPI(`post/${id}`,Auth.token)
            dispatch({type:postTypes.GetPost,payload : post.data.post})
        } catch (err) {
            
            dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
        }
    }

}

export const deletePost = ({post,Auth}) => async (dispatch) =>{
    try {
           console.log(post,Auth)
           dispatch({type:postTypes.deletePost,payload:post})
           await deleteDataAPI(`post/${post._id}`,Auth.token)
           dispatch({type:profileTypes.DeleteUserPost,payload : {_id:Auth.user._id,postId : post._id}})

        } catch (err) {
             
            dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
        }
    }

export const savePost = ({post,Auth}) => async (dispatch) => {
    const newUser = {...Auth.user,saved:[...Auth.user.saved,post._id]}
    try{   
    await patchDataAPI(`post/${post._id}/save`,null,Auth.token)
    dispatch({type : Types.Auth,payload :{...Auth, user : newUser}})
    
   }catch(err){
       dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
   }
}
export const unSavePost = ({post,Auth}) => async (dispatch) => {
    const newUser = {...Auth.user,saved:Auth.user.saved.filter(id => id!==post._id)}
    try{   
    await patchDataAPI(`post/${post._id}/unSave`,null,Auth.token)
    dispatch({type : Types.Auth,payload :{...Auth, user : newUser}})
    
   }catch(err){
       dispatch({type:Types.Alert,payload:{err:err.response.data.msg}})
   }
}