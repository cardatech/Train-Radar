export type OperatorCode = 'CP' | 'FERTAGUS' | 'MEDWAY' | 'RENFE' | 'SNCF' | 'DB';

export type TrainCategory = 
  | 'ALFA_PENDULAR' // High-speed tilt train (Portugal)
  | 'INTERCIDADES'  // Intercity
  | 'REGIONAL'      // Regional & InterRegional
  | 'URBANO'        // Commuter / Suburban
  | 'INTERNATIONAL' // Cross-border (e.g. Celta Porto-Vigo)
  | 'FREIGHT';      // Cargo / Logistics

export type DelayStatus = 'ON_TIME' | 'MINOR_DELAY' | 'MODERATE_DELAY' | 'MAJOR_DELAY';

export interface StationStop {
  stationId: string;
  stationName: string;
  stationCode: string;
  scheduledArrival: string;
  actualArrival: string;
  scheduledDeparture: string;
  actualDeparture: string;
  platform?: string;
  passed: boolean;
  isCurrent?: boolean;
}

export interface TrainPosition {
  latitude: number;
  longitude: number;
  heading: number; // degrees 0-359
  speedKmH: number;
  altitudeM: number;
}

export interface RollingStockInfo {
  series: string; // e.g. "CP Série 4000 (Pendolino)"
  manufacturer: string; // "Fiat Ferroviaria / Siemens"
  traction: string; // "25 kV 50 Hz AC Electric"
  maxSpeed: number; // 220 km/h
  gauge: string; // "1,668 mm (Iberian Broad Gauge)"
  coaches: number;
  lengthM: number;
  imageUrl?: string;
}

export interface Train {
  id: string; // e.g. "CP-120"
  trainNumber: string; // "AP 120"
  operator: OperatorCode;
  operatorName: string;
  category: TrainCategory;
  categoryLabel: string;
  origin: {
    code: string;
    name: string;
    city: string;
    departureTime: string;
  };
  destination: {
    code: string;
    name: string;
    city: string;
    arrivalTime: string;
  };
  currentPosition: TrainPosition;
  delayMinutes: number; // 0 for on-time, >0 delayed, <0 early
  delayStatus: DelayStatus;
  statusText: string; // "On Time", "+4 min", etc.
  lineName: string; // e.g. "Linha do Norte"
  rollingStock: RollingStockInfo;
  stops: StationStop[];
  progressPercent: number; // 0 to 100
  routeCoordinates: [number, number][]; // Full GPS route
  lastUpdated: string;
  isGpsLive: boolean; // Direct from official feed
  officialApiSource: string; // "Infraestruturas de Portugal Open Data"
}

export interface Station {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  lines: string[];
  platformsCount: number;
  dailyDepartures: number;
  operator: OperatorCode;
}

export interface StationDepartureItem {
  trainNumber: string;
  trainId: string;
  destination: string;
  origin: string;
  operator: OperatorCode;
  category: TrainCategory;
  scheduledTime: string;
  estimatedTime: string;
  platform: string;
  delayMinutes: number;
  status: 'SCHEDULED' | 'BOARDING' | 'DELAYED' | 'DEPARTED' | 'ARRIVED';
}

export interface FilterState {
  searchQuery: string;
  selectedOperators: OperatorCode[];
  selectedCategories: TrainCategory[];
  delayFilter: 'ALL' | 'ON_TIME' | 'DELAYED_MINOR' | 'DELAYED_MAJOR';
  minSpeed: number;
  selectedCountry: 'PT' | 'ES' | 'FR' | 'DE' | 'EU_ALL';
  onlyMoving: boolean;
}

export interface MapLayerConfig {
  tileStyle: 'dark' | 'satellite' | 'streets' | 'railway';
  showStations: boolean;
  showRailways: boolean;
  showDelayHeatmap: boolean;
  highSpeedHighlights: boolean;
}
