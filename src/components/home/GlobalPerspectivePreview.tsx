import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const GlobalPerspectivePreview: React.FC = () => {
  const { cmsData } = useCMS();
  const hero = cmsData.hero;
  return (
    <section className="bg-white py-24 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Abstract Global Network SVG Visual in Light Theme */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[440px] aspect-square relative bg-slate-50 border border-slate-200 p-8 flex items-center justify-center shadow-sm">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                aria-label="Abstract Multi-Jurisdiction Network"
              >
                {/* Concentric planetary orbit lines */}
                <circle cx="200" cy="200" r="160" fill="none" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="110" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
                <circle cx="200" cy="200" r="60" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />

                {/* 5 Abstract Formation Nodes */}
                {/* Node 1: Bangladesh Foundation */}
                <circle cx="200" cy="90" r="14" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
                <circle cx="200" cy="90" r="6" fill="#0284C7" />
                <text x="200" y="65" textAnchor="middle" fill="#0284C7" fontSize="11" fontWeight="800" fontFamily="Manrope, sans-serif">
                  BANGLADESH (Activities Since 2017)
                </text>

                {/* Node 2: Hong Kong */}
                <circle cx="310" cy="180" r="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
                <circle cx="310" cy="180" r="4" fill="#0284C7" />
                <text x="325" y="184" textAnchor="start" fill="#0F172A" fontSize="10.5" fontWeight="800" fontFamily="Manrope, sans-serif">
                  HONG KONG
                </text>

                {/* Node 3: Thailand */}
                <circle cx="270" cy="290" r="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
                <circle cx="270" cy="290" r="4" fill="#0284C7" />
                <text x="270" y="315" textAnchor="middle" fill="#0F172A" fontSize="10.5" fontWeight="800" fontFamily="Manrope, sans-serif">
                  THAILAND
                </text>

                {/* Node 4: India */}
                <circle cx="130" cy="290" r="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
                <circle cx="130" cy="290" r="4" fill="#0284C7" />
                <text x="130" y="315" textAnchor="middle" fill="#0F172A" fontSize="10.5" fontWeight="800" fontFamily="Manrope, sans-serif">
                  INDIA
                </text>

                {/* Node 5: China */}
                <circle cx="90" cy="180" r="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
                <circle cx="90" cy="180" r="4" fill="#0284C7" />
                <text x="75" y="184" textAnchor="end" fill="#0F172A" fontSize="10.5" fontWeight="800" fontFamily="Manrope, sans-serif">
                  CHINA
                </text>

                {/* Node 6: United Kingdom (UK) */}
                <circle cx="200" cy="200" r="11" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" className="drop-shadow-sm" />
                <circle cx="200" cy="200" r="4.5" fill="#0284C7" />
                <text x="200" y="224" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="800" fontFamily="Manrope, sans-serif">
                  UNITED KINGDOM (UK)
                </text>
              </svg>
            </div>
          </div>

          {/* Copy & Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
              <Globe2 className="w-4 h-4 text-[#0284C7]" />
              <span>{hero.globalBadge || 'International Perspective'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {hero.globalHeadline || 'Local Foundations. International Outlook.'}
            </h2>

            <p className="text-base text-slate-700 leading-relaxed font-medium">
              {hero.globalSubheadline ||
                'TISS Co. Ltd. (TISS Corporation) operates across autonomous international chapters including Bangladesh, Hong Kong, Thailand, United Kingdom (UK), China, and India.'}
            </p>

            <div className="space-y-4 pt-1">
              <div className="p-5 bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0284C7] block font-bold mb-1">
                  International Corporate Footprint
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Independent jurisdictional chapters facilitating cross-border trade relationships,
                  international supplier connections, and broad regulatory compliance awareness.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0284C7] block font-bold mb-1">
                  Bangladesh Chapter & Activities
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  An independent operating chapter with active commercial operations and modern offices located in
                  Uttara, Dhaka-1230, conducting activities in Bangladesh since 2017.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to={hero.globalCtaLink || '/global-presence'}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0284C7] hover:bg-[#0369A1] px-6 py-3.5 transition-colors shadow-sm"
              >
                <span>{hero.globalCtaLabel || 'Explore Global Presence'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
