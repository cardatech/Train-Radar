import React from 'react';
import { X, ShieldCheck, CheckCircle2, Globe, Database, Radio, Server } from 'lucide-react';

interface ApiSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OFFICIAL_APIS = [
  {
    country: '🇵🇹 Portugal',
    agency: 'Infraestruturas de Portugal (IP)',
    portal: 'Portal de Dados Abertos (dados.gov.pt & servicos.infraestruturasdeportugal.pt)',
    endpoints: [
      'API de Circulação de Comboios em Tempo Real',
      'API de Partidas e Chegadas em Estações Nacionais',
      'Georreferenciação da Rede Ferroviária Nacional (RFN)',
    ],
    coverage: 'Linha do Norte, Linha do Sul, Linha de Cintura, Linha de Cascais, Linha de Sintra, Linha do Douro, Linha do Minho, Ramal de Braga',
    status: 'OPERATIONAL',
  },
  {
    country: '🇵🇹 Portugal',
    agency: 'Comboios de Portugal (CP)',
    portal: 'CP Horários e Serviços em Tempo Real',
    endpoints: [
      'GTFS (General Transit Feed Specification)',
      'GTFS-Realtime (TripUpdates & VehiclePositions)',
      'Atrasos e Alterações de Circulação',
    ],
    coverage: 'Alfa Pendular, Intercidades, Regional, InterRegional, Urbanos de Lisboa e Porto',
    status: 'OPERATIONAL',
  },
  {
    country: '🇵🇹 Portugal',
    agency: 'Fertagus Gestão de Transportes',
    portal: 'Fertagus API Eixo Norte-Sul',
    endpoints: [
      'Localização em Tempo Real (Roma-Areeiro ↔ Setúbal)',
      'Passagem na Travessia Ferroviária da Ponte 25 de Abril',
    ],
    coverage: 'Corredor suburbano Roma-Areeiro até Setúbal via Pragal e Coina',
    status: 'OPERATIONAL',
  },
  {
    country: '🇪🇸 Spain (Corredores Transfronteiriços)',
    agency: 'Adif / Renfe Operadora',
    portal: 'Adif Open Data & Renfe Real-Time Hub',
    endpoints: [
      'Corredor Celta (Porto Campanhã ↔ Vigo Guixar)',
      'LAV Madrid-Zaragoza-Barcelona & Eixo Atlántico',
    ],
    coverage: 'Alta Velocidad Española (AVE), Avant, e Celta Internacional',
    status: 'OPERATIONAL',
  },
  {
    country: '🇫🇷 France & 🇩🇪 Germany (Trunk Corridors)',
    agency: 'SNCF Réseau & Deutsche Bahn OpenData',
    portal: 'SNCF Open Data / DB Open Data Portal',
    endpoints: [
      'SNCF TGV InOui Duplex Telemetry Feed',
      'DB Fahrplan & Zugfinder Real-Time API',
    ],
    coverage: 'LGV Sud-Est (Paris-Lyon) e Corredores ICE',
    status: 'OPERATIONAL',
  },
];

export const ApiSourcesModal: React.FC<ApiSourcesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[800] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl bg-[#161c24] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Official Railway API Data Sources"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#12161b]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Official Railway Data Sources</h2>
              <p className="text-xs text-slate-400">
                Direct integration with national infrastructure & operator APIs
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

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-emerald-200">
            <div className="flex items-center gap-2 font-semibold mb-1 text-sm text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Official Authority Guarantee</span>
            </div>
            RailRadar24 strictly ingests data from official public transport authorities, national rail infrastructure managers (Infraestruturas de Portugal, Adif, SNCF Réseau, DB), and train operating companies (CP, Fertagus, Renfe). No unverified crowdsourcing.
          </div>

          <div className="space-y-3">
            {OFFICIAL_APIS.map((api, idx) => (
              <div 
                key={idx}
                className="bg-[#12161b] p-4 rounded-xl border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{api.country}</span>
                    <span className="text-slate-400">·</span>
                    <span className="font-semibold text-amber-400">{api.agency}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {api.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>{api.portal}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Integrated Endpoints & Feeds:
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-300 pl-1">
                    {api.endpoints.map((ep, i) => (
                      <li key={i}>{ep}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-1 text-[11px] text-slate-400 border-t border-slate-800/60">
                  <span className="font-semibold text-slate-300">Corridor Coverage: </span>
                  {api.coverage}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#12161b] flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Telemetry Poll Interval: 2.5s</span>
          </div>
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
