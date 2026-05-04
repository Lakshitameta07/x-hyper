import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signupStyles as styles } from '../../styles/signup-styles';

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleType, setVehicleType] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Vehicle Selection */}
      <Text style={styles.label}>Select Vehicle Type</Text>

      <View style={styles.vehicleContainer}>
        <TouchableOpacity
          style={[
            styles.vehicleButton,
            vehicleType.includes('2W') && styles.selected,
          ]}
          onPress={() => setVehicleType(prev => prev.includes('2W') ? prev.filter(v => v !== '2W') : [...prev, '2W'])}
        >
          <Text style={styles.vehicleText}>2 Wheeler</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.vehicleButton,
            vehicleType.includes('4W') && styles.selected,
          ]}
          onPress={() => setVehicleType(prev => prev.includes('4W') ? prev.filter(v => v !== '4W') : [...prev, '4W'])}
        >
          <Text style={styles.vehicleText}>4 Wheeler</Text>
        </TouchableOpacity>
      </View>

      {/* Signup Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/(tabs)')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Back to Login */}
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}