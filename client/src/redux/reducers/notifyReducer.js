import { Types } from '../Actions/globalTypes'
const initialState = {}
function notifyReducer(state = initialState, action) {
    switch (action.type) {
        case Types.Alert:
            return action.payload
        default:
            return state;
    }
}
export default notifyReducer;