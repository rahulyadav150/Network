import { combineReducers } from 'redux'
import auth from './authReducer'
import notify from './notifyReducer'
import theme from './themeReducer'
import profileReducer from './profileReducer'
import statusReducer from './statusReducer'
import postReducer from './postReducer'
import modalReducer from './modalReducer'
import detailPostReducer from './detailPostReducer'
import discover from './discoverReducer'
import suggestionReducer from './suggestionReducer'


export default combineReducers({
    Auth: auth,
    Alert: notify,
    Theme: theme,
    Profile: profileReducer,
    Status:statusReducer,
    HomePosts : postReducer,
    Modal : modalReducer,
    DetailPost : detailPostReducer,
    Discover:discover,
    Suggestion : suggestionReducer

})
