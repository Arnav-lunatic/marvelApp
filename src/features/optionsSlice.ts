import { createSlice } from "@reduxjs/toolkit";

interface optionsState {
    isComicsSelected: boolean
	isEventsSelected: boolean
	isSeriesSelected: boolean
	isStoriesSelected: boolean
}

const initialState : optionsState = {
    isComicsSelected: true,
	isEventsSelected: false,
	isSeriesSelected: false,
	isStoriesSelected: false
};

export const optionsSlice = createSlice({
	name: "options",
	initialState,
	reducers: {
		selectComicOptions: (state)=> {
			state.isComicsSelected = true
			state.isEventsSelected = false
			state.isSeriesSelected = false
			state.isStoriesSelected = false
		},
		selectEventsOptions: (state)=> {
			state.isComicsSelected = false
			state.isEventsSelected = true
			state.isSeriesSelected = false
			state.isStoriesSelected = false
		},
		selectSeriesOptions: (state) => {
			state.isComicsSelected = false
			state.isEventsSelected = false
			state.isSeriesSelected = true
			state.isStoriesSelected = false
		},
		selectStoriesOptions: (state) => {
			state.isComicsSelected = false
			state.isEventsSelected = false
			state.isSeriesSelected = false
			state.isStoriesSelected = true
		}
	},
});

export const { selectComicOptions, selectEventsOptions, selectSeriesOptions, selectStoriesOptions } = optionsSlice.actions;

export default optionsSlice.reducer;
