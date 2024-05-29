// import React, { useState, useEffect } from 'react';
// import axios from '../../axios.js';
// import {
//   LoginContainer,
//   CustomInput,
//   CustomButtonActive,
//   CustomButtonDisabled,
//   ValidationIndicators,
//   ValidationIndicatorsItem,
//   ValidationIndicatorsText,
//   CustomText,
// } from './styles';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Header } from '../../components/Header/Header';
// import { View, TouchableOpacity } from 'react-native';
// import { Text, Button } from 'react-native-paper';
// import { EyeOffIcon, EyeIcon, CheckIcon } from 'lucide-react-native';
// import { hp } from '../../../resnponsive.js';

// export const ForgotPassword = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     password: '',
//     newPassword: '',
//     passwordSecond: '',
//   });

//   const [showPassword, setShowPassword] = useState({
//     password: false,
//     newPassword: false,
//     passwordSecond: false,
//   });
//   const [passwordDuplicate, setPasswordDuplicate] = useState(false);
//   const [validationPassword, setValidationPassword] = useState(false);
//   const [passwordChanged, setPasswordChanged] = useState(false);
//   const [wrongData, setWrongData] = useState('');

//   const handleInputChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//     setErrorRes('');
//   };

//   useEffect(() => {
//     if (
//       validationResults.isLengthValid &&
//       validationResults.hasSpecialCharacters &&
//       validationResults.hasUpperCase
//     ) {
//       setValidationPassword(true);
//     } else {
//       setValidationPassword(false);
//     }
//   }, [formData.newPassword]);

//   const handleState = (field) => {
//     setShowPassword((prevState) => ({
//       ...prevState,
//       [field]: !prevState[field],
//     }));
//   };

//   const validatePassword = (password) => {
//     const isLengthValid = password.length >= 8;
//     // !"#$%&'()*+,-./:;<=>?@[]^_`{}|~
//     const hasSpecialCharacters = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password);
//     const hasUpperCase = /[A-Z]/.test(password);

//     return {
//       isLengthValid,
//       hasSpecialCharacters,
//       hasUpperCase,
//     };
//   };

//   const handlePassDuplicateCheck = (text) => {
//     handleInputChange('passwordSecond', text);
//     if (text !== formData.password) {
//       setPasswordDuplicate(true);
//     } else {
//       setPasswordDuplicate(false);
//     }
//   };

//   const validationResults = validatePassword(formData.newPassword);

//   const [errorRes, setErrorRes] = useState(null);

//   const changePassword = async () => {
//     try {
//       const accessToken = await AsyncStorage.getItem('accessToken');
//       const { data } = await axios.patch(
//         '/user/updatepassword',
//         {
//           password: formData.password,
//           newPassword: formData.newPassword,
//           confirmNewPassword: formData.passwordSecond,
//         },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         },
//       );

//       // Добавьте обработку успешного ответа здесь
//       if (data.status === 'OK') {
//         setPasswordChanged(true);
//         setFormData({
//           password: '',
//           newPassword: '',
//           passwordSecond: '',
//         });
//       } else {
//         console.log(data);
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response.data) {
//         setWrongData(error.response.data.message);
//       } else {
//       }
//     }
//   };

//   return (
//     <>
//       <View style={{ flex: 1, backgroundColor: '#000000' }}>
//         <Header navigation={navigation} />
//         <LoginContainer>
//           {passwordChanged ? (
//             <View>
//               <CustomText>Пароль успешно изменен</CustomText>
//               <Button
//                 style={{ backgroundColor: '#004e96' }}
//                 mode="contained"
//                 onPress={() => navigation.navigate('Home')}>
//                 <Text style={{ color: '#fff', fontSize: 18 }}>Мой банк</Text>
//               </Button>
//             </View>
//           ) : (
//             <>
//               <View>
//                 <CustomText> Пароль</CustomText>
//                 <View style={{ position: 'relative' }}>
//                   <CustomInput
//                     secureTextEntry={!showPassword.password}
//                     value={formData.password}
//                     onChangeText={(text) => {
//                       handleInputChange('password', text);
//                     }}
//                   />
//                   <TouchableOpacity
//                     style={{
//                       position: 'absolute',
//                       right: 10,
//                       top: '50%',
//                       transform: [{ translateY: -hp(15) / 2 }],
//                     }}
//                     onPress={() => handleState('password')}>
//                     {showPassword.password ? (
//                       <EyeOffIcon size={hp(15)} color="white" />
//                     ) : (
//                       <EyeIcon size={hp(15)} color="white" />
//                     )}
//                   </TouchableOpacity>
//                 </View>
//                 {wrongData && <Text style={{ color: '#FF1E1E' }}> {wrongData}</Text>}
//               </View>

//               <View>
//                 <CustomText>Новый пароль</CustomText>
//                 <View style={{ position: 'relative' }}>
//                   <CustomInput
//                     secureTextEntry={!showPassword.newPassword}
//                     value={formData.newPassword}
//                     onChangeText={(text) => {
//                       handleInputChange('newPassword', text);
//                     }}
//                   />
//                   <TouchableOpacity
//                     style={{
//                       position: 'absolute',
//                       right: 10,
//                       top: '50%',
//                       transform: [{ translateY: -hp(15) / 2 }],
//                     }}
//                     onPress={() => handleState('newPassword')}>
//                     {showPassword.newPassword ? (
//                       <EyeOffIcon size={hp(15)} color="white" />
//                     ) : (
//                       <EyeIcon size={hp(15)} color="white" />
//                     )}
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               <View>
//                 <CustomText>Подтверждение пароля</CustomText>
//                 <View style={{ position: 'relative' }}>
//                   <CustomInput
//                     secureTextEntry={!showPassword.passwordSecond}
//                     value={formData.passwordSecond}
//                     onChangeText={(text) => {
//                       handleInputChange('passwordSecond', text);
//                     }}
//                   />
//                   <TouchableOpacity
//                     style={{
//                       position: 'absolute',
//                       right: 10,
//                       top: '50%',
//                       transform: [{ translateY: -hp(15) / 2 }],
//                     }}
//                     onPress={() => handleState('passwordSecond')}>
//                     {showPassword.passwordSecond ? (
//                       <EyeOffIcon size={hp(15)} color="white" />
//                     ) : (
//                       <EyeIcon size={hp(15)} color="white" />
//                     )}
//                   </TouchableOpacity>
//                 </View>
//                 {passwordDuplicate && (
//                   <CustomText style={{ color: '#FF1E1E' }}>Пароль не совпадает</CustomText>
//                 )}
//               </View>

//               <ValidationIndicators>
//                 <ValidationIndicatorsItem>
//                   {validationResults.isLengthValid ? (
//                     <CheckIcon color="green" size={24} />
//                   ) : (
//                     <CheckIcon color="white" size={24} />
//                   )}
//                   <ValidationIndicatorsText>
//                     Пароль должен содержать не менее 8 символов
//                   </ValidationIndicatorsText>
//                 </ValidationIndicatorsItem>

//                 <ValidationIndicatorsItem>
//                   {validationResults.hasSpecialCharacters ? (
//                     <CheckIcon color="green" size={24} />
//                   ) : (
//                     <CheckIcon color="white" size={24} />
//                   )}
//                   <ValidationIndicatorsText>
//                     Пароль должен содержать специальные символы
//                   </ValidationIndicatorsText>
//                 </ValidationIndicatorsItem>

//                 <ValidationIndicatorsItem>
//                   {validationResults.hasUpperCase ? (
//                     <CheckIcon color="green" size={24} />
//                   ) : (
//                     <CheckIcon color="white" size={24} />
//                   )}
//                   <ValidationIndicatorsText>
//                     Пароль должен содержать хотя бы одну заглавную букву
//                   </ValidationIndicatorsText>
//                 </ValidationIndicatorsItem>
//               </ValidationIndicators>
//               {validationPassword ? (
//                 <CustomButtonActive onPress={() => changePassword()}>
//                   <CustomText>Сменить пароль</CustomText>
//                 </CustomButtonActive>
//               ) : (
//                 <CustomButtonDisabled>
//                   <CustomText>Сменить пароль</CustomText>
//                 </CustomButtonDisabled>
//               )}
//             </>
//           )}
//         </LoginContainer>
//       </View>
//     </>
//   );
// };

import React, { useState, useEffect } from 'react';
import axios from '../../axios.js';
import {
  LoginContainer,
  CustomInput,
  CustomButtonActive,
  CustomButtonDisabled,
  ValidationIndicators,
  ValidationIndicatorsItem,
  ValidationIndicatorsText,
  CustomText,
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '../../components/Header/Header';
import { View, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { EyeOffIcon, EyeIcon, CheckIcon } from 'lucide-react-native';
import { hp } from '../../../resnponsive.js';

export const ForgotPassword = ({ navigation }) => {
  const [formData, setFormData] = useState({
    password: '',
    newPassword: '',
    passwordSecond: '',
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    newPassword: false,
    passwordSecond: false,
  });
  const [passwordDuplicate, setPasswordDuplicate] = useState(false);
  const [validationPassword, setValidationPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [wrongData, setWrongData] = useState('');

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrorRes('');
  };

  useEffect(() => {
    if (
      validationResults.isLengthValid &&
      validationResults.hasSpecialCharacters &&
      validationResults.hasUpperCase
    ) {
      setValidationPassword(true);
    } else {
      setValidationPassword(false);
    }
  }, [formData.newPassword]);

  const handleState = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const validatePassword = (password) => {
    const isLengthValid = password.length >= 8;
    // !"#$%&'()*+,-./:;<=>?@[]^_`{}|~
    const hasSpecialCharacters = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    return {
      isLengthValid,
      hasSpecialCharacters,
      hasUpperCase,
    };
  };

  const handlePassDuplicateCheck = (text) => {
    handleInputChange('passwordSecond', text);
    if (text !== formData.newPassword) {
      setPasswordDuplicate(true);
    } else {
      setPasswordDuplicate(false);
    }
  };

  const validationResults = validatePassword(formData.newPassword);

  const [errorRes, setErrorRes] = useState(null);

  const changePassword = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const { data } = await axios.patch(
        '/user/updatepassword',
        {
          password: formData.password,
          newPassword: formData.newPassword,
          confirmNewPassword: formData.passwordSecond,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      if (data.status === 'OK') {
        setPasswordChanged(true);
        setFormData({
          password: '',
          newPassword: '',
          passwordSecond: '',
        });
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        setWrongData(error.response.data.message);
      } else {
      }
    }
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        <Header navigation={navigation} />
        <LoginContainer>
          {passwordChanged ? (
            <View>
              <CustomText>Пароль успешно изменен</CustomText>
              <Button
                style={{ backgroundColor: '#004e96' }}
                mode="contained"
                onPress={() => navigation.navigate('Home')}>
                <Text style={{ color: '#fff', fontSize: 18 }}>Мой банк</Text>
              </Button>
            </View>
          ) : (
            <>
              <View>
                <CustomText>Пароль</CustomText>
                <View style={{ position: 'relative' }}>
                  <CustomInput
                    secureTextEntry={!showPassword.password}
                    value={formData.password}
                    onChangeText={(text) => {
                      handleInputChange('password', text);
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: [{ translateY: -hp(15) / 2 }],
                    }}
                    onPress={() => handleState('password')}>
                    {showPassword.password ? (
                      <EyeOffIcon size={hp(15)} color="white" />
                    ) : (
                      <EyeIcon size={hp(15)} color="white" />
                    )}
                  </TouchableOpacity>
                </View>
                {wrongData && <Text style={{ color: '#FF1E1E' }}>{wrongData}</Text>}
              </View>

              <View>
                <CustomText>Новый пароль</CustomText>
                <View style={{ position: 'relative' }}>
                  <CustomInput
                    secureTextEntry={!showPassword.newPassword}
                    value={formData.newPassword}
                    onChangeText={(text) => {
                      handleInputChange('newPassword', text);
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: [{ translateY: -hp(15) / 2 }],
                    }}
                    onPress={() => handleState('newPassword')}>
                    {showPassword.newPassword ? (
                      <EyeOffIcon size={hp(15)} color="white" />
                    ) : (
                      <EyeIcon size={hp(15)} color="white" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <CustomText>Подтверждение пароля</CustomText>
                <View style={{ position: 'relative' }}>
                  <CustomInput
                    secureTextEntry={!showPassword.passwordSecond}
                    value={formData.passwordSecond}
                    onChangeText={(text) => {
                      handlePassDuplicateCheck(text); // Использование функции для проверки совпадения
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: [{ translateY: -hp(15) / 2 }],
                    }}
                    onPress={() => handleState('passwordSecond')}>
                    {showPassword.passwordSecond ? (
                      <EyeOffIcon size={hp(15)} color="white" />
                    ) : (
                      <EyeIcon size={hp(15)} color="white" />
                    )}
                  </TouchableOpacity>
                </View>
                {passwordDuplicate && (
                  <CustomText style={{ color: '#FF1E1E' }}>Пароль не совпадает</CustomText>
                )}
              </View>

              <ValidationIndicators>
                <ValidationIndicatorsItem>
                  {validationResults.isLengthValid ? (
                    <CheckIcon color="green" size={24} />
                  ) : (
                    <CheckIcon color="white" size={24} />
                  )}
                  <ValidationIndicatorsText>
                    Пароль должен содержать не менее 8 символов
                  </ValidationIndicatorsText>
                </ValidationIndicatorsItem>

                <ValidationIndicatorsItem>
                  {validationResults.hasSpecialCharacters ? (
                    <CheckIcon color="green" size={24} />
                  ) : (
                    <CheckIcon color="white" size={24} />
                  )}
                  <ValidationIndicatorsText>
                    Пароль должен содержать специальные символы
                  </ValidationIndicatorsText>
                </ValidationIndicatorsItem>

                <ValidationIndicatorsItem>
                  {validationResults.hasUpperCase ? (
                    <CheckIcon color="green" size={24} />
                  ) : (
                    <CheckIcon color="white" size={24} />
                  )}
                  <ValidationIndicatorsText>
                    Пароль должен содержать хотя бы одну заглавную букву
                  </ValidationIndicatorsText>
                </ValidationIndicatorsItem>
              </ValidationIndicators>
              {validationPassword ? (
                <CustomButtonActive onPress={() => changePassword()}>
                  <CustomText>Сменить пароль</CustomText>
                </CustomButtonActive>
              ) : (
                <CustomButtonDisabled>
                  <CustomText>Сменить пароль</CustomText>
                </CustomButtonDisabled>
              )}
            </>
          )}
        </LoginContainer>
      </View>
    </>
  );
};
