import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet .create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0B0F1A',
  },
  title: {
    fontSize: 28,
    color: '#00FFCC',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1C1F2A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    color: '#fff',
  },
  button: {
    backgroundColor: '#00FFCC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  link: {
    color: '#00FFCC',
    textAlign: 'center',
    marginTop: 15,
  },
});