import React from 'react';
import { Search, X } from 'lucide-react';
import { BusinessStatus } from '../../types';

interface FilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedStatus: BusinessStatus | 'all';
  setSelectedStatus: (status: BusinessStatus | 'all') => void;
  categories: string[];
  totalCount: number;
  filteredCount: number;
}

export const BusinessDirectoryFilter: React.FC<FilterProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  categories,
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="bg-white border border-slate-200 p-6 space-y-5 shadow-sm">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by company name, technology, or service focus..."
          className="w-full bg-slate-50 border border-slate-200 py-3 pl-11 pr-10 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0284C7] transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-500 uppercase font-mono text-[10px] font-bold mr-1">
            Sector:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 font-semibold transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#0284C7] text-white font-bold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
            }`}
          >
            All Sectors
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#0284C7] text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filter Dropdown & Results Counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 uppercase font-mono text-[10px] font-bold">
              Status:
            </span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as BusinessStatus | 'all')}
              className="bg-white border border-slate-300 text-slate-800 py-1.5 px-3 text-xs font-semibold focus:outline-none focus:border-[#0284C7]"
            >
              <option value="all">All Statuses</option>
              <option value="operating">Operating</option>
              <option value="development">In Pre-Launch Development</option>
              <option value="planned">Planned Initiative</option>
              <option value="coming-soon">Launching Soon</option>
              <option value="regulatory">Subject to Regulatory Approval</option>
            </select>
          </div>

          <span className="text-slate-500 font-mono text-[11px] whitespace-nowrap font-medium">
            Showing <strong className="text-slate-900 font-bold">{filteredCount}</strong> of {totalCount}
          </span>
        </div>
      </div>
    </div>
  );
};
