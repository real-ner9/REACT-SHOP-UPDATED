import { storageFactory } from "./helpers/storageFactory";
import { BrowserRouter } from "react-router-dom";

import AppLayout from "./AppLayout";
import AppProviders from "./AppProviders";

export const local = storageFactory(() => localStorage);
export const session = storageFactory(() => sessionStorage);

function App() {
	const basename = import.meta.env.BASE_URL ?? "/";

	return (
		<BrowserRouter basename={basename}>
			<AppProviders>
				<AppLayout />
			</AppProviders>
		</BrowserRouter>
	);
}

export default App;
