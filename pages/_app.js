import AuthProvider from "../providers/AuthProvider";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
	return (
		<AuthProvider>
			<ReactQueryProvider>
				<Component {...pageProps} />
			</ReactQueryProvider>
		</AuthProvider>
	);
}
