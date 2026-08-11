export type StationAvailability = 'Available' | 'Limited' | 'Busy';

export type Station = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
  available: number;
  total: number;
  connectors: string[];
  price: number;
  availability: StationAvailability;
  hours: string;
  chargingSpeed: string;
  amenities: string[];
};

// Temporary frontend catalogue. Replace this export with the stations API once its contract is ready.
export const STATIONS: Station[] = [
  {
    id: 'metro-park',
    name: 'Metro Park Charging Hub',
    address: '12 MG Road, Bengaluru',
    latitude: 12.9756,
    longitude: 77.6068,
    distance: 0.8,
    available: 4,
    total: 6,
    connectors: ['CCS2', 'Type 2'],
    price: 18,
    availability: 'Available',
    hours: 'Open 24 hours',
    chargingSpeed: 'Up to 120 kW',
    amenities: ['Restroom', 'Cafe', 'Wi-Fi'],
  },
  {
    id: 'koramangala',
    name: 'Koramangala EV Point',
    address: '80 Feet Road, Koramangala',
    latitude: 12.9352,
    longitude: 77.6245,
    distance: 1.6,
    available: 1,
    total: 4,
    connectors: ['CCS2', 'CHAdeMO'],
    price: 20,
    availability: 'Limited',
    hours: '6:00 AM – 11:00 PM',
    chargingSpeed: 'Up to 60 kW',
    amenities: ['Cafe', 'Parking'],
  },
  {
    id: 'indiranagar',
    name: 'Indiranagar Fast Charge',
    address: '100 Feet Road, Indiranagar',
    latitude: 12.9784,
    longitude: 77.6408,
    distance: 2.3,
    available: 0,
    total: 8,
    connectors: ['CCS2', 'Type 2'],
    price: 22,
    availability: 'Busy',
    hours: 'Open 24 hours',
    chargingSpeed: 'Up to 150 kW',
    amenities: ['Restroom', 'Wi-Fi', 'Convenience store'],
  },
  {
    id: 'ulsoor',
    name: 'Ulsoor Lake Charging Bay',
    address: 'CMH Road, Ulsoor',
    latitude: 12.9826,
    longitude: 77.6245,
    distance: 3.1,
    available: 3,
    total: 4,
    connectors: ['Type 2', 'Bharat AC'],
    price: 16,
    availability: 'Available',
    hours: '7:00 AM – 10:00 PM',
    chargingSpeed: 'Up to 22 kW',
    amenities: ['Parking', 'Restroom'],
  },
];
