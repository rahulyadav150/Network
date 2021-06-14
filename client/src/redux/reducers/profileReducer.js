import { profileTypes } from '../Actions/profileAction'

const initiaState = {
    loading: false,
    ids:[],
    users: [],
    userPosts: []
}
const profileReducer = (state = initiaState, action) => {
    switch (action.type) {
        case profileTypes.Loading:
            return {
                ...state,
                loading: action.payload
            }

        case profileTypes.GetUsers:
            return {
                ...state,
                users: [...state.users, action.payload.user]
            }

        case profileTypes.Follow:
            return {
                ...state,
                users: state.users.map(user => user._id === action.payload._id ? action.payload : user)
            }
        case profileTypes.UnFollow:
            return {
                ...state,
                users: state.users.map(user => user._id === action.payload._id ? action.payload : user)
            }
        case profileTypes.GetId:
            return {
                ...state,
                ids : [...state.ids,action.payload]
            }
        case profileTypes.GetUserPosts:
                return {
                    ...state,
                    userPosts: [...state.userPosts,action.payload]
                }
        case profileTypes.UpdateUserPosts :
            state.userPosts.map((user,index) =>{ 
            if(user._id===action.payload._id)
              {action.payload.posts = [...user.posts,...action.payload.posts]
               action.payload.result = user.result + action.payload.result
               state.userPosts[index] = action.payload
              }
              return state.userPosts
            }
            )
            return {
                ...state,
                userPosts : [...state.userPosts]
            }
     
         default:
            return state
    }
}

export default profileReducer