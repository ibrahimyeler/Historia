import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileSettings = () => {
  const settingsItems = [
    {
      icon: 'bookmark-outline',
      label: 'Kaydedilenler',
      screen: 'SavedItems'
    },
    {
      icon: 'time-outline',
      label: 'AR Geçmişi',
      screen: 'ARHistory'
    },
    {
      icon: 'language-outline',
      label: 'Dil',
      value: 'Türkçe',
      screen: 'Language'
    },
    {
      icon: 'color-palette-outline',
      label: 'Tema',
      value: 'Açık',
      screen: 'Theme'
    },
    {
      icon: 'notifications-outline',
      label: 'Bildirimler',
      screen: 'Notifications'
    },
    {
      icon: 'shield-outline',
      label: 'Gizlilik',
      screen: 'Privacy'
    },
    {
      icon: 'help-circle-outline',
      label: 'Yardım',
      screen: 'Help'
    },
  ];

  return (
    <View style={styles.container}>
      {settingsItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem}>
          <Icon name={item.icon} size={24} color="#333" />
          <Text style={styles.menuItemText}>{item.label}</Text>
          {item.value ? (
            <Text style={styles.valueText}>{item.value}</Text>
          ) : (
            <Icon name="chevron-forward" size={20} color="#666" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  valueText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
});

export default ProfileSettings; 