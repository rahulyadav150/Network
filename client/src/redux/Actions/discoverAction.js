import { getDataAPI } from '../../utils/fetchdata'
import {Types} from './globalTypes'

export const discoverTypes = {
    loading : 'LOADING_DISCOVER',
    getPosts: 'GET_DISCOVER_POST',
    updatePost: 'GET_UPDATE_POST'
}


export const getDiscoverPosts = (token) => async (dispatch) => {
  try{ 
       
    dispatch({type: discoverTypes.loading,payload:true})

    const res = await getDataAPI('post_discover',token)
    console.log(res)
    dispatch({type: discoverTypes.getPosts,payload:res.data})
    dispatch({type: discoverTypes.loading,payload:false})
  }catch(err){
      dispatch({type:Types.Alert,payload : {err: err.response.data.msg}})
  }
}