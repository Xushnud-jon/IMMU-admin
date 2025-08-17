import { createRoot } from "react-dom/client";
import Root from './router/index';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000,
    },
  },
});

createRoot(document.getElementById('root')!).render( 
  <QueryClientProvider client={queryClient}>
    <Root />  
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

