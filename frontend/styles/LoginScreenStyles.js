import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    BackgroundScreen: {
      flex: 1,
      width: '105%',
      resizeMode: 'cover',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    Logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginBottom: 20,
      backgroundColor: '#ffff'
    },
});

