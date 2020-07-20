import { SET_EXHIBIT, ADD_EXHIBIT, DELETE_EXHIBIT, UPDATE_EXHIBIT, GET_EXHIBIT_NOT_IN_EXPOSITION, RESET_STORE_EXHIBIT } from "../type";


const initialState = {
    items: []
}

const exhibit = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXHIBIT:
            return { ...state, items: action.payload }
        case ADD_EXHIBIT:
            return { ...state, items: state.items.concat(action.payload) }
        case UPDATE_EXHIBIT:
            return {
                ...state, items: state.items.map(item => {
                    if (item._id !== action.payload._id) {
                        return item
                    }
                    else {
                        return action.payload
                    }
                })
            }
        case DELETE_EXHIBIT:
            return { ...state, items: state.items.filter(item => item._id !== action.payload._id) }
        case GET_EXHIBIT_NOT_IN_EXPOSITION:
            return { ...state, items: action.payload }
        case RESET_STORE_EXHIBIT:
            return { ...state, items: initialState.items }
        default: return state;
    }
}


export default exhibit;