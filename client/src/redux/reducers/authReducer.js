
import { Types } from '../Actions/globalTypes'
const initialState = {}
function authReducer(state = initialState, action) {
    switch (action.type) {
        case Types.Auth:
            return action.payload
        default:
            return state;
    }
}
export default authReducer;