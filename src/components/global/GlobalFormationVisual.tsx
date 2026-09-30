import React, { useState } from 'react';
import { Globe2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CountryPresence } from '../../types';

export const GlobalFormationVisual: React.FC = () => {
  const [countries] = useState<CountryPresence[]>([
    {
      country: 'Bangladesh',
      countryCode: 'BD',
      formation: true,
      operations: true,
      office: true,
      commercialReach: true,
      verified: true,
      publish: true,
      description:
        'Independent operating chapter in Uttara, Dhaka-1230, conducting active multi-sector business operations since 2017.',
    },
    {
      country: 'Hong Kong',
      countryCode: 'HK',
      formation: true,
      operations: true,
      office: false,
      commercialReach: true,
      verified: true,
      publish: true,
      description:
        'International corporate gateway for cross-border trade structuring, foreign trade liaison, and commercial governance.',
    },
    {
      country: 'Thailand',
      countryCode: 'TH',
      formation: true,
      operations: true,
      office: false,
      commercialReach: true,
      verified: true,
      publish: true,
      description:
        'Regional Southeast Asian trade coordination, supply chain facilitation, and travel operations connectivity.',
    },
    {
      country: 'United Kingdom (UK)',
      countryCode: 'GB',
      formation: true,
      operations: true,
      office: false,
      commercialReach: true,
      verified: true,
      publish: true,
      description:
        'European enterprise trade facilitation, strategic commercial linkages, and international business advisory.',
    },
    {
      country: 'China',
      countryCode: 'CN',
      formation: true,
      operations: true,
      office: false,
      commercialReach: true,
      verified: true,
      publish: true,
      description:
        'Direct manufacturer supply chain coordination, hardware/tech sourcing, and international freight routing.',
    },
    {
      country: 'India',
      countryCode: 'IN',
      formation: true,
      operations: true,
      office: false,
      commercialReach: true,
      verified: true,
      publish: true,
      description:
        'Regional commodities sourcing, cross-border commercial trade pipelines, and enterprise raw material supply chain links.',
    },
  ]);

  return (
    <div className="space-y-12">
      {/* Abstract World Grid Visualization in Light Theme */}
      <div className="bg-white border border-slate-200 p-8 sm:p-12 shadow-sm">
        <div className="max-w-3xl mb-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#0284C7] font-bold">
            International Network Geometry
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Global Operations & Formation Coordinates
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
            TISS Corporation maintains commercial operations and corporate presence across autonomous chapters:
            Bangladesh, Hong Kong, Thailand, United Kingdom, China, and India.
          </p>
        </div>

        {/* Global Projection Graphic */}
        <div className="w-full aspect-[21/9] min-h-[340px] relative bg-slate-50 border border-slate-200 flex items-center justify-center p-6">
          <svg
            viewBox="0 0 1000 420"
            className="w-full h-full"
            aria-label="TISS Global Operations Network Graphic"
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
              {/* BD to UK */}
              <path d="M 640 220 Q 520 120 400 130" fill="none" />
              {/* BD to China */}
              <path d="M 640 220 Q 690 140 740 160" fill="none" />
              {/* BD to Hong Kong */}
              <path d="M 640 220 Q 710 200 760 215" fill="none" />
              {/* BD to Thailand */}
              <path d="M 640 220 Q 670 250 700 260" fill="none" />
              {/* BD to India */}
              <path d="M 640 220 Q 600 230 570 230" fill="none" />
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
                Independent Chapter (Since 2017)
              </text>
            </g>

            {/* 2. United Kingdom (UK) Node */}
            <g>
              <circle cx="400" cy="130" r="11" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
              <circle cx="400" cy="130" r="4.5" fill="#0284C7" />
              <text x="400" y="108" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="800" fontFamily="Manrope, sans-serif">
                UNITED KINGDOM (UK)
              </text>
              <text x="400" y="122" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="Manrope, sans-serif">
                European Trade & Advisory
              </text>
            </g>

            {/* 3. China Node */}
            <g>
              <circle cx="740" cy="160" r="11" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
              <circle cx="740" cy="160" r="4.5" fill="#0284C7" />
              <text x="740" y="138" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="800" fontFamily="Manrope, sans-serif">
                CHINA
              </text>
              <text x="740" y="152" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="Manrope, sans-serif">
                Manufacturing & Supply Chain
              </text>
            </g>

            {/* 4. Hong Kong Node */}
            <g>
              <circle cx="760" cy="215" r="11" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
              <circle cx="760" cy="215" r="4.5" fill="#0284C7" />
              <text x="830" y="215" textAnchor="start" fill="#0F172A" fontSize="11" fontWeight="800" fontFamily="Manrope, sans-serif">
                HONG KONG
              </text>
              <text x="830" y="228" textAnchor="start" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="Manrope, sans-serif">
                Trade Finance Gateway
              </text>
            </g>

            {/* 5. Thailand Node */}
            <g>
              <circle cx="700" cy="260" r="11" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
              <circle cx="700" cy="260" r="4.5" fill="#0284C7" />
              <text x="700" y="288" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="800" fontFamily="Manrope, sans-serif">
                THAILAND
              </text>
              <text x="700" y="302" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="Manrope, sans-serif">
                Southeast Asia Trade Link
              </text>
            </g>

            {/* 6. India Node */}
            <g>
              <circle cx="570" cy="230" r="11" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
              <circle cx="570" cy="230" r="4.5" fill="#0284C7" />
              <text x="520" y="234" textAnchor="end" fill="#0F172A" fontSize="11" fontWeight="800" fontFamily="Manrope, sans-serif">
                INDIA
              </text>
              <text x="520" y="247" textAnchor="end" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="Manrope, sans-serif">
                Regional Sourcing
              </text>
            </g>
          </svg>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-600 gap-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#0284C7]" />
            <span className="text-slate-900 font-bold">Independent Operating Chapter: Bangladesh (Since 2017)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#0284C7]" />
            <span className="text-slate-700 font-bold">
              Autonomous Chapters: Hong Kong, Thailand, UK, China, India
            </span>
          </div>
        </div>
      </div>

      {/* Corporate Jurisdiction Overview Table */}
      <div className="bg-white border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Corporate Presence & Operations Breakdown
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              Verified operational standing across sovereign corporate jurisdictions.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 bg-sky-50 border border-sky-200 text-[#0284C7] font-bold">
            6 Autonomous Country Chapters
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-mono text-[10px] bg-slate-50/70">
                <th className="py-3 px-4">Jurisdiction</th>
                <th className="py-3 px-4">Entity Formation</th>
                <th className="py-3 px-4">Operating Presence</th>
                <th className="py-3 px-4">Physical Office</th>
                <th className="py-3 px-4">Scope Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {countries.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 border border-slate-200 text-slate-600">
                      {c.countryCode}
                    </span>
                    <span className={c.country === 'Bangladesh' ? 'text-[#0284C7] font-black' : 'text-slate-900'}>
                      {c.country}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 text-[10px] font-mono font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 text-[10px] font-mono font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {c.office ? (
                      <span className="inline-flex items-center gap-1 text-sky-700 bg-sky-50 px-2 py-0.5 border border-sky-200 text-[10px] font-mono font-bold">
                        Registered Office
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono text-[10px]">Commercial Corridor</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600 max-w-sm leading-relaxed">
                    {c.description}
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
