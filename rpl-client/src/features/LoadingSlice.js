import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading : false
};

const LoadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
    startLoading: (state) => {
        return {
            ...state,
            isLoading: true
        };
    },
    stopLoading: (state) => {
        return {
            ...state,
            isLoading: false
        };
    }
}
});


export const {startLoading, stopLoading} = LoadingSlice.actions;
export default LoadingSlice.reducer;