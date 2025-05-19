import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  Dimensions, 
  Image,
  TextInput,
  Pressable,
  ActivityIndicator 
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.22;

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

// Custom Input Component
const LoginInput: React.FC<{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  icon?: string;
}> = ({ label, value, onChangeText, placeholder, secureTextEntry, error, icon }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={inputStyles.container}>
      <Text style={inputStyles.label}>{label}</Text>
      <View style={[
        inputStyles.inputContainer,
        isFocused && inputStyles.inputContainerFocused,
        error && inputStyles.inputContainerError,
      ]}>
        {icon && (
          <Icon
            name={icon}
            size={18}
            color={isFocused ? '#22C55E' : '#94A3B8'}
            style={inputStyles.icon}
          />
        )}
        <TextInput
          style={inputStyles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error && <Text style={inputStyles.errorText}>{error}</Text>}
    </View>
  );
};

// Custom Button Component
const LoginButton: React.FC<{
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
}> = ({ onPress, title, loading = false, disabled = false }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        buttonStyles.pressable,
        pressed && buttonStyles.pressed
      ]}
    >
      <LinearGradient
        colors={disabled ? ['#E2E8F0', '#E2E8F0'] : ['#22C55E', '#16A34A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[buttonStyles.button, disabled && buttonStyles.disabledButton]}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={buttonStyles.buttonText}>{title}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!email) {
      newErrors.email = 'E-posta adresi gerekli';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    if (!password) {
      newErrors.password = 'Şifre gerekli';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        setLoading(true);
        
        const response = await fetch('https://ozge.site/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            // Kimlik doğrulama hatası
            setErrors({
              general: 'E-posta veya şifre hatalı'
            });
          } else if (data.errors) {
            // Validasyon hataları
            const newErrors: {[key: string]: string} = {};
            Object.keys(data.errors).forEach(key => {
              newErrors[key] = data.errors[key][0];
            });
            setErrors(newErrors);
          } else {
            throw new Error(data.message || 'Giriş işlemi başarısız');
          }
          return;
        }

        // Token'ı kaydet
        if (data.token) {
          // AsyncStorage veya başka bir depolama yöntemi kullanarak token'ı kaydet
          // await AsyncStorage.setItem('userToken', data.token);
        }

        // Başarılı giriş
        navigation.replace('MainApp');
        
      } catch (error) {
        console.error('login error:', error);
        setErrors({
          general: 'Bir hata oluştu. Lütfen tekrar deneyin.'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBackground} />
      <View style={styles.headerContainer}>
        <View style={styles.logoWrapper}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/logo/historia_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.titleWrapper}>
          <Text style={styles.subtitle}>Giriş Yap</Text>
          <Text style={styles.subtitleDescription}>Historia'ya hoş geldiniz</Text>
        </View>
        {errors.general && (
          <Text style={[inputStyles.errorText, { textAlign: 'center', marginBottom: 16 }]}>
            {errors.general}
          </Text>
        )}
        <View style={styles.inputsContainer}>
          <LoginInput
            label="E-posta"
            placeholder="E-posta adresiniz"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
            icon="mail-outline"
          />
          <LoginInput
            label="Şifre"
            placeholder="Şifreniz"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
            }}
            secureTextEntry
            error={errors.password}
            icon="lock-closed-outline"
          />
          <View style={styles.buttonContainer}>
            <LoginButton
              title="Giriş Yap"
              onPress={handleLogin}
              loading={loading}
              disabled={!email || !password}
            />
          </View>
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Hesabınız yok mu? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 6,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    height: 52,
    shadowColor: '#22C55E',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  inputContainerFocused: {
    borderColor: '#22C55E',
    shadowOpacity: 0.08,
  },
  inputContainerError: {
    borderColor: '#EF4444',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#334155',
    padding: 0,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
  },
});

const buttonStyles = StyleSheet.create({
  pressable: {
    width: '100%',
  },
  pressed: {
    opacity: 0.9,
  },
  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#22C55E',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  disabledButton: {
    opacity: 0.7,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: '#F0FDF4',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#22C55E',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  headerContainer: {
    height: HEADER_HEIGHT,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -60,
  },
  logoWrapper: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F0FDF4',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -60,
  },
  logo: {
    width: width * 0.7,
    height: width * 0.7 * 0.5,
  },
  logoTextContainer: {
    width: '100%',
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    paddingVertical: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#22C55E',
    letterSpacing: 2,
  },
  titleWrapper: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#16A34A',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitleDescription: {
    fontSize: 18,
    color: '#4B5563',
    fontWeight: '500',
    letterSpacing: 0.25,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 32,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#22C55E',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  inputsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 24,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#F0FDF4',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 'auto',
  },
  registerText: {
    fontSize: 16,
    color: '#4B5563',
    letterSpacing: 0.25,
  },
  registerLink: {
    fontSize: 16,
    color: '#16A34A',
    fontWeight: '700',
    letterSpacing: 0.25,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen; 