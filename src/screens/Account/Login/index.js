import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, Image } from 'react-native';
import userService from '../../../services/users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return e;
    }
  };

  const handleSubmit = async () => {
    const data = await userService.login(email, password);
    if (data.access) {
      const { user_id } = parseJwt(data.access);
      AsyncStorage.setItem('userId', String(user_id));
      navigation.replace('Main');
    } else {
      Alert.alert("Erro", "Credenciais inválidas ou problema na conexão.");
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://cdn.discordapp.com/attachments/1091506792900595863/1153760874822107216/victoria..png' }} 
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 28,
    backgroundColor: '#fff',
  },
  logo: {
    alignSelf: 'center',
    width: 300,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    color: '#4a4a4a',
  },
  input: {
    height: 50,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 12,
    paddingLeft: 15,
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#FB5F21',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#FB5F21',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Poppins_400Regular',
  },
});
