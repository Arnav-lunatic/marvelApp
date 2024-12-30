import "./App.css";
import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";

function App() {

	return (
		<div className="h-auto md:h-[90dvh]">
			<Nav />
			<Outlet />
		</div>
	);
}

export default App;
