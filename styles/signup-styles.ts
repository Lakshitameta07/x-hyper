import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 26,
    color: Colors.primary,
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    color: Colors.text,
  },
  label: {
    color: Colors.text,
    marginBottom: 10,
    fontSize: 14,
  },
  vehicleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  vehicleButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.card,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: Colors.primary,
  },
  vehicleText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  link: {
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 15,
  },
});