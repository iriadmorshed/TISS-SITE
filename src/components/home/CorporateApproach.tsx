import React from 'react';
import { companyData } from '../../data/company';

export const CorporateApproach: React.FC = () => {
  return (
    <section className="bg-slate-50/70 py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-2.5">
            Operating Mindset
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Corporate Approach
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed font-medium">
            How TISS Corporation approaches long-term value creation, operational stability, and commercial excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyData.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="p-8 bg-white border border-slate-200 hover:border-[#0284C7] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-[#0284C7] font-bold block mb-3">
                  {pillar.number}.
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
