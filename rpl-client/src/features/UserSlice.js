import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : {
        name: "",
        email: "",
        role: "",
        status: "",
    },
    isAuth : false
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
     state.user = action.payload;
    state.isAuth = true;
},
    clearUser: () => initialState,
  },
});


export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;