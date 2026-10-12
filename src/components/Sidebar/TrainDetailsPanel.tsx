import React, { useState } from 'react';
import { Train } from '../../types/train';
import { 
  X, 
  Crosshair, 
  Share2, 
  Compass, 
  Gauge, 
  MapPin, 
  Clock, 
  Activity, 
  Radio, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface TrainDetailsPanelProps {
  train: Train | null;
  onClose: () => void;
  isFollowing: boolean;
  onToggleFollow: () => void;
  onOpenDriverView: (train: Train) => void;
}

export const TrainDetailsPanel: React.FC<TrainDetailsPanelProps> = ({
  train,
  onClose,
  isFollowing,
  onToggleFollow,
  onOpenDriverView,
}) => {
  const [showAllStops, setShowAllStops] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!train) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Convert compass degrees to cardinal direction
  const getCardinalDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <aside 
      className="fixed z-[500] bg-[#161c24] text-slate-100 border-slate-700/80 shadow-2xl flex flex-col transition-all duration-300
        md:left-3 md:top-18 md:bottom-4 md:w-[420px] md:rounded-2xl md:border md:max-h-[calc(100vh-88px)]
        left-0 right-0 bottom-0 top-[35%] rounded-t-3xl border-t
      "
      aria-label="Train Details Telemetry Panel"
    >
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 bg-[#12161b] rounded-t-2xl md:rounded-t-2xl flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold font-mono text-base">
            {train.operator}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold tracking-tight font-mono text-white">
                {train.trainNumber}
              </h2>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                train.delayMinutes <= 0 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : train.delayMinutes <= 15
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {train.statusText}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {train.operatorName} · {train.categoryLabel}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleFollow}
            title={isFollowing ? 'Locking on Train' : 'Follow Train on Map'}
            className={`p-2 rounded-lg transition-colors ${
              isFollowing 
                ? 'bg-amber-400 text-slate-950 font-bold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Crosshair className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenDriverView(train)}
            title="Driver 3D Simulator View"
            className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={handleShare}
            title="Share Train Link"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative"
          >
            <Share2 className="w-4 h-4" />
            {copiedLink && (
              <span className="absolute -bottom-7 right-0 text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-bold shadow">
                Copied!
              </span>
            )}
          </button>
          <button
            onClick={onClose}
            title="Close Panel"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/80">
        
        {/* Rolling Stock Hero Card */}
        <div className="p-4 bg-gradient-to-b from-[#161c24] to-[#12161b]">
          <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 p-4">
            {/* Visual Train Silhouette & Identity */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  Rolling Stock
                </span>
                <h3 className="text-sm font-semibold text-white">
                  {train.rollingStock.series}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400">Max Design Speed</span>
                <div className="text-xs font-mono font-bold text-amber-300">
                  {train.rollingStock.maxSpeed} km/h
                </div>
              </div>
            </div>

            {/* Rolling stock attributes */}
            <div className="grid grid-cols-2 gap-2 mt-3 text-[11px] text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px]">Manufacturer</span>
                <span className="font-medium truncate block">{train.rollingStock.manufacturer}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Traction</span>
                <span className="font-medium truncate block">{train.rollingStock.traction}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Track Gauge</span>
                <span className="font-medium truncate block">{train.rollingStock.gauge}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Composition</span>
                <span className="font-medium truncate block">{train.rollingStock.coaches} coaches ({train.rollingStock.lengthM}m)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flightradar-style Route Journey Bar */}
        <div className="p-4 bg-[#141920]">
          <div className="flex items-center justify-between mb-3">
            {/* Origin */}
            <div className="text-left max-w-[42%]">
              <span className="text-2xl font-black font-mono tracking-tight text-white block">
                {train.origin.code}
              </span>
              <span className="text-xs font-semibold text-slate-300 line-clamp-1 block">
                {train.origin.city}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Dep: <span className="font-mono text-slate-200">{train.origin.departureTime}</span>
              </span>
            </div>

            {/* Animated train progress connector */}
            <div className="flex-1 mx-3 flex flex-col items-center">
              <div className="w-full relative flex items-center py-2">
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500" 
                    style={{ width: `${train.progressPercent}%` }}
                  />
                </div>
                <div 
                  className="absolute text-amber-400 transition-all duration-500 -translate-x-1/2 drop-shadow-md"
                  style={{ left: `${Math.max(8, Math.min(92, train.progressPercent))}%` }}
                >
                  <Activity className="w-4 h-4 animate-pulse" />
                </div>
              </div>
              <span className="text-[10px] font-mono font-medium text-slate-400">
                {train.progressPercent}% Complete
              </span>
            </div>

            {/* Destination */}
            <div className="text-right max-w-[42%]">
              <span className="text-2xl font-black font-mono tracking-tight text-white block">
                {train.destination.code}
              </span>
              <span className="text-xs font-semibold text-slate-300 line-clamp-1 block">
                {train.destination.city}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Arr: <span className="font-mono text-slate-200">{train.destination.arrivalTime}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Real-Time Telemetry Grid */}
        <div className="p-4 grid grid-cols-2 gap-3 bg-[#161c24]">
          <div className="bg-[#101419] p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium">Ground Speed</span>
              <Gauge className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-bold font-mono tabular-nums text-white">
              {train.currentPosition.speedKmH} <span className="text-xs text-slate-400 font-sans">km/h</span>
            </div>
          </div>

          <div className="bg-[#101419] p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium">Course / Heading</span>
              <Compass className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-bold font-mono tabular-nums text-white">
              {train.currentPosition.heading}° <span className="text-xs text-slate-400 font-sans">{getCardinalDirection(train.currentPosition.heading)}</span>
            </div>
          </div>

          <div className="bg-[#101419] p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium">Corridor Line</span>
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xs font-semibold text-white truncate" title={train.lineName}>
              {train.lineName}
            </div>
          </div>

          <div className="bg-[#101419] p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium">GPS Signal & Feed</span>
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Feed</span>
            </div>
          </div>
        </div>

        {/* Timetable / Stops List */}
        <div className="p-4 bg-[#141920]">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Itinerary Stations ({train.stops.length})</span>
            </h4>
            <button
              onClick={() => setShowAllStops(!showAllStops)}
              className="text-[11px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-0.5"
            >
              {showAllStops ? 'Collapse' : 'Expand'}
              {showAllStops ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {showAllStops && (
            <div className="space-y-2 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {train.stops.map((stop, index) => (
                <div 
                  key={index} 
                  className={`relative pl-6 py-1.5 text-xs flex items-center justify-between rounded-lg px-2 transition-colors ${
                    stop.isCurrent 
                      ? 'bg-amber-500/10 border border-amber-500/30' 
                      : stop.passed 
                      ? 'opacity-60' 
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  {/* Status node */}
                  <div className={`absolute left-1 w-2.5 h-2.5 rounded-full border-2 ${
                    stop.passed 
                      ? 'bg-slate-600 border-slate-500' 
                      : stop.isCurrent 
                      ? 'bg-amber-400 border-white ring-2 ring-amber-400/30 animate-pulse' 
                      : 'bg-[#141920] border-amber-400'
                  }`} />

                  <div className="flex flex-col">
                    <span className={`font-semibold ${stop.isCurrent ? 'text-amber-300 font-bold' : 'text-slate-200'}`}>
                      {stop.stationName}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Platform {stop.platform || '1'}
                    </span>
                  </div>

                  <div className="text-right font-mono tabular-nums">
                    <span className="text-slate-300 block">
                      {stop.scheduledDeparture || stop.scheduledArrival}
                    </span>
                    {stop.passed && (
                      <span className="text-[10px] text-slate-500 block">Departed</span>
                    )}
                    {stop.isCurrent && (
                      <span className="text-[10px] text-amber-400 font-semibold block">Now At Station</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Official API Source Transparency Footer */}
        <div className="p-3 bg-[#101419] text-[11px] text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Telemetry authenticated via <strong className="text-slate-300">{train.officialApiSource}</strong>.
          </span>
        </div>

      </div>
    </aside>
  );
};
