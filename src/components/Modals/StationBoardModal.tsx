import React, { useState, useMemo } from 'react';
import { Station, Train, StationDepartureItem } from '../../types/train';
import { railApiService } from '../../services/railApiService';
import { X, Building2, ArrowDownLeft, ArrowUpRight, Clock, MapPin } from 'lucide-react';

interface StationBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  stations: Station[];
  selectedStationId?: string;
  onSelectTrain: (train: Train) => void;
}

export const StationBoardModal: React.FC<StationBoardModalProps> = ({
  isOpen,
  onClose,
  stations,
  selectedStationId,
  onSelectTrain,
}) => {
  const [activeStationId, setActiveStationId] = useState<string>(
    selectedStationId || stations[0]?.id || 'st-lis-sa'
  );
  const [boardType, setBoardType] = useState<'DEPARTURES' | 'ARRIVALS'>('DEPARTURES');

  // Keep active station synced if passed via props
  React.useEffect(() => {
    if (selectedStationId) {
      setActiveStationId(selectedStationId);
    }
  }, [selectedStationId]);

  const activeStation = useMemo(
    () => stations.find((s) => s.id === activeStationId) || stations[0],
    [stations, activeStationId]
  );

  const { departures, arrivals } = useMemo(() => {
    if (!activeStation) return { departures: [], arrivals: [] };
    return railApiService.getStationBoard(activeStation.id);
  }, [activeStation]);

  if (!isOpen) return null;

  const currentBoardItems = boardType === 'DEPARTURES' ? departures : arrivals;

  const handleTrainClick = (item: StationDepartureItem) => {
    const train = railApiService.getTrainById(item.trainId) || railApiService.getTrainById(item.trainNumber);
    if (train) {
      onSelectTrain(train);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[800] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="w-full max-w-2xl bg-[#161c24] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Live Station Departure and Arrival Board"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#12161b]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Station Live Boards</span>
                <span className="text-xs font-mono font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {activeStation?.code}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {activeStation?.name} · {activeStation?.city}, {activeStation?.country}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Station Selector Bar */}
        <div className="p-3 bg-[#141920] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <select
              value={activeStationId}
              onChange={(e) => setActiveStationId(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-400 flex-1 font-sans"
            >
              {stations.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.code}) - {st.city}
                </option>
              ))}
            </select>
          </div>

          {/* Departures vs Arrivals Tabs */}
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setBoardType('DEPARTURES')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                boardType === 'DEPARTURES'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Departures</span>
            </button>
            <button
              onClick={() => setBoardType('ARRIVALS')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                boardType === 'ARRIVALS'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ArrowDownLeft className="w-3.5 h-3.5" />
              <span>Arrivals</span>
            </button>
          </div>
        </div>

        {/* Station Board Table */}
        <div className="flex-1 overflow-y-auto p-2">
          {currentBoardItems.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No scheduled {boardType.toLowerCase()} currently active for this station in the real-time feed.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3">Train</th>
                    <th className="py-2.5 px-3">{boardType === 'DEPARTURES' ? 'Destination' : 'Origin'}</th>
                    <th className="py-2.5 px-3">Plat.</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {currentBoardItems.map((item, idx) => (
                    <tr
                      key={idx}
                      onClick={() => handleTrainClick(item)}
                      className="hover:bg-slate-800/60 transition-colors cursor-pointer group"
                    >
                      {/* Scheduled & Estimated Time */}
                      <td className="py-3 px-3 font-mono tabular-nums whitespace-nowrap">
                        <span className="text-white font-semibold block">{item.scheduledTime}</span>
                        {item.delayMinutes > 0 ? (
                          <span className="text-[10px] text-amber-400 font-bold block">
                            Exp {item.estimatedTime} (+{item.delayMinutes}m)
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-400 block">On time</span>
                        )}
                      </td>

                      {/* Train & Operator */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="font-mono font-bold text-amber-400 group-hover:underline block">
                          {item.trainNumber}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {item.operator}
                        </span>
                      </td>

                      {/* Station */}
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-200 block truncate max-w-[180px]">
                          {boardType === 'DEPARTURES' ? item.destination : item.origin}
                        </span>
                      </td>

                      {/* Platform */}
                      <td className="py-3 px-3 font-mono font-bold text-slate-200">
                        {item.platform}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <span
                          className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                            item.status === 'BOARDING'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                              : item.status === 'DEPARTED' || item.status === 'ARRIVED'
                              ? 'bg-slate-800 text-slate-400'
                              : item.status === 'DELAYED'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-800 bg-[#12161b] text-[11px] text-slate-400 flex items-center justify-between">
          <span>Click any train to track its live GPS location on the radar.</span>
          <span className="font-mono text-slate-500">Live IP / CP Feed</span>
        </div>
      </div>
    </div>
  );
};
