import {postTypes} from '../Actions/postAction'


function detailPostReducer(state = [], action){
    switch(action.type){
        case postTypes.GetPost:
            return [...state,action.payload]
        case postTypes.updatePost:
                state.map((post,index)=>{
                    if(post._id === action.payload._id)
                    return state[index] = action.payload
                    return post
                })
                 return [
                ...state,
                
                 ]
        
        default:
            return state
    }
}
export default detailPostReducer