import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface loadingState {
	isLoading : boolean
}

const initialState : loadingState = {
	isLoading: true,
};

export const loaderSlice = createSlice({
	name: "loader",
	initialState,
	reducers: {
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
	},
});

export const { setIsLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
