import {SET_EXPOSITION, UPDATE_EXPOSITION, ADD_EXPOSITION, DELETE_EXPOSITION, SET_EXHIBIT_IN_EXPOSITION} from '../type'

export const  SetExposition = (items) => ({
    type : SET_EXPOSITION,
    payload : items
});
export const  SetExhibitInExposition = (items) => ({
    type : SET_EXHIBIT_IN_EXPOSITION,
    payload : items
});
export const AddExposition = (item) => ({
    type : ADD_EXPOSITION,
    payload : item
})
export const UpdateExposition = (item) => ({
    type : UPDATE_EXPOSITION,
    payload : item
});
export const DeleteExposition = (item) => ({
    type : DELETE_EXPOSITION,
    payload : item
});