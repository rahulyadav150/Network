
import { getDataAPI, patchDataAPI } from "../../utils/fetchdata"
import { imageUpload } from '../../utils/imageUpload'
import { Types } from './globalTypes'

export const profileTypes = {
    Loading: 'LOADING',
    GetUsers: "GET_USERS",
    Follow: 'FOLLOW',
    UnFollow: 'UNFOLLOW',
    GetId : 'GET_ID',
    GetUserPosts :'GET_USER_POSTS',
    UpdateUserPosts: 'UPDATE_USER_POSTS',
    DeleteUserPost : 'DELETE_USER_POST'

}

export const getProfileUsers = ({ users, id, Auth }) => async (dispatch) => {
      dispatch({type:profileTypes.GetId,payload:id})
        try {
            dispatch({ type: profileTypes.Loading, payload: true })

            const user = await getDataAPI(`user/${id}`, Auth.token)
            const posts = await getDataAPI(`user_post/${id}`,Auth.token)
            
            dispatch({ type: 'GET_USERS', payload: user.data })
            dispatch({ type: profileTypes.GetUserPosts, payload: {...posts.data,_id:id,page:2 }})
            dispatch({ type: profileTypes.Loading, payload: false })

        } catch (err) {
            dispatch({ type: 'ALERT', payload: { err: err.response.data.msg } })
        }
    

}

export const updateProfileUser = ({ updatedData, avatar, Auth }) => async (dispatch) => {
    try {
        if (!updatedData.fullName) return dispatch({ type: 'ALERT', payload: { err: 'Please add Full Name.' } })

        if (updatedData.fullName.length > 25) return dispatch({ type: 'ALERT', payload: { err: 'your Full Name is too long' } })

        if (updatedData.story.length > 200) return dispatch({ type: 'ALERT', payload: { err: 'your Story is too long' } })


        let media;

        dispatch({ type: 'ALERT', payload: { loading: true } })
        if (avatar) media = await imageUpload([avatar])

        const res = await patchDataAPI('user', {
            ...updatedData,
            avatar: avatar ? media[0].url : Auth.user.avatar
        }, Auth.token)

        console.log(res)
        dispatch({ type: 'ALERT', payload: { loading: false } })
        dispatch({ type: 'AUTH', payload: { ...Auth, user: { ...Auth.user, ...updatedData, avatar: avatar ? media[0].url : Auth.user.avatar } } })


        dispatch({ type: 'ALERT', payload: { success: res.data.msg } })



    } catch (err) {
        console.log(err.data)
        dispatch({ type: 'ALERT', payload: { err: err.message } })
    }

}

export const follow = ({ user, Auth }) => async (dispatch) => {

    let newUser = { ...user, follower: [...user.follower, Auth.user] }
    dispatch({ type: profileTypes.Follow, payload: newUser })

    dispatch({
        type: Types.Auth, payload: {
            ...Auth,
            user: { ...Auth.user, following: [...Auth.user.following, user] }
        }
    })

    try {

        await patchDataAPI(`user/${user._id}/follow`, null, Auth.token)


    } catch (err) {
        dispatch({ type: 'ALERT', payload: { err: err.message } })
    }

}


export const UnFollow = ({ user, Auth }) => async (dispatch) => {

    let newUser = { ...user, follower: user.follower.filter(item => item._id !== Auth.user._id) }
    dispatch({ type: profileTypes.UnFollow, payload: newUser })

    dispatch({
        type: Types.Auth, payload: {
            ...Auth,
            user: { ...Auth.user, following: Auth.user.following.filter(item => item._id !== user._id) }
        }
    })

    try {
        await patchDataAPI(`user/${user._id}/unfollow`, null, Auth.token)

    } catch (err) {
        dispatch({ type: 'ALERT', payload: { err: err.message } })
    }

}