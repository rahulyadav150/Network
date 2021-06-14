import {discoverTypes} from '../Actions/discoverAction'

const initState ={
    loading:false,
    posts: [],
    result:0,
    page : 2,
    firstLoad : false
}

function discoverReducer(state = initState,action){
    
    switch(action.type){
        case discoverTypes.loading:
            return {
                ...state,
                loading : action.payload
            }
        case discoverTypes.getPosts:
                return {
                    ...state,
                    posts : action.payload.posts,
                    result : action.payload.result,
                    firstLoad : true
                }
        case discoverTypes.updatePost:
                return {
                        ...state,
                        posts : [...state.posts,...action.payload.posts],
                        page : state.page+1,
                        result : state.result+action.payload.result
                    
                    }
        default:
        return state;
    }

}

export default discoverReducer