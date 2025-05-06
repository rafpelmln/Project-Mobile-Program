import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.150.27:8000/api/register', {
        name: name,
        email: email,
        password: password,
      });
  
      if (response.data.message === 'Registrasi berhasil') {
        Alert.alert('Registrasi berhasil!');
        router.replace('/login');
      } else {
        Alert.alert('Gagal', response.data.message);
      }
    } catch (error) {
      console.error(error);
      // Menampilkan error response jika ada
      if (error.response) {
        Alert.alert('Error', `Error: ${error.response.data.message}`);
      } else {
        Alert.alert('Terjadi kesalahan', 'Tidak dapat terhubung ke server.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={setName}
      />
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
      <Button color='#FF9F00' title="Register" onPress={handleRegister} />
      <Text onPress={() => router.push('/login')} style={styles.link}>
        Sudah punya akun? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#309898', },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 20, },
  input2: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 20, marginBottom:30},
  link: { marginTop: 20, color: 'white', textAlign: 'center' },
});
