import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import userService from '../../../services/users';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResetPasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Erro", "A nova senha e a confirmação da senha não correspondem.");
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      const result = await userService.changePassword(userId, currentPassword, newPassword);
      if (result.success) {
        Alert.alert("Sucesso", "Senha alterada com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Falha ao alterar a senha. Verifique sua senha atual.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar alterar sua senha.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder="Senha Atual"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Nova Senha"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirme a Nova Senha"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
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
  input: {
    height: 50,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 12,
    paddingLeft: 15,
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
    fontSize: 16,
  },
});
