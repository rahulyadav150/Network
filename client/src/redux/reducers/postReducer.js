import {postTypes} from '../Actions/postAction'

const initialState = {
    posts:[],
    loading:false,
    result:0,
    page:1
    
}

const postReducer = (state=initialState, action)=>{
    switch(action.type){
        case postTypes.createPost:
            return {
                ...state,
                posts:[action.payload,...state.posts]
            }
        case postTypes.loading:
            return {
                ...state,
                loading:action.payload

            }
            case postTypes.getPosts:
                return {
                    ...state,
                    result : state.result + action.payload.result,
                    posts : [...state.posts,...action.payload.posts],
                    page : state.page+1
    
                }
            case postTypes.updatePost:
                state.posts.map((post,index)=>{
                    if(post._id === action.payload._id)
                    return state.posts[index] = action.payload
                    return state.posts
                })
                 return {
                ...state,
                posts:state.posts
            }
            case postTypes.deletePost:
               const newArr = state.posts.filter(post => post._id !== action.payload._id)
               console.log(newArr)
                  return {
                ...state,
                posts:newArr
            }
         
            default:
             return state
    }
}

export default postReducer