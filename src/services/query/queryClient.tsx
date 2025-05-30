import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Criação do cliente de consulta com configurações otimizadas
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tempo que os dados permanecem "frescos" antes de precisar revalidar
      staleTime: 1000 * 60 * 5, // 5 minutos
      // Tempo que os dados inativos permanecem em cache
      gcTime: 1000 * 60 * 10, // 10 minutos
      // Número de tentativas em caso de falha
      retry: 1,
      // Comportamento de refetch
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

// Provider para envolver a aplicação
export const QueryProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
