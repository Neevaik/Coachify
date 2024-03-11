import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },

  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },

  logo: {
    width: 300,
    height: 120,
    resizeMode: 'contain',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },

  heading:{
    fontWeight:"medium",
  },

  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 300
  },

  titleForm: {
    fontWeight: "600",
  },

  formMessage: {
    mt: "1",
    fontWeight: "medium",
    size: "xs"
  },

})