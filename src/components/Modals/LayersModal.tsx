import React from 'react';
import { MapLayerConfig } from '../../types/train';
import { X, Layers, Check } from 'lucide-react';

interface LayersModalProps {
  isOpen: boolean;
  onClose: () => void;
  layerConfig: MapLayerConfig;
  onChangeLayerConfig: (config: MapLayerConfig) => void;
}

export const LayersModal: React.FC<LayersModalProps> = ({
  isOpen,
  onClose,
  layerConfig,
  onChangeLayerConfig,
}) => {
  if (!isOpen) return null;

  const baseStyles: { id: MapLayerConfig['tileStyle']; name: string; desc: string }[] = [
    { id: 'dark', name: 'Dark Radar (Default)', desc: 'High-contrast Flightradar-style dark vector map' },
    { id: 'satellite', name: 'Satellite Imagery', desc: 'Real high-resolution aerial photography' },
    { id: 'streets', name: 'Voyager Street Map', desc: 'Clear daylight geography and terrain contours' },
    { id: 'railway', name: 'OpenRailwayMap', desc: 'Dedicated railway infrastructure, signals & tracks' },
  ];

  return (
    <div className="fixed inset-0 z-[800] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="w-full max-w-md bg-[#161c24] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Map Layer Settings"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#12161b]">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Map & Overlay Layers</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 text-xs">
          {/* Base Tile Style */}
          <div>
            <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] block mb-2.5">
              Base Radar Style
            </label>
            <div className="space-y-2">
              {baseStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => onChangeLayerConfig({ ...layerConfig, tileStyle: style.id })}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    layerConfig.tileStyle === style.id
                      ? 'bg-amber-400/10 border-amber-400 text-amber-200'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-white">{style.name}</div>
                    <div className="text-[11px] text-slate-400">{style.desc}</div>
                  </div>
                  {layerConfig.tileStyle === style.id && (
                    <Check className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Overlays Toggle */}
          <div>
            <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] block mb-2.5">
              Overlays & Markers
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-semibold text-white block">Railway Stations</span>
                  <span className="text-[11px] text-slate-400">Show stations across Portugal and Europe</span>
                </div>
                <input
                  type="checkbox"
                  checked={layerConfig.showStations}
                  onChange={(e) => onChangeLayerConfig({ ...layerConfig, showStations: e.target.checked })}
                  className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-semibold text-white block">Rail Tracks & Infrastructure</span>
                  <span className="text-[11px] text-slate-400">Show OpenRailwayMap lines and electrification</span>
                </div>
                <input
                  type="checkbox"
                  checked={layerConfig.showRailways}
                  onChange={(e) => onChangeLayerConfig({ ...layerConfig, showRailways: e.target.checked })}
                  className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#12161b] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
