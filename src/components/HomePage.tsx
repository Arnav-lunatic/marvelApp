import React, { useState, useEffect } from "react";
import axios from "axios";
import { ts, publicApiKey, hash } from "../config/constant";

export default function ComicSection() {

	const [characterData, setCharacterData] = useState("");

	// useEffect(() => {
	// 	axios
	// 		.get("https://gateway.marvel.com/v1/public/comics", {
	// 			params: {
	// 				ts: ts,
	// 				apikey: publicApiKey,
	// 				hash: hash,
	// 			},
	// 			headers: {
	// 				Accept: "*/*",
	// 			},
	// 		})
	// 		.then((response) => setCharacterData(response.data))
	// 		.catch((error) => console.error("Error:", error));
	// }, []);

	return (
		<div>
			<h1 className="text-3xl font-extrabold">Comics</h1>
		</div>
	);
}
