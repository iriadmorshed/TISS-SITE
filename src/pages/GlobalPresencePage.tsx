import React from 'react';
import { Globe2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { GlobalFormationVisual } from '../components/global/GlobalFormationVisual';
import { companyData } from '../data/company';

export const GlobalPresencePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Global Presence — Autonomous Operating Chapters | TISS Corporation"
        description="TISS Co. Ltd. (TISS Corporation) operates across independent country chapters in Bangladesh, Hong Kong, Thailand, UK, China, and India."
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
                <span>Autonomous Jurisdictional Chapters</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Autonomous Chapters. <br />
                Global Commercial Connectivity.
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                TISS Corporation operates across independent sovereign chapters —
                <span className="font-bold text-slate-900"> Bangladesh (operating since 2017), Hong Kong, Thailand, UK, China, and India</span> —
                where each territory functions as an autonomous operating chapter within our unified international ecosystem.
              </p>

              <div className="p-5 bg-slate-50 border-l-4 border-[#0284C7] text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                In a diversified enterprise group, global reach encompasses legal entity establishment,
                active operations, physical offices, and commercial distribution channels. We maintain
                clear transparency regarding each operational dimension.
              </div>
            </div>
          </div>
        </section>

        {/* Four Presence Definitions */}
        <section className="py-16 bg-slate-50/70 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyData.presenceConcepts.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-slate-200 shadow-xs hover:border-[#0284C7] transition-colors"
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
