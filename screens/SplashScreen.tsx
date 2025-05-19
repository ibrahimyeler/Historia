import React, { useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  Dimensions, 
  Animated, 
  Easing 
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const gradientAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Gradient animasyonu
      Animated.timing(gradientAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
      // 2. Logo ve text animasyonları
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(textAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(() => {
        navigation.replace('Login');
      }, 1000);
    });
  }, []);

  const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

  return (
    <View style={styles.container}>
      <AnimatedGradient
        colors={[
          '#F0FDF4',
          '#DCFCE7',
          '#BBF7D0',
          '#86EFAC',
          '#4ADE80',
          '#22C55E',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          {
            opacity: gradientAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 1],
            }),
          },
        ]}
      >
        {/* Dalgalı Arka Plan Deseni */}
        <View style={styles.wavesContainer}>
          <Animated.View 
            style={[
              styles.wave,
              {
                transform: [{
                  translateY: gradientAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -30],
                  }),
                }],
              },
            ]}
          />
          <Animated.View 
            style={[
              styles.wave,
              styles.wave2,
              {
                transform: [{
                  translateY: gradientAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -15],
                  }),
                }],
              },
            ]}
          />
        </View>

        {/* Logo ve Yazılar */}
        <View style={styles.contentContainer}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Icon name="time-outline" size={80} color="#FFFFFF" />
          </Animated.View>

          <Animated.Text
            style={[
              styles.title,
              {
                opacity: textAnim,
                transform: [
                  {
                    translateY: textAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            HISTORIA
          </Animated.Text>

          <Animated.Text
            style={[
              styles.subtitle,
              {
                opacity: textAnim,
                transform: [
                  {
                    translateY: textAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            Tarihe Yolculuk
          </Animated.Text>
        </View>
      </AnimatedGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wavesContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    width: width * 2,
    height: height,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: height / 2,
    top: height * 0.7,
    left: -width * 0.5,
    transform: [{ scaleX: 1.5 }],
  },
  wave2: {
    top: height * 0.75,
    backgroundColor: 'rgba(255,255,255,0.15)',
    transform: [{ scaleX: 1.3 }],
  },
  contentContainer: {
    alignItems: 'center',
    zIndex: 2,
  },
  logoContainer: {
    width: 140,
    height: 140,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 24,
    letterSpacing: 8,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 8,
    fontWeight: '500',
    letterSpacing: 2,
    opacity: 0.9,
  },
});

export default SplashScreen; 