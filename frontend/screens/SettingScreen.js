import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/SettingScreenStyles'

import { useSelector } from 'react-redux';


export default function SettingScreen({ navigation }) {
  const user = useSelector(state => state.user);

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <FontAwesome name={'user'} size={30} color={'#FFFFFF'} style={styles.userIcon} />
        <Text style={styles.header}>Welcome {user.name}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>My profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Preferences</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>My history</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
