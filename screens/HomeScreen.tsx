import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import HomeHeader from '../components/home/HomeHeader';
import LocationCard from '../components/home/LocationCard';
import PlaceCard from '../components/home/PlaceCard';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleNotificationPress = () => {
    // Bildirimler ekranına yönlendirme
    console.log('Notifications pressed');
  };

  const handleLocationPress = () => {
    // Konum seçme ekranına yönlendirme
    console.log('Location pressed');
  };

  const handlePlacePress = (placeId: string) => {
    // Mekan detay sayfasına yönlendirme
    console.log('Place pressed:', placeId);
  };

  const handleFavoritePress = (placeId: string) => {
    // Favorilere ekleme/çıkarma işlemi
    console.log('Favorite pressed:', placeId);
  };

  // Örnek veri
  const places = [
    {
      id: '1',
      title: 'Beylerbeyi Sarayı',
      description: 'Sultan Abdülaziz tarafından yaptırılan Beylerbeyi Sarayı Bizans, Rönesans ve Osmanlı motiflerinin iç içe geçtiği bir yapıdır.',
      image: require('../assets/places/beylerbeyi.jpg'),
      distance: '500mt',
      rating: 4.9,
      isFavorite: false,
    },
    {
      id: '2',
      title: 'İstanbul Mihrimah Sultan Camii',
      description: 'Kanuni Sultan Süleyman\'ın kızı Mihrimah Sultan tarafından hayır eseri olarak 1547-1548 yılında yapımına başlanmış ve 1565 yılında inşa edilmiştir.',
      image: require('../assets/places/mihrimah.jpeg'),
      distance: '200mt',
      rating: 4.8,
      isFavorite: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gradient}>
        <HomeHeader
          userName="Özge Özen"
          onNotificationPress={handleNotificationPress}
          style={styles.header}
        />
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <LocationCard
            location="Üsküdar"
            onPress={handleLocationPress}
            style={styles.locationCard}
          />
          <View style={styles.placesContainer}>
            {places.map(place => (
              <PlaceCard
                key={place.id}
                title={place.title}
                description={place.description}
                image={place.image}
                distance={place.distance}
                rating={place.rating}
                isFavorite={place.isFavorite}
                onPress={() => handlePlacePress(place.id)}
                onFavoritePress={() => handleFavoritePress(place.id)}
                style={styles.placeCard}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  locationCard: {
    backgroundColor: '#E1BEE7', // Light purple
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placesContainer: {
    paddingVertical: 8,
    gap: 16,
  },
  placeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#6A1B9A',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E1BEE7',
  },
});

export default HomeScreen; 