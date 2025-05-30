import { create } from 'zustand';
import { PageType, ServiceItem } from '../types';  

interface AppState {
  // Estado da aplicação
  activePage: PageType;
  selectedService: ServiceItem | null;
  isLoading: boolean;
  error: string | null;
  
  // Ações
  setActivePage: (page: PageType) => void;
  setSelectedService: (service: ServiceItem | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activePage: 'Home',
  selectedService: null,
  isLoading: false,
  error: null,
  
  setActivePage: (page) => set({ activePage: page }),
  
  setSelectedService: (service) => set({ selectedService: service }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error })
}));
