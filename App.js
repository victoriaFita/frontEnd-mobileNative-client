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

function HomeScreen({ navigation }) {
  const [name, setName] = useState('Augusto Vice');
  const [cep, setCep] = useState('89210-680');

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



function AssistenceScreen() {
  const [serviceType, setServiceType] = useState(null);
  const [hasPreviousOrder, setHasPreviousOrder] = useState(null);
  const [equipment, setEquipment] = useState('');
  const [brand, setBrand] = useState('');
  const [serviceLocation, setServiceLocation] = useState(null);
  const [desiredDate, setDesiredDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [name, setName] = useState('Augusto Vice');
  const [cep, setCep] = useState('89210-680');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
      const data = await response.json();
      if (data.bairro && data.localidade) {
        setLocation(` e sou do bairro ${data.bairro}, ${data.localidade}`);
      }
    };

    fetchLocation();
  }, [cep]);

  const handleConfirm = (date) => {
    setDesiredDate(date);
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleWhatsAppRedirect = () => {
    let message = `Boa tarde, estou precisando de ${serviceType} do ${equipment} da marca ${brand}.`;
    if (serviceLocation === 'home') {
      message += ` Em ${desiredDate.toLocaleDateString()} você teria disponibilidade para comparecer a minha localização para atendimento?`;
    } else if (serviceLocation === 'assistance') {
      message += ` Em ${desiredDate.toLocaleDateString()} teria horários disponíveis para eu comparecer a assistência?`;
    }
    if (!hasPreviousOrder) {
      message = `Olá, me chamo ${name}${location}. ` + message;
    }
    let whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B5547992531701&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
    Linking.openURL(whatsappUrl);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', backgroundColor: 'white', padding: 28 }}>
      <Text style={{ marginBottom: 20, fontFamily: 'Poppins_400Regular' }}>Por favor, preencha as informações abaixo para solicitar um serviço de assistência.</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity style={{ flex: 1, marginRight: 10, padding: 20, borderWidth: 1, borderColor: serviceType === 'reparo' ? '#FB5F21' : 'rgba(0, 0, 0, 0.1)', borderRadius: 12 }} onPress={() => setServiceType('reparo')}>
          <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', color: serviceType === 'reparo' ? '#FB5F21' : 'black' }}>Reparo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, marginLeft: 10, padding: 20, borderWidth: 1, borderColor: serviceType === 'manutenção' ? '#FB5F21' : 'rgba(0, 0, 0, 0.1)', borderRadius: 12 }} onPress={() => setServiceType('manutenção')}>
          <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', color: serviceType === 'manutenção' ? '#FB5F21' : 'black' }}>Manutenção</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity style={{ flex: 1, marginRight: 10, padding: 20, borderWidth: 1, borderColor: hasPreviousOrder === true ? '#FB5F21' : 'rgba(0, 0, 0, 0.1)', borderRadius: 12 }} onPress={() => setHasPreviousOrder(true)}>
          <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', color: hasPreviousOrder === true ? '#FB5F21' : 'black' }}>Já realizei um pedido antes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, marginLeft: 10, padding: 20, borderWidth: 1, borderColor: hasPreviousOrder === false ? '#FB5F21' : 'rgba(0, 0, 0, 0.1)', borderRadius: 12 }} onPress={() => setHasPreviousOrder(false)}>
          <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', color: hasPreviousOrder === false ? '#FB5F21' : 'black' }}>Nunca realizei um pedido</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={{ height: 60, borderColor: 'rgba(0, 0, 0, 0.1)', borderWidth: 1, marginBottom: 20, borderRadius: 12, paddingLeft: 10, fontFamily: 'Poppins_400Regular', fontSize: 16, color: 'black' }}
        placeholder="Equipamento"
        placeholderTextColor="rgba(0, 0, 0, 0.6)"
        onChangeText={text => setEquipment(text)}
        value={equipment}
      />
      <TextInput
        style={{ height: 60, borderColor: 'rgba(0, 0, 0, 0.1)', borderWidth: 1, marginBottom: 20, borderRadius: 12, paddingLeft: 10, fontFamily: 'Poppins_400Regular', fontSize: 16, color: 'black' }}
        placeholder="Marca"
        placeholderTextColor="rgba(0, 0, 0, 0.6)"
        onChangeText={text => setBrand(text)}
        value={brand}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity style={{ flex: 1, marginRight: 10, padding: 20, borderWidth: 1, borderColor: serviceLocation === 'home' ? '#FB5F21' : 'rgba(0, 0, 0, 0.1)', borderRadius: 12 }} onPress={() => setServiceLocation('home')}>
          <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', color: serviceLocation === 'home' ? '#FB5F21' : 'black' }}>A domicílio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, marginLeft: 10, padding: 20, borderWidth: 1, borderColor: serviceLocation === 'assistance' ? '#FB5F21' : 'rgba(0, 0, 0, 0.1)', borderRadius: 12 }} onPress={() => setServiceLocation('assistance')}>
          <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', color: serviceLocation === 'assistance' ? '#FB5F21' : 'black' }}>Na assistência</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={showDatePicker} style={{ flexDirection: 'row', height: 60, borderColor: 'rgba(0, 0, 0, 0.1)', borderWidth: 1, marginBottom: 20, borderRadius: 12, paddingLeft: 10, alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 16, color: 'black' }}>Data desejada: {desiredDate.toLocaleDateString()}</Text>
        <Image
          source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131681200059207740/right-arrow_1.png' }}
          style={{ marginLeft: 'auto', width: 20, height: 20, marginRight: 15 }}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', color: 'rgba(0, 0, 0, 0.6)', textAlign: 'center', marginBottom: 20 }}>A data pode não estar disponível, será validada durante a conversa.</Text>
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
        <Text style={{ color: 'white', fontSize: 16, fontFamily: "Poppins_400Regular" }}>Solicitar orçamento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function PiecesScreen() {
  const categories = ['Equipamento', 'Peça', 'Produto'];
  const brands = ['Athletic', 'Gold', 'Muscle and Motion'];
  const states = ['Novo', 'Semi-novo'];

  const pieces = Array(10).fill().map((_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    category: categories[i % categories.length],
    brand: brands[i % brands.length],
    state: states[i % states.length]
  }));

  const [selectedPieces, setSelectedPieces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [buttonOpacity] = useState(new Animated.Value(0));
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filter, setFilter] = useState({ categories: [], brands: [], states: [] });

  useEffect(() => {
    Animated.timing(buttonOpacity, {
      toValue: selectedPieces.length > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [selectedPieces.length]);

  const handlePiecePress = (piece) => {
    setSelectedPieces(selectedPieces => selectedPieces.find(selectedPiece => selectedPiece.id === piece.id)
      ? selectedPieces.filter(selectedPiece => selectedPiece.id !== piece.id)
      : [...selectedPieces, piece]);
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    return currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite";
  };

  const handleWhatsAppRedirect = () => {
    let greeting = getGreeting();
    let itemNames = selectedPieces.map(piece => piece.name).join(', ');
    let message = `${greeting}, estou interessado ${selectedPieces.length > 1 ? 'nos itens:' : 'no item:'} ${itemNames}. Teria em estoque?`;
    let whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B5547992531701&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
    Linking.openURL(whatsappUrl);
  };

  const filteredPieces = pieces.filter(piece =>
    piece.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filter.categories.length === 0 || filter.categories.includes(piece.category)) &&
    (filter.brands.length === 0 || filter.brands.includes(piece.brand)) &&
    (filter.states.length === 0 || filter.states.includes(piece.state))
  );

  const handleFilterSelect = (type, value) => {
    setFilter(prev => ({ ...prev, [type]: prev[type].includes(value) ? prev[type].filter(item => item !== value) : [...prev[type], value] }));
  };

  const isFiltering = Object.values(filter).some(arr => arr.length > 0);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 28 }}>
        <View style={{ flexDirection: 'row', height: 40, borderColor: 'rgba(0, 0, 0, 0.1)', borderWidth: 1, marginBottom: 20, borderRadius: 12, alignItems: 'center', paddingLeft: 10, height: 50 }}>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131838979226996756/magnifying-glass.png' }}
            style={{ width: 20, height: 20, marginRight: 10, opacity: 0.6 }}
          />
          <TextInput
            style={{ flex: 1, fontFamily: 'Poppins_400Regular', fontSize: 14, color: 'rgba(0, 0, 0, 0.6)' }}
            placeholder="pesquisar..."
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
          />
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <Image
              source={{ uri: isFiltering ? 'https://cdn.discordapp.com/attachments/1059425565330911284/1132890835923513425/filter-list_1.png' : 'https://cdn.discordapp.com/attachments/1059425565330911284/1131874814110474300/filter-list.png' }}
              style={{ width: 20, height: 20, marginRight: 20, opacity: 0.7 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {filteredPieces.map((piece) => (
            <TouchableOpacity key={piece.id} style={{ width: '48%', borderWidth: 1, borderColor: selectedPieces.find(selectedPiece => selectedPiece.id === piece.id) ? '#FB5F21' : 'rgba(0, 0, 0, 0.1)', borderRadius: 12, padding: 15, marginBottom: 20 }} onPress={() => handlePiecePress(piece)}>
              <Image
                source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1133468445611147484/esteira_athletic_advanced_710t_1.png' }}
                style={{ width: '100%', height: 100, resizeMode: 'contain', marginBottom: 10 }}
              />
              <Text style={{ fontSize: 14, fontFamily: 'Poppins_600SemiBold' }}>{piece.name}</Text>
              <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular' }}>{piece.category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Animated.View style={{ opacity: buttonOpacity }}>
        {selectedPieces.length > 0 && (
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
              position: 'absolute',
              bottom: 20,
              left: '10%',
            }}
            onPress={handleWhatsAppRedirect}
          >
            <Image
              source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131679603073761451/whatsapp.png' }}
              style={{ width: 24, height: 24, marginRight: 10 }}
            />
            <Text style={{ color: 'white', fontSize: 16, fontFamily: "Poppins_400Regular" }}>{`Solicitar item${selectedPieces.length > 1 ? 's' : ''} selecionado${selectedPieces.length > 1 ? 's' : ''}`}</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => {
          setFilterModalVisible(!filterModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtros</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Image
                  source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131880234996727860/close.png' }}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>Categoria:</Text>
            <View style={styles.filterOptions}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category}
                  style={[styles.filterButton, { justifyContent: 'center', backgroundColor: filter.categories.includes(category) ? '#FB5F21' : 'transparent' }]}
                  onPress={() => handleFilterSelect('categories', category)}
                >
                  <Text style={styles.filterText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.modalSubtitle}>Marca:</Text>
            <View style={styles.filterOptions}>
              {brands.map(brand => (
                <TouchableOpacity
                  key={brand}
                  style={[styles.filterButton, { justifyContent: 'center', backgroundColor: filter.brands.includes(brand) ? '#FB5F21' : 'transparent' }]}
                  onPress={() => handleFilterSelect('brands', brand)}
                >
                  <Text style={styles.filterText}>{brand}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.modalSubtitle}>Estado:</Text>
            <View style={styles.filterOptions}>
              {states.map(state => (
                <TouchableOpacity
                  key={state}
                  style={[styles.filterButton, { justifyContent: 'center', backgroundColor: filter.states.includes(state) ? '#FB5F21' : 'transparent' }]}
                  onPress={() => handleFilterSelect('states', state)}
                >
                  <Text style={styles.filterText}>{state}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.filterActions}>
              <TouchableOpacity
                style={styles.clearFilterButton}
                onPress={() => setFilter({ categories: [], brands: [], states: [] })}
              >
                <Text style={styles.clearFilterText}>Limpar Filtros</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.doneButtonText}>Concluído</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
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

function HelpStack() {
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
        <Tab.Screen name="início" component={HomeScreen}
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
        <Tab.Screen name="assistência" component={AssistenceScreen}
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
        <Tab.Screen name="vendas" component={PiecesScreen}
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
        <Tab.Screen name="ajuda" component={HelpStack}
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