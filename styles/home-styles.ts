import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapTypeRow: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  mapTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  mapTypeButtonActive: {
    backgroundColor: '#0070f3',
  },
  mapTypeText: {
    color: '#333',
    fontWeight: '600',
  },
  mapTypeTextActive: {
    color: '#fff',
  },
  stationMarker: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  },
});