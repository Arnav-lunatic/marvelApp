import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import CharacterCard from "./CharacterCard";
import { IoIosArrowDown } from "react-icons/io";
import { ts, publicApiKey, hash } from "../config/constant";
import { Spinner } from "@nextui-org/react";
import { useSelector } from "react-redux";

export default function CharacterSection() {
	const isLightMode = useSelector((state) => state.theme.lightMode);
	const [characterData, setCharacterData] = useState();
	const [characterSearchQuery, setCharacterSearchQuery] = useState("");
	const [debouncedCharacterSearchQuery, setDebouncedCharacterSearchQuery] =
		useState("");

	const [orderBy, setOrderBy] = useState("name");
	const [isAscendingOrder, setIsAscendingOrder] = useState(true)

	const params = {
		ts: ts,
		apikey: publicApiKey,
		hash: hash,
		orderBy: orderBy,
	};

	const fetchCharacterData = () => {
		axios
			.get("https://gateway.marvel.com/v1/public/characters", {
				params,
				headers: {
					Accept: "*/*",
				},
			})
			.then((response) => setCharacterData(response.data))
			.catch((error) => console.error("Error:", error));
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedCharacterSearchQuery(characterSearchQuery);
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [characterSearchQuery]);

	if (characterSearchQuery)
		params.nameStartsWith = debouncedCharacterSearchQuery;

	useEffect(() => {
		setCharacterData()
		fetchCharacterData();
	}, [debouncedCharacterSearchQuery, orderBy]);

	const handleOrder = () => {
		setIsAscendingOrder(!isAscendingOrder)
		if (isAscendingOrder) {
			setOrderBy("-" + orderBy)
		} else {
			setOrderBy( orderBy === "name" || orderBy === "-name"? 'name': 'modified')
		}
	}

	return (
		<div className="w-full md:w-96 overflow-auto h-auto md:overflow-y-scroll md:h-full">
			<SearchBar
				searchQuery={characterSearchQuery}
				setSearchQuery={setCharacterSearchQuery}
			/>

			{/* Order By */}
			<div className="flex  items-center justify-between mt-2 text-sm opacity-60">
				<span>Order By-</span>
				<span
					className={`rounded-lg px-1 ${
						orderBy === "name" || orderBy === "-name"
							? isLightMode
								? "bg-black border-white"
								: "bg-white border-black"
							: ""
						} bg-opacity-30 cursor-pointer `}
					onClick={() => {
						setIsAscendingOrder(true)
						setOrderBy("name")
					}}
				>
					Name
				</span>
				<span
					className={`rounded-lg px-1 ${
						orderBy === "modified" || orderBy === "-modified"
							? isLightMode
								? "bg-black border-white"
								: "bg-white border-black"
							: ""
						} bg-opacity-30 cursor-pointer `}
					onClick={() => {
						setIsAscendingOrder(true)
						setOrderBy("modified")
					}}
				>
					Modified
				</span>
				<span
					onClick={handleOrder}
					className="flex items-center gap-1 cursor-pointer">
					{isAscendingOrder ? '\u00A0Ascending' : 'Descending'}
					<IoIosArrowDown className={`${isAscendingOrder ? '' :'-rotate-180'} transition-all`} />
				</span>
			</div>

			{characterData ? (
				<div className="grid gap-4 mt-4 grid-cols-2 m-auto">
					{characterData.data.results.map((eachCharac, index) => {
						return (
							<CharacterCard
								key={index}
								characImg={
									eachCharac.thumbnail.path +
									"." +
									eachCharac.thumbnail.extension
								}
								characName={eachCharac.name}
							/>
						);
					})}
				</div>
			) : (
				<Spinner color="danger" size="lg" className="my-16" />
			)}
		</div>
	);
}
