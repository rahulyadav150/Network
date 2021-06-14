import { Types } from '../Actions/globalTypes'

function modalReducer(state = false, action) {
    switch (action.type) {
        case Types.Modal:
            return action.payload
        default:
            return state;
    }
}
export default modalReducer;

