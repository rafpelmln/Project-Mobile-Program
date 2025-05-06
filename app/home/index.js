import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import BottomBar from './BottomBar'; // Import BottomBar

export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Menghapus token dari AsyncStorage
      Alert.alert('Logout berhasil', 'Anda telah keluar dari aplikasi');
      router.replace('/login'); // Mengarahkan ke halaman login setelah logout
    } catch (error) {
      console.log('Error logging out:', error);
      Alert.alert('Terjadi kesalahan', 'Gagal logout, coba lagi.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Page</Text>
      <Button title="Logout" onPress={handleLogout} color="#FF6347" />
      
      {/* Menambahkan BottomBar di bawah */}
      <BottomBar />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF9F00' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
});
