import { Button, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen({ navigation }) {
 return (
   <View>
     <Text>Login Screen</Text>
     <Button
       title="Login"
       onPress={() => navigation.navigate('TabNavigator')}
     />
   </View>
 );
}