import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	lightMode: false,
};

export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		switchTheme: (state) => {
			state.lightMode = !state.lightMode;
		},
	},
});

export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
