import { Button, StyleSheet, Text, View } from 'react-native';

export default function PlanningScreen({ navigation }) {
 return (
   <View>
     <Button
       title="Go to Setting"
       onPress={() => navigation.navigate('Setting')}
     />
   </View>
 );
}