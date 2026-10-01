import React from 'react';
import { Globe2, ShieldCheck, CheckCircle2, Building2, Layers, Cpu, ArrowRight } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { GlobalFormationVisual } from '../components/global/GlobalFormationVisual';
import { useCMS } from '../context/CMSContext';
import { companyData } from '../data/company';

export const GlobalPresencePage: React.FC = () => {
  const { cmsData } = useCMS();
  const narratives = cmsData.narratives;

  return (
    <>
      <SEO
        title="Global Presence — Autonomous Chapters with Dedicated Offices | TISS Corporation"
        description="TISS Co. Ltd. (TISS Corporation) maintains physical offices across 6 sovereign jurisdictions: Bangladesh, Hong Kong, Thailand, UK, China, and India. Operating with local legal autonomy and unified group communication."
        canonicalPath="/global-presence"
      />

      <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
        {/* Breadcrumb Bar */}
        <div className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Global Presence' }]} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 lg:py-24 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                <Globe2 className="w-4 h-4 text-[#0284C7]" />
                <span>{narratives.globalBadge || 'Autonomous Jurisdictional Chapters'}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                {narratives.globalHeadline || 'Autonomous Chapters. Dedicated Offices Across 6 Countries.'}
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                {narratives.globalSubheadline ||
                  'TISS Corporation operates through dedicated physical offices across six countries: Bangladesh, Hong Kong, Thailand, United Kingdom (UK), China, and India. Each territory functions as an autonomous chapter targeting specialized or varied commercial fields.'}
              </p>

              {/* 3 Core Architecture Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-2 text-[#0284C7] font-bold text-xs uppercase font-mono mb-1">
                    <Building2 className="w-4 h-4" />
                    <span>Physical Offices</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Active chapter offices in all 5 international countries plus Bangladesh.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase font-mono mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Sovereign Autonomy</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Each entity complies autonomously with its host country laws, tax codes, and commercial regulations.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase font-mono mb-1">
                    <Layers className="w-4 h-4" />
                    <span>Domain Specialization</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Targeted fields (Trade Finance, Sourcing, Ambient Ads, Commodities, Enterprise IT) tailored to each market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Scope & Autonomy Philosophy */}
        <section className="py-16 bg-slate-50/70 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyData.presenceConcepts.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-slate-200 rounded-xl shadow-2xs hover:border-[#0284C7] transition-colors"
                >
                  <span className="text-[10px] font-mono text-[#0284C7] font-bold uppercase block mb-2">
                    Classification 0{idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{item.term}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Centerpiece & Presence Table */}
        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GlobalFormationVisual />
          </div>
        </section>
      </div>
    </>
  );
};
