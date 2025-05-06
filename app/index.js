import React, { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CheckLoginScreen() {
  useEffect(() => {
    // Fungsi untuk mengecek status login
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log('Token:', token);  // Debugging untuk memastikan token didapat
        if (token) {
          // Jika token ditemukan, arahkan ke halaman home
          router.replace('/home');
        } else {
          // Jika tidak ada token, arahkan ke halaman login
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error checking login status:', error);  // Jika ada error dalam pengecekan
        router.replace('/login');  // Redirect ke login jika terjadi error
      }
    };

    // Jalankan fungsi checkLoginStatus saat komponen dimuat
    checkLoginStatus();
  }, []); // Kosongkan dependency array supaya cuma dijalankan sekali saat komponen dimuat

  return null; // Halaman ini tidak perlu menampilkan apa-apa
}
