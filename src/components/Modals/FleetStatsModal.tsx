import React from 'react';
import { Train } from '../../types/train';
import { X, BarChart3, Gauge, Clock, Zap, TrainTrack, ShieldCheck } from 'lucide-react';

interface FleetStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trains: Train[];
}

export const FleetStatsModal: React.FC<FleetStatsModalProps> = ({
  isOpen,
  onClose,
  trains,
}) => {
  if (!isOpen) return null;

  // Calculate statistics
  const totalTrains = trains.length;
  const onTimeCount = trains.filter((t) => t.delayMinutes <= 3).length;
  const onTimePercent = totalTrains > 0 ? Math.round((onTimeCount / totalTrains) * 100) : 100;
  
  const speeds = trains.map((t) => t.currentPosition.speedKmH);
  const maxSpeed = speeds.length > 0 ? Math.max(...speeds) : 0;
  const avgSpeed = speeds.length > 0 ? Math.round(speeds.reduce((a, b) => a + b, 0) / speeds.length) : 0;

  const fastestTrain = trains.find((t) => t.currentPosition.speedKmH === maxSpeed);

  // Group by Operator
  const byOperator: Record<string, number> = {};
  trains.forEach((t) => {
    byOperator[t.operatorName] = (byOperator[t.operatorName] || 0) + 1;
  });

  // Group by Category
  const byCategory: Record<string, number> = {};
  trains.forEach((t) => {
    byCategory[t.categoryLabel] = (byCategory[t.categoryLabel] || 0) + 1;
  });

  return (
    <div className="fixed inset-0 z-[800] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="w-full max-w-lg bg-[#161c24] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Fleet and Network Metrics"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#12161b]">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Live Rail Fleet Metrics</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1 text-xs">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#12161b] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Active Tracked Trains</span>
              <div className="text-2xl font-bold font-mono tabular-nums text-white mt-1">
                {totalTrains}
              </div>
              <span className="text-[10px] text-emerald-400">100% Live GPS</span>
            </div>

            <div className="bg-[#12161b] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Network Punctuality</span>
              <div className="text-2xl font-bold font-mono tabular-nums text-amber-300 mt-1">
                {onTimePercent}%
              </div>
              <span className="text-[10px] text-slate-400">&lt; 3 min delay</span>
            </div>

            <div className="bg-[#12161b] p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-slate-400 text-[11px] block">Top Speed Live</span>
              <div className="text-2xl font-bold font-mono tabular-nums text-white mt-1">
                {maxSpeed} <span className="text-xs font-sans text-slate-400">km/h</span>
              </div>
              <span className="text-[10px] text-slate-400 truncate block">
                {fastestTrain ? `${fastestTrain.trainNumber} (${fastestTrain.operator})` : 'Cruising'}
              </span>
            </div>
          </div>

          {/* Breakdown by Operator */}
          <div>
            <h3 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-2.5">
              Trains by Rail Operator
            </h3>
            <div className="space-y-1.5 bg-[#12161b] p-3 rounded-xl border border-slate-800">
              {Object.entries(byOperator).map(([opName, count]) => (
                <div key={opName} className="flex items-center justify-between py-1 border-b border-slate-800/60 last:border-0">
                  <span className="text-slate-300 font-medium">{opName}</span>
                  <span className="font-mono font-bold text-amber-400 tabular-nums">{count} trains</span>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown by Category */}
          <div>
            <h3 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-2.5">
              Train Services Breakdown
            </h3>
            <div className="space-y-1.5 bg-[#12161b] p-3 rounded-xl border border-slate-800">
              {Object.entries(byCategory).map(([catName, count]) => (
                <div key={catName} className="flex items-center justify-between py-1 border-b border-slate-800/60 last:border-0">
                  <span className="text-slate-300 font-medium">{catName}</span>
                  <span className="font-mono font-bold text-amber-400 tabular-nums">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Average speed */}
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300 font-medium">Network Average Speed</span>
            </div>
            <span className="font-mono font-bold text-white tabular-nums text-sm">
              {avgSpeed} km/h
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#12161b] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
