import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import loaderReducer from "../features/loadingSlice";


export const store = configureStore({
	reducer: {
		theme: themeReducer,
		loader: loaderReducer
	},
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch