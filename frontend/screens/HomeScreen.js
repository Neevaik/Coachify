import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
 return (
   <View>
     <Text>Home Screen</Text>
     <Button
       title="Go to Explorer"
       onPress={() => navigation.navigate('Explorer')}
     />
   </View>
 );
}