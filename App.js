import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text as RNText, TouchableOpacity, Image, Animated, Modal, Button, Linking, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { createStackNavigator } from '@react-navigation/stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Home from './src/screens/Home';
import Assistance from './src/screens/Assistance';
import Help from './src/screens/Help';
import Pieces from './src/screens/Pieces';


function Text(props) {
  return <RNText {...props} style={[props.style, {}]} />;
}


function MyTabBar({ state, descriptors, navigation }) {
  const icons = {
    'início': 'https://cdn.discordapp.com/attachments/1059425565330911284/1131682413240668261/home_3.png',
    'assistência': 'https://cdn.discordapp.com/attachments/1059425565330911284/1133460259608993853/repair-tool.png',
    'vendas': 'https://cdn.discordapp.com/attachments/1059425565330911284/1133459504109998220/shopping.png',
    'ajuda': 'https://cdn.discordapp.com/attachments/1059425565330911284/1131660713878900867/help.png'
  };

  return (
    <View style={{ flexDirection: 'row', height: 80 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        const onLongPress = () => navigation.emit({ type: 'tabLongPress', target: route.key });
        const icon = icons[route.name];

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopColor: isFocused ? '#FB5F21' : 'rgba(0, 0, 0, 0.1)', borderTopWidth: 2, opacity: isFocused ? 1 : 0.5 }}
          >
            <Image source={{ uri: icon }} style={{ width: 28, height: 28 }} />
            <Text style={{ letterSpacing: -.4, fontSize: 11.5, fontFamily: 'Poppins_600SemiBold', color: isFocused ? 'black' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <RNText>Loading...</RNText>;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="início" component={Home}
          options={{
            headerStyle: {
              borderBottomWidth: 0,
            },
            headerTitle: props => <RNText {...props} style={[props.style, { fontSize: 21, marginLeft: 10, marginTop: 10 }]} />, 
            headerTitleStyle: {
              fontFamily: 'Poppins_600SemiBold',
            },
          }}
        />
        <Tab.Screen name="assistência" component={Assistance}
          options={{
            headerStyle: {
              borderBottomWidth: 0,
            },
            headerTitle: props => <RNText {...props} style={[props.style, { fontSize: 21, marginLeft: 10, marginTop: 10 }]} />, 
            headerTitleStyle: {
              fontFamily: 'Poppins_600SemiBold',
            },
          }}
        />
        <Tab.Screen name="vendas" component={Pieces}
          options={{
            headerStyle: {
              borderBottomWidth: 0,
            },
            headerTitle: props => <RNText {...props} style={[props.style, { fontSize: 21, marginLeft: 10, marginTop: 10 }]} />, 
            headerTitleStyle: {
              fontFamily: 'Poppins_600SemiBold',
            },
          }}
        />
        <Tab.Screen name="ajuda" component={Help}
          options={{
            headerStyle: {
              borderBottomWidth: 0,
            },
            headerTitle: props => <RNText {...props} style={[props.style, { fontSize: 21, marginLeft: 10, marginTop: 10 }]} />, 
            headerTitleStyle: {
              fontFamily: 'Poppins_600SemiBold',
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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