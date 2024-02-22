import { Button, StyleSheet, Text, View } from 'react-native';

export default function SettingScreen({ navigation }) {
 return (
   <View>
     <Text>Setting Screen</Text>
     <Button
       title="Go to Home"
       onPress={() => navigation.navigate('Home')}
     />
   </View>
 );
}

