import React, { useState } from "react";
import { ImageBackground, Image, Text, View } from 'react-native';
import { NativeBaseProvider, Box, FormControl, Input, Center, Heading, Link, HStack, VStack, Button } from "native-base";
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
    setIsModalVisible(true);
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ImageBackground style={styles.BackgroundScreen} source={require('../images/BackgroundScreen.jpg')} blurRadius={7} />
        <Image style={styles.Logo} source={require('../images/LogoCoachify.png')} />

        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
              Welcome
            </Heading>
            <Heading mt="1" _dark={{ color: "warmGray.200" }} color="coolGray.600" fontWeight="medium" size="xs">
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
                <Link _text={{ fontSize: "xs", fontWeight: "500", color: "indigo.500" }} alignSelf="flex-end" mt="1">
                  Forget Password?
                </Link>
              </FormControl>
              <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                  I'm a new user.{" "}
                </Text>
                <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={handleCreateAccount}>
                  Sign Up
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>

        <SignUpModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} navigation={navigation} />
      </View>
    </NativeBaseProvider>
  );
}
