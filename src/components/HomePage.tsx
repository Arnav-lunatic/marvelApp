import React from "react";
import CharacterSection from "./CharacterSection";
import ComicSection from "./ComicSection";

function HomePage() {
	return (
		<div className="flex gap-4 flex-col-reverse md:flex-row	h-full">
			<div className="flex-grow">
				<ComicSection />
			</div>
			<CharacterSection />
		</div>
	);
}

export default HomePage;
