import "./App.css";
import Nav from "./components/Nav";
import CharacterSection from "./components/CharacterSection";
import ComicSection from "./components/ComicSection";


function App() {

	return (
		<div className="relative h-auto md:h-[90dvh]">
			<Nav />
			<div className="flex gap-4 flex-col-reverse md:flex-row	h-full">
				<div className="flex-grow"> 
					<ComicSection />
				</div>
				<CharacterSection />
			</div>
		</div>
	);
}

export default App;
