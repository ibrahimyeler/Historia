import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={24} color="#16A34A" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Favorilerim</Text>
      
      <View style={styles.rightPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 59 : 31,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#16A34A',
  },
  rightPlaceholder: {
    width: 40,
  },
});

export default Header; 