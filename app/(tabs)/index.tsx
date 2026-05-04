import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { homeStyles as styles } from '../../styles/home-styles';

export default function HomeScreen() {
  const [location, setLocation] = useState<any>(null);
  const [region, setRegion] = useState<any>(null);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const [loading, setLoading] = useState(true);

  // Dummy stations (we’ll replace with backend later)
  const stations = [
    {
      id: 1,
      name: 'EV Station A',
      latitude: 28.6139,
      longitude: 77.2090,
    },
    {
      id: 2,
      name: 'EV Station B',
      latitude: 28.6150,
      longitude: 77.2105,
    },
  ];

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      setLoading(false);
      return;
    }
    let userLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.Highest,
    });
    setLocation(userLocation.coords);
    setRegion({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    setLoading(false);
  };

  if (loading || !location) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapTypeRow}>
        <Pressable
          style={[styles.mapTypeButton, mapType === 'standard' && styles.mapTypeButtonActive]}
          onPress={() => setMapType('standard')}
        >
          <Text style={[styles.mapTypeText, mapType === 'standard' && styles.mapTypeTextActive]}>Standard</Text>
        </Pressable>
        <Pressable
          style={[styles.mapTypeButton, mapType === 'satellite' && styles.mapTypeButtonActive]}
          onPress={() => setMapType('satellite')}
        >
          <Text style={[styles.mapTypeText, mapType === 'satellite' && styles.mapTypeTextActive]}>Satellite</Text>
        </Pressable>
      </View>
      <MapView
        style={styles.map}
        region={region}
        mapType={mapType}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton
        zoomEnabled
        scrollEnabled
        rotateEnabled
        pitchEnabled
      >
        {/* User Marker */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You are here"
          pinColor="blue"
        />

        {/* Charging Stations */}
        {stations.map((station) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            title={station.name}
          />
        ))}
      </MapView>
    </View>
  );
}