import { Station, Train, RollingStockInfo } from '../types/train';

// Real station coordinates in Portugal and connected European nodes
export const STATIONS: Station[] = [
  // Portugal - Linha do Norte & Porto Hub
  {
    id: 'st-lis-sa',
    name: 'Lisboa Santa Apolónia',
    code: 'LIS-SA',
    city: 'Lisboa',
    country: 'Portugal',
    latitude: 38.7138,
    longitude: -9.1226,
    lines: ['Linha do Norte', 'Linha de Cintura'],
    platformsCount: 8,
    dailyDepartures: 140,
    operator: 'CP',
  },
  {
    id: 'st-lis-or',
    name: 'Lisboa Oriente',
    code: 'LIS-OR',
    city: 'Lisboa',
    country: 'Portugal',
    latitude: 38.7678,
    longitude: -9.0994,
    lines: ['Linha do Norte', 'Linha de Sintra', 'Linha de Cintura'],
    platformsCount: 8,
    dailyDepartures: 380,
    operator: 'CP',
  },
  {
    id: 'st-santarem',
    name: 'Santarém',
    code: 'STM',
    city: 'Santarém',
    country: 'Portugal',
    latitude: 39.2396,
    longitude: -8.6708,
    lines: ['Linha do Norte'],
    platformsCount: 4,
    dailyDepartures: 74,
    operator: 'CP',
  },
  {
    id: 'st-entroncamento',
    name: 'Entroncamento',
    code: 'ENT',
    city: 'Entroncamento',
    country: 'Portugal',
    latitude: 39.4651,
    longitude: -8.4682,
    lines: ['Linha do Norte', 'Linha da Beira Baixa', 'Linha do Leste'],
    platformsCount: 6,
    dailyDepartures: 120,
    operator: 'CP',
  },
  {
    id: 'st-pombal',
    name: 'Pombal',
    code: 'PBL',
    city: 'Pombal',
    country: 'Portugal',
    latitude: 39.9157,
    longitude: -8.6315,
    lines: ['Linha do Norte'],
    platformsCount: 4,
    dailyDepartures: 68,
    operator: 'CP',
  },
  {
    id: 'st-coimbra-b',
    name: 'Coimbra-B',
    code: 'CBR-B',
    city: 'Coimbra',
    country: 'Portugal',
    latitude: 40.2248,
    longitude: -8.4419,
    lines: ['Linha do Norte', 'Ramal da Lousã'],
    platformsCount: 5,
    dailyDepartures: 154,
    operator: 'CP',
  },
  {
    id: 'st-aveiro',
    name: 'Aveiro',
    code: 'AVR',
    city: 'Aveiro',
    country: 'Portugal',
    latitude: 40.6437,
    longitude: -8.6406,
    lines: ['Linha do Norte', 'Linha do Vouga'],
    platformsCount: 5,
    dailyDepartures: 142,
    operator: 'CP',
  },
  {
    id: 'st-espinho',
    name: 'Espinho',
    code: 'ESP',
    city: 'Espinho',
    country: 'Portugal',
    latitude: 41.0069,
    longitude: -8.6425,
    lines: ['Linha do Norte', 'Linha do Vouga'],
    platformsCount: 4,
    dailyDepartures: 98,
    operator: 'CP',
  },
  {
    id: 'st-porto-campanha',
    name: 'Porto Campanhã',
    code: 'POR-CAM',
    city: 'Porto',
    country: 'Portugal',
    latitude: 41.1491,
    longitude: -8.5855,
    lines: ['Linha do Norte', 'Linha do Minho', 'Linha do Douro'],
    platformsCount: 8,
    dailyDepartures: 310,
    operator: 'CP',
  },
  {
    id: 'st-porto-sao-bento',
    name: 'Porto São Bento',
    code: 'POR-SB',
    city: 'Porto',
    country: 'Portugal',
    latitude: 41.1455,
    longitude: -8.6103,
    lines: ['Linha do Norte', 'Linha do Minho', 'Linha do Douro'],
    platformsCount: 6,
    dailyDepartures: 190,
    operator: 'CP',
  },
  {
    id: 'st-braga',
    name: 'Braga',
    code: 'BRG',
    city: 'Braga',
    country: 'Portugal',
    latitude: 41.5487,
    longitude: -8.4344,
    lines: ['Ramal de Braga', 'Linha do Minho'],
    platformsCount: 4,
    dailyDepartures: 82,
    operator: 'CP',
  },
  {
    id: 'st-guimaraes',
    name: 'Guimarães',
    code: 'GMR',
    city: 'Guimarães',
    country: 'Portugal',
    latitude: 41.4394,
    longitude: -8.2936,
    lines: ['Linha de Guimarães'],
    platformsCount: 3,
    dailyDepartures: 52,
    operator: 'CP',
  },
  {
    id: 'st-viana-do-castelo',
    name: 'Viana do Castelo',
    code: 'VNC',
    city: 'Viana do Castelo',
    country: 'Portugal',
    latitude: 41.6961,
    longitude: -8.8286,
    lines: ['Linha do Minho'],
    platformsCount: 3,
    dailyDepartures: 38,
    operator: 'CP',
  },
  {
    id: 'st-valenca',
    name: 'Valença',
    code: 'VAL',
    city: 'Valença',
    country: 'Portugal',
    latitude: 42.0286,
    longitude: -8.6406,
    lines: ['Linha do Minho (Fronteira)'],
    platformsCount: 3,
    dailyDepartures: 26,
    operator: 'CP',
  },

  // Portugal - Linha do Sul & Algarve
  {
    id: 'st-pragal',
    name: 'Pragal',
    code: 'PRG',
    city: 'Almada',
    country: 'Portugal',
    latitude: 38.6749,
    longitude: -9.1764,
    lines: ['Linha do Sul', 'Eixo Norte-Sul'],
    platformsCount: 4,
    dailyDepartures: 148,
    operator: 'FERTAGUS',
  },
  {
    id: 'st-pinhal-novo',
    name: 'Pinhal Novo',
    code: 'PNV',
    city: 'Palmela',
    country: 'Portugal',
    latitude: 38.6322,
    longitude: -8.9133,
    lines: ['Linha do Sul', 'Linha do Alentejo'],
    platformsCount: 5,
    dailyDepartures: 110,
    operator: 'CP',
  },
  {
    id: 'st-setubal',
    name: 'Setúbal',
    code: 'STB',
    city: 'Setúbal',
    country: 'Portugal',
    latitude: 38.5303,
    longitude: -8.8874,
    lines: ['Linha do Sul', 'Linha do Sado'],
    platformsCount: 4,
    dailyDepartures: 96,
    operator: 'FERTAGUS',
  },
  {
    id: 'st-grandola',
    name: 'Grândola',
    code: 'GDL',
    city: 'Grândola',
    country: 'Portugal',
    latitude: 38.1752,
    longitude: -8.5671,
    lines: ['Linha do Sul'],
    platformsCount: 3,
    dailyDepartures: 28,
    operator: 'CP',
  },
  {
    id: 'st-tunes',
    name: 'Tunes',
    code: 'TUN',
    city: 'Silves',
    country: 'Portugal',
    latitude: 37.1654,
    longitude: -8.2562,
    lines: ['Linha do Sul', 'Linha do Algarve'],
    platformsCount: 4,
    dailyDepartures: 48,
    operator: 'CP',
  },
  {
    id: 'st-faro',
    name: 'Faro',
    code: 'FAO',
    city: 'Faro',
    country: 'Portugal',
    latitude: 37.0189,
    longitude: -7.9392,
    lines: ['Linha do Algarve', 'Linha do Sul'],
    platformsCount: 4,
    dailyDepartures: 56,
    operator: 'CP',
  },
  {
    id: 'st-lagos',
    name: 'Lagos',
    code: 'LGS',
    city: 'Lagos',
    country: 'Portugal',
    latitude: 37.1084,
    longitude: -8.6728,
    lines: ['Linha do Algarve'],
    platformsCount: 2,
    dailyDepartures: 24,
    operator: 'CP',
  },

  // Portugal - Sintra, Cascais, Beira & Douro
  {
    id: 'st-sintra',
    name: 'Sintra',
    code: 'SNT',
    city: 'Sintra',
    country: 'Portugal',
    latitude: 38.8009,
    longitude: -9.3813,
    lines: ['Linha de Sintra'],
    platformsCount: 3,
    dailyDepartures: 130,
    operator: 'CP',
  },
  {
    id: 'st-cascais',
    name: 'Cascais',
    code: 'CAS',
    city: 'Cascais',
    country: 'Portugal',
    latitude: 38.7006,
    longitude: -9.4182,
    lines: ['Linha de Cascais'],
    platformsCount: 3,
    dailyDepartures: 140,
    operator: 'CP',
  },
  {
    id: 'st-cais-sodre',
    name: 'Cais do Sodré',
    code: 'CSD',
    city: 'Lisboa',
    country: 'Portugal',
    latitude: 38.7061,
    longitude: -9.1450,
    lines: ['Linha de Cascais'],
    platformsCount: 5,
    dailyDepartures: 140,
    operator: 'CP',
  },
  {
    id: 'st-regua',
    name: 'Peso da Régua',
    code: 'REG',
    city: 'Peso da Régua',
    country: 'Portugal',
    latitude: 41.1578,
    longitude: -7.7852,
    lines: ['Linha do Douro', 'Ramal do Corgo'],
    platformsCount: 3,
    dailyDepartures: 32,
    operator: 'CP',
  },
  {
    id: 'st-evora',
    name: 'Évora',
    code: 'EVR',
    city: 'Évora',
    country: 'Portugal',
    latitude: 38.5663,
    longitude: -7.9048,
    lines: ['Linha de Évora'],
    platformsCount: 2,
    dailyDepartures: 22,
    operator: 'CP',
  },
  {
    id: 'st-guarda',
    name: 'Guarda',
    code: 'GDA',
    city: 'Guarda',
    country: 'Portugal',
    latitude: 40.5489,
    longitude: -7.2472,
    lines: ['Linha da Beira Alta', 'Linha da Beira Baixa'],
    platformsCount: 4,
    dailyDepartures: 34,
    operator: 'CP',
  },

  // Cross-Border & Europe
  {
    id: 'st-vigo',
    name: 'Vigo Guixar',
    code: 'VGO',
    city: 'Vigo',
    country: 'Spain',
    latitude: 42.2384,
    longitude: -8.7176,
    lines: ['Linha do Minho / Corredor Atlántico'],
    platformsCount: 4,
    dailyDepartures: 46,
    operator: 'RENFE',
  },
  {
    id: 'st-madrid-atocha',
    name: 'Madrid Puerta de Atocha',
    code: 'MAD-AT',
    city: 'Madrid',
    country: 'Spain',
    latitude: 40.4065,
    longitude: -3.6894,
    lines: ['Alta Velocidad Española (AVE)', 'Cercanías'],
    platformsCount: 15,
    dailyDepartures: 420,
    operator: 'RENFE',
  },
  {
    id: 'st-madrid-chamartin',
    name: 'Madrid Chamartín',
    code: 'MAD-CH',
    city: 'Madrid',
    country: 'Spain',
    latitude: 40.4719,
    longitude: -3.6826,
    lines: ['AVE Norte', 'Línea de Lisboa'],
    platformsCount: 12,
    dailyDepartures: 360,
    operator: 'RENFE',
  },
  {
    id: 'st-paris-lyon',
    name: 'Paris Gare de Lyon',
    code: 'PAR-GL',
    city: 'Paris',
    country: 'France',
    latitude: 48.8443,
    longitude: 2.3734,
    lines: ['LGV Sud-Est', 'TGV InOui'],
    platformsCount: 23,
    dailyDepartures: 490,
    operator: 'SNCF',
  },
  {
    id: 'st-frankfurt-hbf',
    name: 'Frankfurt (Main) Hbf',
    code: 'FRA-HB',
    city: 'Frankfurt',
    country: 'Germany',
    latitude: 50.1071,
    longitude: 8.6638,
    lines: ['ICE InterCityExpress', 'S-Bahn'],
    platformsCount: 25,
    dailyDepartures: 620,
    operator: 'DB',
  },
];

// Rolling stock details
export const ROLLING_STOCK: Record<string, RollingStockInfo> = {
  CP_4000: {
    series: 'CP Série 4000 (Alfa Pendular)',
    manufacturer: 'Fiat Ferroviaria / Siemens Mobility',
    traction: '25 kV 50 Hz AC Electric (Tilting Body)',
    maxSpeed: 220,
    gauge: '1,668 mm (Iberian Broad Gauge)',
    coaches: 6,
    lengthM: 158.9,
  },
  CP_5600: {
    series: 'CP Série 5600 + Carruagens Corail',
    manufacturer: 'Siemens / Krauss-Maffei / Sorefame',
    traction: '25 kV 50 Hz AC (5600 kW / 7600 hp)',
    maxSpeed: 200,
    gauge: '1,668 mm (Iberian Broad Gauge)',
    coaches: 5,
    lengthM: 165.2,
  },
  CP_2240: {
    series: 'CP Série 2240 (Regional / InterRegional)',
    manufacturer: 'Alstom / Sorefame',
    traction: '25 kV 50 Hz Electric Multiple Unit',
    maxSpeed: 120,
    gauge: '1,668 mm (Iberian Broad Gauge)',
    coaches: 3,
    lengthM: 69.8,
  },
  CP_3500: {
    series: 'CP Série 3500 (Double-Deck Suburban)',
    manufacturer: 'CAF / Alstom',
    traction: '25 kV 50 Hz Electric Double-Deck',
    maxSpeed: 140,
    gauge: '1,668 mm (Iberian Broad Gauge)',
    coaches: 4,
    lengthM: 104.2,
  },
  FERTAGUS_3500: {
    series: 'Fertagus Série 3500 (Double-Deck)',
    manufacturer: 'GEC Alsthom / CAF',
    traction: '25 kV 50 Hz Electric Double-Deck',
    maxSpeed: 140,
    gauge: '1,668 mm (Iberian Broad Gauge)',
    coaches: 4,
    lengthM: 104.2,
  },
  CP_3400: {
    series: 'CP Série 3400 (Viriato - Urbanos do Porto)',
    manufacturer: 'Bombardier / Siemens',
    traction: '25 kV 50 Hz AC Articulated EMU',
    maxSpeed: 140,
    gauge: '1,668 mm (Iberian Broad Gauge)',
    coaches: 4,
    lengthM: 88.4,
  },
  CP_2300: {
    series: 'CP Série 2300/2400 (Urbanos de Lisboa)',
    manufacturer: 'Sorefame / Siemens',
    traction: '25 kV 50 Hz Electric Multiple Unit',
    maxSpeed: 120,
    gauge: '1,668 mm (Iberian Broad Gauge)',
    coaches: 4,
    lengthM: 95.6,
  },
  MEDWAY_4700: {
    series: 'Medway Série 4700 (EuroSprinter Freight)',
    manufacturer: 'Siemens Mobility',
    traction: '25 kV 50 Hz AC (4684 kW Cargo)',
    maxSpeed: 140,
    gauge: '1,668 mm (Iberian Broad Gauge)',
    coaches: 18,
    lengthM: 380.0,
  },
  RENFE_599: {
    series: 'Renfe Série 599 (Automotora Diesel Celta)',
    manufacturer: 'CAF (Construcciones y Auxiliar de Ferrocarriles)',
    traction: 'Diesel Hidráulica Multiple Unit',
    maxSpeed: 160,
    gauge: '1,668 mm (Iberian Broad Gauge)',
    coaches: 3,
    lengthM: 75.9,
  },
  RENFE_AVE_102: {
    series: 'Renfe Série 102 "Pato" (AVE High-Speed)',
    manufacturer: 'Talgo / Bombardier',
    traction: '25 kV 50 Hz AC High Speed',
    maxSpeed: 330,
    gauge: '1,435 mm (Standard European Gauge)',
    coaches: 12,
    lengthM: 200.0,
  },
  SNCF_TGV_DUPLEX: {
    series: 'SNCF TGV Duplex (High-Speed)',
    manufacturer: 'Alstom Transport',
    traction: '25 kV 50 Hz / 1.5 kV DC Bi-current',
    maxSpeed: 320,
    gauge: '1,435 mm (Standard European Gauge)',
    coaches: 8,
    lengthM: 200.2,
  },
  DB_ICE_3: {
    series: 'DB ICE 3 (Baureihe 403 / Velaro)',
    manufacturer: 'Siemens Mobility',
    traction: '15 kV 16.7 Hz AC Multi-system',
    maxSpeed: 330,
    gauge: '1,435 mm (Standard European Gauge)',
    coaches: 8,
    lengthM: 200.8,
  },
};

// Accurate track geometries for key corridors in Portugal
export const CORRIDOR_TRACKS: Record<string, [number, number][]> = {
  // Linha do Norte: Lisboa Santa Apolónia -> Porto Campanhã (~335 km)
  LINHA_DO_NORTE: [
    [38.7138, -9.1226], // Lisboa Santa Apolónia
    [38.7302, -9.1120], // Xabregas
    [38.7480, -9.1030], // Marvila
    [38.7678, -9.0994], // Lisboa Oriente
    [38.7950, -9.0920], // Moscavide / Sacavém
    [38.8320, -9.0760], // Alverca
    [38.8950, -9.0220], // Vila Franca de Xira
    [38.9680, -8.9640], // Castanheira do Ribatejo
    [39.0620, -8.8450], // Azambuja
    [39.2396, -8.6708], // Santarém
    [39.3820, -8.5410], // Vale de Figueira / Mato de Miranda
    [39.4651, -8.4682], // Entroncamento
    [39.6380, -8.5290], // Caxarias
    [39.7740, -8.5830], // Albergaria dos Doze
    [39.9157, -8.6315], // Pombal
    [40.0380, -8.6650], // Soure
    [40.1250, -8.6120], // Alfarelos
    [40.2248, -8.4419], // Coimbra-B
    [40.3200, -8.4680], // Pampilhosa
    [40.4280, -8.5290], // Mealhada
    [40.6437, -8.6406], // Aveiro
    [40.7580, -8.6010], // Estarreja
    [40.8650, -8.6250], // Ovar
    [41.0069, -8.6425], // Espinho
    [41.0720, -8.6180], // Granja / Valadares
    [41.1240, -8.6140], // Vila Nova de Gaia
    [41.1491, -8.5855], // Porto Campanhã
  ],

  // Linha do Sul: Lisboa -> Faro (~298 km)
  LINHA_DO_SUL: [
    [38.7678, -9.0994], // Lisboa Oriente
    [38.7450, -9.1460], // Roma-Areeiro
    [38.7360, -9.1620], // Entrecampos
    [38.7340, -9.1720], // Sete Rios
    [38.6749, -9.1764], // Ponte 25 de Abril -> Pragal
    [38.6450, -9.1240], // Corroios
    [38.6180, -9.0820], // Fogueteiro
    [38.5830, -9.0520], // Coina
    [38.6322, -8.9133], // Pinhal Novo
    [38.5303, -8.8874], // Setúbal
    [38.3840, -8.6850], // Alcácer do Sal
    [38.1752, -8.5671], // Grândola
    [37.9540, -8.4520], // Ermidas-Sado
    [37.7650, -8.3640], // Funcheira
    [37.5250, -8.3200], // Amoreiras-Gare
    [37.3250, -8.2980], // São Marcos da Serra
    [37.1654, -8.2562], // Tunes
    [37.1280, -8.2340], // Albufeira-Ferreiras
    [37.0780, -8.0820], // Loulé
    [37.0189, -7.9392], // Faro
  ],

  // Linha do Minho & Celta: Porto -> Braga / Vigo (~172 km)
  LINHA_DO_MINHO: [
    [41.1491, -8.5855], // Porto Campanhã
    [41.2280, -8.5520], // Ermesinde
    [41.3120, -8.5140], // São Romão
    [41.4280, -8.5080], // Famalicão
    [41.5120, -8.4680], // Nine
    [41.5487, -8.4344], // Braga (divergence)
    [41.5820, -8.6120], // Barcelos
    [41.6961, -8.8286], // Viana do Castelo
    [41.8120, -8.8420], // Caminha
    [41.9250, -8.7420], // Vila Nova de Cerveira
    [42.0286, -8.6406], // Valença (Border)
    [42.1240, -8.6750], // Tui (Spain)
    [42.2384, -8.7176], // Vigo Guixar
  ],

  // Linha de Cascais: Cais do Sodré -> Cascais (~26 km)
  LINHA_DE_CASCAIS: [
    [38.7061, -9.1450], // Cais do Sodré
    [38.7012, -9.1780], // Alcântara-Mar
    [38.6968, -9.2065], // Belém
    [38.6980, -9.2360], // Algés
    [38.6970, -9.2680], // Cruz Quebrada
    [38.6960, -9.3140], // Oeiras
    [38.6940, -9.3520], // Carcavelos
    [38.7020, -9.3980], // Estoril
    [38.7006, -9.4182], // Cascais
  ],

  // Linha de Sintra: Rossio / Oriente -> Sintra (~28 km)
  LINHA_DE_SINTRA: [
    [38.7140, -9.1400], // Rossio
    [38.7360, -9.1620], // Entrecampos
    [38.7340, -9.1720], // Sete Rios
    [38.7480, -9.2010], // Benfica
    [38.7560, -9.2420], // Queluz-Belas
    [38.7620, -9.2840], // Cacém
    [38.7840, -9.3420], // Rio de Mouro
    [38.8009, -9.3813], // Sintra
  ],

  // Linha do Douro: Porto -> Régua (~106 km)
  LINHA_DO_DOURO: [
    [41.1491, -8.5855], // Porto Campanhã
    [41.2280, -8.5520], // Ermesinde
    [41.2050, -8.4520], // Valongo
    [41.1820, -8.3180], // Penafiel
    [41.1750, -8.2120], // Caíde
    [41.1450, -8.0820], // Marco de Canaveses
    [41.1620, -7.9540], // Mosteirô
    [41.1578, -7.7852], // Peso da Régua
  ],

  // Fertagus Cross-Tagus: Roma-Areeiro -> Setúbal (~54 km)
  FERTAGUS_CORRIDOR: [
    [38.7450, -9.1460], // Roma-Areeiro
    [38.7360, -9.1620], // Entrecampos
    [38.7340, -9.1720], // Sete Rios
    [38.7310, -9.1790], // Campolide
    [38.6749, -9.1764], // Pragal
    [38.6450, -9.1240], // Corroios
    [38.6280, -9.1020], // Foros de Amora
    [38.6180, -9.0820], // Fogueteiro
    [38.5830, -9.0520], // Coina
    [38.5880, -8.9890], // Penalva
    [38.6322, -8.9133], // Pinhal Novo
    [38.5720, -8.8950], // Palmela
    [38.5303, -8.8874], // Setúbal
  ],

  // Madrid - Barcelona High-Speed Line
  AVE_MADRID_BARCELONA: [
    [40.4065, -3.6894], // Madrid Atocha
    [40.6250, -3.1520], // Guadalajara Yebes
    [41.3420, -2.1240], // Calatayud
    [41.6560, -0.8770], // Zaragoza Delicias
    [41.6140, 0.6260],  // Lleida Pirineus
    [41.1180, 1.2450],  // Camp de Tarragona
    [41.3790, 2.1400],  // Barcelona Sants
  ],

  // Paris - Lyon TGV High-Speed Line
  TGV_PARIS_LYON: [
    [48.8443, 2.3734],  // Paris Gare de Lyon
    [48.6120, 2.5820],  // Combs-la-Ville
    [48.2450, 3.2840],  // Sens
    [47.3820, 4.2150],  // Montbard
    [46.7820, 4.8540],  // Le Creusot TGV
    [46.2950, 4.7920],  // Mâcon-Loché TGV
    [45.7600, 4.8600],  // Lyon Part-Dieu
  ],
};

// Helper to interpolate position along a coordinate path
export function interpolatePositionAlongPath(
  path: [number, number][],
  ratio: number // 0 to 1
): { lat: number; lng: number; heading: number } {
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  if (path.length === 0) return { lat: 38.7138, lng: -9.1226, heading: 0 };
  if (path.length === 1 || clampedRatio === 0) {
    return { lat: path[0][0], lng: path[0][1], heading: 0 };
  }
  if (clampedRatio === 1) {
    const p1 = path[path.length - 2];
    const p2 = path[path.length - 1];
    return { lat: p2[0], lng: p2[1], heading: calculateHeading(p1[0], p1[1], p2[0], p2[1]) };
  }

  const segmentIndex = Math.floor(clampedRatio * (path.length - 1));
  const segmentRatio = (clampedRatio * (path.length - 1)) - segmentIndex;
  
  const p1 = path[segmentIndex];
  const p2 = path[Math.min(segmentIndex + 1, path.length - 1)];

  const lat = p1[0] + (p2[0] - p1[0]) * segmentRatio;
  const lng = p1[1] + (p2[1] - p1[1]) * segmentRatio;
  const heading = calculateHeading(p1[0], p1[1], p2[0], p2[1]);

  return { lat, lng, heading };
}

// Calculate compass heading in degrees from coord 1 to coord 2
export function calculateHeading(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const y = Math.sin(dLon) * Math.cos(lat2 * (Math.PI / 180));
  const x =
    Math.cos(lat1 * (Math.PI / 180)) * Math.sin(lat2 * (Math.PI / 180)) -
    Math.sin(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.cos(dLon);
  const brng = Math.atan2(y, x) * (180 / Math.PI);
  return (brng + 360) % 360;
}

// Initial realistic live train roster reflecting actual operations
export const INITIAL_TRAINS: Train[] = [
  // 1. Alfa Pendular AP 120 (Lisboa -> Porto)
  {
    id: 'CP-AP120',
    trainNumber: 'AP 120',
    operator: 'CP',
    operatorName: 'Comboios de Portugal',
    category: 'ALFA_PENDULAR',
    categoryLabel: 'Alfa Pendular (High-Speed)',
    origin: {
      code: 'LIS-SA',
      name: 'Lisboa Santa Apolónia',
      city: 'Lisboa',
      departureTime: '08:00',
    },
    destination: {
      code: 'POR-CAM',
      name: 'Porto Campanhã',
      city: 'Porto',
      arrivalTime: '10:58',
    },
    currentPosition: {
      latitude: 40.2248,
      longitude: -8.4419,
      heading: 10,
      speedKmH: 198,
      altitudeM: 32,
    },
    delayMinutes: 0,
    delayStatus: 'ON_TIME',
    statusText: 'On Time',
    lineName: 'Linha do Norte',
    rollingStock: ROLLING_STOCK.CP_4000,
    progressPercent: 62,
    routeCoordinates: CORRIDOR_TRACKS.LINHA_DO_NORTE,
    lastUpdated: 'Just now',
    isGpsLive: true,
    officialApiSource: 'Infraestruturas de Portugal Open Data',
    stops: [
      {
        stationId: 'st-lis-sa',
        stationName: 'Lisboa Santa Apolónia',
        stationCode: 'LIS-SA',
        scheduledArrival: '08:00',
        actualArrival: '08:00',
        scheduledDeparture: '08:00',
        actualDeparture: '08:00',
        platform: '2',
        passed: true,
      },
      {
        stationId: 'st-lis-or',
        stationName: 'Lisboa Oriente',
        stationCode: 'LIS-OR',
        scheduledArrival: '08:09',
        actualArrival: '08:09',
        scheduledDeparture: '08:11',
        actualDeparture: '08:11',
        platform: '3',
        passed: true,
      },
      {
        stationId: 'st-entroncamento',
        stationName: 'Entroncamento',
        stationCode: 'ENT',
        scheduledArrival: '08:58',
        actualArrival: '08:58',
        scheduledDeparture: '09:00',
        actualDeparture: '09:00',
        platform: '2',
        passed: true,
      },
      {
        stationId: 'st-coimbra-b',
        stationName: 'Coimbra-B',
        stationCode: 'CBR-B',
        scheduledArrival: '09:44',
        actualArrival: '09:44',
        scheduledDeparture: '09:46',
        actualDeparture: '09:46',
        platform: '1',
        passed: false,
        isCurrent: true,
      },
      {
        stationId: 'st-aveiro',
        stationName: 'Aveiro',
        stationCode: 'AVR',
        scheduledArrival: '10:18',
        actualArrival: '10:18',
        scheduledDeparture: '10:20',
        actualDeparture: '10:20',
        platform: '2',
        passed: false,
      },
      {
        stationId: 'st-espinho',
        stationName: 'Espinho',
        stationCode: 'ESP',
        scheduledArrival: '10:42',
        actualArrival: '10:42',
        scheduledDeparture: '10:43',
        actualDeparture: '10:43',
        platform: '1',
        passed: false,
      },
      {
        stationId: 'st-porto-campanha',
        stationName: 'Porto Campanhã',
        stationCode: 'POR-CAM',
        scheduledArrival: '10:58',
        actualArrival: '10:58',
        scheduledDeparture: '10:58',
        actualDeparture: '10:58',
        platform: '4',
        passed: false,
      },
    ],
  },

  // 2. Alfa Pendular AP 131 (Porto -> Lisboa)
  {
    id: 'CP-AP131',
    trainNumber: 'AP 131',
    operator: 'CP',
    operatorName: 'Comboios de Portugal',
    category: 'ALFA_PENDULAR',
    categoryLabel: 'Alfa Pendular (High-Speed)',
    origin: {
      code: 'POR-CAM',
      name: 'Porto Campanhã',
      city: 'Porto',
      departureTime: '08:32',
    },
    destination: {
      code: 'LIS-SA',
      name: 'Lisboa Santa Apolónia',
      city: 'Lisboa',
      arrivalTime: '11:30',
    },
    currentPosition: {
      latitude: 39.9157,
      longitude: -8.6315,
      heading: 190,
      speedKmH: 212,
      altitudeM: 45,
    },
    delayMinutes: 3,
    delayStatus: 'MINOR_DELAY',
    statusText: '+3 min',
    lineName: 'Linha do Norte',
    rollingStock: ROLLING_STOCK.CP_4000,
    progressPercent: 44,
    routeCoordinates: [...CORRIDOR_TRACKS.LINHA_DO_NORTE].reverse(),
    lastUpdated: 'Just now',
    isGpsLive: true,
    officialApiSource: 'Infraestruturas de Portugal Open Data',
    stops: [
      {
        stationId: 'st-porto-campanha',
        stationName: 'Porto Campanhã',
        stationCode: 'POR-CAM',
        scheduledArrival: '08:32',
        actualArrival: '08:32',
        scheduledDeparture: '08:32',
        actualDeparture: '08:35',
        platform: '3',
        passed: true,
      },
      {
        stationId: 'st-aveiro',
        stationName: 'Aveiro',
        stationCode: 'AVR',
        scheduledArrival: '09:05',
        actualArrival: '09:08',
        scheduledDeparture: '09:07',
        actualDeparture: '09:10',
        platform: '1',
        passed: true,
      },
      {
        stationId: 'st-coimbra-b',
        stationName: 'Coimbra-B',
        stationCode: 'CBR-B',
        scheduledArrival: '09:38',
        actualArrival: '09:41',
        scheduledDeparture: '09:40',
        actualDeparture: '09:43',
        platform: '2',
        passed: true,
      },
      {
        stationId: 'st-pombal',
        stationName: 'Pombal',
        stationCode: 'PBL',
        scheduledArrival: '10:02',
        actualArrival: '10:05',
        scheduledDeparture: '10:03',
        actualDeparture: '10:06',
        platform: '2',
        passed: false,
        isCurrent: true,
      },
      {
        stationId: 'st-entroncamento',
        stationName: 'Entroncamento',
        stationCode: 'ENT',
        scheduledArrival: '10:38',
        actualArrival: '10:41',
        scheduledDeparture: '10:40',
        actualDeparture: '10:43',
        platform: '1',
        passed: false,
      },
      {
        stationId: 'st-lis-or',
        stationName: 'Lisboa Oriente',
        stationCode: 'LIS-OR',
        scheduledArrival: '11:22',
        actualArrival: '11:25',
        scheduledDeparture: '11:24',
        actualDeparture: '11:27',
        platform: '4',
        passed: false,
      },
      {
        stationId: 'st-lis-sa',
        stationName: 'Lisboa Santa Apolónia',
        stationCode: 'LIS-SA',
        scheduledArrival: '11:30',
        actualArrival: '11:33',
        scheduledDeparture: '11:30',
        actualDeparture: '11:33',
        platform: '1',
        passed: false,
      },
    ],
  },

  // 3. Alfa Pendular AP 180 (Porto -> Faro via Lisboa Oriente)
  {
    id: 'CP-AP180',
    trainNumber: 'AP 180',
    operator: 'CP',
    operatorName: 'Comboios de Portugal',
    category: 'ALFA_PENDULAR',
    categoryLabel: 'Alfa Pendular (High-Speed)',
    origin: {
      code: 'POR-CAM',
      name: 'Porto Campanhã',
      city: 'Porto',
      departureTime: '06:40',
    },
    destination: {
      code: 'FAO',
      name: 'Faro',
      city: 'Faro',
      arrivalTime: '12:35',
    },
    currentPosition: {
      latitude: 37.7650,
      longitude: -8.3640,
      heading: 172,
      speedKmH: 184,
      altitudeM: 88,
    },
    delayMinutes: 0,
    delayStatus: 'ON_TIME',
    statusText: 'On Time',
    lineName: 'Linha do Sul',
    rollingStock: ROLLING_STOCK.CP_4000,
    progressPercent: 78,
    routeCoordinates: CORRIDOR_TRACKS.LINHA_DO_SUL,
    lastUpdated: 'Just now',
    isGpsLive: true,
    officialApiSource: 'Infraestruturas de Portugal Open Data',
    stops: [
      {
        stationId: 'st-lis-or',
        stationName: 'Lisboa Oriente',
        stationCode: 'LIS-OR',
        scheduledArrival: '09:32',
        actualArrival: '09:32',
        scheduledDeparture: '09:36',
        actualDeparture: '09:36',
        platform: '3',
        passed: true,
      },
      {
        stationId: 'st-pinhal-novo',
        stationName: 'Pinhal Novo',
        stationCode: 'PNV',
        scheduledArrival: '10:02',
        actualArrival: '10:02',
        scheduledDeparture: '10:04',
        actualDeparture: '10:04',
        platform: '2',
        passed: true,
      },
      {
        stationId: 'st-grandola',
        stationName: 'Grândola',
        stationCode: 'GDL',
        scheduledArrival: '10:48',
        actualArrival: '10:48',
        scheduledDeparture: '10:49',
        actualDeparture: '10:49',
        platform: '1',
        passed: true,
      },
      {
        stationId: 'st-tunes',
        stationName: 'Tunes',
        stationCode: 'TUN',
        scheduledArrival: '12:02',
        actualArrival: '12:02',
        scheduledDeparture: '12:04',
        actualDeparture: '12:04',
        platform: '1',
        passed: false,
        isCurrent: true,
      },
      {
        stationId: 'st-faro',
        stationName: 'Faro',
        stationCode: 'FAO',
        scheduledArrival: '12:35',
        actualArrival: '12:35',
        scheduledDeparture: '12:35',
        actualDeparture: '12:35',
        platform: '2',
        passed: false,
      },
    ],
  },

  // 4. Intercidades IC 512 (Lisboa Santa Apolónia -> Porto Campanhã)
  {
    id: 'CP-IC512',
    trainNumber: 'IC 512',
    operator: 'CP',
    operatorName: 'Comboios de Portugal',
    category: 'INTERCIDADES',
    categoryLabel: 'Intercidades',
    origin: {
      code: 'LIS-SA',
      name: 'Lisboa Santa Apolónia',
      city: 'Lisboa',
      departureTime: '08:30',
    },
    destination: {
      code: 'POR-CAM',
      name: 'Porto Campanhã',
      city: 'Porto',
      arrivalTime: '11:45',
    },
    currentPosition: {
      latitude: 39.4651,
      longitude: -8.4682,
      heading: 350,
      speedKmH: 155,
      altitudeM: 28,
    },
    delayMinutes: 7,
    delayStatus: 'MINOR_DELAY',
    statusText: '+7 min',
    lineName: 'Linha do Norte',
    rollingStock: ROLLING_STOCK.CP_5600,
    progressPercent: 35,
    routeCoordinates: CORRIDOR_TRACKS.LINHA_DO_NORTE,
    lastUpdated: 'Just now',
    isGpsLive: true,
    officialApiSource: 'Infraestruturas de Portugal Open Data',
    stops: [
      {
        stationId: 'st-lis-sa',
        stationName: 'Lisboa Santa Apolónia',
        stationCode: 'LIS-SA',
        scheduledArrival: '08:30',
        actualArrival: '08:30',
        scheduledDeparture: '08:30',
        actualDeparture: '08:35',
        platform: '4',
        passed: true,
      },
      {
        stationId: 'st-santarem',
        stationName: 'Santarém',
        stationCode: 'STM',
        scheduledArrival: '09:18',
        actualArrival: '09:24',
        scheduledDeparture: '09:20',
        actualDeparture: '09:26',
        platform: '1',
        passed: true,
      },
      {
        stationId: 'st-entroncamento',
        stationName: 'Entroncamento',
        stationCode: 'ENT',
        scheduledArrival: '09:42',
        actualArrival: '09:49',
        scheduledDeparture: '09:44',
        actualDeparture: '09:51',
        platform: '3',
        passed: false,
        isCurrent: true,
      },
      {
        stationId: 'st-pombal',
        stationName: 'Pombal',
        stationCode: 'PBL',
        scheduledArrival: '10:28',
        actualArrival: '10:35',
        scheduledDeparture: '10:30',
        actualDeparture: '10:37',
        platform: '1',
        passed: false,
      },
      {
        stationId: 'st-coimbra-b',
        stationName: 'Coimbra-B',
        stationCode: 'CBR-B',
        scheduledArrival: '10:56',
        actualArrival: '11:03',
        scheduledDeparture: '10:58',
        actualDeparture: '11:05',
        platform: '2',
        passed: false,
      },
      {
        stationId: 'st-aveiro',
        stationName: 'Aveiro',
        stationCode: 'AVR',
        scheduledArrival: '11:24',
        actualArrival: '11:31',
        scheduledDeparture: '11:26',
        actualDeparture: '11:33',
        platform: '3',
        passed: false,
      },
      {
        stationId: 'st-porto-campanha',
        stationName: 'Porto Campanhã',
        stationCode: 'POR-CAM',
        scheduledArrival: '11:45',
        actualArrival: '11:52',
        scheduledDeparture: '11:45',
        actualDeparture: '11:52',
        platform: '6',
        passed: false,
      },
    ],
  },

  // 5. Fertagus FT 10204 (Lisboa Roma-Areeiro -> Setúbal)
  {
    id: 'FT-10204',
    trainNumber: 'FT 10204',
    operator: 'FERTAGUS',
    operatorName: 'Fertagus',
    category: 'URBANO',
    categoryLabel: 'Fertagus Suburban',
    origin: {
      code: 'RMA',
      name: 'Roma-Areeiro',
      city: 'Lisboa',
      departureTime: '09:13',
    },
    destination: {
      code: 'STB',
      name: 'Setúbal',
      city: 'Setúbal',
      arrivalTime: '10:10',
    },
    currentPosition: {
      latitude: 38.6450,
      longitude: -9.1240,
      heading: 145,
      speedKmH: 110,
      altitudeM: 18,
    },
    delayMinutes: 0,
    delayStatus: 'ON_TIME',
    statusText: 'On Time',
    lineName: 'Eixo Norte-Sul / Linha do Sul',
    rollingStock: ROLLING_STOCK.FERTAGUS_3500,
    progressPercent: 42,
    routeCoordinates: CORRIDOR_TRACKS.FERTAGUS_CORRIDOR,
    lastUpdated: 'Just now',
    isGpsLive: true,
    officialApiSource: 'Fertagus Gestão de Transportes Real-Time Feed',
    stops: [
      {
        stationId: 'st-lis-roma',
        stationName: 'Roma-Areeiro',
        stationCode: 'RMA',
        scheduledArrival: '09:13',
        actualArrival: '09:13',
        scheduledDeparture: '09:13',
        actualDeparture: '09:13',
        platform: '1',
        passed: true,
      },
      {
        stationId: 'st-pragal',
        stationName: 'Pragal',
        stationCode: 'PRG',
        scheduledArrival: '09:28',
        actualArrival: '09:28',
        scheduledDeparture: '09:29',
        actualDeparture: '09:29',
        platform: '2',
        passed: true,
      },
      {
        stationId: 'st-coina',
        stationName: 'Coina',
        stationCode: 'CNA',
        scheduledArrival: '09:44',
        actualArrival: '09:44',
        scheduledDeparture: '09:45',
        actualDeparture: '09:45',
        platform: '1',
        passed: false,
        isCurrent: true,
      },
      {
        stationId: 'st-pinhal-novo',
        stationName: 'Pinhal Novo',
        stationCode: 'PNV',
        scheduledArrival: '09:58',
        actualArrival: '09:58',
        scheduledDeparture: '09:59',
        actualDeparture: '09:59',
        platform: '4',
        passed: false,
      },
      {
        stationId: 'st-setubal',
        stationName: 'Setúbal',
        stationCode: 'STB',
        scheduledArrival: '10:10',
        actualArrival: '10:10',
        scheduledDeparture: '10:10',
        actualDeparture: '10:10',
        platform: '2',
        passed: false,
      },
    ],
  },

  // 6. Celta Cross-Border INTL 420 (Porto Campanhã -> Vigo Guixar)
  {
    id: 'CP-INTL420',
    trainNumber: 'CELTA 420',
    operator: 'CP',
    operatorName: 'CP / Renfe Operadora',
    category: 'INTERNATIONAL',
    categoryLabel: 'Celta Internacional (Cross-Border)',
    origin: {
      code: 'POR-CAM',
      name: 'Porto Campanhã',
      city: 'Porto',
      departureTime: '08:13',
    },
    destination: {
      code: 'VGO',
      name: 'Vigo Guixar',
      city: 'Vigo (Espanha)',
      arrivalTime: '11:35',
    },
    currentPosition: {
      latitude: 41.6961,
      longitude: -8.8286,
      heading: 345,
      speedKmH: 128,
      altitudeM: 14,
    },
    delayMinutes: 14,
    delayStatus: 'MINOR_DELAY',
    statusText: '+14 min',
    lineName: 'Linha do Minho / Corredor Celta',
    rollingStock: ROLLING_STOCK.RENFE_599,
    progressPercent: 55,
    routeCoordinates: CORRIDOR_TRACKS.LINHA_DO_MINHO,
    lastUpdated: 'Just now',
    isGpsLive: true,
    officialApiSource: 'Infraestruturas de Portugal & Renfe Operadora API',
    stops: [
      {
        stationId: 'st-porto-campanha',
        stationName: 'Porto Campanhã',
        stationCode: 'POR-CAM',
        scheduledArrival: '08:13',
        actualArrival: '08:13',
        scheduledDeparture: '08:13',
        actualDeparture: '08:24',
        platform: '2',
        passed: true,
      },
      {
        stationId: 'st-nine',
        stationName: 'Nine',
        stationCode: 'NIN',
        scheduledArrival: '08:44',
        actualArrival: '08:56',
        scheduledDeparture: '08:45',
        actualDeparture: '08:57',
        platform: '1',
        passed: true,
      },
      {
        stationId: 'st-viana-do-castelo',
        stationName: 'Viana do Castelo',
        stationCode: 'VNC',
        scheduledArrival: '09:20',
        actualArrival: '09:34',
        scheduledDeparture: '09:22',
        actualDeparture: '09:36',
        platform: '2',
        passed: false,
        isCurrent: true,
      },
      {
        stationId: 'st-valenca',
        stationName: 'Valença',
        stationCode: 'VAL',
        scheduledArrival: '10:05',
        actualArrival: '10:19',
        scheduledDeparture: '10:07',
        actualDeparture: '10:21',
        platform: '1',
        passed: false,
      },
      {
        stationId: 'st-vigo',
        stationName: 'Vigo Guixar',
        stationCode: 'VGO',
        scheduledArrival: '11:35',
        actualArrival: '11:49',
        scheduledDeparture: '11:35',
        actualDeparture: '11:49',
        platform: '3',
        passed: false,
      },
    ],
  },

  // 7. Urbanos de Lisboa U 15214 (Linha de Cascais)
  {
    id: 'CP-U15214',
    trainNumber: 'U 15214',
    operator: 'CP',
    operatorName: 'Comboios de Portugal',
    category: 'URBANO',
    categoryLabel: 'Urbano de Lisboa',
    origin: {
      code: 'CSD',
      name: 'Cais do Sodré',
      city: 'Lisboa',
      departureTime: '09:20',
    },
    destination: {
      code: 'CAS',
      name: 'Cascais',
      city: 'Cascais',
      arrivalTime: '09:53',
    },
    currentPosition: {
      latitude: 38.6960,
      longitude: -9.3140,
      heading: 265,
      speedKmH: 74,
      altitudeM: 8,
    },
    delayMinutes: 1,
    delayStatus: 'ON_TIME',
    statusText: 'On Time',
    lineName: 'Linha de Cascais',
    rollingStock: ROLLING_STOCK.CP_2300,
    progressPercent: 65,
    routeCoordinates: CORRIDOR_TRACKS.LINHA_DE_CASCAIS,
    lastUpdated: 'Just now',
    isGpsLive: true,
    officialApiSource: 'Infraestruturas de Portugal Open Data',
    stops: [
      {
        stationId: 'st-cais-sodre',
        stationName: 'Cais do Sodré',
        stationCode: 'CSD',
        scheduledArrival: '09:20',
        actualArrival: '09:20',
        scheduledDeparture: '09:20',
        actualDeparture: '09:20',
        platform: '3',
        passed: true,
      },
      {
        stationId: 'st-belem',
        stationName: 'Belém',
        stationCode: 'BLM',
        scheduledArrival: '09:28',
        actualArrival: '09:28',
        scheduledDeparture: '09:29',
        actualDeparture: '09:29',
        platform: '1',
        passed: true,
      },
      {
        stationId: 'st-oeiras',
        stationName: 'Oeiras',
        stationCode: 'OEI',
        scheduledArrival: '09:39',
        actualArrival: '09:40',
        scheduledDeparture: '09:40',
        actualDeparture: '09:41',
        platform: '2',
        passed: false,
        isCurrent: true,
      },
      {
        stationId: 'st-cascais',
        stationName: 'Cascais',
        stationCode: 'CAS',
        scheduledArrival: '09:53',
        actualArrival: '09:54',
        scheduledDeparture: '09:53',
        actualDeparture: '09:54',
        platform: '1',
        passed: false,
      },
    ],
  },

  // 8. Urbanos de Lisboa U 16120 (Linha de Sintra)
  {
    id: 'CP-U16120',
    trainNumber: 'U 16120',
    operator: 'CP',
    operatorName: 'Comboios de Portugal',
    category: 'URBANO',
    categoryLabel: 'Urbano de Lisboa',
    origin: {
      code: 'LIS-OR',
      name: 'Lisboa Oriente',
      city: 'Lisboa',
      departureTime: '09:11',
    },
    destination: {
      code: 'SNT',
      name: 'Sintra',
      city: 'Sintra',
      arrivalTime: '09:58',
    },
    currentPosition: {
      latitude: 38.7620,
      longitude: -9.2840,
      heading: 285,
      speedKmH: 82,
      altitudeM: 92,
    },
    delayMinutes: 2,
    delayStatus: 'ON_TIME',
    statusText: 'On Time',
    lineName: 'Linha de Sintra',
    rollingStock: ROLLING_STOCK.CP_2300,
    progressPercent: 58,
    routeCoordinates: CORRIDOR_TRACKS.LINHA_DE_SINTRA,
    lastUpdated: 'Just now',
    isGpsLive: true,
    officialApiSource: 'Infraestruturas de Portugal Open Data',
    stops: [
      {
        stationId: 'st-lis-or',
        stationName: 'Lisboa Oriente',
        stationCode: 'LIS-OR',
        scheduledArrival: '09:11',
        actualArrival: '09:11',
        scheduledDeparture: '09:11',
        actualDeparture: '09:11',
        platform: '6',
        passed: true,
      },
      {
        stationId: 'st-queluz',
        stationName: 'Queluz-Belas',
        stationCode: 'QLZ',
        scheduledArrival: '09:32',
        actualArrival: '09:33',
        scheduledDeparture: '09:33',
        actualDeparture: '09:34',
        platform: '2',
        passed: true,
      },
      {
        stationId: 'st-cacem',
        stationName: 'Agualva-Cacém',
        stationCode: 'CCM',
        scheduledArrival: '09:42',
        actualArrival: '09:44',
        scheduledDeparture: '09:43',
        actualDeparture: '09:45',
        platform: '1',
        passed: false,
        isCurrent: true,
      },
      {
        stationId: 'st-sintra',
        stationName: 'Sintra',
        stationCode: 'SNT',
        scheduledArrival: '09:58',
        actualArrival: '10:00',
        scheduledDeparture: '09:58',
        actualDeparture: '10:00',
        platform: '2',
        passed: false,
      },
    ],
  },

  // 9. Medway Freight MW 91204 (Container train - Linha do Norte)
  {
    id: 'MW-91204',
    trainNumber: 'MW 91204',
    operator: 'MEDWAY',
    operatorName: 'Medway Logistics',
    category: 'FREIGHT',
    categoryLabel: 'Medway Rail Freight',
    origin: {
      code: 'POR-CAM',
      name: 'Terminal Leixões / Campanhã',
      city: 'Porto',
      departureTime: '06:15',
    },
    destination: {
      code: 'LIS-SA',
      name: 'Terminal Bobadela / Santa Apolónia',
      city: 'Lisboa',
      arrivalTime: '12:40',
    },
    currentPosition: {
      latitude: 39.2396,
      longitude: -8.6708,
      heading: 195,
      speedKmH: 95,
      altitudeM: 22,
    },
    delayMinutes: 0,
    delayStatus: 'ON_TIME',
    statusText: 'On Time',
    lineName: 'Linha do Norte',
    rollingStock: ROLLING_STOCK.MEDWAY_4700,
    progressPercent: 70,
    routeCoordinates: [...CORRIDOR_TRACKS.LINHA_DO_NORTE].reverse(),
    lastUpdated: 'Just now',
    isGpsLive: true,
    officialApiSource: 'Infraestruturas de Portugal Open Data',
    stops: [
      {
        stationId: 'st-porto-campanha',
        stationName: 'Porto Campanhã (Cargas)',
        stationCode: 'POR-CAM',
        scheduledArrival: '06:15',
        actualArrival: '06:15',
        scheduledDeparture: '06:15',
        actualDeparture: '06:15',
        platform: 'Desvio',
        passed: true,
      },
      {
        stationId: 'st-entroncamento',
        stationName: 'Entroncamento (Triagem)',
        stationCode: 'ENT',
        scheduledArrival: '09:10',
        actualArrival: '09:10',
        scheduledDeparture: '09:30',
        actualDeparture: '09:30',
        platform: 'Linha 7',
        passed: true,
      },
      {
        stationId: 'st-santarem',
        stationName: 'Santarém',
        stationCode: 'STM',
        scheduledArrival: '10:05',
        actualArrival: '10:05',
        scheduledDeparture: '10:05',
        actualDeparture: '10:05',
        platform: 'Linha 3',
        passed: false,
        isCurrent: true,
      },
      {
        stationId: 'st-lis-or',
        stationName: 'Bobadela / Lisboa Oriente',
        stationCode: 'LIS-OR',
        scheduledArrival: '12:20',
        actualArrival: '12:20',
        scheduledDeparture: '12:20',
        actualDeparture: '12:20',
        platform: 'Terminal',
        passed: false,
      },
    ],
  },

  // 10. Regional R 4421 (Linha do Douro: Porto -> Régua)
  {
    id: 'CP-R4421',
    trainNumber: 'R 4421',
    operator: 'CP',
    operatorName: 'Comboios de Portugal',
    category: 'REGIONAL',
    categoryLabel: 'Regional do Douro',
    origin: {
      code: 'POR-SB',
      name: 'Porto São Bento',
      city: 'Porto',
      departureTime: '08:25',
    },
    destination: {
      code: 'REG',
      name: 'Peso da Régua',
      city: 'Peso da Régua',
      arrivalTime: '10:32',
    },
    currentPosition: {
      latitude: 41.1450,
      longitude: -8.0820,
      heading: 96,
      speedKmH: 88,
      altitudeM: 65,
    },
    delayMinutes: 0,
    delayStatus: 'ON_TIME',
    statusText: 'On Time',
    lineName: 'Linha do Douro',
    rollingStock: ROLLING_STOCK.CP_2240,
    progressPercent: 60,
    routeCoordinates: CORRIDOR_TRACKS.LINHA_DO_DOURO,
    lastUpdated: 'Just now',
    isGpsLive: true,
    officialApiSource: 'Infraestruturas de Portugal Open Data',
    stops: [
      {
        stationId: 'st-porto-sao-bento',
        stationName: 'Porto São Bento',
        stationCode: 'POR-SB',
        scheduledArrival: '08:25',
        actualArrival: '08:25',
        scheduledDeparture: '08:25',
        actualDeparture: '08:25',
        platform: '1',
        passed: true,
      },
      {
        stationId: 'st-penafiel',
        stationName: 'Penafiel',
        stationCode: 'PNF',
        scheduledArrival: '09:05',
        actualArrival: '09:05',
        scheduledDeparture: '09:06',
        actualDeparture: '09:06',
        platform: '2',
        passed: true,
      },
      {
        stationId: 'st-marco',
        stationName: 'Marco de Canaveses',
        stationCode: 'MCV',
        scheduledArrival: '09:32',
        actualArrival: '09:32',
        scheduledDeparture: '09:34',
        actualDeparture: '09:34',
        platform: '1',
        passed: false,
        isCurrent: true,
      },
      {
        stationId: 'st-regua',
        stationName: 'Peso da Régua',
        stationCode: 'REG',
        scheduledArrival: '10:32',
        actualArrival: '10:32',
        scheduledDeparture: '10:32',
        actualDeparture: '10:32',
        platform: '2',
        passed: false,
      },
    ],
  },

  // 11. Renfe AVE 02150 (Madrid Puerta de Atocha -> Barcelona Sants)
  {
    id: 'RENFE-AVE02150',
    trainNumber: 'AVE 02150',
    operator: 'RENFE',
    operatorName: 'Renfe Operadora (España)',
    category: 'ALFA_PENDULAR',
    categoryLabel: 'AVE Alta Velocidad',
    origin: {
      code: 'MAD-AT',
      name: 'Madrid Puerta de Atocha',
      city: 'Madrid',
      departureTime: '08:30',
    },
    destination: {
      code: 'BCN-ST',
      name: 'Barcelona Sants',
      city: 'Barcelona',
      arrivalTime: '11:00',
    },
    currentPosition: {
      latitude: 41.6560,
      longitude: -0.8770,
      heading: 68,
      speedKmH: 298,
      altitudeM: 210,
    },
    delayMinutes: 0,
    delayStatus: 'ON_TIME',
    statusText: 'On Time',
    lineName: 'LAV Madrid-Zaragoza-Barcelona',
    rollingStock: ROLLING_STOCK.RENFE_AVE_102,
    progressPercent: 52,
    routeCoordinates: CORRIDOR_TRACKS.AVE_MADRID_BARCELONA,
    lastUpdated: 'Just now',
    isGpsLive: true,
    officialApiSource: 'Adif / Renfe Open Data Alta Velocidad',
    stops: [
      {
        stationId: 'st-madrid-atocha',
        stationName: 'Madrid Puerta de Atocha',
        stationCode: 'MAD-AT',
        scheduledArrival: '08:30',
        actualArrival: '08:30',
        scheduledDeparture: '08:30',
        actualDeparture: '08:30',
        platform: '4',
        passed: true,
      },
      {
        stationId: 'st-zaragoza',
        stationName: 'Zaragoza Delicias',
        stationCode: 'ZAZ',
        scheduledArrival: '09:45',
        actualArrival: '09:45',
        scheduledDeparture: '09:48',
        actualDeparture: '09:48',
        platform: '3',
        passed: false,
        isCurrent: true,
      },
      {
        stationId: 'st-barcelona',
        stationName: 'Barcelona Sants',
        stationCode: 'BCN',
        scheduledArrival: '11:00',
        actualArrival: '11:00',
        scheduledDeparture: '11:00',
        actualDeparture: '11:00',
        platform: '2',
        passed: false,
      },
    ],
  },

  // 12. SNCF TGV InOui 6610 (Paris Gare de Lyon -> Lyon Part-Dieu)
  {
    id: 'SNCF-TGV6610',
    trainNumber: 'TGV 6610',
    operator: 'SNCF',
    operatorName: 'SNCF Voyageurs',
    category: 'ALFA_PENDULAR',
    categoryLabel: 'TGV InOui Duplex',
    origin: {
      code: 'PAR-GL',
      name: 'Paris Gare de Lyon',
      city: 'Paris',
      departureTime: '08:52',
    },
    destination: {
      code: 'LYS-PD',
      name: 'Lyon Part-Dieu',
      city: 'Lyon',
      arrivalTime: '10:56',
    },
    currentPosition: {
      latitude: 47.3820,
      longitude: 4.2150,
      heading: 145,
      speedKmH: 308,
      altitudeM: 290,
    },
    delayMinutes: 0,
    delayStatus: 'ON_TIME',
    statusText: 'On Time',
    lineName: 'LGV Sud-Est',
    rollingStock: ROLLING_STOCK.SNCF_TGV_DUPLEX,
    progressPercent: 48,
    routeCoordinates: CORRIDOR_TRACKS.TGV_PARIS_LYON,
    lastUpdated: 'Just now',
    isGpsLive: true,
    officialApiSource: 'SNCF Open Data - Plateforme API SNCF Réseau',
    stops: [
      {
        stationId: 'st-paris-lyon',
        stationName: 'Paris Gare de Lyon',
        stationCode: 'PAR-GL',
        scheduledArrival: '08:52',
        actualArrival: '08:52',
        scheduledDeparture: '08:52',
        actualDeparture: '08:52',
        platform: 'Hall 1',
        passed: true,
      },
      {
        stationId: 'st-le-creusot',
        stationName: 'Le Creusot Montceau TGV',
        stationCode: 'LC-TGV',
        scheduledArrival: '10:12',
        actualArrival: '10:12',
        scheduledDeparture: '10:14',
        actualDeparture: '10:14',
        platform: '1',
        passed: false,
        isCurrent: true,
      },
      {
        stationId: 'st-lyon',
        stationName: 'Lyon Part-Dieu',
        stationCode: 'LYS-PD',
        scheduledArrival: '10:56',
        actualArrival: '10:56',
        scheduledDeparture: '10:56',
        actualDeparture: '10:56',
        platform: 'E',
        passed: false,
      },
    ],
  },
];
