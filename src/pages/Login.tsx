import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PageType } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  setActivePage: (page: PageType) => void;
}

const Login = ({ setActivePage }: LoginProps) => {
  const { theme, colors } = useTheme();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const TesteData = [
    {
      id: '1',
      name: 'Administrador',
      email: 'admin@admin.com',
      role: 'admin',
      status: 'active',
      lastLogin: new Date(),
      createdAt: new Date(),
      password: 'admin',
      vehicles: [],
      phone: '1234567890',
      address: 'Rua Teste, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '12345-678',
      country: 'Brasil', 
      profilePicture: 'https://via.placeholder.com/150',
      notifications: [],
      preferences: {
        notifications: true,
        emailNotifications: true,
        smsNotifications: true,
      },
      isAdmin: true,
      isLoggedIn: false,
      isLoggedOut: false,
    },
    {
      id: '2',
      name: 'Matheus',
      email: 'matheus@matheus.com',
      role: 'user',
      status: 'active',
      lastLogin: new Date(),
      createdAt: new Date(),
      password: 'matheus',
      vehicles: [],
      phone: '1234567890',
      address: 'Rua Teste, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '12345-678',
      country: 'Brasil', 
      profilePicture: 'https://via.placeholder.com/150',
      notifications: [],
      preferences: {
        notifications: true,
        emailNotifications: true,
        smsNotifications: true,
      },
      isAdmin: false,
      isLoggedIn: false,
      isLoggedOut: false,
    },
    {
      id: '3',
      name: 'driver',
      email: 'driver@driver.com',
      role: 'driver',
      status: 'active',
      lastLogin: new Date(),
      createdAt: new Date(),
      password: 'driver',
      vehicles: [],
      phone: '1234567890',
      address: 'Rua Teste, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '12345-678',
      country: 'Brasil', 
      profilePicture: 'https://via.placeholder.com/150',
      notifications: [],
      preferences: {
        notifications: true,
        emailNotifications: true,
        smsNotifications: true,
      },
    }
  ];

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        console.log('Usuário encontrado:', user);
      }
    } catch (error) {
      console.error('Erro ao verificar status de login:', error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);

    try {
      await signIn(email, password);
      
      const userData = {
        id: '1',
        name: email.includes('admin') ? 'Administrador' : 'Usuário Normal',
        email: email,
        role: email.includes('admin') ? 'admin' : (email.includes('driver') ? 'driver' : 'user'),
        status: 'active',
        lastLogin: new Date(),
        createdAt: new Date(),
        vehicles: [],
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      if (email.includes('admin')) {
        setActivePage('AdminDashboard');
      } else if (email.includes('driver')) {
        setActivePage('DriverDashboard');
      } else {
        setActivePage('Home');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Não foi possível fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Text style={[styles.title, { color: colors.text }]}>Bem-vindo</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Email"
              placeholderTextColor={colors.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Senha"
              placeholderTextColor={colors.placeholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.forgotPassword, { borderColor: colors.border }]}
            onPress={() => Alert.alert('Info', 'Funcionalidade em desenvolvimento')}
          >
            <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.primary }]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={[styles.registerText, { color: colors.text }]}>
              Não tem uma conta?
            </Text>
            <TouchableOpacity
              onPress={() => setActivePage('Register')}
            >
              <Text style={[styles.registerLink, { color: colors.primary }]}>
                Cadastre-se
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.hintContainer}>
          <Text style={[styles.hintText, { color: colors.placeholder }]}>
            Dica: Use um email com "admin" para acessar o painel administrativo
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    padding: 8,
    borderBottomWidth: 1,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  loginButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    marginRight: 4,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  hintContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Login; 