import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface DriverSummaryModalProps {
  visible: boolean;
  onClose: () => void;
  summary: {
    earnings: number;
    rides: number;
    timeOnline: number;
    hourlyEarnings: number[];
    rideTypes: {
      type: string;
      count: number;
    }[];
  };
}

const DriverSummaryModal = ({
  visible,
  onClose,
  summary,
}: DriverSummaryModalProps) => {
  const { theme, colors } = useTheme();

  // Função para formatar o tempo
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  // Função para calcular a média de ganhos por corrida
  const calculateAverageEarnings = () => {
    if (summary.rides === 0) return 0;
    return summary.earnings / summary.rides;
  };

  // Função para encontrar o horário com mais ganhos
  const findBestHour = () => {
    const maxEarnings = Math.max(...summary.hourlyEarnings);
    const bestHourIndex = summary.hourlyEarnings.indexOf(maxEarnings);
    return bestHourIndex + 8; // Considerando que o dia começa às 8h
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: '#ffffff' }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: '#000000' }]}>
              Resumo do Dia
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent}>
            {/* Resumo Geral */}
            <View style={styles.summarySection}>
              <Text style={[styles.sectionTitle, { color: '#000000' }]}>
                Resumo Geral
              </Text>
              <View style={styles.summaryCards}>
                <View style={[styles.summaryCard, { backgroundColor: '#f5f5f5' }]}>
                  <Ionicons name="cash" size={24} color="#2196F3" />
                  <Text style={[styles.summaryValue, { color: '#000000' }]}>
                    R$ {summary.earnings.toFixed(2)}
                  </Text>
                  <Text style={[styles.summaryLabel, { color: '#666666' }]}>
                    Ganhos Totais
                  </Text>
                </View>
                <View style={[styles.summaryCard, { backgroundColor: '#f5f5f5' }]}>
                  <Ionicons name="car" size={24} color="#2196F3" />
                  <Text style={[styles.summaryValue, { color: '#000000' }]}>
                    {summary.rides}
                  </Text>
                  <Text style={[styles.summaryLabel, { color: '#666666' }]}>
                    Corridas
                  </Text>
                </View>
                <View style={[styles.summaryCard, { backgroundColor: '#f5f5f5' }]}>
                  <Ionicons name="time" size={24} color="#2196F3" />
                  <Text style={[styles.summaryValue, { color: '#000000' }]}>
                    {formatTime(summary.timeOnline)}
                  </Text>
                  <Text style={[styles.summaryLabel, { color: '#666666' }]}>
                    Tempo Online
                  </Text>
                </View>
              </View>
            </View>

            {/* Análise Detalhada */}
            <View style={styles.analysisSection}>
              <Text style={[styles.sectionTitle, { color: '#000000' }]}>
                Análise Detalhada
              </Text>
              
              <View style={[styles.analysisCard, { backgroundColor: '#f5f5f5' }]}>
                <Text style={[styles.analysisTitle, { color: '#000000' }]}>
                  Ganhos por Corrida
                </Text>
                <Text style={[styles.analysisText, { color: '#666666' }]}>
                  Média de R$ {calculateAverageEarnings().toFixed(2)} por corrida
                </Text>
              </View>

              <View style={[styles.analysisCard, { backgroundColor: '#f5f5f5' }]}>
                <Text style={[styles.analysisTitle, { color: '#000000' }]}>
                  Melhor Horário
                </Text>
                <Text style={[styles.analysisText, { color: '#666666' }]}>
                  Horário com mais ganhos: {findBestHour()}h
                </Text>
              </View>

              <View style={[styles.analysisCard, { backgroundColor: '#f5f5f5' }]}>
                <Text style={[styles.analysisTitle, { color: '#000000' }]}>
                  Tipos de Serviços
                </Text>
                {summary.rideTypes.map((type, index) => (
                  <Text key={index} style={[styles.analysisText, { color: '#666666' }]}>
                    {type.type}: {type.count} corridas
                  </Text>
                ))}
              </View>

              <View style={[styles.analysisCard, { backgroundColor: '#f5f5f5' }]}>
                <Text style={[styles.analysisTitle, { color: '#000000' }]}>
                  Ganhos por Hora
                </Text>
                {summary.hourlyEarnings.map((earning, index) => (
                  <Text key={index} style={[styles.analysisText, { color: '#666666' }]}>
                    {index + 8}h: R$ {earning.toFixed(2)}
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
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
    maxHeight: '80%',
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
  scrollContent: {
    flex: 1,
  },
  summarySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  analysisSection: {
    marginBottom: 20,
  },
  analysisCard: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  analysisText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default DriverSummaryModal; 