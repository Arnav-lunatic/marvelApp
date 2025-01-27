import CharacterSection from "./components/CharacterSection";
import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"

function App() {

	return (
<<<<<<< HEAD
		<div className="flex m-auto gap-4 flex-col md:flex-row h-full md:h-[100dvh] max-w-[1680px] w-full relative pt-20 pb-2">
=======
		<div className="flex gap-4 flex-col md:flex-row h-full max-w-[1680px] w-full relative pt-20">
>>>>>>> parent of 408ad2d (create section for character's comics, events, series, stories)
			<Nav />
			<div className="flex-grow">
				<Outlet />
			</div>
			<div className="">
				<CharacterSection />
			</div>
			<Analytics/>
		</div>
	);
}

export default App;
