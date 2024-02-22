import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../reducers/user';



export default function LoginScreen({ navigation }) {


  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = () => {
    dispatch(updateUser(email, password))
    navigation.navigate('TabNavigator');
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text>Login</Text>
      <TextInput placeholder='email' onChange={(value) => setEmail(value)} value={email} />
      <TextInput placeholder='password' onChange={(value) => setPassword(value)} value={password} />
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => handleSubmit()}>
       <Text style={styles.textButton}>Validate</Text>
     </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})