import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { BusinessStatusBadge } from '../common/BusinessStatusBadge';

export const PortfolioMosaic: React.FC = () => {
  const { cmsData } = useCMS();
  const businesses = cmsData.businesses;
  const hero = cmsData.hero;

  const featureBusinesses = businesses.slice(0, 2);
  const mediumBusinesses = businesses.slice(2, 6);
  const compactBusinesses = businesses.slice(6, 10);

  return (
    <section className="bg-slate-50/70 py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-2.5">
              <span className="w-5 h-[2px] bg-[#0284C7]" />
              <span>{hero.portfolioBadge || 'Multi-Sector Capabilities'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {hero.portfolioHeadline || 'The Portfolio Mosaic'}
            </h2>
          </div>
          <Link
            to={hero.portfolioCtaLink || '/businesses'}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0284C7] hover:text-[#0369A1] transition-colors"
          >
            <span>{hero.portfolioCtaLabel || 'Complete Business Directory'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mosaic Layout Grid */}
        <div className="space-y-6">
          {/* Row 1: 2 Large Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featureBusinesses.map((biz) => (
              <Link
                key={biz.id}
                to={`/businesses/${biz.slug}`}
                className="group relative bg-white border border-slate-200 p-8 sm:p-10 flex flex-col justify-between hover:border-[#0284C7] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              >
                {/* Accent top stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3.5px]"
                  style={{ backgroundColor: biz.themeColor }}
                />

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#0284C7] font-bold">
                      {biz.sectorCode}
                    </span>
                    <BusinessStatusBadge status={biz.status} size="sm" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-[#0284C7] transition-colors">
                    {biz.name}
                  </h3>

                  <p className="text-xs uppercase tracking-wider font-bold text-slate-500">
                    {biz.positioning}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed pt-1 font-medium">
                    {biz.description}
                  </p>
                </div>

                <div className="pt-8 border-t border-slate-100 flex items-center justify-between mt-8">
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-medium">
                    {biz.services.slice(0, 3).map((srv, idx) => (
                      <span key={idx} className="after:content-['·'] after:ml-2 last:after:content-none">
                        {srv}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] group-hover:translate-x-1 transition-transform shrink-0 ml-4">
                    Explore Profile <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Row 2: 4 Medium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediumBusinesses.map((biz) => (
              <Link
                key={biz.id}
                to={`/businesses/${biz.slug}`}
                className="group relative bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-[#0284C7] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px]"
                  style={{ backgroundColor: biz.themeColor }}
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                      {biz.sectorCode}
                    </span>
                    <BusinessStatusBadge status={biz.status} size="sm" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors leading-snug">
                    {biz.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                    {biz.headline}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-6">
                  <span className="text-[11px] text-slate-500 font-semibold truncate">
                    {biz.category.split('/')[0]}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0284C7] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
                </div>
              </Link>
            ))}
          </div>

          {/* Row 3: 4 Compact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {compactBusinesses.map((biz) => (
              <Link
                key={biz.id}
                to={`/businesses/${biz.slug}`}
                className="group bg-white border border-slate-200 p-5 flex flex-col justify-between hover:border-[#0284C7] hover:shadow-md hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">
                      {biz.sectorCode}
                    </span>
                    <BusinessStatusBadge status={biz.status} size="sm" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors">
                    {biz.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                    {biz.headline}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4 text-[11px]">
                  <span className="text-slate-500 font-medium">View Business</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0284C7] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
