import CharacterSection from "./components/CharacterSection";
import LoadingIndicator from "./components/LoadingIndicator"
import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"

function App() {

	return (
		<div className="flex m-auto gap-4 flex-col md:flex-row h-full md:h-[100dvh] max-w-[1680px] w-full relative pt-20 pb-2">
			<Nav />
			<LoadingIndicator />
			<div className="flex-grow">
				<Outlet />
			</div>
			<div className="w-full h-full m-auto max-w-xl md:max-w-sm">
				<CharacterSection />
			</div>
			<Analytics/>
		</div>
	);
}

export default App;
