
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ExplorerScreen({ navigation }) {
 return (
   <Text style={styles.title}>
    HomePage
   </Text>
 );
}

const styles = StyleSheet.create({
  title:{
  alignSelf: 'center',
  }
})