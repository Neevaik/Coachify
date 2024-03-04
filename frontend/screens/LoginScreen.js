import React, { useState } from 'react';
import { ImageBackground, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';

import { useDispatch } from 'react-redux';
import { updateUser } from '../reducers/user';
import SignUpModal from '../component/Signup';

import { IPADDRESS, PORT } from '../ipaddress';

import styles from '../styles/LoginScreenStyles';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('alice@example.com');
  const [password, setPassword] = useState('password123');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://${IPADDRESS}:${PORT}/users/signin`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(updateUser({ email, password, name: data.user.name }));
        navigation.navigate('TabNavigator');
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleCreateAccount = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.BackgroundScreen} source={require('../images/BackgroundScreen.jpg')} blurRadius={7}>
        <Image style={styles.Title} source={require('../images/LogoCoachify.png')} />
        <KeyboardAvoidingView style={styles.formContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TextInput
            placeholder='Email'
            onChangeText={email => setEmail(email)}
            value={email}
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor="#ffffff"
          />
          <TextInput
            placeholder='Password'
            onChangeText={password => setPassword(password)}
            value={password}
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#ffffff"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSubmit}>
              <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleCreateAccount}>
              <Text style={styles.textButton}>Créer un compte</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>

      <SignUpModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} navigation={navigation} />
    </View>
  );
}
