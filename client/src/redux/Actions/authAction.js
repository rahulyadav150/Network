// ES 6
import { postDataAPI } from '../../utils/fetchdata'

import valid from '../../utils/valid'






export const login = data => async (dispatch) => {
    try {

        dispatch({ type: 'ALERT', payload: { loading: true } })
        const res = await postDataAPI('login', data);
         
        dispatch({
            type: 'AUTH',
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })

        localStorage.setItem('firstLogin', 'true');

         dispatch({ type: 'ALERT', payload: { success: 'logged in succesfully' } })




    } catch (err) {
        
        dispatch({ type: 'ALERT', payload: { err: err.response.data.msg } })
    }
}


export const refreshToken = () => async (dispatch) => {

    const firstLogin = localStorage.getItem('firstLogin');
  
    if (firstLogin) {
        dispatch({ type: 'ALERT', payload: { loading: true } })

        try {
            const res = await postDataAPI('refresh_token');
           
            dispatch({
                type: 'AUTH',
                payload: {
                    token: res.data.accessToken,
                    user: res.data.user
                }
            })
            dispatch({
                type: 'ALERT',
                payload: {}
            });
        } catch (err) {
            dispatch({ type: 'ALERT', payload: { err: err.response.data.msg } })

        }
    }
}


export const register=(data)=> async (dispatch)=>{
    const check= valid(data);
    
 
    if(check.errLength>0)
    return dispatch({type:'ALERT',payload:{...check.err}})

    dispatch({type:'ALERT',payload:{loading:true}})
    try{
       
        const res= await postDataAPI('register',data);
        
        dispatch({
            type: 'AUTH',
            payload: {
                token: res.data.accessToken,
                user: res.data.user
            }
        })
        dispatch({
            type: 'ALERT',
            payload: {success:res.data.msg}
        });

    }catch(err){
        dispatch({ type: 'ALERT', payload: { err: err.response.data.msg } })
    }
}
export const logout=()=>async (dispatch)=>{
    
    try{
        localStorage.removeItem('firstLogin')
        dispatch({type:'ALERT',payload:{loading:true}})
        await postDataAPI('logout');
        dispatch({type:'ALERT',payload:{}})
        window.location.href='/'


    }catch(err){
        dispatch({ type: 'ALERT', payload: { err: err.response.data.msg } })
    }
}








