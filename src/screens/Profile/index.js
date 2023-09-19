import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

import userService from '../../services/users';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const users = await userService.getAllUsers();
      setUser(users[0]);
    };

    fetchUser();
  }, []);

  const selectImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Você precisa permitir o acesso à galeria para continuar!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });

    if (pickerResult.cancelled || !pickerResult.assets || pickerResult.assets.length === 0) return;

    const selectedImage = pickerResult.assets[0];

    try {
      await userService.updateUserImage(user.id, selectedImage);
      const updatedUser = await userService.getUserById(user.id);
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update image:', error);
      alert('Erro ao atualizar a imagem.');
    }
  };

  const handleLogout = async () => {
    await userService.logout();
    navigation.navigate('Login');
  };

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', backgroundColor: 'white', paddingTop: 0, paddingBottom: 28, paddingHorizontal: 28 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={selectImage}>
          <Image
            source={{ uri: user?.image?.url || 'https://cdn.discordapp.com/attachments/1086078404492787766/1153715524480540692/default-profile-picture-avatar-photo-placeholder-vector-illustration.png' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{user ? `${user.first_name} ${user.last_name}` : 'Loading...'}</Text>
        <Text style={styles.userInfo}>E-mail: {user?.email}</Text>
        <Text style={styles.userInfo}>Telefone: {user?.telefone || 'Não informado'}</Text>
        <TouchableOpacity style={[styles.button, styles.buttonMargin]} onPress={() => navigation.navigate('ForgotPassword')}> 
          <Text style={styles.buttonText}>Mudar Senha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
          <Text style={styles.buttonTextLogout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 30,
    marginTop: 30,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 21,
    marginBottom: 30,
  },
  userInfo: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    marginBottom: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#FB5F21',
  },
  buttonLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: 'transparent',
  },

  buttonText: {
    flex: 1,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  buttonTextLogout: {
    flex: 1,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 20,
  },
  buttonMargin: {
    marginTop: 70,
  },
});

