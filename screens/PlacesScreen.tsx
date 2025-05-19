import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Place {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const dummyPlaces: Place[] = [
  {
    id: '1',
    title: 'Ayasofya Camii',
    description: 'Tarihi Bizans yapısı, İstanbul\'un simgelerinden biri.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Hagia_Sophia_Mars_2020_IMG_1280.jpg/800px-Hagia_Sophia_Mars_2020_IMG_1280.jpg',
  },
  {
    id: '2',
    title: 'Pamukkale',
    description: 'Bembeyaz travertenleriyle ünlü doğal güzellik.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Pamukkale_Travertine_Terraces.jpg/800px-Pamukkale_Travertine_Terraces.jpg',
  },
  {
    id: '3',
    title: 'Kapadokya',
    description: 'Balon turları ve peri bacaları ile meşhur.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Cappadocia_baloon.jpg/800px-Cappadocia_baloon.jpg',
  },
];

const PlacesScreen = () => {
  const renderItem = ({ item }: { item: Place }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyPlaces}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    height: 200,
    width: '100%',
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default PlacesScreen;