import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Dimensions,
  Animated 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/favourites/Header';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'all', name: 'Tümü', icon: 'grid-outline' },
  { id: 'mosques', name: 'Camiler', icon: 'business-outline' },
  { id: 'museums', name: 'Müzeler', icon: 'library-outline' },
  { id: 'parks', name: 'Parklar', icon: 'leaf-outline' },
];

const DUMMY_FAVORITES = [
  {
    id: '1',
    name: 'Ayasofya Camii',
    location: 'Fatih, İstanbul',
    imageUrl: 'https://example.com/ayasofya.jpg',
    rating: 4.8,
    visitCount: 1250,
    category: 'mosques',
    description: 'Dünya tarihinin en önemli anıtlarından biri.',
    openHours: '24 saat açık',
  },
  {
    id: '2',
    name: 'Topkapı Sarayı',
    location: 'Fatih, İstanbul',
    imageUrl: 'https://example.com/topkapi.jpg',
    rating: 4.6,
    visitCount: 980,
    category: 'mosques',
    description: 'İstanbul da bulunan ve Osmanlı İmparatorluğu döneminde yapılmış olan bir saray.',
    openHours: '09:00 - 17:00',
  },
];

const FavoritesScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const renderCategoryItem = ({ item }: any) => (
    <TouchableOpacity 
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <LinearGradient
        colors={selectedCategory === item.id 
          ? ['#16A34A', '#22C55E']
          : ['#F0FDF4', '#F0FDF4']}
        style={styles.categoryGradient}
      >
        <Icon 
          name={item.icon} 
          size={20} 
          color={selectedCategory === item.id ? '#FFFFFF' : '#16A34A'} 
        />
        <Text style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive
        ]}>
          {item.name}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderFavoriteCard = ({ item }: any) => (
    <Animated.View style={styles.placeCard}>
      <LinearGradient
        colors={['rgba(22, 163, 74, 0.05)', 'rgba(22, 163, 74, 0.1)']}
        style={styles.cardGradient}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.placeImage}
            defaultSource={require('../assets/places/beylerbeyi.jpg')}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
            style={styles.imageOverlay}
          >
            <View style={styles.ratingBadge}>
              <Icon name="star" size={12} color="#FCD34D" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.cardContent}>
          <View>
            <Text style={styles.placeName}>{item.name}</Text>
            <View style={styles.locationRow}>
              <Icon name="location-outline" size={16} color="#16A34A" />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Icon name="people-outline" size={16} color="#16A34A" />
                <Text style={styles.statText}>{item.visitCount} ziyaretçi</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="time-outline" size={16} color="#16A34A" />
                <Text style={styles.statText}>{item.openHours}</Text>
              </View>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="map-outline" size={20} color="#16A34A" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.removeButton]}>
                <Icon name="heart" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Header />
      
      <FlatList
        data={DUMMY_FAVORITES}
        renderItem={renderFavoriteCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          // Yenileme işlemleri
          setTimeout(() => setRefreshing(false), 1500);
        }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.statsContainer}>
              <LinearGradient
                colors={['#F0FDF4', '#DCFCE7']}
                style={styles.statBox}
              >
                <Text style={styles.statNumber}>{DUMMY_FAVORITES.length}</Text>
                <Text style={styles.statLabel}>Favori Yer</Text>
              </LinearGradient>
              <LinearGradient
                colors={['#F0FDF4', '#DCFCE7']}
                style={styles.statBox}
              >
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Ziyaret Edildi</Text>
              </LinearGradient>
              <LinearGradient
                colors={['#F0FDF4', '#DCFCE7']}
                style={styles.statBox}
              >
                <Text style={styles.statNumber}>2</Text>
                <Text style={styles.statLabel}>Planlanan</Text>
              </LinearGradient>
            </View>

            <FlatList
              data={CATEGORIES}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesList}
              contentContainerStyle={styles.categoriesContent}
            />
          </>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <LinearGradient
              colors={['#16A34A', '#22C55E']}
              style={styles.emptyIconContainer}
            >
              <Icon name="heart" size={40} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.emptyText}>
              Henüz favori yeriniz bulunmuyor.
            </Text>
            <Text style={styles.emptySubText}>
              Beğendiğiniz yerleri favorilerinize ekleyebilirsiniz.
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
  listContent: {
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#16A34A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#65A30D',
    fontWeight: '500',
  },
  placeCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardGradient: {
    flexDirection: 'row',
    padding: 12,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  placeImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16A34A',
    marginLeft: 2,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  placeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#16A34A',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 64,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 8,
    textAlign: 'center',
  },
  categoriesList: {
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    marginRight: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  categoryButtonActive: {
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#16A34A',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 8,
  },
  description: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  cardFooter: {
    marginTop: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default FavoritesScreen; 