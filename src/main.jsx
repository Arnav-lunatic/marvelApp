import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import App from "./App.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<NextUIProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</NextUIProvider>
	</StrictMode>
);
