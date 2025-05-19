import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const HomeHeader: React.FC = () => {
  return (
    <LinearGradient
      colors={['#16A34A', '#22C55E', '#4ADE80']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.decorContainer}>
        <View style={styles.decorCircle} />
        <View style={[styles.decorCircle, styles.decorCircle2]} />
      </View>

      <View style={styles.headerContent}>
        <Text style={styles.title}>HISTORIA</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    justifyContent: 'center',
    paddingTop: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  decorContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: -width * 0.3,
    right: -width * 0.2,
  },
  decorCircle2: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    top: -width * 0.1,
    right: width * 0.1,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});

export default HomeHeader; 