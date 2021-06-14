import {suggestionTypes} from '../Actions/suggestionAction'

const initState = {
    loading : false,
    users : []
} 

function suggestionReducer(state = initState , action ){
    switch(action.type){
        case suggestionTypes.loading:
            return {
                ...state,
                loading : action.payload
            }
        case suggestionTypes.getUser:
                return {
                    ...state,
                    users : action.payload.users
                }
        default:
            return state;
        
    }
}

export default suggestionReducer