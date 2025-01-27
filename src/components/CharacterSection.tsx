import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import CharacterCard from "./CharacterCard";
import { IoIosArrowDown } from "react-icons/io";
import { ts, publicApiKey, hash } from "../config/constant";
import { Spinner } from "@nextui-org/react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";

interface params {
	ts: number;
	apikey: string;
	hash: string;
	orderBy: string;
	nameStartsWith?: string;
}

const CharacterSection: React.FC = () => {
	const isLightMode = useAppSelector((state) => state.theme.lightMode);
	const navigate = useNavigate();

	const [characterData, setCharacterData] = useState<object | void>();
	const [characterSearchQuery, setCharacterSearchQuery] = useState("");
	const [debouncedCharacterSearchQuery, setDebouncedCharacterSearchQuery] =
		useState("");

	const [orderBy, setOrderBy] = useState("modified");
	const [isAscendingOrder, setIsAscendingOrder] = useState(true);

	const params: params = {
		ts: ts,
		apikey: publicApiKey,
		hash: hash,
		orderBy: orderBy,
	};

	const fetchCharacterData = () => {
		let cancel
		axios
			.get("https://gateway.marvel.com/v1/public/characters", {
				params,
				headers: {
					Accept: "*/*",
				},
				cancelToken: new axios.CancelToken(c => cancel = c)
			})
			.then((response) => setCharacterData(response.data.data.results))
			.catch((error) => {
				navigate("/error");
				console.error("Error:", error);
			});
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedCharacterSearchQuery(characterSearchQuery);
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, [characterSearchQuery]);

	if (characterSearchQuery)
		params.nameStartsWith = debouncedCharacterSearchQuery;

	useEffect(() => {
		setCharacterData();
		fetchCharacterData();
	}, [debouncedCharacterSearchQuery, orderBy]);

	const handleOrder = () => {
		setIsAscendingOrder(!isAscendingOrder);
		if (isAscendingOrder) {
			setOrderBy("-" + orderBy);
		} else {
			setOrderBy(
				orderBy === "name" || orderBy === "-name" ? "name" : "modified"
			);
		}
	};

	// =======================++++ Character View More ++++======================== //
	const [eachCharacterInfo, setEachCharacterInfo] = useState<{
		name: string;
		image: string;
		description: string;
	}>({ name: "", image: "", description: "" });

	const [characterIdParams, setCharacterParams] = useSearchParams();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [characterId, setCharacterId] = useState<string>(
		characterIdParams.get("id") || ""
	);

	const handleClick = (
		name: string,
		image: string,
		description: string,
		characterId: string
	) => {
		setEachCharacterInfo({
			name: name,
			image: image,
			description: description,
		});
		setCharacterId(characterId);
		onOpen();
	};

	const goToCharacterPage = () => {
		navigate(`/character?id=${characterId}`);
		setCharacterParams({ id: characterId });
	};

	// Functional Component from NextUI
	// ============================= //
	const CharacterViewMore = () => {
		return (
			<>
				<Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
					<ModalContent
						className={` ${
							isLightMode ? "bg-zinc-300" : "bg-zinc-800"
						} overflow-auto`}
					>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1">
									{eachCharacterInfo.name}
								</ModalHeader>
								<img
									className="mx-6"
									src={eachCharacterInfo.image}
									alt="Not Found"
								/>
								<ModalBody>
									{eachCharacterInfo.description}
								</ModalBody>
								<ModalFooter>
									<Button
										color="danger"
										variant="light"
										onPress={onClose}
									>
										Close
									</Button>
									<Button
										color="primary"
										onPress={() => {
											onClose();
											goToCharacterPage();
										}}
									>
										Visit
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</>
		);
	};

	return (
		<div className=" w-full md:w-96 overflow-auto h-auto md:overflow-y-scroll md:h-[85dvh] bg-black bg-opacity-20 backdrop-blur-lg rounded-lg z-50 p-4">
			<CharacterViewMore />

			<SearchBar
				searchQuery={characterSearchQuery}
				setSearchQuery={setCharacterSearchQuery}
			/>

			{/* Order By */}
			<div className="flex items-center justify-between my-2 text-sm opacity-60">
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
						setIsAscendingOrder(true);
						setOrderBy("name");
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
						setIsAscendingOrder(true);
						setOrderBy("modified");
					}}
				>
					Modified
				</span>
				<span
					onClick={handleOrder}
					className="flex items-center gap-1 cursor-pointer"
				>
					{isAscendingOrder ? "\u00A0Ascending" : "Descending"}
					<IoIosArrowDown
						className={`${
							isAscendingOrder ? "" : "-rotate-180"
						} transition-all`}
					/>
				</span>
			</div>

			{characterData ? (
				<div className="grid gap-4 mt-4 grid-cols-2 m-auto">
					{Object.values(characterData).map((eachCharac, index) => {
						return (
							<CharacterCard
								key={index}
								characImg={
									eachCharac.thumbnail.path +
									"." +
									eachCharac.thumbnail.extension
								}
								characName={eachCharac.name}
								handleAction={() =>
									handleClick(
										eachCharac.name,
										`${eachCharac.thumbnail.path}.${eachCharac.thumbnail.extension}`,
										eachCharac.description,
										eachCharac.id
									)
								}
							/>
						);
					})}
				</div>
			) : (
				<Spinner color="danger" size="lg" className="m-auto w-full" />
			)}
		</div>
	);
};

export default CharacterSection;
