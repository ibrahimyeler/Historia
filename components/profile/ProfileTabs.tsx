import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3 - 4;

type TabType = 'posts' | 'ar' | 'collections';

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>('posts');

  const tabs = [
    { id: 'posts', icon: 'grid-outline', label: 'Paylaşımlar' },
    { id: 'ar', icon: 'cube-outline', label: 'AR Deneyimleri' },
    { id: 'collections', icon: 'bookmark-outline', label: 'Koleksiyonlar' },
  ];

  // Örnek veri
  const posts = Array(12).fill({
    id: Math.random().toString(),
    image: 'https://picsum.photos/200',
    likes: '1.2K',
  });

  const arExperiences = Array(8).fill({
    id: Math.random().toString(),
    image: 'https://picsum.photos/200',
    title: 'Tarihi Yapı',
    views: '2.4K',
  });

  const collections = [
    { id: '1', title: 'Antik Kentler', count: 12, image: 'https://picsum.photos/200' },
    { id: '2', title: 'Osmanlı Eserleri', count: 8, image: 'https://picsum.photos/200' },
    { id: '3', title: 'Modern Mimari', count: 15, image: 'https://picsum.photos/200' },
  ];

  const renderPost = ({ item, index }) => (
    <TouchableOpacity style={styles.postItem}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postOverlay}>
        <Icon name="heart" size={16} color="#fff" />
        <Text style={styles.postStats}>{item.likes}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderArExperience = ({ item, index }) => (
    <TouchableOpacity style={styles.arItem}>
      <Image source={{ uri: item.image }} style={styles.arImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.arOverlay}
      >
        <Text style={styles.arTitle}>{item.title}</Text>
        <View style={styles.arStats}>
          <Icon name="eye" size={14} color="#fff" />
          <Text style={styles.arViews}>{item.views}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderCollection = ({ item }) => (
    <TouchableOpacity style={styles.collectionItem}>
      <Image source={{ uri: item.image }} style={styles.collectionImage} />
      <View style={styles.collectionInfo}>
        <Text style={styles.collectionTitle}>{item.title}</Text>
        <Text style={styles.collectionCount}>{item.count} öğe</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id as TabType)}
          >
            <Icon
              name={tab.icon}
              size={24}
              color={activeTab === tab.id ? '#7C3AED' : '#6B7280'}
            />
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'posts' && (
        <FlatList
          data={posts}
          renderItem={renderPost}
          numColumns={3}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContainer}
        />
      )}

      {activeTab === 'ar' && (
        <FlatList
          data={arExperiences}
          renderItem={renderArExperience}
          numColumns={2}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.arContainer}
        />
      )}

      {activeTab === 'collections' && (
        <FlatList
          data={collections}
          renderItem={renderCollection}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.collectionsContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#7C3AED',
  },
  tabText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  activeTabText: {
    color: '#7C3AED',
    fontWeight: '600',
  },
  gridContainer: {
    padding: 2,
  },
  postItem: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    margin: 1,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 4,
    borderRadius: 12,
  },
  postStats: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  arContainer: {
    padding: 8,
  },
  arItem: {
    flex: 1,
    margin: 4,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  arImage: {
    width: '100%',
    height: '100%',
  },
  arOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  arTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  arStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  arViews: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  collectionsContainer: {
    padding: 16,
  },
  collectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    overflow: 'hidden',
  },
  collectionImage: {
    width: 80,
    height: 80,
  },
  collectionInfo: {
    flex: 1,
    padding: 12,
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  collectionCount: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});

export default ProfileTabs; 