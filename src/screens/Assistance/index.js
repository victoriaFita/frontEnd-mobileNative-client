import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text as RNText, TouchableOpacity, Image, Linking, TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import equipmentService from '../../services/equipments';

function Text(props) {
    return <RNText {...props} style={[props.style, {}]} />;
}

export default function AssistenceScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [serviceType, setServiceType] = useState(null);
  const [hasPreviousOrder, setHasPreviousOrder] = useState(null);
  const [equipment, setEquipment] = useState('');
  const [brand, setBrand] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [serviceLocation, setServiceLocation] = useState(null);
  const [desiredDate, setDesiredDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [name, setName] = useState('Augusto Vice');
  const [cep, setCep] = useState('89210-680');
  const [location, setLocation] = useState('');
  const [equipments, setEquipments] = useState([]);
  const [formValid, setFormValid] = useState(false);

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
      let message = `Boa tarde, estou precisando de ${serviceType} do ${equipment} da marca ${brand}. O problema é: ${problemDescription}.`;
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

  const handleNextStep = () => {
      if (currentStep < 5) { 
          setCurrentStep(currentStep + 1);
      }
  };

  const handlePrevStep = () => {
      if (currentStep > 1) {
          setCurrentStep(currentStep - 1);
      }
  };

  useEffect(async () => {
      const data = await equipmentService.getAllEquipments();
      setEquipments(data);
  }, []);

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

  useEffect(() => {
      if (serviceType && hasPreviousOrder !== null && equipment && brand && problemDescription && serviceLocation && name && cep) {
          setFormValid(true);
      } else {
          setFormValid(false);
      }
  }, [serviceType, hasPreviousOrder, equipment, brand, problemDescription, serviceLocation, name, cep]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', backgroundColor: 'white', padding: 28 }}>
            <View>
                <Text style={{ marginBottom: 20, fontFamily: 'Poppins_400Regular' }}>Por favor, preencha as informações abaixo para solicitar um serviço de assistência.</Text>

                {/* As etapas são renderizadas aqui */}
                {currentStep === 1 && (
                    <>
                        <Text style={{ marginBottom: 10, fontFamily: 'Poppins_600SemiBold' }}>Tipo de Serviço</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                            <TouchableOpacity style={{ flex: 1, marginRight: 10, padding: 20, borderWidth: 1, borderColor: serviceType === 'reparo' ? '#FB5F21' : 'rgba(0, 0, 0, 0.1)', borderRadius: 12 }} onPress={() => setServiceType('reparo')}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', color: serviceType === 'reparo' ? '#FB5F21' : 'black' }}>Reparo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, marginLeft: 10, padding: 20, borderWidth: 1, borderColor: serviceType === 'manutenção' ? '#FB5F21' : 'rgba(0, 0, 0, 0.1)', borderRadius: 12 }} onPress={() => setServiceType('manutenção')}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', color: serviceType === 'manutenção' ? '#FB5F21' : 'black' }}>Manutenção</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <Text style={{ marginBottom: 10, fontFamily: 'Poppins_600SemiBold' }}>Pedido Anterior</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                            <TouchableOpacity style={{ flex: 1, marginRight: 10, padding: 20, borderWidth: 1, borderColor: hasPreviousOrder === true ? '#FB5F21' : 'rgba(0, 0, 0, 0.1)', borderRadius: 12 }} onPress={() => setHasPreviousOrder(true)}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', color: hasPreviousOrder === true ? '#FB5F21' : 'black' }}>Já realizei um pedido antes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, marginLeft: 10, padding: 20, borderWidth: 1, borderColor: hasPreviousOrder === false ? '#FB5F21' : 'rgba(0, 0, 0, 0.1)', borderRadius: 12 }} onPress={() => setHasPreviousOrder(false)}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', color: hasPreviousOrder === false ? '#FB5F21' : 'black' }}>Nunca realizei um pedido</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {currentStep === 3 && (
                    <>
                        <Text style={{ marginBottom: 10, fontFamily: 'Poppins_600SemiBold' }}>Detalhes do Equipamento</Text>
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
                        <TextInput
                            style={{ height: 60, borderColor: 'rgba(0, 0, 0, 0.1)', borderWidth: 1, marginBottom: 20, borderRadius: 12, paddingLeft: 10, fontFamily: 'Poppins_400Regular', fontSize: 16, color: 'black', height: 250, textAlign: 'left' }}
                            placeholder="Descrição do Problema"
                            placeholderTextColor="rgba(0, 0, 0, 0.6)"
                            onChangeText={text => setProblemDescription(text)}
                            value={problemDescription}
                        />
                    </>
                )}

                {currentStep === 4 && (
                    <>
                        <Text style={{ marginBottom: 10, fontFamily: 'Poppins_600SemiBold' }}>Localização do Serviço</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                            <TouchableOpacity style={{ flex: 1, marginRight: 10, padding: 20, borderWidth: 1, borderColor: serviceLocation === 'home' ? '#FB5F21' : 'rgba(0, 0, 0, 0.1)', borderRadius: 12 }} onPress={() => setServiceLocation('home')}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', color: serviceLocation === 'home' ? '#FB5F21' : 'black' }}>A domicílio</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, marginLeft: 10, padding: 20, borderWidth: 1, borderColor: serviceLocation === 'assistance' ? '#FB5F21' : 'rgba(0, 0, 0, 0.1)', borderRadius: 12 }} onPress={() => setServiceLocation('assistance')}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', color: serviceLocation === 'assistance' ? '#FB5F21' : 'black' }}>Na assistência</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ marginBottom: 10, fontFamily: 'Poppins_600SemiBold' }}>Data Desejada</Text>
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
                    </>
                )}

                {currentStep === 5 && (
                    <>
                        <Text style={{ marginBottom: 10, fontFamily: 'Poppins_600SemiBold' }}>Informações Pessoais</Text>
                        <TextInput
                            style={{ height: 60, borderColor: 'rgba(0, 0, 0, 0.1)', borderWidth: 1, marginBottom: 20, borderRadius: 12, paddingLeft: 10, fontFamily: 'Poppins_400Regular', fontSize: 16, color: 'black' }}
                            placeholder="Nome"
                            placeholderTextColor="rgba(0, 0, 0, 0.6)"
                            onChangeText={text => setName(text)}
                            value={name}
                        />
                        <TextInput
                            style={{ height: 60, borderColor: 'rgba(0, 0, 0, 0.1)', borderWidth: 1, marginBottom: 20, borderRadius: 12, paddingLeft: 10, fontFamily: 'Poppins_400Regular', fontSize: 16, color: 'black' }}
                            placeholder="CEP"
                            placeholderTextColor="rgba(0, 0, 0, 0.6)"
                            onChangeText={text => setCep(text)}
                            value={cep}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity 
                        style={{ backgroundColor: '#FB5F21', padding: 10, borderRadius: 50, marginTop: 10, width: '80%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}
                        onPress={handleWhatsAppRedirect}>
                        <Text style={{ color: 'white', fontSize: 16, fontFamily: "Poppins_400Regular" }}>Orçamento via WhatsApp</Text>
                    </TouchableOpacity>
                </View>
                    </>
                )}
            </View>

            {currentStep < 6 && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity 
                    onPress={handlePrevStep} 
                    style={{ 
                        padding: 10, 
                        borderRadius: 50, 
                        marginTop: 10, 
                        width: currentStep === 5 ? '100%' : '48%',  // Aqui é a alteração
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        alignSelf: 'center', 
                        backgroundColor: 'transparent' 
                    }}>
                    <Text style={{ color: 'black', fontSize: 16, fontFamily: "Poppins_400Regular" }}>Voltar</Text>
                </TouchableOpacity>
                {currentStep < 5 && (
                    <TouchableOpacity 
                        style={{ 
                            backgroundColor: '#FB5F21', 
                            padding: 10, 
                            borderRadius: 50, 
                            marginTop: 10, 
                            width: '48%', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            alignSelf: 'center' 
                        }}
                        onPress={handleNextStep}>
                        <Text style={{ color: 'white', fontSize: 16, fontFamily: "Poppins_400Regular" }}>Avançar</Text>
                    </TouchableOpacity>
                )}
            </View>
        )}


            

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
