import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { PageType } from '../types';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  setActivePage: (page: PageType) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setActivePage }) => {
  const { colors } = useTheme();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const features = [
    {
      icon: 'car',
      title: 'Assistência 24h',
      description: 'Solicite um guincho a qualquer momento, em qualquer lugar',
    },
    {
      icon: 'location',
      title: 'Rastreamento em Tempo Real',
      description: 'Acompanhe a localização do seu guincho em tempo real',
    },
    {
      icon: 'shield-checkmark',
      title: 'Segurança Garantida',
      description: 'Motoristas verificados e serviços de qualidade',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.header}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.appName}>Mater</Text>
          <Text style={styles.tagline}>Sua assistência veicular completa</Text>
        </Animated.View>
      </LinearGradient>

      <Animated.ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <Animated.View
              key={index}
              style={[
                styles.featureCard,
                {
                  backgroundColor: colors.card,
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, 50 * (index + 1)],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={[styles.featureIcon, { backgroundColor: colors.primary }]}>
                <Ionicons name={feature.icon as any} size={24} color="#FFFFFF" />
              </View>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  {feature.title}
                </Text>
                <Text style={[styles.featureDescription, { color: colors.placeholder }]}>
                  {feature.description}
                </Text>
              </View>
            </Animated.View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => setActivePage('Register')}
          >
            <Text style={styles.buttonText}>Começar Agora</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: colors.primary }]}
            onPress={() => setActivePage('Login')}
          >
            <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>
              Já tenho uma conta
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  featuresContainer: {
    marginTop: 20,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 40,
  },
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen; 