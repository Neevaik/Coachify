import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    input: {
      width: '80%',
      height: 40,
      borderColor: '#ffffff',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      color: '#ffffff',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
    },
    button: {
      backgroundColor: 'blue',
      width: '45%',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    textButton: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 20,
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
    },
    modalButton: {
      backgroundColor: 'blue',
      width: '45%',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    cancelButton: {
      backgroundColor: 'red',
    },
    inputModal: {
      color: '#000000',
    },
    inputTextModal: {
      color: '#000000',
    },
    
});

