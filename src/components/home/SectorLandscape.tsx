import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Headphones,
  Truck,
  MonitorPlay,
  Briefcase,
  Plane,
  ShoppingBag,
  Coins,
  Sparkles,
  Ship,
} from 'lucide-react';
import { businesses } from '../../data/businesses';

export const SectorLandscape: React.FC = () => {
  const sectorIcons: Record<string, React.ReactNode> = {
    TECH: <Cpu className="w-5 h-5 text-[#0284C7]" />,
    BPO: <Headphones className="w-5 h-5 text-blue-600" />,
    LOGISTICS: <Truck className="w-5 h-5 text-sky-600" />,
    MEDIA: <MonitorPlay className="w-5 h-5 text-purple-600" />,
    ADVISORY: <Briefcase className="w-5 h-5 text-slate-700" />,
    TRAVEL: <Plane className="w-5 h-5 text-cyan-600" />,
    RETAIL: <ShoppingBag className="w-5 h-5 text-amber-600" />,
    FINANCE: <Coins className="w-5 h-5 text-emerald-600" />,
    MARKETING: <Sparkles className="w-5 h-5 text-pink-600" />,
    TRADE: <Ship className="w-5 h-5 text-amber-700" />,
  };

  return (
    <section className="bg-white py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-2">
              Sector Specialization
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Diversification Across Strategic Commercial Horizons
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-sm font-medium">
            Select a commercial sector to explore specialized capabilities, operating models, and dedicated portfolio companies.
          </p>
        </div>

        {/* 10-Item Sector Navigator */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {businesses.map((biz) => (
            <Link
              key={biz.id}
              to={`/businesses/${biz.slug}`}
              className="p-4 sm:p-5 bg-slate-50/80 border border-slate-200 hover:border-[#0284C7] hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[140px] focus:outline-none focus:ring-2 focus:ring-[#0284C7] relative"
            >
              <div className="flex items-center justify-between">
                <span className="p-2.5 bg-white border border-slate-200/90 shadow-2xs group-hover:scale-110 group-hover:shadow-xs transition-all duration-200">
                  {sectorIcons[biz.sectorCode] || <Cpu className="w-5 h-5 text-[#0284C7]" />}
                </span>
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-[#0284C7] font-bold transition-colors">
                  {biz.sectorCode}
                </span>
              </div>
              <div className="mt-4">
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors block truncate">
                  {biz.category.split('/')[0]}
                </span>
                <span className="text-[11px] text-slate-500 group-hover:text-slate-700 truncate block mt-0.5 font-medium transition-colors">
                  {biz.shortName}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
