import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { PageType } from '../types';

interface WelcomeProps {
  setActivePage: (page: PageType) => void;
}

const { width, height } = Dimensions.get('window');

const Welcome = ({ setActivePage }: WelcomeProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.content}>

        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            Bem-vindo ao Mater
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Sua plataforma completa para gerenciamento de veículos
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => setActivePage('Login')}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#000' }]}
            onPress={() => setActivePage('Register')}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: height * 0.1,
    paddingBottom: height * 0.05,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Welcome; 