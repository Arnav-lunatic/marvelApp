import { useAppSelector } from "../app/hooks";
import EachSection from "./EachSection";
import OptionsBar from "./OptionsBar";

export default function HomePage() {
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

	return (
		<div className="w-full overflow-y-auto overflow-x-hidden h-full">
			<OptionsBar />

			{isComicOptionSelected && <EachSection sectionName="comics" />}

			{isEventOptionSelected && <EachSection sectionName="series" />}

			{isSeriesOptionSelected && <EachSection sectionName="events" />}

			{isStoriesOptionSelected && <EachSection sectionName="stories" />}
		</div>
	);
}
