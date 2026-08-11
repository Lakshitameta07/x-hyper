import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { STATIONS, type StationAvailability } from '@/data/stations';

const availabilityColor: Record<StationAvailability, string> = {
  Available: '#15805B',
  Limited: '#A76106',
  Busy: '#C94040',
};

export default function StationDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const station = STATIONS.find((item) => item.id === id);

  if (!station) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>Station not found</Text>
          <Pressable onPress={() => router.back()} style={styles.backToMapButton}>
            <Text style={styles.backToMapText}>Back to map</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const openDirections = () => {
    const destination = `${station.latitude},${station.longitude}`;
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${destination}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroRow}>
            <Pressable accessibilityLabel="Go back" hitSlop={8} onPress={() => router.back()} style={styles.iconButton}>
              <MaterialIcons name="arrow-back" size={23} color="#14201B" />
            </Pressable>
            <Pressable accessibilityLabel="Save station" hitSlop={8} style={styles.iconButton}>
              <MaterialIcons name="favorite-border" size={23} color="#14201B" />
            </Pressable>
          </View>
          <View style={styles.stationBadge}>
            <MaterialIcons name="ev-station" size={37} color="#08745F" />
          </View>
          <Text style={styles.stationName}>{station.name}</Text>
          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={17} color="#63716A" />
            <Text style={styles.address}>{station.address}</Text>
          </View>
          <Text style={styles.distance}>{station.distance.toFixed(1)} km away</Text>
        </View>

        <View style={styles.statusCard}>
          <View>
            <Text style={[styles.availability, { color: availabilityColor[station.availability] }]}>
              {station.availability}
            </Text>
            <Text style={styles.statusDescription}>{station.available} of {station.total} charging slots free</Text>
          </View>
          <View style={styles.slotBadge}>
            <Text style={styles.slotCount}>{station.available}/{station.total}</Text>
            <Text style={styles.slotLabel}>SLOTS</Text>
          </View>
        </View>

        <Pressable accessibilityRole="button" onPress={openDirections} style={styles.directionsButton}>
          <MaterialIcons name="directions" size={21} color="#FFFFFF" />
          <Text style={styles.directionsText}>Get directions</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Charging options</Text>
        <View style={styles.optionCard}>
          <View style={styles.optionIcon}>
            <MaterialIcons name="bolt" size={22} color="#08745F" />
          </View>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>{station.chargingSpeed}</Text>
            <Text style={styles.optionSubtitle}>{station.connectors.join(' · ')}</Text>
          </View>
          <Text style={styles.price}>₹{station.price}<Text style={styles.priceUnit}> / kWh</Text></Text>
        </View>

        <Text style={styles.sectionTitle}>Station information</Text>
        <View style={styles.infoCard}>
          <InfoRow icon="schedule" label="Opening hours" value={station.hours} />
          <View style={styles.rowDivider} />
          <InfoRow icon="local-parking" label="Amenities" value={station.amenities.join(' · ')} />
          <View style={styles.rowDivider} />
          <InfoRow icon="payments" label="Payment" value="UPI, cards and wallet" />
        </View>

        <Text style={styles.note}>Availability is refreshed regularly. Please check the station status before you leave.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <MaterialIcons name={icon} size={21} color="#08745F" />
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create<Record<string, any>>({
  safeArea: { backgroundColor: '#F6F8F7', flex: 1 },
  content: { paddingBottom: 32 },
  hero: { backgroundColor: '#E3F4EE', minHeight: 260, padding: 20, paddingBottom: 56 },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between' },
  iconButton: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.84)', borderRadius: 20, height: 40, justifyContent: 'center', width: 40 },
  stationBadge: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, height: 70, justifyContent: 'center', marginTop: 25, width: 70 },
  stationName: { color: '#14201B', fontSize: 26, fontWeight: '800', marginTop: 15 },
  locationRow: { alignItems: 'center', flexDirection: 'row', marginTop: 8 },
  address: { color: '#52605A', flex: 1, fontSize: 14, marginLeft: 3 },
  distance: { color: '#08745F', fontSize: 14, fontWeight: '700', marginLeft: 20, marginTop: 8 },
  statusCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E0E7E3', borderRadius: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: -24, padding: 16 },
  availability: { fontSize: 17, fontWeight: '800' },
  statusDescription: { color: '#63716A', fontSize: 13, marginTop: 4 },
  slotBadge: { alignItems: 'center', backgroundColor: '#E7F5F0', borderRadius: 10, paddingHorizontal: 11, paddingVertical: 7 },
  slotCount: { color: '#08745F', fontSize: 16, fontWeight: '800' },
  slotLabel: { color: '#08745F', fontSize: 9, fontWeight: '800', letterSpacing: 0.6, marginTop: 1 },
  directionsButton: { alignItems: 'center', backgroundColor: '#08745F', borderRadius: 13, flexDirection: 'row', gap: 8, justifyContent: 'center', marginHorizontal: 20, marginTop: 17, paddingVertical: 15 },
  directionsText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  sectionTitle: { color: '#14201B', fontSize: 18, fontWeight: '800', marginHorizontal: 20, marginTop: 27, marginBottom: 10 },
  optionCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E0E7E3', borderRadius: 15, borderWidth: 1, flexDirection: 'row', marginHorizontal: 20, padding: 14 },
  optionIcon: { alignItems: 'center', backgroundColor: '#E7F5F0', borderRadius: 12, height: 46, justifyContent: 'center', marginRight: 12, width: 46 },
  optionInfo: { flex: 1 },
  optionTitle: { color: '#14201B', fontSize: 15, fontWeight: '800' },
  optionSubtitle: { color: '#63716A', fontSize: 12, marginTop: 4 },
  price: { color: '#14201B', fontSize: 16, fontWeight: '800' },
  priceUnit: { color: '#63716A', fontSize: 11, fontWeight: '500' },
  infoCard: { backgroundColor: '#FFFFFF', borderColor: '#E0E7E3', borderRadius: 15, borderWidth: 1, marginHorizontal: 20, overflow: 'hidden' },
  infoRow: { alignItems: 'center', flexDirection: 'row', padding: 15 },
  infoText: { flex: 1, marginLeft: 12 },
  infoLabel: { color: '#63716A', fontSize: 12 },
  infoValue: { color: '#14201B', fontSize: 14, fontWeight: '600', marginTop: 3 },
  rowDivider: { backgroundColor: '#EEF1EF', height: 1, marginLeft: 48 },
  note: { color: '#728079', fontSize: 12, lineHeight: 18, marginHorizontal: 24, marginTop: 18, textAlign: 'center' },
  notFound: { alignItems: 'center', flex: 1, justifyContent: 'center', padding: 24 },
  notFoundTitle: { color: '#14201B', fontSize: 20, fontWeight: '800' },
  backToMapButton: { backgroundColor: '#08745F', borderRadius: 10, marginTop: 16, paddingHorizontal: 16, paddingVertical: 12 },
  backToMapText: { color: '#FFFFFF', fontWeight: '700' },
});
