import React, { useState, useMemo } from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BusinessCard } from '../components/businesses/BusinessCard';
import { BusinessDirectoryFilter } from '../components/businesses/BusinessDirectoryFilter';
import { businesses } from '../data/businesses';
import { BusinessStatus } from '../types';

export const BusinessesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<BusinessStatus | 'all'>('all');

  const categories = useMemo(() => {
    return [
      'Technology',
      'BPO',
      'Logistics',
      'Media',
      'Advisory',
      'Travel',
      'Retail',
      'Finance',
      'Marketing',
      'Trade',
    ];
  }, []);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((biz) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        biz.name.toLowerCase().includes(query) ||
        biz.headline.toLowerCase().includes(query) ||
        biz.category.toLowerCase().includes(query) ||
        biz.description.toLowerCase().includes(query) ||
        biz.services.some((s) => s.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === 'all' ||
        biz.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        biz.sectorCode.toLowerCase() === selectedCategory.toLowerCase();

      const matchesStatus =
        selectedStatus === 'all' || biz.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  return (
    <>
      <SEO
        title="Businesses Directory — TISS Corporation Portfolio"
        description="Explore the ten specialized businesses comprising the TISS Co. Ltd. (TISS Corporation) group across technology, logistics, media, advisory, travel, retail, and trade."
        canonicalPath="/businesses"
      />

      <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
        {/* Breadcrumb Bar */}
        <div className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Businesses' }]} />
          </div>
        </div>

        {/* Directory Hero */}
        <section className="py-16 sm:py-20 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                <span className="w-5 h-[2px] bg-[#0284C7]" />
                <span>Group Directory</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
                Ten Specialized Businesses. One Connected Group.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                TISS Corporation brings together specialized enterprises operating across diverse commercial
                disciplines. Browse active entities, inspect specialized capabilities, and explore portfolio operations.
              </p>
            </div>
          </div>
        </section>

        {/* Live Filter Controls & Search */}
        <section className="py-6 bg-slate-100/70 border-b border-slate-200 sticky top-20 z-20 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BusinessDirectoryFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              categories={categories}
              totalCount={businesses.length}
              filteredCount={filteredBusinesses.length}
            />
          </div>
        </section>

        {/* Results Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredBusinesses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBusinesses.map((biz) => (
                  <BusinessCard key={biz.id} business={biz} />
                ))}
              </div>
            ) : (
              <div className="p-16 text-center bg-white border border-slate-200 shadow-sm space-y-4 max-w-xl mx-auto">
                <p className="text-base font-bold text-slate-900">
                  No businesses matched your search criteria.
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Try clearing your search query or selecting "All Sectors" to review the complete group portfolio.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedStatus('all');
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] transition-colors shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
