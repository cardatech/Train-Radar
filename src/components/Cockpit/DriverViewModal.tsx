import React, { useState, useEffect } from 'react';
import { Train } from '../../types/train';
import { X, Gauge, Compass, MapPin, Radio, Volume2, VolumeX, ShieldCheck } from 'lucide-react';

interface DriverViewModalProps {
  train: Train | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DriverViewModal: React.FC<DriverViewModalProps> = ({
  train,
  isOpen,
  onClose,
}) => {
  const [hornPlaying, setHornPlaying] = useState(false);

  if (!isOpen || !train) return null;

  // Web Audio Train Two-Tone Chime
  const playTrainHorn = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      // European locomotive dual-tone chime (F# and A)
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(370, audioCtx.currentTime); // F#4
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(440, audioCtx.currentTime); // A4

      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 1.2);
      osc2.stop(audioCtx.currentTime + 1.2);

      setHornPlaying(true);
      setTimeout(() => setHornPlaying(false), 1200);
    } catch {
      // AudioContext fallback
    }
  };

  const nextStop = train.stops.find((s) => !s.passed) || train.stops[train.stops.length - 1];

  return (
    <div className="fixed inset-0 z-[900] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        className="w-full max-w-3xl bg-[#0c1014] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative"
        role="dialog"
        aria-modal="true"
        aria-label="Driver Cab View Simulation"
      >
        {/* Top HUD Bar */}
        <div className="p-4 bg-gradient-to-b from-[#161c24] to-transparent flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-bold font-mono flex items-center justify-center text-lg shadow-lg">
              {train.operator}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold font-mono text-white tracking-wider">
                  {train.trainNumber}
                </span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded font-mono font-bold">
                  CAB HUD
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {train.rollingStock.series} · {train.origin.code} → {train.destination.code}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={playTrainHorn}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                hornPlaying
                  ? 'bg-amber-400 text-slate-950 border-amber-400 scale-95'
                  : 'bg-slate-900 border-slate-700 text-amber-300 hover:border-amber-400'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>Sound Horn</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Cab Horizon Viewport */}
        <div className="relative h-72 sm:h-84 bg-gradient-to-b from-[#090d12] via-[#101721] to-[#0c1014] overflow-hidden flex items-center justify-center select-none">
          {/* Animated Railroad perspective lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-0.5 h-full bg-amber-400/30"></div>
            <div 
              className="absolute w-full h-full"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(245, 158, 11, 0.15) 0%, transparent 60%)',
              }}
            />
            {/* Railroad Track Perspective (SVG) */}
            <svg viewBox="0 0 400 200" className="w-full h-full">
              <line x1="200" y1="80" x2="60" y2="200" stroke="#f59e0b" strokeWidth="2.5" />
              <line x1="200" y1="80" x2="340" y2="200" stroke="#f59e0b" strokeWidth="2.5" />
              {/* Ties / Sleepers moving */}
              <line x1="180" y1="100" x2="220" y2="100" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="160" y1="120" x2="240" y2="120" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="130" y1="145" x2="270" y2="145" stroke="#cbd5e1" strokeWidth="2.5" />
              <line x1="90" y1="175" x2="310" y2="175" stroke="#cbd5e1" strokeWidth="3" />
            </svg>
          </div>

          {/* Central HUD Horizon Crosshair & Status */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-amber-400/60 border-dashed animate-spin flex items-center justify-center" style={{ animationDuration: '24s' }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-900/80 border border-amber-400 flex flex-col items-center justify-center">
                <span className="text-xl sm:text-2xl font-black font-mono tabular-nums text-white">
                  {train.currentPosition.speedKmH}
                </span>
                <span className="text-[9px] text-amber-400 uppercase font-mono">KM/H</span>
              </div>
            </div>

            <div className="mt-4 bg-slate-950/90 border border-slate-800 px-4 py-1.5 rounded-full text-xs font-mono text-slate-300 flex items-center gap-3">
              <span>HDG: <strong className="text-white">{train.currentPosition.heading}°</strong></span>
              <span>·</span>
              <span>ALT: <strong className="text-white">{train.currentPosition.altitudeM}m</strong></span>
              <span>·</span>
              <span>LINE: <strong className="text-amber-300">{train.lineName}</strong></span>
            </div>
          </div>

          {/* Left HUD: Approaching Stop */}
          <div className="absolute left-4 bottom-4 bg-[#12161b]/90 border border-slate-800 p-3 rounded-xl max-w-[200px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Stop</span>
            <div className="text-sm font-bold text-white truncate">
              {nextStop.stationName}
            </div>
            <span className="text-xs font-mono text-amber-400 block mt-0.5">
              Arr {nextStop.scheduledArrival || nextStop.scheduledDeparture}
            </span>
          </div>

          {/* Right HUD: Power & Traction */}
          <div className="absolute right-4 bottom-4 bg-[#12161b]/90 border border-slate-800 p-3 rounded-xl text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Traction System</span>
            <div className="text-xs font-bold text-white">
              25 kV 50 Hz AC
            </div>
            <span className="text-[11px] font-mono text-emerald-400 block mt-0.5">
              Pantograph Raised
            </span>
          </div>
        </div>

        {/* Bottom Telemetry Strip */}
        <div className="p-4 bg-[#12161b] border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 text-[10px] block">GPS Latitude</span>
            <span className="font-mono text-white font-medium">{train.currentPosition.latitude.toFixed(6)}° N</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">GPS Longitude</span>
            <span className="font-mono text-white font-medium">{train.currentPosition.longitude.toFixed(6)}° W</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">Delay Variance</span>
            <span className={`font-mono font-medium ${train.delayMinutes > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {train.statusText}
            </span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">Feed Authority</span>
            <span className="text-slate-300 font-medium truncate block">IP Real-Time</span>
          </div>
        </div>
      </div>
    </div>
  );
};
