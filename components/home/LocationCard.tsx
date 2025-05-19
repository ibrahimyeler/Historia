import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const { width } = Dimensions.get('window');

interface LocationCardProps {
  location: string;
  onPress: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 41.0082,
    longitude: 29.0264, // İstanbul koordinatları
    address: location
  });

  useEffect(() => {
    // Mevcut konumu al
    Geolocation.getCurrentPosition(
      position => {
        setSelectedLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: location
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const handleMapPress = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    
    try {
      // Burada Google Geocoding API ile koordinatları adrese çevirebilirsiniz
      // Şimdilik örnek olarak sabit bir değer atayalım
      const newAddress = "Seçilen Yeni Konum";
      setSelectedLocation({
        latitude,
        longitude,
        address: newAddress
      });
      onPress();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.9}>
        <LinearGradient
          colors={['#DCFCE7', '#BBF7D0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <View style={styles.contentWrapper}>
            <View style={styles.iconContainer}>
              <Icon name="location" size={20} color="#16A34A" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Konumunuz</Text>
              <Text style={styles.location} numberOfLines={1}>
                {selectedLocation.address}
              </Text>
            </View>
            <View style={styles.arrowContainer}>
              <Icon name="chevron-forward" size={18} color="#16A34A" />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Konum Seçim Modalı */}
      <Modal
        visible={mapVisible}
        animationType="slide"
        onRequestClose={() => setMapVisible(false)}
      >
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
          >
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude
              }}
              title={selectedLocation.address}
            />
          </MapView>

          <View style={styles.mapHeader}>
            <Text style={styles.mapHeaderTitle}>Konum Seç</Text>
            <TouchableOpacity 
              onPress={() => setMapVisible(false)}
              style={styles.mapCloseButton}
            >
              <Icon name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.confirmLocationButton}
            onPress={() => {
              setMapVisible(false);
              setModalVisible(false);
            }}
          >
            <Text style={styles.confirmLocationText}>Konumu Onayla</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* İlk Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.modalContent]}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Konum Seçin</Text>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.locationIconContainer}>
                    <Icon name="location" size={32} color="#FFFFFF" />
                  </View>
                  
                  <Text style={styles.currentLocation}>Şu anki konum:</Text>
                  <Text style={styles.locationText}>{selectedLocation.address}</Text>

                  <TouchableOpacity 
                    style={styles.changeButton}
                    onPress={() => {
                      setModalVisible(false);
                      setMapVisible(true);
                      onPress();
                    }}
                  >
                    <LinearGradient
                      colors={['#16A34A', '#22C55E']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.gradientButton}
                    >
                      <Text style={styles.changeButtonText}>Konum Değiştir</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#16A34A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  label: {
    fontSize: 11,
    color: '#16A34A',
    marginBottom: 2,
    fontWeight: '500',
  },
  location: {
    fontSize: 14,
    fontWeight: '600',
    color: '#15803D',
  },
  arrowContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.85,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: '#16A34A',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  modalBody: {
    padding: 24,
    alignItems: 'center',
  },
  locationIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#16A34A',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  currentLocation: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
    fontWeight: '500',
  },
  locationText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#16A34A',
    marginBottom: 32,
    textAlign: 'center',
  },
  changeButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#16A34A',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mapHeader: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 0,
    left: 0,
    right: 0,
    backgroundColor: '#16A34A',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  mapCloseButton: {
    padding: 8,
  },
  confirmLocationButton: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
    backgroundColor: '#16A34A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmLocationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LocationCard; 