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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Mon profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Preferences')}>
          <Text style={styles.buttonText}>Mes préférences</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('History')}>
          <Text style={styles.buttonText}>Mon historique</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>Paramètres</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}
