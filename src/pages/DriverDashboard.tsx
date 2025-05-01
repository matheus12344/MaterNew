import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Vibration,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ServiceRequestModal from '../components/ServiceRequestModal';
import DriverSummaryModal from '../components/DriverSummaryModal';
import RouteMapModal from '../components/RouteMapModal';
import * as Notifications from 'expo-notifications';

const { width } = Dimensions.get('window');

// Dados simulados de solicitações
const mockRequests = [
  {
    id: '1',
    type: 'Guincho',
    distance: '2.5 km',
    price: 'R$ 120,00',
    priceValue: 120,
    address: 'Av. Paulista, 1000 - São Paulo',
    vehicle: 'Toyota Corolla 2020',
    problem: 'Pneu furado',
  },
  {
    id: '2',
    type: 'Bateria',
    distance: '1.8 km',
    price: 'R$ 80,00',
    priceValue: 80,
    address: 'Rua Augusta, 500 - São Paulo',
    vehicle: 'Honda Civic 2019',
    problem: 'Bateria descarregada',
  },
  {
    id: '3',
    type: 'Combustível',
    distance: '3.2 km',
    price: 'R$ 60,00',
    priceValue: 60,
    address: 'Av. Rebouças, 1500 - São Paulo',
    vehicle: 'Volkswagen Golf 2021',
    problem: 'Sem combustível',
  },
  {
    id: '4',
    type: 'Guincho',
    distance: '3.4 km',
    price: 'R$ 320,00',
    priceValue: 320,
    address: 'Av. Paulista, 1000 - São Paulo',
    vehicle: 'Toyota Corolla 2023',
    problem: 'Pneu furado',
  },
  {
    id: '5',
    type: 'Guincho',
    distance: '3.4 km',
    price: 'R$ 320,00',
    priceValue: 320,
    address: 'Av. Paulista, 1000 - São Paulo',
    vehicle: 'Toyota Corolla 2023',
    problem: 'Pneu furado',
  },
  {
    id: '6',
    type: 'Troca de Óleo',
    distance: '1.5 km',
    price: 'R$ 150,00',
    priceValue: 150,
    address: 'Rua Oscar Freire, 800 - São Paulo',
    vehicle: 'BMW X5 2022',
    problem: 'Troca de óleo necessária',
  },
  {
    id: '7',
    type: 'Alinhamento',
    distance: '2.8 km',
    price: 'R$ 90,00',
    priceValue: 90,
    address: 'Av. Brigadeiro Faria Lima, 2000 - São Paulo',
    vehicle: 'Mercedes C180 2021',
    problem: 'Alinhamento e balanceamento',
  },
  {
    id: '8',
    type: 'Freios',
    distance: '1.2 km',
    price: 'R$ 280,00',
    priceValue: 280,
    address: 'Rua Haddock Lobo, 400 - São Paulo',
    vehicle: 'Audi A4 2023',
    problem: 'Troca de pastilhas de freio',
  },
  {
    id: '9',
    type: 'Ar Condicionado',
    distance: '2.1 km',
    price: 'R$ 200,00',
    priceValue: 200,
    address: 'Av. Jabaquara, 1500 - São Paulo',
    vehicle: 'Hyundai HB20 2022',
    problem: 'Ar condicionado não está gelando',
  },
  {
    id: '10',
    type: 'Injeção Eletrônica',
    distance: '3.5 km',
    price: 'R$ 350,00',
    priceValue: 350,
    address: 'Rua da Consolação, 1000 - São Paulo',
    vehicle: 'Chevrolet Onix 2021',
    problem: 'Problemas na injeção',
  },
  {
    id: '11',
    type: 'Suspensão',
    distance: '2.3 km',
    price: 'R$ 420,00',
    priceValue: 420,
    address: 'Av. São João, 800 - São Paulo',
    vehicle: 'Renault Kwid 2023',
    problem: 'Barulho na suspensão',
  },
  {
    id: '12',
    type: 'Transmissão',
    distance: '1.7 km',
    price: 'R$ 500,00',
    priceValue: 500,
    address: 'Rua Maria Antônia, 300 - São Paulo',
    vehicle: 'Ford Focus 2022',
    problem: 'Problemas na transmissão',
  },
  {
    id: '13',
    type: 'Elétrica',
    distance: '2.4 km',
    price: 'R$ 180,00',
    priceValue: 180,
    address: 'Av. Rebouças, 2000 - São Paulo',
    vehicle: 'Fiat Argo 2021',
    problem: 'Problemas elétricos',
  },
  {
    id: '14',
    type: 'Vidros',
    distance: '1.9 km',
    price: 'R$ 120,00',
    priceValue: 120,
    address: 'Rua Augusta, 1500 - São Paulo',
    vehicle: 'Volkswagen T-Cross 2023',
    problem: 'Vidro elétrico travado',
  },
  {
    id: '15',
    type: 'Faróis',
    distance: '2.6 km',
    price: 'R$ 150,00',
    priceValue: 150,
    address: 'Av. Paulista, 2000 - São Paulo',
    vehicle: 'Toyota RAV4 2022',
    problem: 'Farol queimado',
  },
  {
    id: '16',
    type: 'Bateria',
    distance: '1.4 km',
    price: 'R$ 250,00',
    priceValue: 250,
    address: 'Rua Bela Cintra, 500 - São Paulo',
    vehicle: 'Honda HR-V 2023',
    problem: 'Bateria descarregada',
  },
  {
    id: '17',
    type: 'Combustível',
    distance: '2.9 km',
    price: 'R$ 70,00',
    priceValue: 70,
    address: 'Av. Brigadeiro Faria Lima, 3000 - São Paulo',
    vehicle: 'Jeep Renegade 2022',
    problem: 'Sem combustível',
  },
  {
    id: '18',
    type: 'Guincho',
    distance: '3.1 km',
    price: 'R$ 280,00',
    priceValue: 280,
    address: 'Rua Oscar Freire, 1000 - São Paulo',
    vehicle: 'BMW 320i 2023',
    problem: 'Motor fundido',
  },
  {
    id: '19',
    type: 'Troca de Óleo',
    distance: '1.6 km',
    price: 'R$ 180,00',
    priceValue: 180,
    address: 'Av. Jabaquara, 2000 - São Paulo',
    vehicle: 'Mercedes GLA 2022',
    problem: 'Troca de óleo necessária',
  },
  {
    id: '20',
    type: 'Alinhamento',
    distance: '2.2 km',
    price: 'R$ 100,00',
    priceValue: 100,
    address: 'Rua da Consolação, 1500 - São Paulo',
    vehicle: 'Audi Q3 2023',
    problem: 'Alinhamento e balanceamento',
  },
  {
    id: '21',
    type: 'Freios',
    distance: '1.3 km',
    price: 'R$ 320,00',
    priceValue: 320,
    address: 'Av. São João, 1000 - São Paulo',
    vehicle: 'Hyundai Creta 2022',
    problem: 'Troca de pastilhas de freio',
  },
  {
    id: '22',
    type: 'Ar Condicionado',
    distance: '2.7 km',
    price: 'R$ 220,00',
    priceValue: 220,
    address: 'Rua Maria Antônia, 500 - São Paulo',
    vehicle: 'Chevrolet Tracker 2023',
    problem: 'Ar condicionado não está gelando',
  },
  {
    id: '23',
    type: 'Injeção Eletrônica',
    distance: '3.3 km',
    price: 'R$ 380,00',
    priceValue: 380,
    address: 'Av. Rebouças, 2500 - São Paulo',
    vehicle: 'Renault Duster 2022',
    problem: 'Problemas na injeção',
  },
  {
    id: '24',
    type: 'Suspensão',
    distance: '2.0 km',
    price: 'R$ 450,00',
    priceValue: 450,
    address: 'Rua Augusta, 2000 - São Paulo',
    vehicle: 'Ford Territory 2023',
    problem: 'Barulho na suspensão',
  },
  {
    id: '25',
    type: 'Transmissão',
    distance: '1.8 km',
    price: 'R$ 520,00',
    priceValue: 520,
    address: 'Av. Paulista, 2500 - São Paulo',
    vehicle: 'Fiat Pulse 2022',
    problem: 'Problemas na transmissão',
  },
  {
    id: '26',
    type: 'Elétrica',
    distance: '2.5 km',
    price: 'R$ 200,00',
    priceValue: 200,
    address: 'Rua Bela Cintra, 800 - São Paulo',
    vehicle: 'Volkswagen Nivus 2023',
    problem: 'Problemas elétricos',
  },
  {
    id: '27',
    type: 'Vidros',
    distance: '1.7 km',
    price: 'R$ 140,00',
    priceValue: 140,
    address: 'Av. Brigadeiro Faria Lima, 3500 - São Paulo',
    vehicle: 'Toyota Corolla Cross 2022',
    problem: 'Vidro elétrico travado',
  },
  {
    id: '28',
    type: 'Faróis',
    distance: '2.8 km',
    price: 'R$ 170,00',
    priceValue: 170,
    address: 'Rua Oscar Freire, 1200 - São Paulo',
    vehicle: 'Honda City 2023',
    problem: 'Farol queimado',
  },
  {
    id: '29',
    type: 'Bateria',
    distance: '1.5 km',
    price: 'R$ 270,00',
    priceValue: 270,
    address: 'Av. Jabaquara, 2500 - São Paulo',
    vehicle: 'Jeep Compass 2022',
    problem: 'Bateria descarregada',
  },
  {
    id: '30',
    type: 'Combustível',
    distance: '3.0 km',
    price: 'R$ 80,00',
    priceValue: 80,
    address: 'Rua da Consolação, 2000 - São Paulo',
    vehicle: 'BMW X1 2023',
    problem: 'Sem combustível',
  },
];

const DriverDashboard = () => {
  const { theme, colors } = useTheme();
  const [isOnline, setIsOnline] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(mockRequests[0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [earnings, setEarnings] = useState(0);
  const [rides, setRides] = useState(0);
  const [timeOnline, setTimeOnline] = useState(0);
  const [hourlyEarnings, setHourlyEarnings] = useState<number[]>(Array(12).fill(0));
  const [rideTypes, setRideTypes] = useState<{ type: string; count: number }[]>([]);
  const [recentRides, setRecentRides] = useState<Array<{
    id: string;
    type: string;
    price: string;
    address: string;
    vehicle: string;
    problem: string;
    date: Date;
  }>>([]);
  const [isDeciding, setIsDeciding] = useState(false);
  const [showRouteMap, setShowRouteMap] = useState(false);

  useEffect(() => {
    // Configurar notificações
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Efeito para atualizar o tempo online
  useEffect(() => {
    let timeInterval: NodeJS.Timeout;
    if (isOnline) {
      timeInterval = setInterval(() => {
        setTimeOnline(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timeInterval) {
        clearInterval(timeInterval);
      }
    };
  }, [isOnline]);

  const playNotification = () => {
    // Vibrar
    Vibration.vibrate(500);
  };

  const toggleStatus = () => {
    const newStatus = !isOnline;
    console.log('Mudando status para:', newStatus);
    setIsOnline(newStatus);
    
    if (newStatus) {
      console.log('Iniciando simulação');
      startRequestSimulation();
    } else {
      console.log('Parando simulação');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Mostrar resumo ao ficar offline
      setShowSummary(true);
    }
  };

  const startRequestSimulation = () => {
    console.log('Iniciando novo intervalo');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!isDeciding) {
        console.log('Nova solicitação gerada');
        const randomRequest = mockRequests[Math.floor(Math.random() * mockRequests.length)];
        setCurrentRequest(randomRequest);
        setShowRequest(true);
        setIsDeciding(true);
        playNotification();
      }
    }, 5000);
  };

  const handleAcceptRequest = () => {
    setShowRequest(false);
    setIsDeciding(false);
    // Mostrar o mapa com a rota
    setShowRouteMap(true);
    // Atualizar ganhos e número de corridas
    setEarnings(prev => prev + currentRequest.priceValue);
    setRides(prev => prev + 1);

    // Atualizar ganhos por hora
    const currentHour = new Date().getHours() - 8;
    if (currentHour >= 0 && currentHour < 12) {
      setHourlyEarnings(prev => {
        const newEarnings = [...prev];
        newEarnings[currentHour] += currentRequest.priceValue;
        return newEarnings;
      });
    }

    // Atualizar tipos de corrida
    setRideTypes(prev => {
      const existingType = prev.find(item => item.type === currentRequest.type);
      if (existingType) {
        return prev.map(item =>
          item.type === currentRequest.type
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        return [...prev, { type: currentRequest.type, count: 1 }];
      }
    });

    // Adicionar à lista de corridas recentes
    setRecentRides(prev => {
      const newRide = {
        ...currentRequest,
        date: new Date(),
      };
      return [newRide, ...prev].slice(0, 3);
    });

    console.log('Solicitação aceita:', currentRequest);
  };

  const handleRejectRequest = () => {
    setShowRequest(false);
    setIsDeciding(false);
    console.log('Solicitação rejeitada:', currentRequest);
  };

  const handleCloseRouteMap = () => {
    setShowRouteMap(false);
  };

  // Função para formatar o tempo online
  const formatTimeOnline = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  // Função para formatar a data
  const formatDate = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.name, { color: colors.text }]}>João Silva</Text>
            <Text style={[styles.rating, { color: colors.placeholder }]}>
              ⭐ 4.8 ({rides} corridas)
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.statusButton,
            { backgroundColor: isOnline ? colors.primary : '#FF0000' }
          ]}
          onPress={toggleStatus}
        >
          <Text style={styles.statusText}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <MaterialCommunityIcons name="cash" size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: colors.text, fontSize: 13}]}>
            R$ {earnings.toFixed(2)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.placeholder }]}>Ganhos Hoje</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <MaterialCommunityIcons name="clock-outline" size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {formatTimeOnline(timeOnline)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.placeholder }]}>Tempo Online</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <MaterialCommunityIcons name="map-marker" size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: colors.text }]}>{rides}</Text>
          <Text style={[styles.statLabel, { color: colors.placeholder }]}>Corridas Hoje</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Ações Rápidas</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]}>
            <Ionicons name="car" size={24} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.text }]}>Meu Veículo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]} onPress={() => setShowSummary(true)}>
            <Ionicons name="wallet" size={24} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.text }]}>Ganhos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]}>
            <Ionicons name="calendar" size={24} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.text }]}>Agenda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]}>
            <Ionicons name="settings" size={24} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.text }]}>Configurações</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Rides */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Últimas Corridas</Text>
        {recentRides.map((ride, index) => (
          <View key={ride.id} style={[styles.rideCard, { backgroundColor: colors.card }]}>
            <View style={styles.rideHeader}>
              <Text style={[styles.rideDate, { color: colors.placeholder }]}>
                {formatDate(ride.date)}
              </Text>
              <Text style={[styles.rideValue, { color: colors.primary }]}>
                {ride.price}
              </Text>
            </View>
            <View style={styles.rideDetails}>
              <View style={styles.rideLocation}>
                <Ionicons name="location" size={16} color={colors.primary} />
                <Text style={[styles.rideText, { color: colors.text }]}>
                  {ride.address}
                </Text>
              </View>
              <View style={styles.rideInfo}>
                <Text style={[styles.rideType, { color: colors.primary }]}>
                  {ride.type}
                </Text>
                <Text style={[styles.rideVehicle, { color: colors.placeholder }]}>
                  {ride.vehicle}
                </Text>
              </View>
              <Text style={[styles.rideProblem, { color: colors.text }]}>
                {ride.problem}
              </Text>
            </View>
          </View>
        ))}
        {recentRides.length === 0 && (
          <Text style={[styles.noRidesText, { color: colors.placeholder }]}>
            Nenhuma corrida realizada ainda
          </Text>
        )}
      </View>

      <ServiceRequestModal
        visible={showRequest}
        onAccept={handleAcceptRequest}
        onReject={handleRejectRequest}
        request={currentRequest}
      />

      <DriverSummaryModal
        visible={showSummary}
        onClose={() => setShowSummary(false)}
        summary={{
          earnings,
          rides,
          timeOnline,
          hourlyEarnings,
          rideTypes,
        }}
      />

      <RouteMapModal
        visible={showRouteMap}
        onClose={handleCloseRouteMap}
        request={currentRequest}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
  },
  statusButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  statCard: {
    width: (width - 60) / 3,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: (width - 60) / 2,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
  },
  rideCard: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rideDate: {
    fontSize: 14,
  },
  rideValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rideDetails: {
    gap: 8,
  },
  rideLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rideText: {
    fontSize: 14,
    flex: 1,
  },
  rideInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rideType: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  rideVehicle: {
    fontSize: 14,
  },
  rideProblem: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  noRidesText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
});

export default DriverDashboard; 