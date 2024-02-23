import React, { useState } from 'react';
import { ImageBackground, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateUser } from '../reducers/user';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = () => {
    dispatch(updateUser({ username, password }));
    navigation.navigate('TabNavigator');
  };

  const handleCreateAccount = () => {
    setIsModalVisible(true);
  };

  const handleModalSubmit = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.BackgroundScreen} source={require('../images/BackgroundScreen.jpg')} blurRadius={7}>
        <Image style={styles.Title} source={require('../images/LogoCoachify.png')} />
        <KeyboardAvoidingView style={styles.formContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TextInput
            placeholder='Username'
            onChangeText={text => setUsername(text)}
            value={username}
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

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Créer un compte</Text>
          <TextInput
            placeholder='Username'
            onChangeText={text => setUsername(text)}
            value={username}
            style={[styles.input, styles.inputModal]}
            autoCapitalize="none"
            placeholderTextColor="#000000"
            color={styles.inputTextModal.color}
          />
          <TextInput
            placeholder='Password'
            onChangeText={text => setPassword(text)}
            value={password}
            style={[styles.input, styles.inputModal]}
            secureTextEntry
            placeholderTextColor="#000000"
            color={styles.inputTextModal.color}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalSubmit}>
              <Text style={styles.textButton}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.textButton}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    width: '105%',
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
    backgroundColor: '#ffff'
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '40%',
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
  button: {
    backgroundColor: 'blue',
    width: '45%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
  modalButton: {
    backgroundColor: 'blue',
    width: '45%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  inputModal: {
    color: '#000000',
  },
  inputTextModal: {
    color: '#000000',
  },
});
