import React, { useState, useEffect } from 'react';
import axios from '../../axios.js';
import {
  LoginContainer,
  CustomInput,
  CustomButtonActive,
  CustomButtonDisabled,
  CustomText,
  MoneyInput,
  MoneyText,
} from './styles';
import { useRoute } from '@react-navigation/native';
import { Header } from '../../components/Header/Header';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hp } from '../../../resnponsive.js';

interface IUser {
  phoneNumber: string;
  sum: string;
}

interface IRoute {
  name: string;
}

export const Transfer = ({ navigation }) => {
  const route: IRoute = useRoute();
  const [cardList, setCardList] = useState([]);
  const [cardType, setCardType] = useState('Premium');
  const [dataFullCard, setDataFullCard] = useState();
  const [formData, setFormData] = useState({
    sourceCardNumber: '',
    destCardNumber: '',
    amount: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchDataFullCard = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const { data } = await axios.get(`/cards/getfull?cardname=${cardType}`, {
        params: { cardType },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setDataFullCard(data?.data?.bankCard);
      handleInputChange('sourceCardNumber', data?.data?.bankCard?.cardNumber);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const fetchDataCards = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const { data } = await axios.get('/cards/list', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setCardList(data?.data?.cards);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  useEffect(() => {
    fetchDataCards();
    fetchDataFullCard();
  }, [cardType]);

  const handleInputChange = (name, value) => {
    if (name === 'amount') {
      setFormData({ ...formData, [name]: value });
      return;
    }

    const formattedValue = value.replace(/\s/g, '');
    const formattedNumber = formattedValue.slice(0, 16).replace(/\d{4}(?=.)/g, '$& ');
    setFormData({ ...formData, [name]: formattedNumber });

    if (name === 'destCardNumber' && value.trim() === '') {
      setErrorMessage('Номер карты назначения не может быть пустым');
    } else {
      setErrorMessage('');
    }
  };

  const onSubmit = async () => {
    if (formData.destCardNumber.trim() === '') {
      setErrorMessage('Номер карты назначения не может быть пустым');
      return;
    }

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const { data } = await axios.post(
        '/transactions/transfer',
        { ...formData },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      if (data?.status === 'OK') {
        fetchDataCards();
        setTransactionData(data);
        setModalVisible(true);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header navigation={navigation} />
      <LoginContainer>
        <View style={{ display: 'flex' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MoneyInput
              value={formData.amount}
              placeholder="0.00"
              placeholderTextColor="#fff"
              keyboardType="numeric"
              onChangeText={(text) => {
                handleInputChange('amount', text);
              }}
            />
            <MoneyText>₸</MoneyText>
          </View>
        </View>
        <View>
          <CustomInput
            placeholder="Номер карты владельца"
            placeholderTextColor="#fff"
            value={formData.sourceCardNumber}
            onChangeText={(text) => handleInputChange('sourceCardNumber', text)}
          />
        </View>
        <CustomText style={{ fontSize: hp(15) }}>
          На {dataFullCard?.cardName} доступно {dataFullCard?.balance} ₸
        </CustomText>
        <RadioButton.Group onValueChange={(value) => setCardType(value)} value={cardType}>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
            {cardList.map((item, id) => (
              <RadioButton.Item
                key={id}
                label={item.cardName}
                value={item.cardName}
                color="#004e96"
                position="leading"
                labelStyle={{ color: '#fff', fontSize: hp(17) }}
              />
            ))}
          </View>
        </RadioButton.Group>
        <View>
          <CustomInput
            placeholder="Номер карты назначения"
            placeholderTextColor="#fff"
            value={formData.destCardNumber}
            onChangeText={(text) => handleInputChange('destCardNumber', text)}
          />
          {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
        {formData.destCardNumber.trim() === '' ? (
          <CustomButtonDisabled>
            <CustomText>Перевести</CustomText>
          </CustomButtonDisabled>
        ) : (
          <CustomButtonActive onPress={() => onSubmit()}>
            <CustomText>Перевести</CustomText>
          </CustomButtonActive>
        )}
      </LoginContainer>

      {transactionData && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Операция успешно выполнена!</Text>
              <Text style={styles.modalText}>
                ID транзакции: {transactionData.data.transaction.id}
              </Text>
              <Text style={styles.modalText}>
                Дата: {transactionData.data.transaction.transactionDate}
              </Text>
              <Text style={styles.modalText}>
                Сумма: {transactionData.data.transaction.amount} ₸
              </Text>
              <Text style={styles.modalText}>
                Статус: {transactionData.data.transaction.status}
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: hp(12),
    marginTop: 5,
  },
});
