import { createSlice } from "@reduxjs/toolkit";

interface themeState {
	lightMode : boolean
}

const initialState : themeState = {
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
