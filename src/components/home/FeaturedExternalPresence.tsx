import React from 'react';
import { ArrowUpRight, Globe } from 'lucide-react';
import { businesses } from '../../data/businesses';

export const FeaturedExternalPresence: React.FC = () => {
  const featuredPortals = [
    {
      name: 'Parameter-X Ltd.',
      url: 'https://parameter-x.com/',
      domain: 'parameter-x.com',
      sectorCode: 'TECH',
      description: 'Custom software engineering, cloud architecture, SaaS development, and digital transformation.',
    },
    {
      name: 'Huixin Global Ltd.',
      url: 'https://www.huixin.co.bd/',
      domain: 'huixin.co.bd',
      sectorCode: 'MEDIA',
      description: 'High-impact elevator media branding, ambient advertising networks, and premium outdoor displays.',
    },
    {
      name: 'TGB Global Trading',
      url: 'https://tgbglobaltrading.com/',
      domain: 'tgbglobaltrading.com',
      sectorCode: 'TRADE',
      description: 'Sustainable jute sourcing, international export coordination, and diversified global trade solutions.',
    },
  ];

  return (
    <section className="bg-white py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-2">
              Group Web Portals
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Across Our Business Network
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-sm font-medium">
            Explore dedicated digital destinations showcasing specialized solutions, client offerings, and domain operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPortals.map((portal, idx) => (
            <a
              key={idx}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-7 bg-slate-50 border border-slate-200 hover:border-[#0284C7] hover:bg-white hover:shadow-md transition-all flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
                  <span className="font-mono uppercase font-bold text-[#0284C7]">
                    {portal.sectorCode}
                  </span>
                  <Globe className="w-4 h-4 text-slate-400 group-hover:text-[#0284C7] transition-colors" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors">
                  {portal.name}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {portal.domain}
                </p>
                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed font-medium">
                  {portal.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/80 mt-6 flex items-center justify-between text-xs font-bold text-[#0284C7]">
                <span>Visit Portal</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
