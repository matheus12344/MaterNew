import { create } from 'zustand';
import { UserData, Vehicle } from '../types';

interface UserState {
  userData: UserData | null;
  isLoading: boolean;
  error: string | null;
  
  // Ações
  setUserData: (data: UserData) => void;
  updateUserData: (data: Partial<UserData>) => void;
  clearUserData: () => void;
  addVehicle: (vehicle: Vehicle) => void;
  removeVehicle: (vehicleId: string) => void;
  updateVehicle: (vehicleId: string, data: Partial<Vehicle>) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  isLoading: false,
  error: null,
  
  setUserData: (data) => set({ userData: data, error: null }),
  
  updateUserData: (data) => set((state) => ({
    userData: state.userData ? { ...state.userData, ...data } : null,
    error: null
  })),
  
  clearUserData: () => set({ userData: null, error: null }),
  
  addVehicle: (vehicle) => set((state) => ({
    userData: state.userData 
      ? { 
          ...state.userData, 
          vehicles: [...(state.userData.vehicles || []), vehicle] 
        } 
      : null
  })),
  
  removeVehicle: (vehicleId) => set((state) => ({
    userData: state.userData 
      ? { 
          ...state.userData, 
          vehicles: state.userData.vehicles?.filter(v => v.id !== vehicleId) || [] 
        } 
      : null
  })),
  
  updateVehicle: (vehicleId, data) => set((state) => ({
    userData: state.userData 
      ? { 
          ...state.userData, 
          vehicles: state.userData.vehicles?.map(v => 
            v.id === vehicleId ? { ...v, ...data } : v
          ) || [] 
        } 
      : null
  })),
  
  setError: (error) => set({ error }),
  
  setLoading: (isLoading) => set({ isLoading })
}));
