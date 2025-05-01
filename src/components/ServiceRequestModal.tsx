import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const DECISION_TIME = 30; // 30 segundos para decidir

interface ServiceRequestModalProps {
  visible: boolean;
  onAccept: () => void;
  onReject: () => void;
  request: {
    id: string;
    type: string;
    distance: string;
    price: string;
    address: string;
    vehicle: string;
    problem: string;
  };
}

const ServiceRequestModal = ({
  visible,
  onAccept,
  onReject,
  request,
}: ServiceRequestModalProps) => {
  const { theme, colors } = useTheme();
  const [timeLeft, setTimeLeft] = useState(DECISION_TIME);
  const progressAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      // Resetar o tempo e a animação quando o modal ficar visível
      setTimeLeft(DECISION_TIME);
      progressAnim.setValue(1);

      // Iniciar a animação da barra de progresso
      Animated.timing(progressAnim, {
        toValue: 0,
        duration: DECISION_TIME * 1000,
        useNativeDriver: false,
      }).start();

      // Iniciar o timer
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Tempo acabou, rejeitar automaticamente
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            onReject();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      // Limpar o timer quando o modal for fechado
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [visible]);

  const handleAccept = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onAccept();
  };

  const handleReject = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onReject();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleReject}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Nova Solicitação
            </Text>
            <TouchableOpacity onPress={handleReject}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Barra de Progresso */}
          <View style={styles.progressContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  backgroundColor: colors.primary,
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
            <Text style={[styles.timerText, { color: colors.text }]}>
              {timeLeft}s
            </Text>
          </View>

          <View style={styles.requestInfo}>
            <View style={styles.serviceType}>
              <Ionicons name="car" size={24} color={colors.primary} />
              <Text style={[styles.serviceTypeText, { color: colors.text }]}>
                {request.type}
              </Text>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Ionicons name="location" size={20} color={colors.primary} />
                <Text style={[styles.detailText, { color: colors.text }]}>
                  {request.address}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="car-outline" size={20} color={colors.primary} />
                <Text style={[styles.detailText, { color: colors.text }]}>
                  {request.vehicle}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="warning" size={20} color={colors.primary} />
                <Text style={[styles.detailText, { color: colors.text }]}>
                  {request.problem}
                </Text>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <View style={styles.priceInfo}>
                <Text style={[styles.priceLabel, { color: colors.placeholder }]}>
                  Distância
                </Text>
                <Text style={[styles.priceValue, { color: colors.text }]}>
                  {request.distance}
                </Text>
              </View>
              <View style={styles.priceInfo}>
                <Text style={[styles.priceLabel, { color: colors.placeholder }]}>
                  Valor
                </Text>
                <Text style={[styles.priceValue, { color: colors.primary }]}>
                  {request.price}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.rejectButton, { backgroundColor: colors.card }]}
              onPress={handleReject}
            >
              <Text style={[styles.buttonText, { color: colors.text }]}>
                Recusar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.acceptButton, { backgroundColor: colors.primary }]}
              onPress={handleAccept}
            >
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
                Aceitar
              </Text>
            </TouchableOpacity>
          </View>
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
    minHeight: 400,
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
  progressContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 20,
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  timerText: {
    position: 'absolute',
    right: 0,
    top: -20,
    fontSize: 12,
    fontWeight: 'bold',
  },
  requestInfo: {
    gap: 20,
  },
  serviceType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  serviceTypeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    gap: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    fontSize: 16,
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceInfo: {
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 30,
  },
  rejectButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  acceptButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ServiceRequestModal; 