import { createSlice } from "@reduxjs/toolkit";

const SidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isOpen: false,
    },
    reducers: {
        openSidebar: (state) => {
            state.isOpen = true;
        },
        closeSidebar: (state) => {
            state.isOpen = false;
        },
    },
});


export const {openSidebar, closeSidebar} = SidebarSlice.actions;
export default SidebarSlice.reducer;