import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Vehicle, ServiceItem, ActivityItem } from './index';

// Parâmetros para o navegador principal (Stack)
export type RootStackParamList = {
  // Fluxo de autenticação
  Welcome: { setActivePage: (page: string) => void };
  Login: { setActivePage: (page: string) => void };
  Register: { setActivePage: (page: string) => void };
  
  // Fluxo principal
  Main: { screen?: string };
  
  // Fluxo de administrador
  AdminArea: {
    styles: any;
    colors: any;
    scale: number;
    handleHome: () => void;
    onServiceUpdate: (serviceId: string, status: string) => void;
  };
  
  // Fluxo de motorista
  DriverDashboard: undefined;
  
  // Telas detalhadas
  ServiceDetail: { 
    serviceId: string;
    service: any;
    onChat: () => void;
    onBack: () => void;
  };
  ActivityDetail: { 
    activityId: string;
    activity: any;
    onBack: () => void;
  };
  Map: { 
    origin?: { latitude: number; longitude: number }; 
    destination?: { latitude: number; longitude: number };
    services: any[];
    onSearchTextChange: (text: string) => void;
    onSelectSuggestion: (item: any) => void;
    onServiceSelect: (service: any) => void;
  };
  Emergency: { route: any };
  Payment: { 
    route: any;
    onBack: () => void;
    service?: string; 
    amount: number;
    serviceDetails?: {
      pickup: { latitude: number; longitude: number };
      destination: { latitude: number; longitude: number };
      distance: number;
      coordinates: Array<{ latitude: number; longitude: number }>;
      vehicleType: string;
    }
  };
  Points: undefined;
  VehicleDetail: { 
    vehicle: Vehicle;
    onBack: () => void;
  };
  Chat: { driverName: string; driverPhoto: string; serviceId?: string };
  Referral: undefined;
  Community: undefined;
  SeguroProBenefits: { 
    onBack: () => void;
    onUpgrade: () => void;
  };
  SeguroPro: { onBack: () => void };
  Privacy: undefined;
};

// Parâmetros para as abas principais (Tab)
export type MainTabParamList = {
  HomeTab: {
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
    styles: any;
    colors: any;
    scale: number;
    handleServiceSelect: (service: any) => void;
    handleActivityPress: (activity: any) => void;
    handleChat: () => void;
    handleUpgrade: () => void;
    handleSearchTextChange: (text: string) => void;
    handleSelectSuggestion: (item: any) => void;
    handleBack: () => void;
    services: any[];
    activities: any[];
    userData: any;
    setUserData: (data: any) => void;
  };
  ServicesTab: {
    services: any[];
    handleServiceSelect: (service: any) => void;
    styles: any;
    colors: any;
    scale: number;
  };
  ActivityTab: {
    activities: any[];
    renderActivityItem: (item: any) => React.ReactNode;
    handleActivityPress: (activity: any) => void;
    styles: any;
    colors: any;
  };
  AccountTab: {
    userData: any;
    setUserData: (data: any) => void;
    styles: any;
    colors: any;
    scale: number;
    handleServiceSelect: (service: any) => void;
    handleActivityPress: (activity: any) => void;
    handleChat: () => void;
    handleUpgrade: () => void;
  };
};

// Parâmetros para o navegador de administrador
export type AdminStackParamList = {
  Dashboard: { 
    handleHome: () => void;
    styles: any;
    colors: any;
    scale: number;
  };
  Users: {
    styles: any;
    colors: any;
    scale: number;
  };
  Services: { 
    onServiceUpdate: (serviceId: string, status: string) => void;
    styles: any;
    colors: any;
    scale: number;
  };
  Analytics: {
    styles: any;
    colors: any;
    scale: number;
  };
  Notifications: {
    styles: any;
    colors: any;
    scale: number;
  };
  SystemSettings: {
    styles: any;
    colors: any;
    scale: number;
  };
};

// Tipos de navegação para uso em componentes
export type RootStackNavigationProp<T extends keyof RootStackParamList> = 
  StackNavigationProp<RootStackParamList, T>;

export type MainTabNavigationProp<T extends keyof MainTabParamList> = 
  BottomTabNavigationProp<MainTabParamList, T>;

export type RootStackRouteProp<T extends keyof RootStackParamList> = 
  RouteProp<RootStackParamList, T>;

// Hook de tipagem para navegação
export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: RootStackNavigationProp<T>;
  route: RootStackRouteProp<T>;
};
    