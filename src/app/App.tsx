import QueryClientProviderWrapper from "./providers/query-client";
import AppRouter from "./providers/router";

function App() {
  return (
		<QueryClientProviderWrapper>
			<AppRouter />
		</QueryClientProviderWrapper>
  );
}

export default App;