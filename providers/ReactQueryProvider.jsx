import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const ReactQueryProvider = ({ children }) => {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster/>
            {children}
        </QueryClientProvider>
	);
};

export default ReactQueryProvider;
