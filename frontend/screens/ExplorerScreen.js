
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen({ navigation }) {
 return (
   <View>
     <Text>Profile Screen</Text>
     <Button
       title="Go to Planning"
       onPress={() => navigation.navigate('Planning')}
     />
   </View>
 );
}