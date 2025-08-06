'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-center" toastOptions={{
        style:{
          fontSize: "18px",
          minWidth: "200px",
          padding: "16px",
          borderRadius: "8px",
          fontWeight: "bold"
        }
      }} />
    </QueryClientProvider>
  );
}
