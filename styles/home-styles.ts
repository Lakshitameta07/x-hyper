import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  zoomControls: {
    position: 'absolute',
    top: 56,
    right: 16,
    zIndex: 10,
    elevation: 4,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  zoomButton: {
    width: 38,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomSymbol: {
    color: '#1B1B1B',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 27,
  },
  zoomDivider: {
    height: 1,
    backgroundColor: '#E1E1E1',
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
  map: {
    flex: 1,
  },
});
