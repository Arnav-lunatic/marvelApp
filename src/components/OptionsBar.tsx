import { divider } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
	selectComicOptions,
	selectEventsOptions,
	selectSeriesOptions,
	selectStoriesOptions,
} from "../features/optionsSlice";

export default function OptionsBar() {
	const dispatch = useAppDispatch();
	const isLightMode = useAppSelector((state) => state.theme.lightMode)

	const isComicOptionSelected = useAppSelector(
		(state) => state.options.isComicsSelected
	);
	const isEventOptionSelected = useAppSelector(
		(state) => state.options.isEventsSelected
	);
	const isSeriesOptionSelected = useAppSelector(
		(state) => state.options.isSeriesSelected
	);
	const isStoriesOptionSelected = useAppSelector(
		(state) => state.options.isStoriesSelected
	);

	const options = [
		{
			option: "Comics",
			action: () => dispatch(selectComicOptions()),
			active: isComicOptionSelected,
		},
		{
			option: "Events",
			action: () => dispatch(selectEventsOptions()),
			active: isEventOptionSelected,
		},
		{
			option: "Series",
			action: () => dispatch(selectSeriesOptions()),
			active: isSeriesOptionSelected,
		},
		{
			option: "Stories",
			action: () => dispatch(selectStoriesOptions()),
			active: isStoriesOptionSelected,
		},
	];

	return (
		<div className={`backdrop-blur-sm sticky top-0 z-40 mx-1 ${!isLightMode ? 'bg-zinc-900': 'bg-zinc-200'} shadow-md rounded-md`}>
			<div className="flex items-center justify-between my-4 text-lg opacity-60 max-w-lg font-bold px-6 py-1">
				{options.map((eachOption, index) => {
					return (
						<button
							key={index}
							className={`rounded-lg px-2 ${
								eachOption.active
									? isLightMode ? 'bg-black':'bg-white'
									: ''
							} bg-opacity-30`}
							onClick={eachOption.action}
						>
							{eachOption.option}
						</button>
					);
				})}
			</div>
		</div>
	);
}
