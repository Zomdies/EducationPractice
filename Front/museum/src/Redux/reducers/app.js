const { SHOW_LOADER,HIDE_LOADER } = require("../type");

const initialState = {
    loading: false
}


const app = (state = initialState, action) => {

    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true }
        case HIDE_LOADER:
            return { ...state, loading: false }
        default:
            return state;
    }
};

export default app;