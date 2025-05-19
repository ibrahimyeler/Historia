import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface PlaceCardProps {
  title: string;
  description: string;
  image: ImageSourcePropType;
  distance: string;
  rating: number;
  onPress: () => void;
  onFavoritePress: () => void;
  isFavorite?: boolean;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  title,
  description,
  image,
  distance,
  rating,
  onPress,
  onFavoritePress,
  isFavorite = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
        <View style={styles.distanceContainer}>
          <Text style={styles.distanceText}>{distance} uzaklıkta</Text>
        </View>
        <TouchableOpacity onPress={onFavoritePress} style={styles.favoriteButton}>
          <Icon 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={20} 
            color={isFavorite ? "#EF4444" : "#FFFFFF"} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#F59E0B" />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: '#7C3AED',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  distanceContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  distanceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#18181B',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default PlaceCard; 