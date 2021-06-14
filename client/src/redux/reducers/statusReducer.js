import { Types } from '../Actions/globalTypes'

function statusReducer(state = false, action) {
    switch (action.type) {
        case Types.Status:
            return action.payload
        default:
            return state;
    }
}
export default statusReducer;