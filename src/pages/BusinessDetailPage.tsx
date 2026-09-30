import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Users, Compass, ExternalLink } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BusinessStatusBadge } from '../components/common/BusinessStatusBadge';
import { VerificationNotice } from '../components/common/VerificationNotice';
import { businesses } from '../data/businesses';

export const BusinessDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const business = businesses.find((b) => b.slug === slug);

  if (!business) {
    return <Navigate to="/businesses" replace />;
  }

  // Related businesses (excluding current)
  const relatedBusinesses = businesses
    .filter((b) => b.id !== business.id)
    .slice(0, 3);

  return (
    <>
      <SEO
        title={`${business.name} — ${business.positioning} | TISS Corporation`}
        description={business.description}
        canonicalPath={`/businesses/${business.slug}`}
      />

      <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
        {/* Breadcrumb Bar */}
        <div className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: 'Businesses', path: '/businesses' },
                { label: business.name },
              ]}
            />
          </div>
        </div>

        {/* HERO SECTION */}
        <section
          className="relative py-20 lg:py-24 border-b border-slate-200 bg-white overflow-hidden"
          style={{
            borderTop: `4px solid ${business.themeColor}`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="space-y-6 max-w-4xl">
              {/* Category, Sector Code & Status */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#0284C7] font-bold">
                  {business.sectorCode} · {business.category}
                </span>
                <span className="text-slate-300">|</span>
                <BusinessStatusBadge status={business.status} size="md" />
              </div>

              {/* Business Name */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
                {business.name}
              </h1>

              {/* Positioning statement */}
              <p
                className="text-base sm:text-lg font-bold tracking-wide"
                style={{ color: business.themeColor }}
              >
                {business.positioning}
              </p>

              {/* Headline */}
              <p className="text-xl sm:text-2xl font-light text-slate-700 italic">
                "{business.headline}"
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-[#0284C7] transition-colors shadow-sm"
                >
                  <span>Inquire Regarding {business.shortName}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                {business.websiteApproved && business.publicWebsite && (
                  <a
                    href={business.publicWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-50 border border-slate-300 hover:border-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#0284C7]" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory or Administrative Operational Notice */}
        {(business.regulatoryNote || business.statusNote) && (
          <section className="bg-slate-100/70 border-b border-slate-200 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {business.regulatoryNote && (
                <VerificationNotice
                  type="regulatory"
                  title="Corporate & Regulatory Notice"
                  message={business.regulatoryNote}
                  className="mb-3"
                />
              )}
              {business.statusNote && !business.regulatoryNote && (
                <VerificationNotice
                  type="info"
                  title="Operational Update"
                  message={business.statusNote}
                />
              )}
            </div>
          </section>
        )}

        {/* Deep Detail Content Sections */}
        <section className="py-20 lg:py-24 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Business Overview & Services (8 cols) */}
              <div className="lg:col-span-8 space-y-16">
                {/* About & Extended Overview */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                    <span className="w-5 h-[2px] bg-[#0284C7]" />
                    <span>Domain Focus</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    About {business.name}
                  </h2>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">
                    {business.description}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {business.extendedOverview}
                  </p>
                </div>

                {/* Focus Areas / Services */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                    <span className="w-5 h-[2px] bg-[#0284C7]" />
                    <span>Core Capabilities</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Services & Solutions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {business.services.map((service, idx) => (
                      <div
                        key={idx}
                        className="p-5 bg-white border border-slate-200 flex items-start gap-3 shadow-xs hover:border-[#0284C7] transition-colors"
                      >
                        <CheckCircle2
                          className="w-5 h-5 shrink-0 mt-0.5"
                          style={{ color: business.themeColor }}
                        />
                        <span className="text-xs sm:text-sm text-slate-800 font-semibold">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Who It Serves */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                    <Users className="w-4 h-4 text-[#0284C7]" />
                    <span>Target Market Alignment</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Who {business.shortName} Serves
                  </h3>
                  <div className="space-y-3">
                    {business.audience.map((aud, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white border border-slate-200 text-xs text-slate-700 flex items-center gap-3.5 shadow-xs"
                      >
                        <span className="font-mono text-[#0284C7] font-bold text-xs">
                          0{idx + 1}.
                        </span>
                        <span className="font-medium">{aud}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Strategic Alignment & Corporate Fit (4 cols) */}
              <div className="lg:col-span-4 space-y-8">
                {/* How It Fits in TISS */}
                <div className="p-8 bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                    <Compass className="w-4 h-4 text-[#0284C7]" />
                    <span>Ecosystem Role</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Alignment Within TISS Corporation
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {business.strategicFit}
                  </p>
                </div>

                {/* Verified Corporate Status Metadata */}
                <div className="p-8 bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] font-mono">
                    Entity Parameters
                  </h4>
                  <div className="space-y-3 text-slate-600">
                    <div className="flex justify-between pb-2.5 border-b border-slate-100">
                      <span>Operating Entity:</span>
                      <span className="text-slate-900 font-bold">{business.name}</span>
                    </div>
                    <div className="flex justify-between pb-2.5 border-b border-slate-100">
                      <span>Parent Group:</span>
                      <span className="text-slate-900 font-bold">TISS Co. Ltd.</span>
                    </div>
                    <div className="flex justify-between pb-2.5 border-b border-slate-100">
                      <span>Sector Code:</span>
                      <span className="text-[#0284C7] font-mono font-bold">{business.sectorCode}</span>
                    </div>
                    <div className="flex justify-between pb-2.5 border-b border-slate-100">
                      <span>Public Status:</span>
                      <BusinessStatusBadge status={business.status} size="sm" />
                    </div>
                    {business.websiteApproved && business.publicWebsite && (
                      <div className="flex justify-between pb-2.5 border-b border-slate-100">
                        <span>Digital Destination:</span>
                        <a
                          href={business.publicWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0284C7] font-bold hover:underline flex items-center gap-1"
                        >
                          Visit Site ↗
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Contact Box */}
                <div className="p-8 bg-gradient-to-br from-slate-900 to-[#0F172A] text-white shadow-md space-y-4">
                  <h4 className="text-base font-bold text-white">
                    Commercial Partnerships & Inquiries
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Interested in services or partnership discussions with {business.shortName}? Reach out to our
                    corporate team for dedicated engagement.
                  </p>
                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center py-3 text-xs font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-[#38BDF8] transition-colors"
                  >
                    Start a Conversation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Businesses within TISS */}
        <section className="py-20 bg-slate-50/80 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0284C7] font-bold">
                  Portfolio Continuity
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Explore Other Businesses in the Group
                </h3>
              </div>
              <Link
                to="/businesses"
                className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1"
              >
                <span>All Businesses</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBusinesses.map((relBiz) => (
                <Link
                  key={relBiz.id}
                  to={`/businesses/${relBiz.slug}`}
                  className="p-6 bg-white border border-slate-200 hover:border-[#0284C7] hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#0284C7] font-bold uppercase">
                        {relBiz.sectorCode}
                      </span>
                      <BusinessStatusBadge status={relBiz.status} size="sm" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors">
                      {relBiz.name}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {relBiz.headline}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-[#0284C7]">
                    <span>View Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
