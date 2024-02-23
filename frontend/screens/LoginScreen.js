import React, { useState } from 'react';
import { ImageBackground,Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateUser } from '../reducers/user';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    dispatch(updateUser({ email, password }));
    navigation.navigate('TabNavigator');
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.BackgroundScreen} source={require('../images/BackgroundScreen.jpg')} blurRadius={7}>
      <Image style={styles.Title} source={require('../images/LogoCoachify.png')}/>
        <KeyboardAvoidingView style={styles.formContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TextInput
            placeholder='Email'
            onChangeText={text => setEmail(text)}
            value={email}
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor="#ffffff"
          />
          <TextInput
            placeholder='Password'
            onChangeText={text => setPassword(text)}
            value={password}
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#ffffff"
          />
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSubmit}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BackgroundScreen: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  Title: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#ffffff',
  },
  button: {
    backgroundColor: 'blue',
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
