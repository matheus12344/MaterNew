import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faScrewdriverWrench, faClipboardList, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

// Screens
import HomeTabContent from 'src/components/HomeTabContent';
import ServicesScreen from '../pages/ServicesScreen';
import ActivityScreen from '../pages/ActivityScreen';
import AccountScreen from '../pages/AccountScreen';
import ServiceDetailScreen from '../pages/ServiceDetailScreen';
import ActivityDetailScreen from '../pages/ActivityDetailScreen';
import MapScreen from '../pages/MapScreen';
import EmergencyScreen from '../pages/EmergencyScreen';
import PaymentScreen from '../pages/PaymentScreen';
import PointsScreen from '../pages/PointsScreen';
import VehicleDetailScreen from '../pages/VehicleDetailScreen';
import ChatScreen from '../pages/ChatScreen';
import ReferralScreen from '../pages/ReferralScreen';
import CommunityScreen from '../pages/CommunityScreen';
import SeguroProBenefits from '../pages/SeguroProBenefits';
import SeguroPro from '../pages/SeguroPro';
import LoginScreen from '../pages/Login';
import RegisterScreen from '../pages/Register';
import WelcomeScreen from '../pages/WelcomeScreen';
import PrivacyScreen from '../pages/PrivacyScreen';
import AdminDashboard from '../pages/AdminDashboard';
import AdminUsers from '../pages/AdminUsers';
import AdminServices from '../pages/AdminServices';
import AdminAnalytics from '../pages/AdminAnalytics';
import AdminNotifications from '../pages/AdminNotifications';
import AdminSystemSettings from '../pages/AdminSettings';
import DriverDashboard from '../pages/DriverDashboard';

// Tipos
import { RootStackParamList, MainTabParamList, AdminStackParamList } from '../types/navigation';

// Criação dos navegadores
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const AdminStack = createNativeStackNavigator<AdminStackParamList>();

// Navegador de abas principal
const MainTabs = () => {
  const { theme, colors, styles, scale } = useTheme();
  const [selectedTab, setSelectedTab] = useState('home');
  const [services, setServices] = useState([]);
  const [activities, setActivities] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  const handleServiceSelect = (service: any) => {
    // Implementar lógica de seleção de serviço
    console.log('Service selected:', service);
  };

  const renderActivityItem = (item: any) => {
    // Implementar renderização do item de atividade
    console.log('Activity item:', item);
    return null;
  };

  const handleActivityPress = (activity: any) => {
    // Implementar lógica de pressão na atividade
    console.log('Activity pressed:', activity);
  };

  const handleChat = () => {
    // Implementar lógica de chat
    console.log('Chat pressed');
  };

  const handleUpgrade = () => {
    // Implementar lógica de upgrade
    console.log('Upgrade pressed');
  };

  const handleSearchTextChange = (text: string) => {
    // Implementar lógica de busca
    console.log('Search text changed:', text);
  };

  const handleSelectSuggestion = (item: any) => {
    // Implementar lógica de seleção de sugestão
    console.log('Suggestion selected:', item);
  };

  const handleBack = () => {
    navigation.goBack();
    console.log('Back pressed');
  };
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.placeholder,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeTabContent as any} 
        initialParams={{ 
          selectedTab, 
          setSelectedTab,
          styles,
          colors,
          scale,
          handleServiceSelect,
          handleActivityPress,
          handleChat,
          handleUpgrade,
          handleSearchTextChange,
          handleSelectSuggestion,
          handleBack,
          services,
          activities,
          userData,
          setUserData
        }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHome} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="ServicesTab"  
        component={ServicesScreen as any} 
        initialParams={{ 
          services, 
          handleServiceSelect,
          styles,
          colors,
          scale
        }}
        options={{
          tabBarLabel: 'Serviços',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faScrewdriverWrench} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="ActivityTab" 
        component={ActivityScreen as any} 
        initialParams={{ 
          activities, 
          renderActivityItem, 
          handleActivityPress,
          styles,
          colors
        }}
        options={{
          tabBarLabel: 'Atividade',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faClipboardList} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="AccountTab" 
        component={AccountScreen as any} 
        initialParams={{ 
          userData, 
          setUserData,
          styles,
          colors,
          scale,
          handleServiceSelect,
          handleActivityPress,
          handleChat,
          handleUpgrade
        }}
        options={{
          tabBarLabel: 'Conta',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Navegador para área administrativa
const AdminTabNavigator = () => {
  const { styles, colors, scale } = useTheme();
  const navigation = useNavigation();

  const handleHome = () => {
    navigation.navigate('Main' as never);
  };

  const handleServiceUpdate = (serviceId: string, status: string) => {
    // Implementar lógica de atualização de serviço
  };

  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen 
        name="Dashboard" 
        component={AdminDashboard as any} 
        initialParams={{ 
          handleHome,
          styles,
          colors,
          scale
        }}
      />
      <AdminStack.Screen 
        name="Users" 
        component={AdminUsers as any}
        initialParams={{
          styles,
          colors,
          scale
        }}
      />
      <AdminStack.Screen 
        name="Services" 
        component={AdminServices as any}
        initialParams={{ 
          onServiceUpdate: handleServiceUpdate,
          styles,
          colors,
          scale
        }}
      />
      <AdminStack.Screen 
        name="Analytics" 
        component={AdminAnalytics as any}
        initialParams={{
          styles,
          colors,
          scale
        }}
      />
      <AdminStack.Screen 
        name="Notifications" 
        component={AdminNotifications as any}
        initialParams={{
          styles,
          colors,
          scale
        }}
      />
      <AdminStack.Screen 
        name="SystemSettings" 
        component={AdminSystemSettings as any}
        initialParams={{
          styles,
          colors,
          scale
        }}
      />
    </AdminStack.Navigator>
  );
};

// Navegador principal
const MainNavigator = () => {
  const { isAuthenticated, user } = useAuth();
  const { theme, colors, styles, scale } = useTheme();
  const navigation = useNavigation();
  
  const handleBack = () => {
    navigation.goBack();
  };

  const handleChat = () => {
    // Implementar lógica de chat
  };

  const handleUpgrade = () => {
    // Implementar lógica de upgrade
  };

  const handleSearchTextChange = (text: string) => {
    // Implementar lógica de busca
  };

  const handleSelectSuggestion = (item: any) => {
    // Implementar lógica de seleção de sugestão
  };

  const handleServiceSelect = (service: any) => {
    // Implementar lógica de seleção de serviço
  };

  const handleServiceUpdate = (serviceId: string, status: string) => {
    // Implementar lógica de atualização de serviço
  };

  const handleHome = () => {
    navigation.navigate('Main' as never);
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          // Fluxo de autenticação
          <>
            <Stack.Screen 
              name="Welcome" 
              component={WelcomeScreen as any} 
              initialParams={{ setActivePage: (page: string) => {} }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen as any} 
              initialParams={{ setActivePage: (page: string) => {} }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen as any} 
              initialParams={{ setActivePage: (page: string) => {} }}
            />
          </>
        ) : user?.role === 'admin' ? (
          // Fluxo de administrador
          <Stack.Screen 
            name="AdminArea" 
            component={AdminTabNavigator as any}
            initialParams={{
              styles,
              colors,
              scale,
              handleHome,
              onServiceUpdate: handleServiceUpdate
            }}
          />
        ) : user?.role === 'driver' ? (
          // Fluxo de motorista
          <Stack.Screen name="DriverDashboard" component={DriverDashboard as any} />
        ) : (
          // Fluxo de usuário comum
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen 
              name="ServiceDetail" 
              component={ServiceDetailScreen as any}
              initialParams={{ onChat: handleChat, onBack: handleBack }}
            />
            <Stack.Screen 
              name="ActivityDetail" 
              component={ActivityDetailScreen as any}
              initialParams={{ onBack: handleBack }}
            />
            <Stack.Screen 
              name="Map" 
              component={MapScreen as any}
              initialParams={{
                services: [],
                onSearchTextChange: handleSearchTextChange,
                onSelectSuggestion: handleSelectSuggestion,
                onServiceSelect: handleServiceSelect
              }}
            />
            <Stack.Screen 
              name="Emergency" 
              component={EmergencyScreen as any}
              initialParams={{ route: {} }}
            />
            <Stack.Screen 
              name="Payment" 
              component={PaymentScreen as any}
              initialParams={{ onBack: handleBack }}
            />
            <Stack.Screen name="Points" component={PointsScreen as any} />
            <Stack.Screen 
              name="VehicleDetail" 
              component={VehicleDetailScreen as any}
              initialParams={{ onBack: handleBack }}
            />
            <Stack.Screen name="Chat" component={ChatScreen as any} />
            <Stack.Screen name="Referral" component={ReferralScreen as any} />
            <Stack.Screen name="Community" component={CommunityScreen as any} />
            <Stack.Screen 
              name="SeguroProBenefits" 
              component={SeguroProBenefits as any}
              initialParams={{ onBack: handleBack, onUpgrade: handleUpgrade }}
            />
            <Stack.Screen 
              name="SeguroPro" 
              component={SeguroPro as any}
              initialParams={{ onBack: handleBack }}
            />
            <Stack.Screen name="Privacy" component={PrivacyScreen as any} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
