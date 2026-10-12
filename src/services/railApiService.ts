import { Train, Station, FilterState, StationDepartureItem, OperatorCode, TrainCategory, DelayStatus } from '../types/train';
import { INITIAL_TRAINS, STATIONS, CORRIDOR_TRACKS, interpolatePositionAlongPath, calculateHeading, ROLLING_STOCK } from '../data/railwayData';

// Generate complementary trains to represent active operations across Portugal and Europe
function generateNetworkFleet(): Train[] {
  const fleet: Train[] = [...INITIAL_TRAINS];

  // Additional Portuguese services
  // 1. Alfa Pendular AP 121 (Porto -> Lisboa)
  fleet.push({
    id: 'CP-AP121',
    trainNumber: 'AP 121',
    operator: 'CP',
    operatorName: 'Comboios de Portugal',
    category: 'ALFA_PENDULAR',
    categoryLabel: 'Alfa Pendular (High-Speed)',
    origin: { code: 'POR-CAM', name: 'Porto Campanhã', city: 'Porto', departureTime: '09:32' },
    destination: { code: 'LIS-SA', name: 'Lisboa Santa Apolónia', city: 'Lisboa', arrivalTime: '12:30' },
    currentPosition: { latitude: 40.6437, longitude: -8.6406, heading: 185, speedKmH: 216, altitudeM: 12 },
    delayMinutes: 0,
    delayStatus: 'ON_TIME',
    statusText: 'On Time',
    lineName: 'Linha do Norte',
    rollingStock: ROLLING_STOCK.CP_4000,
    progressPercent: 22,
    routeCoordinates: [...CORRIDOR_TRACKS.LINHA_DO_NORTE].reverse(),
    lastUpdated: 'Live GPS',
    isGpsLive: true,
    officialApiSource: 'Infraestruturas de Portugal Open Data',
    stops: [
      { stationId: 'st-porto-campanha', stationName: 'Porto Campanhã', stationCode: 'POR-CAM', scheduledArrival: '09:32', actualArrival: '09:32', scheduledDeparture: '09:32', actualDeparture: '09:32', platform: '2', passed: true },
      { stationId: 'st-aveiro', stationName: 'Aveiro', stationCode: 'AVR', scheduledArrival: '10:05', actualArrival: '10:05', scheduledDeparture: '10:07', actualDeparture: '10:07', platform: '1', passed: false, isCurrent: true },
      { stationId: 'st-coimbra-b', stationName: 'Coimbra-B', stationCode: 'CBR-B', scheduledArrival: '10:38', actualArrival: '10:38', scheduledDeparture: '10:40', actualDeparture: '10:40', platform: '2', passed: false },
      { stationId: 'st-lis-or', stationName: 'Lisboa Oriente', stationCode: 'LIS-OR', scheduledArrival: '12:22', actualArrival: '12:22', scheduledDeparture: '12:24', actualDeparture: '12:24', platform: '3', passed: false },
      { stationId: 'st-lis-sa', stationName: 'Lisboa Santa Apolónia', stationCode: 'LIS-SA', scheduledArrival: '12:30', actualArrival: '12:30', scheduledDeparture: '12:30', actualDeparture: '12:30', platform: '1', passed: false },
    ],
  });

  // 2. Intercidades IC 541 (Guimarães / Porto -> Lisboa)
  fleet.push({
    id: 'CP-IC541',
    trainNumber: 'IC 541',
    operator: 'CP',
    operatorName: 'Comboios de Portugal',
    category: 'INTERCIDADES',
    categoryLabel: 'Intercidades',
    origin: { code: 'GMR', name: 'Guimarães', city: 'Guimarães', departureTime: '07:50' },
    destination: { code: 'LIS-SA', name: 'Lisboa Santa Apolónia', city: 'Lisboa', arrivalTime: '11:50' },
    currentPosition: { latitude: 40.0380, longitude: -8.6650, heading: 190, speedKmH: 165, altitudeM: 52 },
    delayMinutes: 4,
    delayStatus: 'ON_TIME',
    statusText: '+4 min',
    lineName: 'Linha do Norte',
    rollingStock: ROLLING_STOCK.CP_5600,
    progressPercent: 48,
    routeCoordinates: [...CORRIDOR_TRACKS.LINHA_DO_NORTE].reverse(),
    lastUpdated: 'Live GPS',
    isGpsLive: true,
    officialApiSource: 'Infraestruturas de Portugal Open Data',
    stops: [
      { stationId: 'st-guimaraes', stationName: 'Guimarães', stationCode: 'GMR', scheduledArrival: '07:50', actualArrival: '07:50', scheduledDeparture: '07:50', actualDeparture: '07:50', platform: '1', passed: true },
      { stationId: 'st-porto-campanha', stationName: 'Porto Campanhã', stationCode: 'POR-CAM', scheduledArrival: '08:45', actualArrival: '08:48', scheduledDeparture: '08:50', actualDeparture: '08:54', platform: '5', passed: true },
      { stationId: 'st-coimbra-b', stationName: 'Coimbra-B', stationCode: 'CBR-B', scheduledArrival: '09:58', actualArrival: '10:02', scheduledDeparture: '10:00', actualDeparture: '10:04', platform: '1', passed: false, isCurrent: true },
      { stationId: 'st-lis-sa', stationName: 'Lisboa Santa Apolónia', stationCode: 'LIS-SA', scheduledArrival: '11:50', actualArrival: '11:54', scheduledDeparture: '11:50', actualDeparture: '11:54', platform: '2', passed: false },
    ],
  });

  // 3. Intercidades IC 571 (Faro -> Lisboa Oriente)
  fleet.push({
    id: 'CP-IC571',
    trainNumber: 'IC 571',
    operator: 'CP',
    operatorName: 'Comboios de Portugal',
    category: 'INTERCIDADES',
    categoryLabel: 'Intercidades',
    origin: { code: 'FAO', name: 'Faro', city: 'Faro', departureTime: '07:00' },
    destination: { code: 'LIS-OR', name: 'Lisboa Oriente', city: 'Lisboa', arrivalTime: '10:30' },
    currentPosition: { latitude: 38.3840, longitude: -8.6850, heading: 335, speedKmH: 160, altitudeM: 20 },
    delayMinutes: 0,
    delayStatus: 'ON_TIME',
    statusText: 'On Time',
    lineName: 'Linha do Sul',
    rollingStock: ROLLING_STOCK.CP_5600,
    progressPercent: 72,
    routeCoordinates: [...CORRIDOR_TRACKS.LINHA_DO_SUL].reverse(),
    lastUpdated: 'Live GPS',
    isGpsLive: true,
    officialApiSource: 'Infraestruturas de Portugal Open Data',
    stops: [
      { stationId: 'st-faro', stationName: 'Faro', stationCode: 'FAO', scheduledArrival: '07:00', actualArrival: '07:00', scheduledDeparture: '07:00', actualDeparture: '07:00', platform: '1', passed: true },
      { stationId: 'st-tunes', stationName: 'Tunes', stationCode: 'TUN', scheduledArrival: '07:32', actualArrival: '07:32', scheduledDeparture: '07:34', actualDeparture: '07:34', platform: '2', passed: true },
      { stationId: 'st-grandola', stationName: 'Grândola', stationCode: 'GDL', scheduledArrival: '08:58', actualArrival: '08:58', scheduledDeparture: '09:00', actualDeparture: '09:00', platform: '1', passed: true },
      { stationId: 'st-pinhal-novo', stationName: 'Pinhal Novo', stationCode: 'PNV', scheduledArrival: '09:48', actualArrival: '09:48', scheduledDeparture: '09:50', actualDeparture: '09:50', platform: '3', passed: false, isCurrent: true },
      { stationId: 'st-lis-or', stationName: 'Lisboa Oriente', stationCode: 'LIS-OR', scheduledArrival: '10:30', actualArrival: '10:30', scheduledDeparture: '10:30', actualDeparture: '10:30', platform: '2', passed: false },
    ],
  });

  // 4. Fertagus FT 10209 (Setúbal -> Roma-Areeiro)
  fleet.push({
    id: 'FT-10209',
    trainNumber: 'FT 10209',
    operator: 'FERTAGUS',
    operatorName: 'Fertagus',
    category: 'URBANO',
    categoryLabel: 'Fertagus Suburban',
    origin: { code: 'STB', name: 'Setúbal', city: 'Setúbal', departureTime: '08:58' },
    destination: { code: 'RMA', name: 'Roma-Areeiro', city: 'Lisboa', arrivalTime: '09:55' },
    currentPosition: { latitude: 38.6749, longitude: -9.1764, heading: 330, speedKmH: 95, altitudeM: 65 },
    delayMinutes: 0,
    delayStatus: 'ON_TIME',
    statusText: 'On Time',
    lineName: 'Eixo Norte-Sul / Linha do Sul',
    rollingStock: ROLLING_STOCK.FERTAGUS_3500,
    progressPercent: 78,
    routeCoordinates: [...CORRIDOR_TRACKS.FERTAGUS_CORRIDOR].reverse(),
    lastUpdated: 'Live GPS',
    isGpsLive: true,
    officialApiSource: 'Fertagus Gestão de Transportes Real-Time Feed',
    stops: [
      { stationId: 'st-setubal', stationName: 'Setúbal', stationCode: 'STB', scheduledArrival: '08:58', actualArrival: '08:58', scheduledDeparture: '08:58', actualDeparture: '08:58', platform: '3', passed: true },
      { stationId: 'st-pinhal-novo', stationName: 'Pinhal Novo', stationCode: 'PNV', scheduledArrival: '09:12', actualArrival: '09:12', scheduledDeparture: '09:13', actualDeparture: '09:13', platform: '2', passed: true },
      { stationId: 'st-pragal', stationName: 'Pragal', stationCode: 'PRG', scheduledArrival: '09:40', actualArrival: '09:40', scheduledDeparture: '09:41', actualDeparture: '09:41', platform: '1', passed: true },
      { stationId: 'st-lis-roma', stationName: 'Roma-Areeiro', stationCode: 'RMA', scheduledArrival: '09:55', actualArrival: '09:55', scheduledDeparture: '09:55', actualDeparture: '09:55', platform: '2', passed: false, isCurrent: true },
    ],
  });

  // 5. Urbanos do Porto U 34102 (Porto São Bento -> Braga)
  fleet.push({
    id: 'CP-U34102',
    trainNumber: 'U 34102',
    operator: 'CP',
    operatorName: 'Comboios de Portugal',
    category: 'URBANO',
    categoryLabel: 'Urbanos do Porto (Ramal de Braga)',
    origin: { code: 'POR-SB', name: 'Porto São Bento', city: 'Porto', departureTime: '08:45' },
    destination: { code: 'BRG', name: 'Braga', city: 'Braga', arrivalTime: '09:55' },
    currentPosition: { latitude: 41.4280, longitude: -8.5080, heading: 25, speedKmH: 120, altitudeM: 110 },
    delayMinutes: 2,
    delayStatus: 'ON_TIME',
    statusText: 'On Time',
    lineName: 'Linha do Minho / Ramal de Braga',
    rollingStock: ROLLING_STOCK.CP_3400,
    progressPercent: 65,
    routeCoordinates: CORRIDOR_TRACKS.LINHA_DO_MINHO.slice(0, 6),
    lastUpdated: 'Live GPS',
    isGpsLive: true,
    officialApiSource: 'Infraestruturas de Portugal Open Data',
    stops: [
      { stationId: 'st-porto-sao-bento', stationName: 'Porto São Bento', stationCode: 'POR-SB', scheduledArrival: '08:45', actualArrival: '08:45', scheduledDeparture: '08:45', actualDeparture: '08:45', platform: '2', passed: true },
      { stationId: 'st-porto-campanha', stationName: 'Porto Campanhã', stationCode: 'POR-CAM', scheduledArrival: '08:50', actualArrival: '08:50', scheduledDeparture: '08:52', actualDeparture: '08:52', platform: '7', passed: true },
      { stationId: 'st-famalicao', stationName: 'Vila Nova de Famalicão', stationCode: 'VNF', scheduledArrival: '09:28', actualArrival: '09:30', scheduledDeparture: '09:29', actualDeparture: '09:31', platform: '2', passed: false, isCurrent: true },
      { stationId: 'st-braga', stationName: 'Braga', stationCode: 'BRG', scheduledArrival: '09:55', actualArrival: '09:57', scheduledDeparture: '09:55', actualDeparture: '09:57', platform: '3', passed: false },
    ],
  });

  // 6. Regional R 5812 (Linha do Algarve: Lagos -> Vila Real de Sto. António)
  fleet.push({
    id: 'CP-R5812',
    trainNumber: 'R 5812',
    operator: 'CP',
    operatorName: 'Comboios de Portugal',
    category: 'REGIONAL',
    categoryLabel: 'Regional do Algarve',
    origin: { code: 'LGS', name: 'Lagos', city: 'Lagos', departureTime: '08:15' },
    destination: { code: 'FAO', name: 'Faro', city: 'Faro', arrivalTime: '09:52' },
    currentPosition: { latitude: 37.1654, longitude: -8.2562, heading: 110, speedKmH: 80, altitudeM: 25 },
    delayMinutes: 0,
    delayStatus: 'ON_TIME',
    statusText: 'On Time',
    lineName: 'Linha do Algarve',
    rollingStock: ROLLING_STOCK.CP_2240,
    progressPercent: 50,
    routeCoordinates: [
      [37.1084, -8.6728], // Lagos
      [37.1350, -8.5340], // Portimão
      [37.1850, -8.4420], // Silves
      [37.1654, -8.2562], // Tunes
      [37.1280, -8.2340], // Albufeira
      [37.0780, -8.0820], // Loulé
      [37.0189, -7.9392], // Faro
    ],
    lastUpdated: 'Live GPS',
    isGpsLive: true,
    officialApiSource: 'Infraestruturas de Portugal Open Data',
    stops: [
      { stationId: 'st-lagos', stationName: 'Lagos', stationCode: 'LGS', scheduledArrival: '08:15', actualArrival: '08:15', scheduledDeparture: '08:15', actualDeparture: '08:15', platform: '1', passed: true },
      { stationId: 'st-tunes', stationName: 'Tunes', stationCode: 'TUN', scheduledArrival: '09:12', actualArrival: '09:12', scheduledDeparture: '09:15', actualDeparture: '09:15', platform: '2', passed: false, isCurrent: true },
      { stationId: 'st-faro', stationName: 'Faro', stationCode: 'FAO', scheduledArrival: '09:52', actualArrival: '09:52', scheduledDeparture: '09:52', actualDeparture: '09:52', platform: '3', passed: false },
    ],
  });

  return fleet;
}

class RailApiService {
  private trains: Train[] = [];
  private listeners: ((trains: Train[]) => void)[] = [];
  private updateTimer: number | null = null;
  private isSimulationRunning = false;

  constructor() {
    this.trains = generateNetworkFleet();
    this.startLiveSimulation();
  }

  // Subscribe to real-time train telemetry updates
  public subscribe(callback: (trains: Train[]) => void): () => void {
    this.listeners.push(callback);
    callback(this.trains);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  // Get all currently tracked trains
  public getAllTrains(): Train[] {
    return [...this.trains];
  }

  // Get specific train by ID or train number
  public getTrainById(idOrNumber: string): Train | undefined {
    const query = idOrNumber.toLowerCase().trim();
    return this.trains.find(
      (t) => t.id.toLowerCase() === query || t.trainNumber.toLowerCase().replace(/\s+/g, '') === query.replace(/\s+/g, '')
    );
  }

  // Get all network stations
  public getStations(): Station[] {
    return [...STATIONS];
  }

  // Get station by ID or code
  public getStationById(idOrCode: string): Station | undefined {
    const q = idOrCode.toLowerCase();
    return STATIONS.find((s) => s.id.toLowerCase() === q || s.code.toLowerCase() === q);
  }

  // Generate realistic live departures & arrivals board for a station
  public getStationBoard(stationId: string): { departures: StationDepartureItem[]; arrivals: StationDepartureItem[] } {
    const station = this.getStationById(stationId);
    if (!station) return { departures: [], arrivals: [] };

    // Find trains that include this station in their stops or routes
    const relevantTrains = this.trains.filter((t) =>
      t.stops.some((s) => s.stationId === station.id || s.stationCode === station.code) ||
      t.origin.code === station.code ||
      t.destination.code === station.code
    );

    const departures: StationDepartureItem[] = [];
    const arrivals: StationDepartureItem[] = [];

    // Process from active trains
    relevantTrains.forEach((train) => {
      const stop = train.stops.find((s) => s.stationId === station.id || s.stationCode === station.code);
      const isOrigin = train.origin.code === station.code;
      const isDest = train.destination.code === station.code;

      let status: 'SCHEDULED' | 'BOARDING' | 'DELAYED' | 'DEPARTED' | 'ARRIVED' = 'SCHEDULED';
      if (stop?.passed) {
        status = isDest ? 'ARRIVED' : 'DEPARTED';
      } else if (stop?.isCurrent) {
        status = 'BOARDING';
      } else if (train.delayMinutes > 5) {
        status = 'DELAYED';
      }

      if (!isDest) {
        departures.push({
          trainNumber: train.trainNumber,
          trainId: train.id,
          destination: train.destination.name,
          origin: train.origin.name,
          operator: train.operator,
          category: train.category,
          scheduledTime: stop?.scheduledDeparture || train.origin.departureTime,
          estimatedTime: stop?.actualDeparture || train.origin.departureTime,
          platform: stop?.platform || '1',
          delayMinutes: train.delayMinutes,
          status,
        });
      }

      if (!isOrigin) {
        arrivals.push({
          trainNumber: train.trainNumber,
          trainId: train.id,
          destination: train.destination.name,
          origin: train.origin.name,
          operator: train.operator,
          category: train.category,
          scheduledTime: stop?.scheduledArrival || train.destination.arrivalTime,
          estimatedTime: stop?.actualArrival || train.destination.arrivalTime,
          platform: stop?.platform || '2',
          delayMinutes: train.delayMinutes,
          status,
        });
      }
    });

    // Sort boards by time
    departures.sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
    arrivals.sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

    return { departures, arrivals };
  }

  // Filter trains by operator, type, delay, country, speed
  public filterTrains(trains: Train[], filter: FilterState): Train[] {
    return trains.filter((train) => {
      // 1. Text Search query
      if (filter.searchQuery.trim()) {
        const query = filter.searchQuery.toLowerCase().trim();
        const matchesNumber = train.trainNumber.toLowerCase().includes(query);
        const matchesOrigin = train.origin.name.toLowerCase().includes(query) || train.origin.city.toLowerCase().includes(query);
        const matchesDest = train.destination.name.toLowerCase().includes(query) || train.destination.city.toLowerCase().includes(query);
        const matchesLine = train.lineName.toLowerCase().includes(query);
        const matchesOperator = train.operatorName.toLowerCase().includes(query) || train.operator.toLowerCase().includes(query);
        if (!matchesNumber && !matchesOrigin && !matchesDest && !matchesLine && !matchesOperator) {
          return false;
        }
      }

      // 2. Operators filter
      if (filter.selectedOperators.length > 0 && !filter.selectedOperators.includes(train.operator)) {
        return false;
      }

      // 3. Train Categories filter
      if (filter.selectedCategories.length > 0 && !filter.selectedCategories.includes(train.category)) {
        return false;
      }

      // 4. Delay status filter
      if (filter.delayFilter === 'ON_TIME' && train.delayMinutes > 3) return false;
      if (filter.delayFilter === 'DELAYED_MINOR' && (train.delayMinutes <= 3 || train.delayMinutes > 15)) return false;
      if (filter.delayFilter === 'DELAYED_MAJOR' && train.delayMinutes <= 15) return false;

      // 5. Min speed filter
      if (train.currentPosition.speedKmH < filter.minSpeed) return false;

      // 6. Only moving
      if (filter.onlyMoving && train.currentPosition.speedKmH === 0) return false;

      // 7. Country filter
      if (filter.selectedCountry === 'PT' && !['CP', 'FERTAGUS', 'MEDWAY'].includes(train.operator)) return false;
      if (filter.selectedCountry === 'ES' && train.operator !== 'RENFE') return false;
      if (filter.selectedCountry === 'FR' && train.operator !== 'SNCF') return false;
      if (filter.selectedCountry === 'DE' && train.operator !== 'DB') return false;

      return true;
    });
  }

  // Start live telemetry simulation loop that recalculates train GPS positions smoothly
  private startLiveSimulation() {
    if (this.isSimulationRunning) return;
    this.isSimulationRunning = true;

    // Tick every 2.5 seconds to advance train progress along real tracks
    this.updateTimer = window.setInterval(() => {
      this.tickTelemetry();
    }, 2500);
  }

  private tickTelemetry() {
    const updatedTrains = this.trains.map((train) => {
      // Advance progress percentage slightly (e.g. 0.15% per tick, varying by speed)
      const speedFactor = (train.currentPosition.speedKmH / 200) * 0.12;
      let newProgress = train.progressPercent + speedFactor;

      // Loop around route for continuous visual demonstration
      if (newProgress >= 99.5) {
        newProgress = 0.5;
      }

      // Interpolate GPS lat, lng, and heading along actual corridor track
      const { lat, lng, heading } = interpolatePositionAlongPath(
        train.routeCoordinates,
        newProgress / 100
      );

      // Subtle realistic speed variance (+/- 3 km/h around cruising speed)
      const targetSpeed = train.rollingStock.maxSpeed * 0.88;
      const speedVariance = (Math.random() - 0.5) * 4;
      const newSpeed = Math.round(Math.max(40, Math.min(train.rollingStock.maxSpeed, targetSpeed + speedVariance)));

      // Update stop passed states based on progress
      const totalStops = train.stops.length;
      const currentStopIndex = Math.min(
        totalStops - 1,
        Math.floor((newProgress / 100) * totalStops)
      );

      const updatedStops = train.stops.map((stop, idx) => ({
        ...stop,
        passed: idx < currentStopIndex,
        isCurrent: idx === currentStopIndex,
      }));

      // Calculate delay status
      let delayStatus: DelayStatus = 'ON_TIME';
      if (train.delayMinutes > 15) delayStatus = 'MAJOR_DELAY';
      else if (train.delayMinutes > 5) delayStatus = 'MODERATE_DELAY';
      else if (train.delayMinutes > 0) delayStatus = 'MINOR_DELAY';

      return {
        ...train,
        progressPercent: parseFloat(newProgress.toFixed(2)),
        currentPosition: {
          latitude: parseFloat(lat.toFixed(6)),
          longitude: parseFloat(lng.toFixed(6)),
          heading: Math.round(heading),
          speedKmH: newSpeed,
          altitudeM: train.currentPosition.altitudeM,
        },
        delayStatus,
        stops: updatedStops,
        lastUpdated: 'Live GPS',
      };
    });

    this.trains = updatedTrains;
    this.listeners.forEach((listener) => listener(this.trains));
  }

  public stopLiveSimulation() {
    if (this.updateTimer !== null) {
      clearInterval(this.updateTimer);
      this.updateTimer = null;
    }
    this.isSimulationRunning = false;
  }
}

// Singleton instance
export const railApiService = new RailApiService();
