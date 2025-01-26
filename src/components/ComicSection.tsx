import { useState } from "react";
import { ts, publicApiKey, hash } from "../config/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../features/loadingSlice";
import { useAppDispatch } from "../app/hooks";

interface params {
	ts: number;
	apikey: string;
	hash: string;
}

interface props {
	characterId: string;
}

export default function ComicSection({ characterId }: props) {
	const navigate = useNavigate();
	const [comicData, setComicData] = useState();
	const dispatch = useAppDispatch()

	const params: params = {
		ts: ts,
		apikey: publicApiKey,
		hash: hash,
	};

	const fetchCharacterData = () => {
		dispatch(setIsLoading(true))
		axios
			.get(
				`https://gateway.marvel.com/v1/public/characters/${characterId}/comics`,
				{
					params,
					headers: {
						Accept: "*/*",
					},
				}
			)
			.then((response) => {
				setComicData(response.data.data.results);
			})
			.catch((error) => {
				navigate("/error");
				console.error("Error:", error);
			});
	};

	fetchCharacterData();

	return (
		<div>
			{
				comicData ? '' : ''
			}
		</div>
	);
}
