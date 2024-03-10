//#region imports
import React, { useState } from "react";
import { ImageBackground, Image, Text, View } from 'react-native';
import { NativeBaseProvider, FormControl, Input, Heading, Link, HStack, VStack, Button,Center,Modal } from "native-base";
import styles from '../styles/LoginScreenStyles'

import { useDispatch } from 'react-redux';
import { updateUser } from '../reducers/user';

import SignUpModal from '../component/login/Signup';
import ForgotPasswordModal from '../component/login/ForgotPassword';

import { IPADDRESS, PORT } from '../ipaddress';
//#endregion

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('alice@example.com');
  const [password, setPassword] = useState('password123');
  const [showModal, setShowModal] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
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
        dispatch(updateUser({user_id : data.user.user_id, email, password, name: data.user.name, birthdate : data.user.birthdate, height : data.user.height, activity : data.user.activity }));
        navigation.navigate('TabNavigator');
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleCreateAccount = () => {
    setShowModal(true);
  };
  
  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  return (
    <NativeBaseProvider>
      <ImageBackground style={styles.background} source={require('../images/BackgroundScreen.jpg')} blurRadius={7}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../images/LogoCoachify.png')} />
          </View>

          <View style={styles.form}>
            <Heading style={styles.titleForm}>
              Welcome
            </Heading>
            <Heading mt="1" _dark={{ color: "warmGray.200" }} fontWeight="medium" size="xs">
              Sign in to continue!
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input value={email} onChangeText={(text) => setEmail(text)} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" value={password} onChangeText={(text) => setPassword(text)} />
                <Link _text={{ fontSize: "xs", fontWeight: "500", color: "indigo.500" }} alignSelf="flex-end" mt="1" onPress={handleForgotPassword}>
                  Forget Password?
                </Link>
              </FormControl>
              <Button mt="2" color="#129FB5" onPress={handleSubmit}>
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" _dark={{ color: "warmGray.200" }}>
                  I'm a new user.{" "}
                </Text>
                <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={handleCreateAccount}>
                  Sign Up
                </Link>
              </HStack>
            </VStack>
          </View>
        </View>
      </ImageBackground>
      <Center>
      <SignUpModal isOpen={showModal} onClose={() => setShowModal(false)} navigation={navigation} />
      </Center>
      <Center>
      <ForgotPasswordModal isOpen={forgotPassword} onClose={() => setForgotPassword(false)} navigation={navigation} />
      </Center>
    </NativeBaseProvider>
  );
}