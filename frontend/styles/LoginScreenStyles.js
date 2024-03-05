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

  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 300
  },

  titleForm: {
    size: "lg",
    fontWeight: "600",
    color: "coolGray.800",
    _dark: { color: "warmGray.50" }
  },

  formMessage: {
    mt: "1",
    _dark: { color: "warmGray.200" },
    color: "coolGray.600",
    fontWeight: "medium",
    size: "xs"
  },
})