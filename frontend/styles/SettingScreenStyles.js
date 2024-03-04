import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151B27',
        paddingTop: 50,
        paddingHorizontal: 20,
      },
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      },
      userIcon: {
        marginRight: 10,
      },
      header: {
        fontSize: 24,
        color: '#FFFFFF',
      },
      buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      button: {
        backgroundColor: '#2980b9',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
      },
});