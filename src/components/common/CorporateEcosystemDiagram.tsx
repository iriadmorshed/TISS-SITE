import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { businesses } from '../../data/businesses';

export const CorporateEcosystemDiagram: React.FC = () => {
  const [selectedBizId, setSelectedBizId] = useState<string>(businesses[0].id);
  const selectedBiz = businesses.find((b) => b.id === selectedBizId) || businesses[0];

  return (
    <div className="bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#0284C7] font-bold">
          Group Architecture
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
          Parent-Company & Portfolio Relationship
        </h3>
        <p className="text-xs text-slate-600 mt-2 font-medium">
          Interactive view of how TISS Corporation anchors and empowers its 10 specialized business entities.
        </p>
      </div>

      {/* Central Parent Box */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-sm p-6 bg-slate-50 border-2 border-[#0284C7] text-center shadow-md">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#0284C7] block font-bold">
            Parent Corporation
          </span>
          <h4 className="text-xl font-black text-slate-900 tracking-wider mt-0.5">
            TISS CO. LTD.
          </h4>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Governance · Strategic Capital · Enterprise Continuity
          </p>
        </div>

        {/* Vertical connection spine */}
        <div className="w-0.5 h-10 bg-gradient-to-b from-[#0284C7] to-slate-300" />
        <div className="w-full max-w-4xl h-0.5 bg-slate-300 mb-8 hidden md:block" />
      </div>

      {/* 10 Business Nodes in Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {businesses.map((biz) => {
          const isSelected = biz.id === selectedBizId;
          return (
            <button
              key={biz.id}
              onClick={() => setSelectedBizId(biz.id)}
              className={`p-3 text-left border transition-all text-xs flex flex-col justify-between min-h-[96px] focus:outline-none focus:ring-2 focus:ring-[#0284C7] ${
                isSelected
                  ? 'bg-white border-[#0284C7] shadow-md ring-1 ring-[#0284C7]'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-400 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono text-[#0284C7] font-bold">
                  {biz.sectorCode}
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: biz.themeColor }}
                />
              </div>
              <div className="mt-2">
                <p className="font-bold text-slate-900 line-clamp-1">{biz.shortName}</p>
                <p className="text-[10px] text-slate-500 line-clamp-1 font-medium">
                  {biz.category.split('/')[0]}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Business Detail Box */}
      <div className="mt-8 p-6 bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">{selectedBiz.name}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-white border border-slate-200 text-slate-700 font-bold">
              {selectedBiz.sectorCode}
            </span>
          </div>
          <p className="text-xs text-[#0284C7] font-bold">{selectedBiz.headline}</p>
          <p className="text-xs text-slate-600 max-w-2xl font-medium leading-relaxed">{selectedBiz.description}</p>
        </div>
        <Link
          to={`/businesses/${selectedBiz.slug}`}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] transition-colors shadow-sm"
        >
          <span>Open Full Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
