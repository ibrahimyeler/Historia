import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileStats = () => {
  const stats = [
    { label: 'Paylaşımlar', value: '24' },
    { label: 'Takipçiler', value: '1.2K' },
    { label: 'Takip', value: '348' },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <TouchableOpacity key={index} style={styles.statItem}>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
          {index < stats.length - 1 && <View style={styles.divider} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  divider: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: 1,
    backgroundColor: '#E5E7EB',
  },
});

export default ProfileStats; 