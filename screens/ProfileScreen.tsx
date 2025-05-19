import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileSettings from '../components/profile/ProfileSettings';
import ProfileTabs from '../components/profile/ProfileTabs';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView stickyHeaderIndices={[2]}>
        <ProfileHeader />
        <ProfileStats />
        <ProfileTabs />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default ProfileScreen; 