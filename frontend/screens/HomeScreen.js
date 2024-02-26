import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
 return (
   <View>
     <Button
       title="Go to Explorer"
       onPress={() => navigation.navigate('Explorer')}
     />
   </View>
 );
}