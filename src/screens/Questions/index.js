import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text as RNText, TouchableOpacity, Image, Animated, Modal, Button, Linking, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { createStackNavigator } from '@react-navigation/stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function Text(props) {
    return <RNText {...props} style={[props.style, {}]} />;
  }

export default function QuestionScreen({ route }) {
    const { question, answer } = route.params;
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 28 }}>
        <Text style={{ fontSize: 20, marginBottom: 20, fontFamily: 'Poppins_600SemiBold', textAlign: 'center' }}>{question}</Text>
        <Text style={{ fontFamily: 'Poppins_400Regular' }}>{answer}</Text>
      </View>
    );
  }