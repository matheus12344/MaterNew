import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarkerAlt, faCarSide, faWrench, faPhone, faAmbulance } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';
import { RootStackNavigationProp } from '../types/navigation';
import { ServiceItem, ActivityItem, UserData } from '../types';

interface HomeScreenProps {
  services: ServiceItem[];
  activities: ActivityItem[];
  userData: UserData;
  setUserData: (data: UserData) => void;
  customStyles: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ services, activities, userData, setUserData, customStyles }) => {
  const navigation = useNavigation<RootStackNavigationProp<'Main'>>();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 16,
      backgroundColor: colors.primary,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    content: {
      padding: 16,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    cardContent: {
      color: colors.text,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    buttonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    serviceGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    serviceItem: {
      width: '48%',
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    serviceIcon: {
      marginBottom: 8,
    },
    serviceText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bem-vindo ao Mater</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Localização Atual</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Main', { screen: 'Map' })}
          >
            <Text style={styles.buttonText}>Abrir Mapa</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.serviceGrid}>
          <TouchableOpacity 
            style={styles.serviceItem}
            onPress={() => navigation.navigate('Main', { screen: 'ServicesTab' })}
          >
            <FontAwesomeIcon 
              icon={faWrench} 
              size={32} 
              color={colors.primary} 
              style={styles.serviceIcon} 
            />
            <Text style={styles.serviceText}>Serviços</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.serviceItem}
            onPress={() => navigation.navigate('Main', { screen: 'Map' })}
          >
            <FontAwesomeIcon 
              icon={faMapMarkerAlt} 
              size={32} 
              color={colors.primary} 
              style={styles.serviceIcon} 
            />
            <Text style={styles.serviceText}>Mapa</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.serviceItem}
            onPress={() => navigation.navigate('Main', { screen: 'Emergency' })}
          >
            <FontAwesomeIcon 
              icon={faAmbulance} 
              size={32} 
              color={colors.primary} 
              style={styles.serviceIcon} 
            />
            <Text style={styles.serviceText}>Emergência</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.serviceItem}
            onPress={() => navigation.navigate('Main', { screen: 'ActivityTab' })}
          >
            <FontAwesomeIcon 
              icon={faCarSide} 
              size={32} 
              color={colors.primary} 
              style={styles.serviceIcon} 
            />
            <Text style={styles.serviceText}>Atividades</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
