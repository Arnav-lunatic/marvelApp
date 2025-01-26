import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ts, publicApiKey, hash } from "../config/constant";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import ComicSection from "./ComicSection";

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
	const [characterData, setCharacterData] = useState<ApiData[]>();
	const navigate = useNavigate();

	const params: params = {
		ts: ts,
		apikey: publicApiKey,
		hash: hash,
	};

	const fetchCharacterData = () => {
		let cancel;
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
					cancelToken: new axios.CancelToken(c => cancel = c)
				}
			)
			.then((response) => setCharacterData(response.data.data.results))
			.catch((error) => {
				navigate("/error");
				console.error("Error:", error);
			});
	};

	useEffect(() => {
		fetchCharacterData();
	}, [characterIdParams.get("id")]);

	return (
<<<<<<< HEAD
		<div className="w-full overflow-y-auto overflow-x-hidden h-full">
			{characterData && (
				<div className="w-full">
					<div className="flex gap-10 flex-col md:flex-row items-top ">
=======
		<div className="w-full">
			{characterData ? (
				<div>
					<div className="flex gap-10 flex-col md:flex-row items-top">
>>>>>>> parent of 408ad2d (create section for character's comics, events, series, stories)
						<Image
							isBlurred
							isZoomed
							alt="NextUI Album Cover"
							className="p-2 max-w-80"
							src={`${characterData[0].thumbnail.path}.${characterData[0].thumbnail.extension}`}
						/>

						<div className="text-left">
							<h1 className="text-3xl md:text-6xl mb-5 font-extrabold">
								{characterData[0].name}
							</h1>
							<p className="w-full">
								{characterData[0].description}
							</p>
						</div>
					</div>
					<ComicSection characterId={characterIdParams.get("id")||''} />
				</div>
<<<<<<< HEAD
			)}
=======
			) : ''}
>>>>>>> parent of 408ad2d (create section for character's comics, events, series, stories)
		</div>
	);
}
