import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import CharacterPage from "./components/CharacterPage";
import HomePage from "./components/HomePage";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="" element={<HomePage />}/>
			<Route path="character/*" element={<CharacterPage />} />
			<Route path="*" element={<ErrorPage/>} />
		</Route>
	)
);

const rootElement = document.getElementById("root");

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<NextUIProvider>
				<Provider store={store}>
					<RouterProvider router={router} />
				</Provider>
			</NextUIProvider>
		</StrictMode>
	);
}
