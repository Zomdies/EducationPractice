import { SHOW_LOADER, HIDE_LOADER, SET_TOKEN, CHECK_TOKEN, SHOW_TOKEN_VERIFICATION, HIDE_TOKEN_VERIFICATION } from "../type";
import { server_url } from "../../config";

export const showLoader = () => ({
    type: SHOW_LOADER
})

export const hideLoader = () => ({
    type: HIDE_LOADER
})

export const setToken = (token) => ({
    type: SET_TOKEN,
    payload: token
})

export const showTokenVerification = () =>({
    type : SHOW_TOKEN_VERIFICATION
})
export const hideTokenVerification = () =>({
    type : HIDE_TOKEN_VERIFICATION
})

export const checkToken = (token) => {
    return async (dispatch) => {
        dispatch({
            type: SHOW_TOKEN_VERIFICATION
        })
        let responce = await fetch(`${server_url}/tokenLive`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            });
        let parseJSON = await responce.json();
        if (parseJSON.message === "Token is active") {
            dispatch({
                type: CHECK_TOKEN,
                payload: token
            });
        } else {
            dispatch({
                type: CHECK_TOKEN,
                payload: null
            });
        }
        dispatch({
            type: HIDE_TOKEN_VERIFICATION
        })
    }
}