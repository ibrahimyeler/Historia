import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

// Örnek veri
const DUMMY_PLACES = [
  {
    id: '1',
    name: 'Ayasofya Camii',
    location: 'Fatih, İstanbul',
    type: 'Tarihi Cami',
  },
  {
    id: '2',
    name: 'Topkapı Sarayı',
    location: 'Fatih, İstanbul',
    type: 'Tarihi Saray',
  },
  {
    id: '3',
    name: 'Galata Kulesi',
    location: 'Beyoğlu, İstanbul',
    type: 'Tarihi Kule',
  },
];

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState(DUMMY_PLACES);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = DUMMY_PLACES.filter(place =>
      place.name.toLowerCase().includes(text.toLowerCase()) ||
      place.location.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPlaces(filtered);
  };

  const renderPlaceCard = ({ item }: any) => (
    <TouchableOpacity style={styles.placeCard}>
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <Icon name="location-outline" size={14} color="#64748B" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <View style={styles.typeContainer}>
          <Icon name="information-circle-outline" size={14} color="#64748B" />
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </View>
      <Icon name="chevron-forward" size={20} color="#16A34A" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Keşfet</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search-outline" size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tarihi yer ara..."
            value={searchText}
            onChangeText={handleSearch}
            placeholderTextColor="#94A3B8"
          />
          {searchText.length > 0 && (
            <TouchableOpacity 
              onPress={() => handleSearch('')}
              style={styles.clearButton}
            >
              <Icon name="close-circle" size={20} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredPlaces}
        renderItem={renderPlaceCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Icon name="search" size={64} color="#E2E8F0" />
            <Text style={styles.emptyText}>
              Sonuç bulunamadı
            </Text>
            <Text style={styles.emptySubText}>
              Farklı bir arama yapmayı deneyin
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#16A34A',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    fontSize: 16,
    color: '#1E293B',
  },
  clearButton: {
    padding: 4,
  },
  listContent: {
    padding: 16,
  },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 64,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 8,
  },
});

export default SearchScreen; 