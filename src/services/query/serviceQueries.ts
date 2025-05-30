import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '../../config/supabase';
import { ServiceItem } from '../../types';
import { queryClient } from './queryClient';

// Chaves de consulta para organizar o cache
export const serviceKeys = {
  all: ['services'] as const,
  lists: () => [...serviceKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...serviceKeys.lists(), filters] as const,
  details: () => [...serviceKeys.all, 'detail'] as const,
  detail: (id: string) => [...serviceKeys.details(), id] as const,
};

// Função para buscar todos os serviços
export const fetchServices = async (): Promise<ServiceItem[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('title', { ascending: true });
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as ServiceItem[];
};

// Hook para buscar todos os serviços
export const useServices = (filters: Record<string, any> = {}) => {
  return useQuery({
    queryKey: serviceKeys.list(filters),
    queryFn: () => fetchServices(),
  });
};

// Função para buscar serviço por ID
export const fetchServiceById = async (id: string): Promise<ServiceItem> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as ServiceItem;
};

// Hook para buscar serviço por ID
export const useService = (id: string) => {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: () => fetchServiceById(id),
    enabled: !!id, // Só executa se o ID for fornecido
  });
};

// Função para criar um novo serviço
export const createService = async (service: Omit<ServiceItem, 'id'>): Promise<ServiceItem> => {
  const { data, error } = await supabase
    .from('services')
    .insert(service)
    .select()
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as ServiceItem;
};

// Hook para criar um novo serviço
export const useCreateService = () => {
  return useMutation({
    mutationFn: createService,
    onSuccess: () => {
      // Invalida o cache para recarregar a lista de serviços
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
    },
  });
};

// Função para atualizar um serviço
export const updateService = async ({ id, ...service }: { id: string } & Partial<ServiceItem>): Promise<ServiceItem> => {
  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as ServiceItem;
};

// Hook para atualizar um serviço
export const useUpdateService = () => {
  return useMutation({
    mutationFn: updateService,
    onSuccess: (data) => {
      // Atualiza o cache para o serviço específico e a lista
      queryClient.invalidateQueries({ queryKey: serviceKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
    },
  });
};
