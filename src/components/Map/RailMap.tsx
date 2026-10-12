import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Train, Station, MapLayerConfig } from '../../types/train';

interface RailMapProps {
  trains: Train[];
  stations: Station[];
  selectedTrain: Train | null;
  onSelectTrain: (train: Train) => void;
  onSelectStation: (station: Station) => void;
  layerConfig: MapLayerConfig;
  isFollowingTrain: boolean;
  onToggleFollow: () => void;
}

interface TileLayerSpec {
  url: string;
  attribution: string;
  subdomains?: string;
  maxZoom: number;
}

export const CARTO_API_KEY =
  (import.meta as any).env?.VITE_CARTO_API_KEY || 'cb1_4i6w_1_b85e1e5d603399eb5dff2901';

// Tile layers definitions with authorized CARTO API key
const TILE_LAYERS: Record<string, TileLayerSpec> = {
  dark: {
    url: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`,
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OSM</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
    maxZoom: 18,
  },
  streets: {
    url: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`,
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OSM</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  },
  railway: {
    url: 'https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
    attribution: 'Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a>',
    maxZoom: 19,
  },
};

export const RailMap: React.FC<RailMapProps> = ({
  trains,
  stations,
  selectedTrain,
  onSelectTrain,
  onSelectStation,
  layerConfig,
  isFollowingTrain,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);
  const railwayOverlayRef = useRef<L.TileLayer | null>(null);
  const trainMarkersRef = useRef<Map<string, L.Marker>>(new Map());
  const stationMarkersRef = useRef<Map<string, L.Marker>>(new Map());
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const routePassedPolylineRef = useRef<L.Polyline | null>(null);
  const stopMarkersGroupRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Portugal (Lisbon / Central region)
    const map = L.map(mapContainerRef.current, {
      center: [39.6, -8.6],
      zoom: 7,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: true,
    });

    // Add custom zoom control to top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Initial base tile layer
    const tileSpec = TILE_LAYERS[layerConfig.tileStyle] || TILE_LAYERS.dark;
    const tileLayer = L.tileLayer(tileSpec.url, {
      attribution: tileSpec.attribution,
      maxZoom: tileSpec.maxZoom,
      subdomains: tileSpec.subdomains || 'abcd',
    }).addTo(map);

    baseTileLayerRef.current = tileLayer;
    stopMarkersGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Ensure map tiles calculate full container dimensions
    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Style Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (baseTileLayerRef.current) {
      map.removeLayer(baseTileLayerRef.current);
    }

    const tileSpec = TILE_LAYERS[layerConfig.tileStyle] || TILE_LAYERS.dark;
    const newBaseLayer = L.tileLayer(tileSpec.url, {
      attribution: tileSpec.attribution,
      maxZoom: tileSpec.maxZoom,
      subdomains: tileSpec.subdomains || 'abcd',
    }).addTo(map);

    baseTileLayerRef.current = newBaseLayer;

    // Handle OpenRailwayMap overlay toggle
    if (layerConfig.showRailways) {
      if (!railwayOverlayRef.current) {
        railwayOverlayRef.current = L.tileLayer(TILE_LAYERS.railway.url, {
          attribution: TILE_LAYERS.railway.attribution,
          maxZoom: 19,
          opacity: 0.75,
        }).addTo(map);
      }
    } else {
      if (railwayOverlayRef.current) {
        map.removeLayer(railwayOverlayRef.current);
        railwayOverlayRef.current = null;
      }
    }
  }, [layerConfig.tileStyle, layerConfig.showRailways]);

  // Update Station Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing station markers if toggled off
    if (!layerConfig.showStations) {
      stationMarkersRef.current.forEach((marker) => marker.remove());
      stationMarkersRef.current.clear();
      return;
    }

    // Render station markers
    stations.forEach((station) => {
      let marker = stationMarkersRef.current.get(station.id);
      if (!marker) {
        const stationIcon = L.divIcon({
          className: 'station-marker',
          html: `
            <div class="relative group cursor-pointer flex items-center justify-center">
              <div class="w-3 h-3 bg-slate-800 border-2 border-amber-400 rounded-sm shadow-md transition-transform duration-200 group-hover:scale-150 group-hover:border-white"></div>
              <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/95 text-[10px] text-amber-300 font-medium px-1.5 py-0.5 rounded shadow pointer-events-none border border-amber-500/30 z-50">
                ${station.name} (${station.code})
              </div>
            </div>
          `,
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        });

        marker = L.marker([station.latitude, station.longitude], {
          icon: stationIcon,
          zIndexOffset: 100,
        }).addTo(map);

        marker.on('click', () => {
          onSelectStation(station);
        });

        stationMarkersRef.current.set(station.id, marker);
      }
    });
  }, [stations, layerConfig.showStations, onSelectStation]);

  // Update Train Markers & Selected Route
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const currentTrainIds = new Set(trains.map((t) => t.id));

    // Remove old markers for trains no longer in filtered list
    trainMarkersRef.current.forEach((marker, id) => {
      if (!currentTrainIds.has(id)) {
        marker.remove();
        trainMarkersRef.current.delete(id);
      }
    });

    // Create or update markers for all trains
    trains.forEach((train) => {
      const isSelected = selectedTrain?.id === train.id;
      const { latitude, longitude, heading, speedKmH } = train.currentPosition;

      // Color coding like Flightradar24
      // Default: Flightradar gold-yellow (#eab308)
      // Delayed > 15m: Bright amber-red (#ef4444)
      // High speed > 200 km/h: Bright cyan-gold (#38bdf8 / #fbbf24)
      let trainColor = '#fbbf24';
      if (train.delayMinutes > 15) {
        trainColor = '#f87171';
      } else if (train.category === 'ALFA_PENDULAR') {
        trainColor = '#f59e0b';
      } else if (train.category === 'URBANO') {
        trainColor = '#60a5fa';
      }

      // Train icon HTML with SVG sleek locomotive/high-speed train shape
      const iconHtml = `
        <div class="train-marker-wrapper relative group cursor-pointer" style="width: 32px; height: 32px;">
          ${
            isSelected
              ? `<div class="absolute -inset-2 rounded-full border-2 border-amber-400 border-dashed animate-spin opacity-80" style="animation-duration: 8s;"></div>
                 <div class="absolute -inset-1 rounded-full bg-amber-400/20 animate-ping"></div>`
              : ''
          }
          <div class="relative w-8 h-8 flex items-center justify-center transition-transform duration-300" style="transform: rotate(${heading}deg);">
            <svg viewBox="0 0 32 32" fill="none" class="w-7 h-7 drop-shadow-md">
              <!-- Train body pointed upwards (heading 0 deg) -->
              <path d="M16 2 L22 10 L22 26 C22 28 20 29 16 29 C12 29 10 28 10 26 L10 10 Z" fill="${trainColor}" stroke="#0f172a" stroke-width="1.5" />
              <!-- Windshield -->
              <polygon points="13,7 19,7 20,11 12,11" fill="#0f172a" />
              <!-- Aerodynamic nose center stripe -->
              <line x1="16" y1="3" x2="16" y2="12" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" />
              <!-- Cabin lights / headlights -->
              <circle cx="13" cy="4.5" r="0.9" fill="#ffffff" />
              <circle cx="19" cy="4.5" r="0.9" fill="#ffffff" />
            </svg>
          </div>
          <!-- Label pill on hover / selection -->
          <div class="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap ${
            isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          } transition-opacity duration-150 bg-[#0f172a]/95 text-[11px] text-white font-mono font-medium px-2 py-0.5 rounded shadow-lg border ${
            isSelected ? 'border-amber-400 ring-1 ring-amber-400' : 'border-slate-700'
          } pointer-events-none z-50">
            <span class="text-amber-400 font-bold">${train.trainNumber}</span>
            <span class="text-slate-300"> · ${speedKmH} km/h</span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-train-div-icon',
        html: iconHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      let marker = trainMarkersRef.current.get(train.id);
      if (!marker) {
        marker = L.marker([latitude, longitude], {
          icon: customIcon,
          zIndexOffset: isSelected ? 1000 : 500,
        }).addTo(map);

        marker.on('click', () => {
          onSelectTrain(train);
        });

        trainMarkersRef.current.set(train.id, marker);
      } else {
        marker.setLatLng([latitude, longitude]);
        marker.setIcon(customIcon);
        marker.setZIndexOffset(isSelected ? 1000 : 500);
      }
    });

    // If a train is selected, draw its full route on the map!
    if (selectedTrain) {
      const coords = selectedTrain.routeCoordinates;
      const progressRatio = selectedTrain.progressPercent / 100;
      const splitIndex = Math.min(
        coords.length - 1,
        Math.floor(progressRatio * (coords.length - 1))
      );

      const passedCoords = coords.slice(0, splitIndex + 1);
      const remainingCoords = coords.slice(splitIndex);

      // Passed trajectory (subtle cyan/grey solid)
      if (routePassedPolylineRef.current) {
        routePassedPolylineRef.current.setLatLngs(passedCoords);
      } else {
        routePassedPolylineRef.current = L.polyline(passedCoords, {
          color: '#94a3b8',
          weight: 4,
          opacity: 0.6,
          dashArray: '4, 4',
        }).addTo(map);
      }

      // Remaining trajectory (glowing golden line like Flightradar24)
      if (routePolylineRef.current) {
        routePolylineRef.current.setLatLngs(remainingCoords);
      } else {
        routePolylineRef.current = L.polyline(remainingCoords, {
          color: '#f59e0b',
          weight: 4,
          opacity: 0.9,
        }).addTo(map);
      }

      // Draw stop markers along this selected route
      if (stopMarkersGroupRef.current) {
        stopMarkersGroupRef.current.clearLayers();

        selectedTrain.stops.forEach((stop) => {
          const matchingStation = stations.find(
            (s: Station) => s.id === stop.stationId || s.code === stop.stationCode
          );
          if (matchingStation) {
            const stopIcon = L.divIcon({
              className: 'stop-circle-icon',
              html: `
                <div class="relative group flex items-center justify-center">
                  <div class="w-3 h-3 rounded-full ${
                    stop.passed
                      ? 'bg-slate-600 border border-slate-400'
                      : stop.isCurrent
                      ? 'bg-amber-400 border-2 border-white ring-2 ring-amber-400/50 animate-pulse'
                      : 'bg-white border-2 border-amber-500'
                  }"></div>
                </div>
              `,
              iconSize: [12, 12],
              iconAnchor: [6, 6],
            });

            L.marker([matchingStation.latitude, matchingStation.longitude], {
              icon: stopIcon,
              zIndexOffset: 800,
            })
              .bindTooltip(
                `<b>${stop.stationName}</b><br/>Dep: ${stop.scheduledDeparture || '--:--'}`,
                { direction: 'top', offset: [0, -8], className: 'radar-tooltip' }
              )
              .addTo(stopMarkersGroupRef.current!);
          }
        });
      }

      // Smooth camera follow if follow is enabled
      if (isFollowingTrain) {
        map.panTo([
          selectedTrain.currentPosition.latitude,
          selectedTrain.currentPosition.longitude,
        ], { animate: true, duration: 1 });
      }
    } else {
      // Clean up route polylines and stop markers when unselected
      if (routePolylineRef.current) {
        routePolylineRef.current.remove();
        routePolylineRef.current = null;
      }
      if (routePassedPolylineRef.current) {
        routePassedPolylineRef.current.remove();
        routePassedPolylineRef.current = null;
      }
      if (stopMarkersGroupRef.current) {
        stopMarkersGroupRef.current.clearLayers();
      }
    }
  }, [trains, selectedTrain, onSelectTrain, isFollowingTrain]);

  // Center on Portugal view
  const handleRecenterPortugal = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([39.6, -8.6], 7, { duration: 1.2 });
    }
  };

  // Center on Europe view
  const handleRecenterEurope = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([44.5, 2.0], 5, { duration: 1.5 });
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#12161a]">
      {/* Map DOM Canvas */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Map Controls in Bottom-Right (Flightradar style) */}
      <div className="absolute bottom-6 right-4 z-[400] flex flex-col gap-2">
        <button
          onClick={handleRecenterPortugal}
          title="Zoom to Portugal Network"
          className="bg-[#1a222d]/95 hover:bg-[#243040] text-slate-200 hover:text-amber-400 text-xs font-semibold px-3 py-2 rounded-lg shadow-lg border border-slate-700/80 transition-all flex items-center gap-1.5"
        >
          <span>🇵🇹</span>
          <span className="hidden sm:inline">Portugal</span>
        </button>
        <button
          onClick={handleRecenterEurope}
          title="Zoom to Europe Corridors"
          className="bg-[#1a222d]/95 hover:bg-[#243040] text-slate-200 hover:text-amber-400 text-xs font-semibold px-3 py-2 rounded-lg shadow-lg border border-slate-700/80 transition-all flex items-center gap-1.5"
        >
          <span>🇪🇺</span>
          <span className="hidden sm:inline">Europe</span>
        </button>
      </div>
    </div>
  );
};
