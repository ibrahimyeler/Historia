import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AssistantScreen = () => {
  return (
    <View style={styles.container}>
      <Icon name="chatbubbles-outline" size={64} color="#7C3AED" />
      <Text style={styles.title}>Asistan</Text>
      <Text style={styles.subtitle}>
        Merhaba! Sana yardımcı olmak için buradayım.
      </Text>
      <Text style={styles.hint}>
        Bu sayfaya yakında yapay zeka destekli bir asistan eklenecek.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  hint: {
    fontSize: 14,
    color: '#999',
    marginTop: 30,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default AssistantScreen;