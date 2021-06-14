import { Types } from '../Actions/globalTypes'
const initialState = false;
function themeReducer(state = initialState, action) {
    switch (action.type) {
        case Types.Theme:
            return action.payload
        default:
            return state;
    }
}
export default themeReducer;