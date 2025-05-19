import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  Dimensions, 
  Image, 
  ScrollView,
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

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  tel: string;
  username: string;
  // Opsiyonel alanlar
  country?: string;
  city?: string;
  address1?: string;
  address2?: string;
  postal_code?: string;
  birth_date?: string;
  medeni_hali?: string;
  cocuk_durumu?: string;
  is_pet?: boolean;
  youtube?: string;
  instagram?: string;
  tiktok?: string;
  cektigim_videolar?: string[];
  kategori?: string[];
  profile_image?: string;
  personel_message?: string;
  about?: string;
  notes?: string;
  rozets?: string[];
}

// Custom Input Component
const RegisterInput: React.FC<{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  icon?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  maxLength?: number;
}> = ({ label, value, onChangeText, placeholder, secureTextEntry, error, icon, keyboardType = 'default', maxLength }) => {
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
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
      </View>
      {error && <Text style={inputStyles.errorText}>{error}</Text>}
    </View>
  );
};

// Custom Button Component
const RegisterButton: React.FC<{
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

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    tel: '',
    username: '',
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validatePassword = (password: string) => {
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    return password.length >= 8 && hasLetter && hasNumber && hasSpecial;
  };

  // Telefon numarası için özel kontrol
  const handlePhoneChange = (text: string) => {
    // Sadece rakamları al
    const numericValue = text.replace(/[^0-9]/g, '');
    
    // Maksimum 11 karakter
    if (numericValue.length <= 11) {
      setFormData(prev => ({ ...prev, tel: numericValue }));
      if (errors.tel) {
        setErrors(prev => ({ ...prev, tel: undefined }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Ad gerekli';
    }

    if (!formData.username?.trim()) {
      newErrors.username = 'Kullanıcı adı gerekli';
    }

    if (!formData.tel) {
      newErrors.tel = 'Telefon numarası gerekli';
    } else if (formData.tel.length !== 11) {
      newErrors.tel = 'Telefon numarası 11 haneli olmalıdır';
    }

    if (!formData.email) {
      newErrors.email = 'E-posta adresi gerekli';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre gerekli';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Şifre en az 8 karakter olmalı, harf, rakam ve özel karakter içermelidir';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        setLoading(true);
        
        const response = await fetch('https://ozge.site/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            tel: formData.tel,
            username: formData.username
          })
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 409) {
            // Kullanıcı adı veya email çakışması
            setErrors(prev => ({
              ...prev,
              [data.field]: data.message
            }));
          } else if (data.errors) {
            // Validasyon hataları
            const newErrors: {[key: string]: string} = {};
            Object.keys(data.errors).forEach(key => {
              newErrors[key] = data.errors[key][0];
            });
            setErrors(newErrors);
          } else {
            throw new Error(data.message || 'Kayıt işlemi başarısız');
          }
          return;
        }

        // Başarılı kayıt
        navigation.replace('Login');
        
      } catch (error) {
        console.error('register error:', error);
        setErrors(prev => ({
          ...prev,
          general: 'Bir hata oluştu. Lütfen tekrar deneyin.'
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (text: string) => {
    setFormData(prev => ({ ...prev, [field]: text }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
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
          <View style={styles.logoTextContainer}>
            <Text style={styles.logoText}>HISTORIA</Text>
          </View>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.titleWrapper}>
          <Text style={styles.subtitle}>Kayıt Ol</Text>
          <Text style={styles.subtitleDescription}>Historia'ya hoş geldiniz</Text>
        </View>
        <ScrollView style={styles.inputsContainer} showsVerticalScrollIndicator={false}>
          <RegisterInput
            label="Ad Soyad"
            placeholder="Ad Soyad"
            value={formData.name}
            onChangeText={handleInputChange('name')}
            error={errors.name}
            icon="person-outline"
          />
          <RegisterInput
            label="Kullanıcı Adı"
            placeholder="Kullanıcı adınız"
            value={formData.username}
            onChangeText={handleInputChange('username')}
            error={errors.username}
            icon="person-circle-outline"
          />
          <RegisterInput
            label="Telefon"
            placeholder="Telefon numaranız"
            value={formData.tel}
            onChangeText={handlePhoneChange}
            error={errors.tel}
            icon="call-outline"
            keyboardType="numeric"
            maxLength={11}
          />
          <RegisterInput
            label="E-posta"
            placeholder="E-posta adresiniz"
            value={formData.email}
            onChangeText={handleInputChange('email')}
            error={errors.email}
            icon="mail-outline"
          />
          <RegisterInput
            label="Şifre"
            placeholder="Şifreniz"
            value={formData.password}
            onChangeText={handleInputChange('password')}
            secureTextEntry
            error={errors.password}
            icon="lock-closed-outline"
          />
          <View style={styles.buttonContainer}>
            <RegisterButton
              title="Kayıt Ol"
              onPress={handleRegister}
              loading={loading}
              disabled={!formData.email || !formData.password || !formData.name || !formData.username || !formData.tel}
            />
          </View>
        </ScrollView>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Zaten hesabınız var mı? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Giriş Yap</Text>
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
    height: HEADER_HEIGHT * 0.7,
    backgroundColor: '#F0FDF4',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContainer: {
    height: HEADER_HEIGHT * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0FDF4',
  },
  logoWrapper: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F0FDF4',
  },
  logoContainer: {
    alignItems: 'center',
    width: width * 0.4,
    height: width * 0.4,
  },
  logo: {
    width: '100%',
    height: '100%',
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
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#22C55E',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  titleWrapper: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#22C55E',
    marginBottom: 8,
  },
  subtitleDescription: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '400',
  },
  inputsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#F0FDF4',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 'auto',
  },
  loginText: {
    fontSize: 15,
    color: '#64748B',
  },
  loginLink: {
    fontSize: 15,
    color: '#22C55E',
    fontWeight: '600',
  },
});

export default RegisterScreen; 