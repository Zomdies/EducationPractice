import { SET_EXHIBIT, ADD_EXHIBIT, DELETE_EXHIBIT, UPDATE_EXHIBIT, GET_EXHIBIT_NOT_IN_EXPOSITION, RESET_STORE_EXHIBIT } from "../type";
import { server_url } from "../../config";
import { showLoader, hideLoader } from "./app";

export const SetExhibit = (items) => ({
    type: SET_EXHIBIT,
    payload: items
});

export const AddExhibit = (items) => ({
    type: ADD_EXHIBIT,
    payload: items
});

export const  DeleteExhibit = (items) => ({
    type: DELETE_EXHIBIT,
    payload: items
});
export const  UpdateExhibit = (items) => ({
    type: UPDATE_EXHIBIT,
    payload: items
});
export const GetExhibitNotExposition = (id) => {
    return async (dispatch) => {
        dispatch(showLoader())
        const responce = await fetch(`${server_url}/exhibit/${id}`);
        const parseJSON = await responce.json();
        dispatch({
            type: GET_EXHIBIT_NOT_IN_EXPOSITION,
            payload: parseJSON
        })
        dispatch(hideLoader());

    }
}
export const ResetStoreExhibit = () => ({
    type: RESET_STORE_EXHIBIT
});