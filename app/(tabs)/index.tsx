import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { STATIONS } from '@/data/stations';
import { homeStyles as styles } from '../../styles/home-styles';

export default function HomeScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<any>(null);
  const [region, setRegion] = useState<any>(null);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

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

  const changeZoom = (factor: number) => {
    if (!region) {
      return;
    }

    const nextRegion = {
      ...region,
      latitudeDelta: Math.min(Math.max(region.latitudeDelta * factor, 0.002), 120),
      longitudeDelta: Math.min(Math.max(region.longitudeDelta * factor, 0.002), 120),
    };

    mapRef.current?.animateToRegion(nextRegion, 420);
  };

  if (loading || !location) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.zoomControls}>
        <Pressable
          accessibilityLabel="Zoom in"
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => changeZoom(0.5)}
          style={styles.zoomButton}>
          <Text style={styles.zoomSymbol}>+</Text>
        </Pressable>
        <View style={styles.zoomDivider} />
        <Pressable
          accessibilityLabel="Zoom out"
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => changeZoom(2)}
          style={styles.zoomButton}>
          <Text style={styles.zoomSymbol}>−</Text>
        </Pressable>
      </View>
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
        ref={mapRef}
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
        {STATIONS.map((station) => (
          <Marker
            key={station.id}
          coordinate={{
            latitude: station.latitude,
            longitude: station.longitude,
          }}
          title={station.name}
          description={`${station.available}/${station.total} slots available`}
          onPress={() => router.push(`/station/${station.id}`)}
        />
        ))}
      </MapView>
    </View>
  );
}
