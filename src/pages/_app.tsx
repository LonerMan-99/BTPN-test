import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
 defaultOptions: {
  queries: {
   refetchOnWindowFocus: false,
  },
 },
});

export default function App({ Component, pageProps }: AppProps) {
 return (
  <Provider store={store}>
   <QueryClientProvider client={queryClient}>
    <ChakraProvider>
     <Component {...pageProps} />
    </ChakraProvider>
   </QueryClientProvider>
  </Provider>
 );
}
