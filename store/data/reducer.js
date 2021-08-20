import { SAVE_DATA, SET_LOADED, SET_TEXT } from "./actions";

const defaultState = {
    data: [],
    loaded: false,
    text: "",
};

export const dataReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SAVE_DATA:
            return { ...state, data: action.payload };
        case SET_LOADED:
            return { ...state, loaded: action.payload };        
        case SET_TEXT:
            return { ...state, text: action.payload };
        default:
            return state;
    }
};
