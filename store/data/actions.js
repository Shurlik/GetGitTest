export const SAVE_DATA = "SAVE_DATA";
export const SET_LOADED = "SET_LOADED";
export const SET_TEXT ="SET_TEXT"

export const saveData = (data) => {
    return {
        type: SAVE_DATA,
        payload: data,
    };
};

export const setLoaded = (loaded) => {
    return {
        type: SET_LOADED,
        payload: loaded,
    };
};
export const setText = (text) => {
    return {
        type: SET_TEXT,
        payload: text,
    };
};
