import { useEffect, useState } from "react";
import { ts, publicApiKey, hash } from "../config/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Card, CardHeader, CardBody, Image, Skeleton } from "@heroui/react";
import InfiniteScroll from "react-infinite-scroll-component";

interface section {
	title: string;
	modified: string;
	thumbnail: {
		path: string;
		extension: string;
	};
	prices: [
		{
			price?: string;
		}
	];
}

export default function EachSection({
	characterId,
	sectionName,
}: {
	characterId?: string;
	sectionName: string;
}) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isLightMode = useAppSelector((state) => state.theme.lightMode);

	const [sectionData, setSectionData] = useState<section[]>([]);
	const [fetchDataLength, setFetchDataLength] = useState(8);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		axios
			.get(
				`https://gateway.marvel.com/v1/public/characters/${characterId}/${sectionName}`,
				{
					params: {
						ts: ts,
						apikey: publicApiKey,
						hash: hash,
						limit: 8,
					},
					headers: {
						Accept: "*/*",
					},
				}
			)
			.then((response) => {
				setSectionData(response.data.data.results);
			})
			.catch((error) => {
				navigate("/error");
				console.error("Error:", error);
			})
			.finally(() => dispatch(setIsLoading(false)));
	}, [characterId]);

	const nextFetchCharacterData = () => {
		axios
			.get(
				`https://gateway.marvel.com/v1/public/characters/${characterId}/${sectionName}`,
				{
					params: {
						ts: ts,
						apikey: publicApiKey,
						hash: hash,
						offset: fetchDataLength,
						limit: 8,
					},
					headers: {
						Accept: "*/*",
					},
				}
			)
			.then((response) => {
				setSectionData((prevData) => [
					...prevData,
					...response.data.data.results,
				]);
				response.data.data.results.length > 0
					? setHasMore(true)
					: setHasMore(false);
				console.log(response.data.data.results.length);
			})
			.catch((error) => {
				navigate("/error");
				console.error("Error:", error);
			});
		setFetchDataLength((fetchDataLength) => fetchDataLength + 8);
	};

	const numberOfLoaderElement = [1, 2, 3, 4, 5, 6, 7, 8];
	const Loader = () => {
		return (
			<div className="grid items-end grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
				{numberOfLoaderElement.map((elem) => {
					return (
						<Card
							key={elem}
							className={`w-68 sm:w-full mx-2 p-2 ${
								isLightMode ? "" : "dark"
							}`}
							radius="lg"
						>
							<div className="space-y-3">
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200" />
								</Skeleton>
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200" />
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300" />
								</Skeleton>
							</div>
							<Skeleton className="rounded-lg mt-2">
								<div className="h-96 rounded-lg bg-default-300" />
							</Skeleton>
						</Card>
					);
				})}
			</div>
		);
	};

	return (
		<>
			<InfiniteScroll
				dataLength={sectionData.length}
				next={nextFetchCharacterData}
				hasMore={true}
				loader={<Loader />}
			>
				<div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
					{sectionData &&
						sectionData.map((comic, index) => {
							return (
								<div key={index}>
									<Card
										className={`w-68 sm:w-full mx-2 ${
											isLightMode ? "" : "dark"
										}`}
									>
										<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
											<h4 className="font-bold text-large">
												{comic.title}
											</h4>
											<p className="text-tiny uppercase font-bold">
												{comic.modified}
											</p>

											{comic.prices && (
												<small className="text-default-500">
													price: $
													{comic.prices[0]?.price}
												</small>
											)}
										</CardHeader>
										<CardBody className="overflow-visible py-2">
											<Image
												alt="Card background"
												className="object-cover rounded-xl"
												src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
												height={420}
												width={270}
											/>
										</CardBody>
									</Card>
								</div>
							);
						})}
				</div>
			</InfiniteScroll>
		</>
	);
}

import { useEffect, useState } from "react";
import { ts, publicApiKey, hash } from "../config/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Card, CardHeader, CardBody, Image, Skeleton } from "@heroui/react";
import InfiniteScroll from "react-infinite-scroll-component";

interface params {
	ts: number;
	apikey: string;
	hash: string;
	offset: Number;
	limit: Number;
}

interface section {
	title: string;
	modified: string;
	thumbnail: {
		path: string;
		extension: string;
	};
	prices: [
		{
			price?: string;
		}
	];
}

export default function EachSection({
	characterId,
	sectionName,
}: {
	characterId?: string;
	sectionName: string;
}) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isLightMode = useAppSelector((state) => state.theme.lightMode);

	const [sectionData, setSectionData] = useState<section[]>([]);
	const [fetchDataLength, setFetchDataLength] = useState(8);
	const [hasMore, setHasMore] = useState(true);

	const params: params = {
		ts: ts,
		apikey: publicApiKey,
		hash: hash,
		offset: 0,
		limit: 8,
	};

	useEffect(() => {
		axios
			.get(
				`https://gateway.marvel.com/v1/public/characters/${characterId}/${sectionName}`,
				{
					params: {
						ts: ts,
						apikey: publicApiKey,
						hash: hash,
						limit: 8,
					},
					headers: {
						Accept: "*/*",
					},
				}
			)
			.then((response) => {
				setSectionData(response.data.data.results);
			})
			.catch((error) => {
				navigate("/error");
				console.error("Error:", error);
			})
			.finally(() => dispatch(setIsLoading(false)));
	}, []);

	const nextFetchCharacterData = () => {
		params.offset = fetchDataLength;
		axios
			.get(
				`https://gateway.marvel.com/v1/public/characters/${characterId}/${sectionName}`,
				{
					params,
					headers: {
						Accept: "*/*",
					},
				}
			)
			.then((response) => {
				setSectionData((prevData) => [
					...prevData,
					...response.data.data.results,
				]);
				response.data.data.results.length > 0
					? setHasMore(true)
					: setHasMore(false);
			})
			.catch((error) => {
				navigate("/error");
				console.error("Error:", error);
			});
	};

	useEffect(() => {
		nextFetchCharacterData();
	}, []);

	const numberOfLoaderElement = [1, 2, 3, 4, 5, 6, 7, 8];
	const Loader = () => {
		return (
			<div className="grid items-end grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
				{numberOfLoaderElement.map((elem) => {
					return (
						<Card
							key={elem}
							className={`w-68 sm:w-full mx-2 p-2 ${
								isLightMode ? "" : "dark"
							}`}
							radius="lg"
						>
							<div className="space-y-3">
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200" />
								</Skeleton>
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200" />
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300" />
								</Skeleton>
							</div>
							<Skeleton className="rounded-lg mt-2">
								<div className="h-96 rounded-lg bg-default-300" />
							</Skeleton>
						</Card>
					);
				})}
			</div>
		);
	};

	return (
		<InfiniteScroll
			dataLength={sectionData.length}
			next={() => {
				setFetchDataLength((fetchDataLength) => fetchDataLength + 8);
			}}
			hasMore={hasMore}
			loader={<Loader />}
		>
			<div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
				{sectionData &&
					sectionData.map((comic, index) => {
						return (
							<div key={index}>
								<Card
									className={`w-68 sm:w-full mx-2 ${
										isLightMode ? "" : "dark"
									}`}
								>
									<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
										<h4 className="font-bold text-large">
											{comic.title}
										</h4>
										<p className="text-tiny uppercase font-bold">
											{comic.modified}
										</p>

										{comic.prices && (
											<small className="text-default-500">
												price: ${comic.prices[0]?.price}
											</small>
										)}
									</CardHeader>
									<CardBody className="overflow-visible py-2">
										<Image
											alt="Card background"
											className="object-cover rounded-xl"
											src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
											height={420}
											width={270}
										/>
									</CardBody>
								</Card>
							</div>
						);
					})}
			</div>
		</InfiniteScroll>
	);
}
