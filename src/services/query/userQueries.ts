import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../config/supabase';
import { UserData } from '../../types';
import { useUserStore } from '../../store/useUserStore';
import { useEffect } from 'react';

// Chaves de consulta para organizar o cache
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// Função para buscar usuário por ID
export const fetchUserById = async (id: string): Promise<UserData> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as UserData;
};

// Hook para buscar usuário com integração ao Zustand
export const useUser = (id: string) => {
  const { setUserData, setLoading, setError } = useUserStore();
  const queryClient = useQueryClient();
  
  const query = useQuery<UserData, Error>({
    queryKey: userKeys.detail(id),
    queryFn: () => fetchUserById(id)
  });

  useEffect(() => {
    if (query.data) {
      setUserData(query.data);
    }
    if (query.error) {
      setError(query.error.message);
    }
    setLoading(query.isLoading);
  }, [query.data, query.error, query.isLoading]);

  return query;
};

// Função para atualizar usuário
export const updateUser = async (id: string, userData: Partial<UserData>): Promise<UserData> => {
  const { data, error } = await supabase
    .from('users')
    .update(userData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as UserData;
};

// Hook para atualizar usuário com integração ao Zustand
export const useUpdateUser = () => {
  const { updateUserData, setLoading, setError } = useUserStore();
  
  return useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: Partial<UserData> }) => 
      updateUser(id, userData),
    onSuccess: (data) => {
      updateUserData(data);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
    onSettled: () => {
      setLoading(false);
    }
  });
};
