import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: "",
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
        }
    }
})

export const {setSearch} = projectSlice.actions;
export default projectSlice.reducer;