import { act } from "react-dom/test-utils";

const { SHOW_LOADER, SET_TOKEN,   SHOW_TOKEN_VERIFICATION,
        HIDE_LOADER, CHECK_TOKEN ,HIDE_TOKEN_VERIFICATION } = require("../type");

const initialState = {
    loading: false,
    token_verification : true,
    token : undefined
}


const app = (state = initialState, action) => {

    switch (action.type) {
        case SET_TOKEN:
            return { ...state, token : action.payload}
        case CHECK_TOKEN :
            return { ...state, token : action.payload}
        case SHOW_TOKEN_VERIFICATION :
            return {...state, token_verification :  true}
            case HIDE_TOKEN_VERIFICATION :
            return {...state, token_verification : false}
        case SHOW_LOADER:
            return { ...state, loading: true }
        case HIDE_LOADER:
            return { ...state, loading: false }
        default:
            return state;
    }
};

export default app;