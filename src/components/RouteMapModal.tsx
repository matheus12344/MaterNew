import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width } = Dimensions.get('window');

interface RouteMapModalProps {
  visible: boolean;
  onClose: () => void;
  request: {
    address: string;
    type: string;
    vehicle: string;
    problem: string;
  };
}

const RouteMapModal = ({ visible, onClose, request }: RouteMapModalProps) => {
  const { theme, colors } = useTheme();

  // Coordenadas simuladas (em uma implementação real, você usaria geocoding para converter o endereço em coordenadas)
  const destination = {
    latitude: -23.550520,
    longitude: -46.633308,
  };

  const initialRegion = {
    latitude: -23.550520,
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Rota para o Serviço
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={initialRegion}
            >
              <Marker
                coordinate={destination}
                title={request.address}
                description={`${request.type} - ${request.vehicle}`}
              />
            </MapView>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={20} color={colors.primary} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                {request.address}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="car" size={20} color={colors.primary} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                {request.vehicle}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="warning" size={20} color={colors.primary} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                {request.problem}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: colors.primary }]}
            onPress={onClose}
          >
            <Text style={styles.startButtonText}>Iniciar Serviço</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    gap: 10,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: 16,
    flex: 1,
  },
  startButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RouteMapModal; 