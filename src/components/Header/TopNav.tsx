import React, { useState, useRef, useEffect } from 'react';
import { Train, Station, FilterState } from '../../types/train';
import { 
  Search, 
  SlidersHorizontal, 
  Layers, 
  BarChart3, 
  Building2, 
  Info, 
  Map, 
  TrainTrack, 
  Radio, 
  X 
} from 'lucide-react';

interface TopNavProps {
  trains: Train[];
  stations: Station[];
  activeTrainCount: number;
  onSelectTrain: (train: Train) => void;
  onSelectStation: (station: Station) => void;
  onOpenFilters: () => void;
  onOpenStationBoards: () => void;
  onOpenFleetStats: () => void;
  onOpenApiSources: () => void;
  onOpenLayersModal: () => void;
  filters: FilterState;
}

export const TopNav: React.FC<TopNavProps> = ({
  trains,
  stations,
  activeTrainCount,
  onSelectTrain,
  onSelectStation,
  onOpenFilters,
  onOpenStationBoards,
  onOpenFleetStats,
  onOpenApiSources,
  onOpenLayersModal,
  filters,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter matching trains and stations for the search box
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return { trains: [], stations: [] };
    const q = searchQuery.toLowerCase().trim();

    const matchedTrains = trains.filter(
      (t) =>
        t.trainNumber.toLowerCase().includes(q) ||
        t.origin.city.toLowerCase().includes(q) ||
        t.destination.city.toLowerCase().includes(q) ||
        t.operator.toLowerCase().includes(q)
    ).slice(0, 5);

    const matchedStations = stations.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q)
    ).slice(0, 4);

    return { trains: matchedTrains, stations: matchedStations };
  }, [searchQuery, trains, stations]);

  const activeFiltersCount =
    filters.selectedOperators.length +
    filters.selectedCategories.length +
    (filters.delayFilter !== 'ALL' ? 1 : 0) +
    (filters.selectedCountry !== 'PT' ? 1 : 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-[600] h-14 bg-[#12161b]/95 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between gap-4 md:gap-8 shadow-lg select-none">
      
      {/* Zone 1: Single Text Element Wordmark */}
      <div className="flex items-center gap-2.5 shrink-0">
        <a 
          href="/" 
          className="flex items-center gap-2 text-white font-extrabold tracking-tight text-lg whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-black shadow-sm">
            <TrainTrack className="w-5 h-5 text-slate-950" />
          </div>
          <span className="font-mono text-amber-400 tracking-wider">RAIL<span className="text-white">RADAR</span><span className="text-amber-400">24</span></span>
        </a>
      </div>

      {/* Zone 2: 4–5 Concise Single-Line Nav Links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={onOpenStationBoards}
          className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer py-1"
        >
          <Building2 className="w-4 h-4 text-slate-400" />
          <span>Station Boards</span>
        </button>

        <button
          onClick={onOpenFilters}
          className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer py-1 relative"
        >
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenLayersModal}
          className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer py-1"
        >
          <Layers className="w-4 h-4 text-slate-400" />
          <span>Map Layers</span>
        </button>

        <button
          onClick={onOpenFleetStats}
          className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer py-1"
        >
          <BarChart3 className="w-4 h-4 text-slate-400" />
          <span>Fleet Stats</span>
        </button>

        <button
          onClick={onOpenApiSources}
          className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer py-1 text-xs text-slate-400 hover:text-slate-200"
        >
          <Info className="w-4 h-4 text-slate-400" />
          <span>Official Rail APIs</span>
        </button>
      </nav>

      {/* Zone 3: Search Bar & Primary Live Telemetry Status */}
      <div className="flex items-center gap-3 shrink-0" ref={searchContainerRef}>
        
        {/* Search input with live autocomplete */}
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search train, station, route..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-40 sm:w-60 md:w-72 bg-slate-900/90 text-xs text-white placeholder-slate-400 pl-9 pr-8 py-2 rounded-lg border border-slate-700/80 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Results Dropdown */}
          {isSearchOpen && (searchResults.trains.length > 0 || searchResults.stations.length > 0) && (
            <div className="absolute right-0 top-11 w-80 bg-[#161c24] border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-[700] divide-y divide-slate-800">
              {/* Trains matches */}
              {searchResults.trains.length > 0 && (
                <div className="p-2">
                  <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                    Trains ({searchResults.trains.length})
                  </div>
                  {searchResults.trains.map((train) => (
                    <button
                      key={train.id}
                      onClick={() => {
                        onSelectTrain(train);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-800/80 flex items-center justify-between text-xs transition-colors"
                    >
                      <div>
                        <span className="font-mono font-bold text-amber-400">{train.trainNumber}</span>
                        <span className="text-slate-300 ml-2">{train.origin.code} → {train.destination.code}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{train.currentPosition.speedKmH} km/h</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Stations matches */}
              {searchResults.stations.length > 0 && (
                <div className="p-2">
                  <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                    Stations ({searchResults.stations.length})
                  </div>
                  {searchResults.stations.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => {
                        onSelectStation(st);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-800/80 flex items-center justify-between text-xs transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-semibold text-slate-200">{st.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{st.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live Active Trains Badge (Tabular Numerals) */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono tabular-nums text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{activeTrainCount}</span>
          <span className="text-slate-400 font-sans text-[11px]">Live Trains</span>
        </div>

        {/* Mobile quick filters trigger */}
        <button
          onClick={onOpenFilters}
          className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400"
          title="Filter Trains"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

    </header>
  );
};
