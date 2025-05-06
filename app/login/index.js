import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.150.27:8000/api/login', {
        email: email,
        password: password,
      });
  
      if (response.data.message === 'Login berhasil') {
        await AsyncStorage.setItem('userToken', response.data.token); // Simpan token
        Alert.alert('Login berhasil!');
        router.replace('/home'); // Arahkan ke home setelah login berhasil
      } else {
        Alert.alert('Login gagal!', response.data.message);
      }
    } catch (error) {
      console.log('LOGIN ERROR:', error); 
      Alert.alert('Terjadi kesalahan!', 'Cek koneksi internet atau coba lagi nanti.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input2}
        onChangeText={setPassword}
      />
      <Button color="#309898" title="Login" onPress={handleLogin} />
      <Text onPress={() => router.push('/register')} style={styles.link}>
        Belum punya akun? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FF9F00', },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 20, marginBottom:10},
  input2: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 20, marginBottom:30},
  link: { marginTop: 20, color: 'white', textAlign: 'center' },
});
