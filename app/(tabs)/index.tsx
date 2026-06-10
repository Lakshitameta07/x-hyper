import { api } from '@/src/services/api';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { homeStyles as styles } from '../../styles/home-styles';

export default function HomeScreen() {
  const [location, setLocation] = useState<any>(null);
  const [region, setRegion] = useState<any>(null);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const [loading, setLoading] = useState(true);
  const [stations, setStations] = useState<any[]>([]);

  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await getUserLocation();
    await fetchStations();
  };

  const fetchStations = async () => {
    try {
      const response = await api.get('/stations');
      console.log('API RESPONSE:', response.data);
      setStations(response.data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission denied');
      setLoading(false);
      return;
    }

    let userLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    const coords = userLocation.coords;

    setLocation(coords);

    setRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    setLoading(false);
  };

  // 🔥 Auto-fit map to show all stations
  useEffect(() => {
    if (stations.length > 0 && mapRef.current) {
      const coordinates = stations.map((s) => ({
        latitude: Number(s.latitude),
        longitude: Number(s.longitude),
      }));

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      });
    }
  }, [stations]);

  if (loading || !location || !region) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <View style={styles.container}>
      {/* Map Type Toggle */}
      <View style={styles.mapTypeRow}>
        <Pressable
          style={[styles.mapTypeButton, mapType === 'standard' && styles.mapTypeButtonActive]}
          onPress={() => setMapType('standard')}
        >
          <Text style={[styles.mapTypeText, mapType === 'standard' && styles.mapTypeTextActive]}>
            Standard
          </Text>
        </Pressable>

        <Pressable
          style={[styles.mapTypeButton, mapType === 'satellite' && styles.mapTypeButtonActive]}
          onPress={() => setMapType('satellite')}
        >
          <Text style={[styles.mapTypeText, mapType === 'satellite' && styles.mapTypeTextActive]}>
            Satellite
          </Text>
        </Pressable>
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        provider={Platform.OS === 'android' ? 'google' : undefined}
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
        >
              <FontAwesome6 name="map-pin" size={24} color="#0070f3" /> 
        </Marker>

        {/* Charging Stations */}
        {stations.map((station) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: Number(station.latitude),
              longitude: Number(station.longitude),
            }}
            title={station.name}
          >
            <View style={styles.stationMarker}>
              <MaterialIcons name="ev-station" size={24} color="#1591DC" />
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}