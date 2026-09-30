import React from 'react';
import { companyData } from '../../data/company';
import { Building2, Globe2, Calendar } from 'lucide-react';

export const CorporateSnapshot: React.FC = () => {
  const statIcons = [
    <Building2 className="w-6 h-6 text-[#0284C7]" />,
    <Globe2 className="w-6 h-6 text-[#0284C7]" />,
    <Calendar className="w-6 h-6 text-[#D97706]" />,
  ];

  return (
    <section className="bg-white py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-2">
              Corporate Scale & Scope
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              An Ecosystem of Specialized Businesses
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed font-medium">
            TISS Corporation unites diversified capabilities under dedicated operating entities,
            fostering domain leadership, client satisfaction, and continuous commercial expansion.
          </p>
        </div>

        {/* Editorial Animated Data Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
          {companyData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-8 bg-slate-50/70 border border-slate-200 relative group hover:border-[#0284C7] hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0284C7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-white border border-slate-200/80 shadow-2xs group-hover:scale-110 transition-transform">
                    {statIcons[idx] || <Building2 className="w-6 h-6 text-[#0284C7]" />}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                    METRIC 0{idx + 1}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  {stat.prefix && (
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider font-mono">
                      {stat.prefix}
                    </span>
                  )}
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-[#0F172A] group-hover:text-[#0284C7] font-mono tabular-nums transition-colors">
                    {stat.value}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-3 tracking-normal">
                  {stat.label}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed font-medium">
                  {stat.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
