import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { businesses } from '../data/businesses';
import { BusinessStatusBadge } from '../components/common/BusinessStatusBadge';

export const ServicesPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Group Services & Capabilities — TISS Corporation"
        description="Comprehensive overview of specialized service capabilities represented across TISS Co. Ltd. (TISS Corporation)’s diversified portfolio."
        canonicalPath="/services"
      />

      <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
        {/* Breadcrumb Bar */}
        <div className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Services' }]} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 lg:py-24 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                <span className="w-5 h-[2px] bg-[#0284C7]" />
                <span>Group Capabilities</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
                Ecosystem Services & Capabilities
              </h1>

              <div className="p-5 bg-slate-50 border-l-4 border-[#0284C7] text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                These specialized service areas are represented across TISS Corporation’s portfolio of
                operating businesses. Services are engineered and delivered through dedicated entities
                equipped with domain expertise and modern operational infrastructure.
              </div>
            </div>
          </div>
        </section>

        {/* 10 Detailed Sector Service Sections */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {businesses.map((biz, idx) => (
              <div
                key={biz.id}
                id={biz.slug}
                className="p-8 sm:p-12 bg-white border border-slate-200 shadow-sm relative group scroll-mt-28 hover:border-[#0284C7] hover:shadow-md transition-all duration-300"
              >
                <div
                  className="absolute top-0 left-0 bottom-0 w-2"
                  style={{ backgroundColor: biz.themeColor }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Sector & Business Identification (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#0284C7] font-bold uppercase tracking-wider">
                        Sector 0{idx + 1} · {biz.sectorCode}
                      </span>
                      <span className="text-slate-300">|</span>
                      <BusinessStatusBadge status={biz.status} size="sm" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {biz.category.split('/')[0]}
                    </h2>

                    <div className="pt-1">
                      <p className="text-[11px] uppercase font-mono font-bold text-slate-500">
                        Delivered Through
                      </p>
                      <Link
                        to={`/businesses/${biz.slug}`}
                        className="text-lg font-bold text-[#0284C7] hover:underline inline-flex items-center gap-1 mt-0.5"
                      >
                        <span>{biz.name}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 font-medium">
                      {biz.description}
                    </p>
                  </div>

                  {/* Right Column: Capabilities Breakdown (7 cols) */}
                  <div className="lg:col-span-7">
                    <span className="text-[11px] uppercase tracking-wider font-mono text-slate-500 font-bold block mb-4">
                      Core Specialized Capabilities
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {biz.services.map((srv, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5 font-medium hover:bg-white hover:border-[#0284C7] transition-colors"
                        >
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: biz.themeColor }}
                          />
                          <span>{srv}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">
                        Explore dedicated capabilities and client solutions
                      </span>
                      <Link
                        to={`/businesses/${biz.slug}`}
                        className="text-xs font-bold text-[#0284C7] hover:text-[#0369A1] inline-flex items-center gap-1"
                      >
                        <span>Detailed Business Profile</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
