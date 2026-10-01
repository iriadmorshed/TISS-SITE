import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Building2, Globe2, Users, Briefcase } from 'lucide-react';

export const CorporateSnapshot: React.FC = () => {
  const { cmsData } = useCMS();
  const { hero } = cmsData;

  const stats = [
    {
      value: hero.metric1Value || '150+',
      label: hero.metric1Label || 'Personnel in BD',
      subtext: 'Across engineering, CX, retail, and coordination squads',
      icon: <Users className="w-6 h-6 text-[#0284C7]" />,
    },
    {
      value: hero.metric2Value || '3',
      label: hero.metric2Label || 'Offices in Dhaka',
      subtext: 'Corporate, Registered, and delivery facilities',
      icon: <Building2 className="w-6 h-6 text-[#0284C7]" />,
    },
    {
      value: hero.metric3Value || '10',
      label: hero.metric3Label || 'Portfolio Businesses',
      subtext: 'Operating across technology, BPO, logistics, and retail',
      icon: <Briefcase className="w-6 h-6 text-[#0284C7]" />,
    },
    {
      value: hero.metric4Value || '6',
      label: hero.metric4Label || 'Countries Present',
      subtext: 'Autonomous chapters with physical offices and local compliance',
      icon: <Globe2 className="w-6 h-6 text-[#D97706]" />,
    },
  ];

  return (
    <section className="bg-white py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-2">
              {hero.scaleBadge || 'Corporate Scale & Scope'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {hero.scaleHeadline || 'An Ecosystem of Specialized Businesses'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed font-medium">
            {hero.scaleSubheadline ||
              'TISS Corporation unites diversified capabilities under dedicated operating entities, fostering domain leadership, client satisfaction, and continuous commercial expansion.'}
          </p>
        </div>

        {/* Dynamic Metric Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-8 bg-slate-50/70 border border-slate-200 relative group hover:border-[#0284C7] hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0284C7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-white border border-slate-200/80 shadow-2xs group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                    METRIC 0{idx + 1}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-[#0F172A] group-hover:text-[#0284C7] font-mono tabular-nums transition-colors">
                    {stat.value}
                  </span>
                </div>

                <p className="text-sm font-bold text-slate-900 mt-2">
                  {stat.label}
                </p>

                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {stat.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
