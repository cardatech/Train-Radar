/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Train, Station, FilterState, MapLayerConfig } from './types/train';
import { railApiService } from './services/railApiService';
import { RailMap } from './components/Map/RailMap';
import { TopNav } from './components/Header/TopNav';
import { TrainDetailsPanel } from './components/Sidebar/TrainDetailsPanel';
import { FilterModal } from './components/Modals/FilterModal';
import { StationBoardModal } from './components/Modals/StationBoardModal';
import { LayersModal } from './components/Modals/LayersModal';
import { FleetStatsModal } from './components/Modals/FleetStatsModal';
import { ApiSourcesModal } from './components/Modals/ApiSourcesModal';
import { DriverViewModal } from './components/Cockpit/DriverViewModal';
import { 
  Building2, 
  SlidersHorizontal, 
  Layers, 
  BarChart3, 
  Radio, 
  ShieldCheck 
} from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  selectedOperators: [],
  selectedCategories: [],
  delayFilter: 'ALL',
  minSpeed: 0,
  selectedCountry: 'PT', // Focus Portugal first as requested
  onlyMoving: false,
};

const INITIAL_LAYER_CONFIG: MapLayerConfig = {
  tileStyle: 'dark',
  showStations: true,
  showRailways: false,
  showDelayHeatmap: false,
  highSpeedHighlights: true,
};

export default function App() {
  const [allTrains, setAllTrains] = useState<Train[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isFollowingTrain, setIsFollowingTrain] = useState<boolean>(false);

  // Modals
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isStationBoardOpen, setIsStationBoardOpen] = useState(false);
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const [isFleetStatsOpen, setIsFleetStatsOpen] = useState(false);
  const [isApiSourcesOpen, setIsApiSourcesOpen] = useState(false);
  const [isDriverViewOpen, setIsDriverViewOpen] = useState(false);

  // Filter & Layer Configurations
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [layerConfig, setLayerConfig] = useState<MapLayerConfig>(INITIAL_LAYER_CONFIG);

  // Subscribe to live rail data service
  useEffect(() => {
    setStations(railApiService.getStations());

    const unsubscribe = railApiService.subscribe((trains) => {
      setAllTrains(trains);

      // Keep selected train telemetry synced with latest tick
      setSelectedTrain((prevSelected) => {
        if (!prevSelected) return null;
        const updated = trains.find((t) => t.id === prevSelected.id);
        return updated || prevSelected;
      });
    });

    return () => unsubscribe();
  }, []);

  // Filter trains
  const filteredTrains = useMemo(() => {
    return railApiService.filterTrains(allTrains, filters);
  }, [allTrains, filters]);

  // Train selection handler
  const handleSelectTrain = (train: Train) => {
    setSelectedTrain(train);
    setSelectedStation(null);
  };

  // Station selection handler
  const handleSelectStation = (station: Station) => {
    setSelectedStation(station);
    setIsStationBoardOpen(true);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTrain(null);
        setIsFiltersOpen(false);
        setIsStationBoardOpen(false);
        setIsLayersOpen(false);
        setIsFleetStatsOpen(false);
        setIsApiSourcesOpen(false);
        setIsDriverViewOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#12161a] text-slate-100 font-sans select-none">
      
      {/* Full-Screen Background Radar Map (Flightradar24 Canvas) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <RailMap
          trains={filteredTrains}
          stations={stations}
          selectedTrain={selectedTrain}
          onSelectTrain={handleSelectTrain}
          onSelectStation={handleSelectStation}
          layerConfig={layerConfig}
          isFollowingTrain={isFollowingTrain}
          onToggleFollow={() => setIsFollowingTrain(!isFollowingTrain)}
        />
      </div>

      {/* Flightradar24-Style Top Navigation Bar */}
      <TopNav
        trains={allTrains}
        stations={stations}
        activeTrainCount={filteredTrains.length}
        onSelectTrain={handleSelectTrain}
        onSelectStation={handleSelectStation}
        onOpenFilters={() => setIsFiltersOpen(true)}
        onOpenStationBoards={() => setIsStationBoardOpen(true)}
        onOpenFleetStats={() => setIsFleetStatsOpen(true)}
        onOpenApiSources={() => setIsApiSourcesOpen(true)}
        onOpenLayersModal={() => setIsLayersOpen(true)}
        filters={filters}
      />

      {/* Selected Train Details Slide-Over / Bottom Sheet */}
      <TrainDetailsPanel
        train={selectedTrain}
        onClose={() => {
          setSelectedTrain(null);
          setIsFollowingTrain(false);
        }}
        isFollowing={isFollowingTrain}
        onToggleFollow={() => setIsFollowingTrain(!isFollowingTrain)}
        onOpenDriverView={() => setIsDriverViewOpen(true)}
      />

        {/* Mobile Floating Action Strip (Bottom-center for touch convenience) */}
        <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-[450] bg-[#161c24]/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl px-3 py-2 flex items-center gap-3">
          <button
            onClick={() => setIsStationBoardOpen(true)}
            className="flex flex-col items-center gap-0.5 text-slate-300 hover:text-amber-400 px-2 py-1 text-[10px] font-medium"
          >
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Stations</span>
          </button>

          <button
            onClick={() => setIsFiltersOpen(true)}
            className="flex flex-col items-center gap-0.5 text-slate-300 hover:text-amber-400 px-2 py-1 text-[10px] font-medium"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>Filters</span>
          </button>

          <button
            onClick={() => setIsLayersOpen(true)}
            className="flex flex-col items-center gap-0.5 text-slate-300 hover:text-amber-400 px-2 py-1 text-[10px] font-medium"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Layers</span>
          </button>

          <button
            onClick={() => setIsFleetStatsOpen(true)}
            className="flex flex-col items-center gap-0.5 text-slate-300 hover:text-amber-400 px-2 py-1 text-[10px] font-medium"
          >
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>Stats</span>
          </button>
        </div>

        {/* Quick Official Data Status Chip in Bottom-Left */}
        <div className="hidden md:flex absolute bottom-4 left-4 z-[400] bg-[#12161b]/90 backdrop-blur-md border border-slate-800 text-[11px] text-slate-300 px-3 py-1.5 rounded-xl shadow-lg items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Official IP / CP Live Feed</span>
          <span className="text-slate-500">·</span>
          <button
            onClick={() => setIsApiSourcesOpen(true)}
            className="text-amber-400 hover:underline font-semibold"
          >
            API Details
          </button>
        </div>


      {/* Interactive Modals */}
      <FilterModal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        onChangeFilters={setFilters}
        onResetFilters={() => setFilters(INITIAL_FILTERS)}
        totalFilteredTrains={filteredTrains.length}
      />

      <StationBoardModal
        isOpen={isStationBoardOpen}
        onClose={() => setIsStationBoardOpen(false)}
        stations={stations}
        selectedStationId={selectedStation?.id}
        onSelectTrain={handleSelectTrain}
      />

      <LayersModal
        isOpen={isLayersOpen}
        onClose={() => setIsLayersOpen(false)}
        layerConfig={layerConfig}
        onChangeLayerConfig={setLayerConfig}
      />

      <FleetStatsModal
        isOpen={isFleetStatsOpen}
        onClose={() => setIsFleetStatsOpen(false)}
        trains={allTrains}
      />

      <ApiSourcesModal
        isOpen={isApiSourcesOpen}
        onClose={() => setIsApiSourcesOpen(false)}
      />

      <DriverViewModal
        train={selectedTrain}
        isOpen={isDriverViewOpen}
        onClose={() => setIsDriverViewOpen(false)}
      />

    </div>
  );
}
