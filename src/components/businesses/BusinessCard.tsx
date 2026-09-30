import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Business } from '../../types';
import { BusinessStatusBadge } from '../common/BusinessStatusBadge';

interface BusinessCardProps {
  business: Business;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <div className="group bg-white border border-slate-200 p-8 flex flex-col justify-between hover:border-[#0284C7] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative">
      {/* Top sector stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[3.5px]"
        style={{ backgroundColor: business.themeColor }}
      />

      <div className="space-y-4">
        {/* Header row: Sector code & Status */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#0284C7] font-bold">
            {business.sectorCode}
          </span>
          <BusinessStatusBadge status={business.status} size="sm" />
        </div>

        {/* Business Title & Positioning */}
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#0284C7] transition-colors">
            {business.name}
          </h3>
          <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mt-1">
            {business.positioning}
          </p>
        </div>

        {/* Headline & Description */}
        <p className="text-sm font-bold text-slate-800 pt-0.5">
          {business.headline}
        </p>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          {business.description}
        </p>

        {/* Services summary */}
        <div className="pt-3">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block font-bold mb-2">
            Key Capabilities
          </span>
          <div className="flex flex-wrap gap-1.5 text-xs text-slate-600 font-medium">
            {business.services.slice(0, 4).map((srv, idx) => (
              <span key={idx} className="after:content-['·'] after:ml-1.5 last:after:content-none">
                {srv}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer link row */}
      <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
        <Link
          to={`/businesses/${business.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] group-hover:text-[#0369A1] transition-colors"
        >
          <span>Explore Business</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>

        {business.websiteApproved && business.publicWebsite && (
          <a
            href={business.publicWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-500 hover:text-[#0284C7] flex items-center gap-1"
            title="External official site"
          >
            <span>Website</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};
