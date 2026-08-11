import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { STATIONS, type StationAvailability } from '@/data/stations';

const FILTERS = ['All', 'Available now', 'Fast charge'] as const;
type Filter = (typeof FILTERS)[number];

const availabilityColor: Record<StationAvailability, string> = {
  Available: '#1A9B6C',
  Limited: '#B86C09',
  Busy: '#C94040',
};

export default function StationsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('All');

  const stations = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();

    return STATIONS.filter((station) => {
      const matchesSearch =
        !normalisedQuery ||
        station.name.toLowerCase().includes(normalisedQuery) ||
        station.address.toLowerCase().includes(normalisedQuery);
      const matchesFilter =
        filter === 'All' ||
        (filter === 'Available now' && station.available > 0) ||
        (filter === 'Fast charge' && station.connectors.includes('CCS2'));

      return matchesSearch && matchesFilter;
    });
  }, [filter, query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>CHARGE NEARBY</Text>
            <Text style={styles.title}>Charging stations</Text>
          </View>
          <Pressable
            accessibilityLabel="View charging stations on a map"
            onPress={() => router.navigate('/')}
            style={styles.mapButton}>
            <MaterialIcons name="map" size={20} color="#0B7966" />
            <Text style={styles.mapButtonText}>Map</Text>
          </Pressable>
        </View>

        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={22} color="#728079" />
          <TextInput
            accessibilityLabel="Search charging stations"
            autoCapitalize="words"
            onChangeText={setQuery}
            placeholder="Search by station or area"
            placeholderTextColor="#728079"
            style={styles.searchInput}
            value={query}
          />
        </View>

        <View style={styles.filterRow}>
          {FILTERS.map((item) => (
            <Pressable
              key={item}
              accessibilityRole="button"
              accessibilityState={{ selected: filter === item }}
              onPress={() => setFilter(item)}
              style={[styles.filter, filter === item && styles.filterSelected]}>
              <Text style={[styles.filterText, filter === item && styles.filterTextSelected]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <FlatList
          contentContainerStyle={styles.listContent}
          data={stations}
          keyExtractor={(station) => station.id}
          ListHeaderComponent={<Text style={styles.count}>{stations.length} stations nearby</Text>}
          ListEmptyComponent={<Text style={styles.empty}>No stations match your search.</Text>}
          renderItem={({ item: station }) => (
            <Pressable accessibilityRole="button" style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.stationIcon}>
                  <MaterialIcons name="ev-station" size={25} color="#0B7966" />
                </View>
                <View style={styles.stationInfo}>
                  <Text numberOfLines={1} style={styles.stationName}>{station.name}</Text>
                  <View style={styles.addressRow}>
                    <MaterialIcons name="location-on" size={15} color="#728079" />
                    <Text numberOfLines={1} style={styles.address}>{station.address}</Text>
                  </View>
                </View>
                <Text style={styles.distance}>{station.distance.toFixed(1)} km</Text>
              </View>

              <View style={styles.divider} />
              <View style={styles.cardBottom}>
                <View>
                  <Text style={[styles.availability, { color: availabilityColor[station.availability] }]}>
                    {station.available}/{station.total} slots · {station.availability}
                  </Text>
                  <Text style={styles.connectors}>{station.connectors.join(' · ')}</Text>
                </View>
                <Text style={styles.price}>₹{station.price}<Text style={styles.priceUnit}> / kWh</Text></Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create<Record<string, any>>({
  safeArea: { flex: 1, backgroundColor: '#F6F8F7' },
  container: { flex: 1, paddingHorizontal: 20 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22, marginTop: 16 },
  eyebrow: { color: '#0B7966', fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  title: { color: '#14201B', fontSize: 27, fontWeight: '800', marginTop: 3 },
  mapButton: { alignItems: 'center', backgroundColor: '#E2F4EE', borderRadius: 10, flexDirection: 'row', gap: 5, paddingHorizontal: 12, paddingVertical: 9 },
  mapButtonText: { color: '#0B7966', fontSize: 14, fontWeight: '700' },
  searchBox: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E1E7E3', borderRadius: 13, borderWidth: 1, flexDirection: 'row', paddingHorizontal: 13 },
  searchInput: { color: '#14201B', flex: 1, fontSize: 15, paddingHorizontal: 10, paddingVertical: 13 },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 10, marginTop: 14 },
  filter: { backgroundColor: '#FFFFFF', borderColor: '#D9E1DC', borderRadius: 20, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 8 },
  filterSelected: { backgroundColor: '#0B7966', borderColor: '#0B7966' },
  filterText: { color: '#52605A', fontSize: 13, fontWeight: '600' },
  filterTextSelected: { color: '#FFFFFF' },
  listContent: { paddingBottom: 28 },
  count: { color: '#728079', fontSize: 13, fontWeight: '600', marginBottom: 10, marginTop: 5 },
  card: { backgroundColor: '#FFFFFF', borderColor: '#E2E8E4', borderRadius: 16, borderWidth: 1, marginBottom: 12, padding: 15 },
  cardTop: { alignItems: 'center', flexDirection: 'row' },
  stationIcon: { alignItems: 'center', backgroundColor: '#E2F4EE', borderRadius: 12, height: 48, justifyContent: 'center', marginRight: 11, width: 48 },
  stationInfo: { flex: 1, minWidth: 0 },
  stationName: { color: '#14201B', fontSize: 16, fontWeight: '700' },
  addressRow: { alignItems: 'center', flexDirection: 'row', marginTop: 5 },
  address: { color: '#728079', flex: 1, fontSize: 13, marginLeft: 2 },
  distance: { color: '#52605A', fontSize: 12, fontWeight: '700', marginLeft: 8 },
  divider: { backgroundColor: '#EDF0EE', height: 1, marginVertical: 13 },
  cardBottom: { alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between' },
  availability: { fontSize: 13, fontWeight: '800' },
  connectors: { color: '#728079', fontSize: 12, marginTop: 5 },
  price: { color: '#14201B', fontSize: 16, fontWeight: '800' },
  priceUnit: { color: '#728079', fontSize: 11, fontWeight: '500' },
  empty: { color: '#728079', fontSize: 15, paddingTop: 24, textAlign: 'center' },
});
