import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ts, publicApiKey, hash } from "../config/constant";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import EachSection from "./EachSection";
import { setIsLoading } from "../features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import OptionsBar from "./OptionsBar";

interface params {
	ts: number;
	apikey: string;
	hash: string;
}

interface ApiData {
	name: string;
	description: string;
	thumbnail: {
		path: string;
		extension: string;
	};
}

export default function CharacterPage() {
	const [characterIdParams] = useSearchParams();
	const [characterData, setCharacterData] = useState<ApiData>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

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

	const params: params = {
		ts: ts,
		apikey: publicApiKey,
		hash: hash,
	};

	useEffect(() => {
		dispatch(setIsLoading(true));
	}, []);

	const fetchCharacterData = () => {
		axios
			.get(
				`https://gateway.marvel.com/v1/public/characters/${characterIdParams.get(
					"id"
				)}`,
				{
					params,
					headers: {
						Accept: "*/*",
					},
				}
			)
			.then((response) => {
				setCharacterData(response.data.data.results[0]);
			})
			.catch((error) => {
				navigate("/error");
				console.error("Error:", error);
			})
			.finally(() => dispatch(setIsLoading(false)));
	};
	useEffect(() => {
		fetchCharacterData();
	}, [characterIdParams.get("id")]);

	return (
		<div className="w-full overflow-y-auto overflow-x-hidden h-full">
			{characterData ? (
				<div className="w-full">
					<div className="flex gap-10 flex-col md:flex-row items-top ">
						<Image
							isBlurred
							isZoomed
							className="p-2 max-w-64"
							src={`${characterData.thumbnail.path}.${characterData.thumbnail.extension}`}
						/>

						<div className="text-left">
							<h1 className="text-3xl md:text-6xl mb-5 font-extrabold">
								{characterData.name}
							</h1>
							<p className="w-full">
								{characterData.description}
							</p>
						</div>
					</div>
					<OptionsBar />

					{isComicOptionSelected && (
						<EachSection
							characterId={characterIdParams.get("id") || ""}
							sectionName="comics"
						/>
					)}

					{isEventOptionSelected && (
						<EachSection
							characterId={characterIdParams.get("id") || ""}
							sectionName="series"
						/>
					)}

					{isSeriesOptionSelected && (
						<EachSection
							characterId={characterIdParams.get("id") || ""}
							sectionName="events"
						/>
					)}

					{isStoriesOptionSelected && (
						<EachSection
							characterId={characterIdParams.get("id") || ""}
							sectionName="stories"
						/>
					)}

				</div>
			) : (
				""
			)}
		</div>
	);
}
