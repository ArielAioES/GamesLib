import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query'; // Importando QueryClientProvider e QueryClient
import RoutesSystem from './components/RoutesSystem';

const queryClient = new QueryClient() // Create a new QueryClient instance 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RoutesSystem />
    </QueryClientProvider>
  </React.StrictMode>
);