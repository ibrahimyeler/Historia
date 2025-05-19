import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7C3AED', '#9333EA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.topBar}
      >
        <TouchableOpacity style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Profil</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications-outline" size={22} color="#fff" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.profileInfoContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Icon name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Özge Özen</Text>
        <Text style={styles.username}>@ozgeozen</Text>
        <Text style={styles.bio}>Fullstack Developer 👩‍💻</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Profili Düzenle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    height: 52,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  notificationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4B4B',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  profileInfoContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#7C3AED',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 12,
  },
  username: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 2,
  },
  bio: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  editButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
    shadowColor: '#7C3AED',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default ProfileHeader; 