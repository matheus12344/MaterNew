import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { PageType } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegisterProps {
  setActivePage: (page: PageType) => void;
}

type UserType = 'client' | 'driver';

const Register = ({ setActivePage }: RegisterProps) => {
  const { colors } = useTheme();
  const [userType, setUserType] = useState<UserType>('client');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    // Campos específicos para motorista
    cnh: '',
    vehicleType: '',
    vehiclePlate: '',
    vehicleModel: '',
    vehicleYear: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (userType === 'driver' && (!formData.cnh || !formData.vehicleType || !formData.vehiclePlate)) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios do motorista');
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: userType,
        status: 'active',
        lastLogin: new Date(),
        createdAt: new Date(),
        password: formData.password,
        vehicles: [],
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
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
        // Dados específicos para motorista
        ...(userType === 'driver' && {
          cnh: formData.cnh,
          vehicleType: formData.vehicleType,
          vehiclePlate: formData.vehiclePlate,
          vehicleModel: formData.vehicleModel,
          vehicleYear: formData.vehicleYear,
        }),
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      setActivePage('Login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro. Tente novamente.');
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
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Criar Conta</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Preencha os dados abaixo para começar
          </Text>
        </View>

        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'client' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setUserType('client')}
          >
            <Text style={[styles.userTypeText, { color: userType === 'client' ? '#FFFFFF' : colors.text }]}>
              Cliente
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'driver' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setUserType('driver')}
          >
            <Text style={[styles.userTypeText, { color: userType === 'driver' ? '#FFFFFF' : colors.text }]}>
              Motorista
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Nome completo"
              placeholderTextColor={colors.placeholder}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Email"
              placeholderTextColor={colors.placeholder}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Senha"
              placeholderTextColor={colors.placeholder}
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Confirmar senha"
              placeholderTextColor={colors.placeholder}
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              secureTextEntry
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Telefone"
              placeholderTextColor={colors.placeholder}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Endereço"
              placeholderTextColor={colors.placeholder}
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, { backgroundColor: colors.card, flex: 1, marginRight: 8 }]}>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Cidade"
                placeholderTextColor={colors.placeholder}
                value={formData.city}
                onChangeText={(value) => handleInputChange('city', value)}
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: colors.card, flex: 1, marginLeft: 8 }]}>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Estado"
                placeholderTextColor={colors.placeholder}
                value={formData.state}
                onChangeText={(value) => handleInputChange('state', value)}
              />
            </View>
          </View>

          <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="CEP"
              placeholderTextColor={colors.placeholder}
              value={formData.zipCode}
              onChangeText={(value) => handleInputChange('zipCode', value)}
              keyboardType="numeric"
            />
          </View>

          {userType === 'driver' && (
            <>
              <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="CNH"
                  placeholderTextColor={colors.placeholder}
                  value={formData.cnh}
                  onChangeText={(value) => handleInputChange('cnh', value)}
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Tipo de Veículo"
                  placeholderTextColor={colors.placeholder}
                  value={formData.vehicleType}
                  onChangeText={(value) => handleInputChange('vehicleType', value)}
                />
              </View>

              <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Placa do Veículo"
                  placeholderTextColor={colors.placeholder}
                  value={formData.vehiclePlate}
                  onChangeText={(value) => handleInputChange('vehiclePlate', value)}
                  autoCapitalize="characters"
                />
              </View>

              <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Modelo do Veículo"
                  placeholderTextColor={colors.placeholder}
                  value={formData.vehicleModel}
                  onChangeText={(value) => handleInputChange('vehicleModel', value)}
                />
              </View>

              <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Ano do Veículo"
                  placeholderTextColor={colors.placeholder}
                  value={formData.vehicleYear}
                  onChangeText={(value) => handleInputChange('vehicleYear', value)}
                  keyboardType="numeric"
                />
              </View>
            </>
          )}

          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: colors.primary }]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.registerButtonText}>
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.text }]}>
              Já tem uma conta?
            </Text>
            <TouchableOpacity onPress={() => setActivePage('Login')}>
              <Text style={[styles.loginLink, { color: colors.primary }]}>
                Entrar
              </Text>
            </TouchableOpacity>
          </View>
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
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  userTypeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  registerButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    marginRight: 4,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Register; 