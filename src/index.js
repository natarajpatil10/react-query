import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';
import ProductCards from './ProductCards';
import ProductCard from './ProductCard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/products',
        element: <ProductCards />,
    },
    {
        path: '/products/:productId',
        element: <ProductCard />,
    },
]);

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10000,
            retry: 2,
            retryDelay: 5000,
            refetchOnWindowFocus : false,
        },
    },
});

const root = createRoot(document.getElementById('root'));

root.render(
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
