import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Animated, Modal, Button, Linking, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { createStackNavigator } from '@react-navigation/stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import userService from '../../services/users';

export default function ProfileScreen({ navigation }) {
const [user, setUser] = useState(null);
useEffect(() => {
    const fetchUser = async () => {
      const users = await userService.getAllUsers();
      // primeiro usuário da lista
      setUser(users[0]);
    };
  
    fetchUser();
  }, []);
  

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
        <Image
          source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1103168510403805244/317769461_531223468937840_7323651060704758280_n.png' }}
          style={styles.profileImage}
        />
        <Text style={styles.title}>{user ? `${user.first_name} ${user.last_name}` : 'Loading...'}</Text>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1136840236559769672/profile.png' }}
            style={styles.icon}
          />
          <View>
            <Text style={styles.buttonTitle}>Minha Conta</Text>
            <Text style={styles.buttonText}>Senha, CEP, E-mail, Telefone</Text>
          </View>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131681200059207740/right-arrow_1.png' }}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1136840032917930094/settings_4.png' }}
            style={styles.icon}
          />
          <View>
            <Text style={styles.buttonTitle}>Configurações</Text>
            <Text style={styles.buttonText}>Notificações, Preferências</Text>
          </View>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131681200059207740/right-arrow_1.png' }}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131660713878900867/help.png' }}
            style={styles.icon}
          />
          <View>
            <Text style={styles.buttonTitle}>Ajuda</Text>
          </View>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131681200059207740/right-arrow_1.png' }}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
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
  backIcon: {
    width: 24,
    height: 24,
    marginBottom: 20,
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  buttonTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
  },
  buttonText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  arrowIcon: {
    marginLeft: 'auto',
    width: 20,
    height: 20,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 20,
  },
});
