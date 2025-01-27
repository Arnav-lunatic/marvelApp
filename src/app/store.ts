import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import loaderReducer from "../features/loadingSlice";
import optionsReducer from "../features/optionsSlice"

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		loader: loaderReducer,
		options: optionsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch