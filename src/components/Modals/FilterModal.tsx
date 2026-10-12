import React from 'react';
import { FilterState, OperatorCode, TrainCategory } from '../../types/train';
import { X, RotateCcw, Check } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChangeFilters: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  totalFilteredTrains: number;
}

const OPERATORS: { code: OperatorCode; label: string; country: string }[] = [
  { code: 'CP', label: 'CP - Comboios de Portugal', country: '🇵🇹 Portugal' },
  { code: 'FERTAGUS', label: 'Fertagus (Eixo Norte-Sul)', country: '🇵🇹 Portugal' },
  { code: 'MEDWAY', label: 'Medway Logistics (Freight)', country: '🇵🇹 Portugal' },
  { code: 'RENFE', label: 'Renfe Operadora', country: '🇪🇸 Spain' },
  { code: 'SNCF', label: 'SNCF Voyageurs', country: '🇫🇷 France' },
  { code: 'DB', label: 'Deutsche Bahn (DB)', country: '🇩🇪 Germany' },
];

const CATEGORIES: { code: TrainCategory; label: string }[] = [
  { code: 'ALFA_PENDULAR', label: 'High-Speed (Alfa Pendular / AVE / TGV)' },
  { code: 'INTERCIDADES', label: 'Intercidades / Intercity' },
  { code: 'URBANO', label: 'Urbano / Suburban Commuter' },
  { code: 'REGIONAL', label: 'Regional & InterRegional' },
  { code: 'INTERNATIONAL', label: 'International Cross-Border' },
  { code: 'FREIGHT', label: 'Freight & Cargo' },
];

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onChangeFilters,
  onResetFilters,
  totalFilteredTrains,
}) => {
  if (!isOpen) return null;

  const toggleOperator = (op: OperatorCode) => {
    const next = filters.selectedOperators.includes(op)
      ? filters.selectedOperators.filter((o) => o !== op)
      : [...filters.selectedOperators, op];
    onChangeFilters({ ...filters, selectedOperators: next });
  };

  const toggleCategory = (cat: TrainCategory) => {
    const next = filters.selectedCategories.includes(cat)
      ? filters.selectedCategories.filter((c) => c !== cat)
      : [...filters.selectedCategories, cat];
    onChangeFilters({ ...filters, selectedCategories: next });
  };

  return (
    <div className="fixed inset-0 z-[800] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="w-full max-w-lg bg-[#161c24] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Filter Rail Traffic"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#12161b]">
          <div>
            <h2 className="text-base font-bold text-white">Filter Rail Traffic</h2>
            <p className="text-xs text-slate-400">
              Showing <span className="font-mono text-amber-400 font-semibold">{totalFilteredTrains}</span> matching trains
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onResetFilters}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Region / Country */}
          <div>
            <label className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] block mb-2">
              Region & Coverage
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'PT', label: '🇵🇹 Portugal' },
                { id: 'ES', label: '🇪🇸 Spain' },
                { id: 'EU_ALL', label: '🇪🇺 All Europe' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => onChangeFilters({ ...filters, selectedCountry: c.id as any })}
                  className={`p-2.5 rounded-lg border text-left font-medium transition-all ${
                    filters.selectedCountry === c.id
                      ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Delay Status */}
          <div>
            <label className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] block mb-2">
              Delay Status
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'ALL', label: 'All Trains' },
                { id: 'ON_TIME', label: 'On Time (<3m)' },
                { id: 'DELAYED_MINOR', label: 'Minor (3-15m)' },
                { id: 'DELAYED_MAJOR', label: 'Major (>15m)' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => onChangeFilters({ ...filters, delayFilter: d.id as any })}
                  className={`p-2 rounded-lg border text-center font-medium transition-all ${
                    filters.delayFilter === d.id
                      ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Railway Operators */}
          <div>
            <label className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] block mb-2">
              Rail Operators
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {OPERATORS.map((op) => {
                const checked = filters.selectedOperators.includes(op.code);
                return (
                  <button
                    key={op.code}
                    onClick={() => toggleOperator(op.code)}
                    className={`p-2.5 rounded-lg border flex items-center justify-between text-left transition-all ${
                      checked
                        ? 'bg-amber-400/10 border-amber-400 text-amber-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="font-semibold block">{op.label}</span>
                      <span className="text-[10px] text-slate-400">{op.country}</span>
                    </div>
                    {checked && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Train Categories */}
          <div>
            <label className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] block mb-2">
              Train Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => {
                const checked = filters.selectedCategories.includes(cat.code);
                return (
                  <button
                    key={cat.code}
                    onClick={() => toggleCategory(cat.code)}
                    className={`p-2.5 rounded-lg border flex items-center justify-between text-left transition-all ${
                      checked
                        ? 'bg-amber-400/10 border-amber-400 text-amber-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {checked && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Speed Threshold */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
                Minimum Speed: <span className="font-mono text-amber-400">{filters.minSpeed} km/h</span>
              </label>
              {filters.minSpeed > 0 && (
                <button
                  onClick={() => onChangeFilters({ ...filters, minSpeed: 0 })}
                  className="text-[10px] text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
            <input
              type="range"
              min="0"
              max="250"
              step="10"
              value={filters.minSpeed}
              onChange={(e) => onChangeFilters({ ...filters, minSpeed: parseInt(e.target.value) })}
              className="w-full accent-amber-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0 km/h</span>
              <span>100 km/h</span>
              <span>200 km/h</span>
              <span>250+ km/h</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#12161b] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition-colors"
          >
            Apply Filters ({totalFilteredTrains} trains)
          </button>
        </div>

      </div>
    </div>
  );
};
