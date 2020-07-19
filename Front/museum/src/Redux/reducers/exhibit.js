import { SET_EXHIBIT, GET_EXHIBIT_NOT_IN_EXPOSITION, RESET_STORE_EXHIBIT } from "../type";


const initialState = {
    items: []
}

const exhibit = (state = initialState, action) => {
    switch (action.type) {
        case GET_EXHIBIT_NOT_IN_EXPOSITION:
            return { ...state, items: action.payload }
        case RESET_STORE_EXHIBIT:
            return { ...state, items : initialState.items}
        default: return state;
    }
}


export default exhibit;