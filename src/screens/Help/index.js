import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text as RNText, TouchableOpacity, Image, Animated, Modal, Button, Linking, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { createStackNavigator } from '@react-navigation/stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Text(props) {
    return <RNText {...props} style={[props.style, {}]} />;
  }

  
  function HelpScreen({ navigation }) {
    const questions = [
      {
        id: 1,
        question: 'Como faço para manter minha esteira em boas condições?',
        answer: 'bla bla bla...'
      },
      {
        id: 2,
        question: 'Qual é a melhor maneira de limpar minha máquina de academia?',
        answer: 'ohhhh aaaaaaaa'
      },
    ];
  
    const Separator = () => <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', marginVertical: 20 }} />;
  
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', padding: 28 }}>
        {questions.map(({ id, question, answer }) => (
          <View key={id}>
            <Separator />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QuestionScreen', { question, answer })}>
              <Text style={styles.buttonTitle}>{question}</Text>
              <Image
                source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131681200059207740/right-arrow_1.png' }}
                style={{ marginLeft: 'auto', width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        ))}
        <Separator />
      </ScrollView>
    );
  }
  
  function QuestionScreen({ route }) {
    const { question, answer } = route.params;
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 28 }}>
        <Text style={{ fontSize: 20, marginBottom: 20, fontFamily: 'Poppins_600SemiBold', textAlign: 'center' }}>{question}</Text>
        <Text style={{ fontFamily: 'Poppins_400Regular' }}>{answer}</Text>
      </View>
    );
  }

export default function HelpStack() {
    return (
    <Stack.Navigator>
        <Stack.Screen
        name="Ajuda"
        component={HelpScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="QuestionScreen"
        component={QuestionScreen}
        options={{ headerShown: false }}
        />

    </Stack.Navigator>
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
  
    // Pieces
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontFamily: 'Poppins_600SemiBold',
    },
    modalSubtitle: {
      fontSize: 14,
      fontFamily: 'Poppins_400Regular',
      marginTop: 10,
    },
    filterOptions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#FB5F21',
      borderRadius: 50,
      marginVertical: 5,
      padding: 10,
      backgroundColor: 'white',
      width: '48%',
    },
    filterButtonActive: {
      backgroundColor: '#FB5F21',
    },
    filterText: {
      color: '#000',
      fontFamily: 'Poppins_400Regular',
    },
    filterTextActive: {
      color: '#fff',
      fontFamily: 'Poppins_400Regular',
    },
    filterActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    clearFilterButton: {
      backgroundColor: 'white',
      borderRadius: 50,
      padding: 10,
      borderWidth: 1,
      borderColor: '#FB5F21',
      width: '48%',
    },
    clearFilterText: {
      color: '#FB5F21',
      textAlign: 'center',
      fontFamily: 'Poppins_400Regular',
    },
    doneButton: {
      backgroundColor: '#FB5F21',
      borderRadius: 50,
      padding: 10,
      width: '48%',
    },
    doneButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'Poppins_400Regular',
    },
  });