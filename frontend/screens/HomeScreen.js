import { View, Text } from 'react-native';
import styles from '../styles/HomeScreenStyles';

import { useSelector } from 'react-redux';


export default function HomeScreen() {

  const user = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your programme is set for you {user.name} !</Text>
    </View>
  );
}

