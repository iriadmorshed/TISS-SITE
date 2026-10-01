import React from 'react';
import { Globe2, ShieldCheck, CheckCircle2, Building2, Layers, Cpu, Compass } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const GlobalFormationVisual: React.FC = () => {
  const { cmsData } = useCMS();
  const countries = cmsData.countries;

  return (
    <div className="space-y-12">
      {/* Network Architecture Map Graphic */}
      <div className="bg-white border border-slate-200 p-6 sm:p-10 shadow-sm rounded-2xl">
        <div className="max-w-3xl mb-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#0284C7] font-bold">
            Autonomous Chapter Architecture
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Dedicated Offices Across 6 Sovereign Jurisdictions
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
            Each country chapter maintains a physical office and operates with sovereign autonomy under its local
            laws and corporate statutes. Specialized domain fields are handled in targeted territories (with diversified multi-sector operations in select chapters), while all chapters stay synchronized through standardized group communication systems.
          </p>
        </div>

        {/* Global Projection Graphic */}
        <div className="w-full aspect-[21/9] min-h-[360px] relative bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center p-6">
          <svg
            viewBox="0 0 1000 420"
            className="w-full h-full"
            aria-label="TISS Global Chapter Network Graphic"
          >
            {/* Latitude and Longitude Graticule lines */}
            <g stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4">
              <line x1="100" y1="70" x2="900" y2="70" />
              <line x1="100" y1="140" x2="900" y2="140" />
              <line x1="100" y1="210" x2="900" y2="210" stroke="#CBD5E1" strokeDasharray="none" />
              <line x1="100" y1="280" x2="900" y2="280" />
              <line x1="100" y1="350" x2="900" y2="350" />

              <line x1="200" y1="50" x2="200" y2="370" />
              <line x1="350" y1="50" x2="350" y2="370" />
              <line x1="500" y1="50" x2="500" y2="370" stroke="#CBD5E1" strokeDasharray="none" />
              <line x1="650" y1="50" x2="650" y2="370" />
              <line x1="800" y1="50" x2="800" y2="370" />
            </g>

            {/* Connecting Trade Arcs between autonomous chapters */}
            <g stroke="#0284C7" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 3">
              <path d="M 640 220 Q 520 120 400 130" fill="none" />
              <path d="M 640 220 Q 690 140 740 160" fill="none" />
              <path d="M 640 220 Q 710 200 760 215" fill="none" />
              <path d="M 640 220 Q 670 250 700 260" fill="none" />
              <path d="M 640 220 Q 600 230 570 230" fill="none" />
              <path d="M 400 130 Q 580 90 740 160" fill="none" stroke="#94A3B8" strokeOpacity="0.3" />
              <path d="M 740 160 Q 750 185 760 215" fill="none" stroke="#94A3B8" strokeOpacity="0.3" />
            </g>

            {/* 1. Independent Chapter: Bangladesh */}
            <g>
              <circle cx="640" cy="220" r="28" fill="none" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.8" />
              <circle cx="640" cy="220" r="14" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" className="drop-shadow-sm" />
              <circle cx="640" cy="220" r="5" fill="#0284C7" />
              <text x="640" y="260" textAnchor="middle" fill="#0284C7" fontSize="13" fontWeight="900" fontFamily="Manrope, sans-serif">
                BANGLADESH
              </text>
              <text x="640" y="275" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="700" fontFamily="Manrope, sans-serif">
                3 Offices · Multi-Sector Hub
              </text>
            </g>

            {/* 2. United Kingdom (UK) Node */}
            <g>
              <circle cx="400" cy="130" r="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
              <circle cx="400" cy="130" r="4.5" fill="#0284C7" />
              <text x="400" y="108" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="800" fontFamily="Manrope, sans-serif">
                UNITED KINGDOM (UK)
              </text>
              <text x="400" y="122" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="Manrope, sans-serif">
                London Office · Trade Advisory
              </text>
            </g>

            {/* 3. China Node */}
            <g>
              <circle cx="740" cy="160" r="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
              <circle cx="740" cy="160" r="4.5" fill="#0284C7" />
              <text x="740" y="138" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="800" fontFamily="Manrope, sans-serif">
                CHINA
              </text>
              <text x="740" y="152" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="Manrope, sans-serif">
                Sourcing Hub & Freight Office
              </text>
            </g>

            {/* 4. Hong Kong Node */}
            <g>
              <circle cx="760" cy="215" r="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
              <circle cx="760" cy="215" r="4.5" fill="#0284C7" />
              <text x="830" y="215" textAnchor="start" fill="#0F172A" fontSize="11" fontWeight="800" fontFamily="Manrope, sans-serif">
                HONG KONG
              </text>
              <text x="830" y="228" textAnchor="start" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="Manrope, sans-serif">
                Chapter Office · Trade Finance
              </text>
            </g>

            {/* 5. Thailand Node */}
            <g>
              <circle cx="700" cy="260" r="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
              <circle cx="700" cy="260" r="4.5" fill="#0284C7" />
              <text x="700" y="288" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="800" fontFamily="Manrope, sans-serif">
                THAILAND
              </text>
              <text x="700" y="302" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="Manrope, sans-serif">
                Bangkok Office · Ambient Media & FMCG
              </text>
            </g>

            {/* 6. India Node */}
            <g>
              <circle cx="570" cy="230" r="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
              <circle cx="570" cy="230" r="4.5" fill="#0284C7" />
              <text x="520" y="234" textAnchor="end" fill="#0F172A" fontSize="11" fontWeight="800" fontFamily="Manrope, sans-serif">
                INDIA
              </text>
              <text x="520" y="247" textAnchor="end" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="Manrope, sans-serif">
                Regional Commodities Office
              </text>
            </g>
          </svg>
        </div>

        {/* Legend Ribbon */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#0284C7]" />
            <span className="text-slate-900 font-bold">Physical Office in Every Country</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-600" />
            <span className="text-slate-700 font-bold">Autonomous Legal Compliance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-600" />
            <span className="text-slate-700 font-bold">Unified Communication Protocol</span>
          </div>
        </div>
      </div>

      {/* Corporate Jurisdiction Overview Table */}
      <div className="bg-white border border-slate-200 p-8 shadow-sm rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Autonomous Chapters: Operational Fields & Sovereign Governance
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              Every country chapter has a dedicated office, operates in targeted or varied fields, and obeys local sovereign laws while staying connected through our group system.
            </p>
          </div>
          <span className="text-xs font-mono px-3.5 py-1.5 bg-sky-50 border border-sky-200 text-[#0284C7] font-bold rounded-lg shrink-0">
            Offices Active in All 6 Countries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-mono text-[10px] bg-slate-50/70">
                <th className="py-3 px-4">Jurisdiction</th>
                <th className="py-3 px-4">Physical Office</th>
                <th className="py-3 px-4">Field Focus & Scope</th>
                <th className="py-3 px-4">Sovereign Legal Framework</th>
                <th className="py-3 px-4">Entity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {countries.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 align-top">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 border border-slate-200 text-slate-600 rounded">
                        {c.countryCode}
                      </span>
                      <span className={c.country === 'Bangladesh' ? 'text-[#0284C7] font-black' : 'text-slate-900'}>
                        {c.country}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono block mt-1">
                      {c.scopeModel === 'diversified' ? 'Multi-Field Chapter' : 'Specialized Field'}
                    </span>
                  </td>

                  <td className="py-4 px-4 align-top">
                    <div className="flex items-start gap-1.5 text-slate-800 font-semibold">
                      <Building2 className="w-3.5 h-3.5 text-[#0284C7] shrink-0 mt-0.5" />
                      <span>{c.officeType}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4 max-w-xs align-top">
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {c.specializedFields?.map((f, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono bg-sky-50 text-[#0284C7] px-2 py-0.5 rounded border border-sky-100 font-semibold"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                      {c.description}
                    </p>
                  </td>

                  <td className="py-4 px-4 max-w-xs align-top">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed">
                      <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-700 uppercase mb-0.5">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Autonomous Operation</span>
                      </div>
                      {c.legalAutonomyNote}
                    </div>
                  </td>

                  <td className="py-4 px-4 align-top">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200 text-[10px] font-mono font-bold rounded">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active Chapter
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
