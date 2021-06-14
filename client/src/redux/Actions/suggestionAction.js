import { getDataAPI } from '../../utils/fetchdata'
import {Types} from './globalTypes'
export const suggestionTypes = {
    loading : 'LOADING_SUGGESTIONS',
    getUser : 'GET_SUGGESTION',

}


export const getSuggestion = (token) => async (dispatch) => {
    try {
        dispatch({type:suggestionTypes.loading,payload:true})
        const res = await getDataAPI('suggestions_user',token)
        console.log(res.data)
        dispatch({type:suggestionTypes.getUser,payload:res.data})
        dispatch({type:suggestionTypes.loading,payload:false})
        
    } catch (err) {
        dispatch({type : Types.Alert,payload:{err:err.response.data.msg}})
        
    }
}