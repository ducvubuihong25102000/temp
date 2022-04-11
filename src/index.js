import "./index.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import Store from "./data/store";
import { Provider } from "react-redux";
ReactDOM.render(
	<React.StrictMode>
		<Provider store={Store}>
			<App />
		</Provider>
	</React.StrictMode>,

	document.getElementById("root")
);
