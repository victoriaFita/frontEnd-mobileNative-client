import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text as RNText, TouchableOpacity, Image, Animated, Modal, Button, Linking, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { createStackNavigator } from '@react-navigation/stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import equipmentService from '../../services/equipments';

function Text(props) {
    return <RNText {...props} style={[props.style, {}]} />;
  }

export default function HomeScreen({ navigation }) {
    const [name, setName] = useState('Augusto Vice');
    const [cep, setCep] = useState('89210-680');
    const [equipments, setEquipments] = useState([]);

    useEffect(async () => {
      const data = await equipmentService.getAllEquipments();
      setEquipments(data);
    }, []);

    async function updateEquipments() {
      const data = await equipmentService.getAllEquipments();
      setEquipments(data);
    }

    const handleWhatsAppRedirect = async () => {
      let location = '';
      if (cep) {
        const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
        const data = await response.json();
        if (data.bairro && data.localidade) {
          location = ` e sou do bairro ${data.bairro}, ${data.localidade}`;
        }
      }
  
      let message = name || cep ? `Olá, me chamo ${name}${location}.` : "Bom dia! Gostaria de solicitar um serviço!";
      let encodedMessage = encodeURIComponent(message);
      let whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B5547992531701&text=${encodedMessage}&type=phone_number&app_absent=0`;
      Linking.openURL(whatsappUrl);
    };
  
    const handleCepChange = (text) => {
      let newText = '';
      let numbers = '0123456789';
  
      for (var i = 0; i < text.length; i++) {
        if (numbers.indexOf(text[i]) > -1) {
          newText = newText + text[i];
        }
        else {
          newText = newText.slice(0, -1);
        }
      }
      if (newText.length <= 7) {
        setCep(newText);
      } else {
        setCep(newText.slice(0, 5) + '-' + newText.slice(5, 8));
      }
    }
  
    const greeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return "Bom dia";
      } else if (currentHour < 18) {
        return "Boa tarde";
      } else {
        return "Boa noite";
      }
    }
  
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', backgroundColor: 'white', padding: 28 }}>
        <View style={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 12, padding: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 20, marginBottom: 20, fontFamily: 'Poppins_600SemiBold', textAlign: 'center' }}>
            {greeting()} {name},
          </Text>
          <Text style={{ marginBottom: 20, fontFamily: 'Poppins_400Regular' }}>Aqui você pode solicitar nossos
            <Text style={{ fontFamily: "Poppins_600SemiBold", color: '#FB5F21' }}> Serviços de Assistência Técnica</Text> com facilidade e rapidez.
          </Text>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1133560243306102854/Default_a_person_running_2_125b848e-24ef-4e7c-9343-90168e449d12_0.png' }}
            style={{ width: 200, height: 300 }}
          />
          <Text style={{ fontFamily: "Poppins_400Regular" }}>Navegue pelo aplicativo e descubra todas as nossas opções de serviços.</Text>
        </View>
  
  
        <Text style={{ marginTop: 40, fontSize: 16, fontFamily: "Poppins_600SemiBold" }}>Deseja acessar algum de nossos serviços?</Text>
        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', marginVertical: 20 }} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('assistência')}>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1133460259608993853/repair-tool.png' }}
            style={{ width: 28, height: 28, marginRight: 10 }}
          />
          <View>
            <Text style={styles.buttonTitle}>Assistência</Text>
            <Text style={styles.buttonText}>Manutenção, Reparo</Text>
          </View>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131681200059207740/right-arrow_1.png' }}
            style={{ marginLeft: 'auto', width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', marginVertical: 20 }} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('vendas')}>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1133459504109998220/shopping.png' }}
            style={{ width: 28, height: 28, marginRight: 10 }}
          />
          <View>
            <Text style={styles.buttonTitle}>Vendas</Text>
            <Text style={styles.buttonText}>Equipamentos, Peças, Produtos</Text>
          </View>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131681200059207740/right-arrow_1.png' }}
            style={{ marginLeft: 'auto', width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', marginVertical: 20 }} />
        <Text style={{ marginTop: 20, fontSize: 16, fontFamily: "Poppins_600SemiBold" }}>Alguma dúvida? Confira nossa FAQ</Text>
        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', marginVertical: 20 }} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ajuda')}>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131660713878900867/help.png' }}
            style={{ width: 28, height: 28, marginRight: 10 }}
          />
          <Text style={styles.buttonTitle}>Ajuda</Text>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131681200059207740/right-arrow_1.png' }}
            style={{ marginLeft: 'auto', width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', marginVertical: 20 }} />
        <Text style={{ marginTop: 20, fontSize: 12, fontFamily: "Poppins_400Regular", color: 'rgba(0, 0, 0, 0.6)', textAlign: 'center', marginBottom: 20 }}>Precisa de um contato mais direto? Preencha com suas informações e entre em contato!</Text>
        <View style={{ flexDirection: 'row', height: 60, borderColor: 'rgba(0, 0, 0, 0.1)', borderWidth: 1, marginBottom: 20, borderRadius: 12, alignItems: 'center', paddingLeft: 10 }}>
          <TextInput
            style={{ flex: 1, fontFamily: 'Poppins_400Regular', fontSize: 16, color: 'black' }}
            placeholder="Nome"
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            onChangeText={text => setName(text)}
            value={name}
          />
        </View>
        <View style={{ flexDirection: 'row', height: 60, borderColor: 'rgba(0, 0, 0, 0.1)', borderWidth: 1, marginBottom: 20, borderRadius: 12, alignItems: 'center', paddingLeft: 10 }}>
          <TextInput
            style={{ flex: 1, fontFamily: 'Poppins_400Regular', fontSize: 16, color: 'black' }}
            placeholder="CEP"
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            onChangeText={text => handleCepChange(text)}
            value={cep}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: '#FB5F21',
            padding: 10,
            borderRadius: 50,
            marginTop: 10,
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            flexWrap: 'wrap',
          }}
          onPress={handleWhatsAppRedirect}
        >
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131679603073761451/whatsapp.png' }}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
          <Text style={{ color: 'white', fontSize: 16, fontFamily: "Poppins_400Regular" }}>Converse no WhatsApp</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
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
  });