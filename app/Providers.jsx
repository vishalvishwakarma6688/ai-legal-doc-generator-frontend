'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { Toaster } from 'react-hot-toast';
import { LoaderProvider } from '@/contexts/LoaderContext';

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LoaderProvider>
        {children}
        <Toaster
          position="top-center"
          gutter={12}
          toastOptions={{
            success: { duration: 4000 },
            error: { duration: 4000 },
            style: {
              fontSize: "18px",
              minWidth: "200px",
              padding: "16px 24px",
              color: "red",
              backgroundColor: "white",
              borderRadius: "8px",
              fontWeight: "bold"
            }
          }}
        />
      </LoaderProvider>
    </QueryClientProvider>
  );
}
