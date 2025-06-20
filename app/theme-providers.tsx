"use client";
//javascript del cliente
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react'


const queryClient = new QueryClient()


const ThemeProviders = ({ children,  }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}  >
            <Toaster
                position='top-right'
                richColors />
            {children}
        </QueryClientProvider>
    )
}

export default ThemeProviders