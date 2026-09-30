import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, Layers, ShieldCheck, Target, Building2 } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CorporateEcosystemDiagram } from '../components/common/CorporateEcosystemDiagram';
import { companyData } from '../data/company';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="About TISS Corporation — Corporate Overview & Architecture"
        description="Learn about TISS Co. Ltd. (TISS Corporation), a diversified business group operating across independent chapters in Bangladesh, Hong Kong, Thailand, UK, China, and India."
        canonicalPath="/about"
      />

      <div className="bg-[#F8FAFC] text-slate-900">
        {/* Breadcrumb Bar */}
        <div className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'About TISS' }]} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 lg:py-28 border-b border-slate-200 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                <span className="w-5 h-[2px] bg-[#0284C7]" />
                <span>Corporate Profile</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Building Businesses. <br />
                Connecting Opportunities.
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                TISS Co. Ltd. (TISS Corporation) is a diversified enterprise group bringing together
                specialized businesses across technology, customer communication, logistics, advertising,
                advisory, travel, retail, and international trade.
              </p>
            </div>
          </div>
        </section>

        {/* TISS at a Glance */}
        <section className="py-20 bg-slate-50/70 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white border border-slate-200 shadow-sm">
                <span className="text-[11px] font-mono uppercase text-[#0284C7] font-bold block mb-2">
                  Operating Chapter
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Bangladesh Chapter</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Active commercial operations in Bangladesh since 2017, with Corporate Offices in
                  Sector-13 and Registered Offices in Sec-15D, Uttara, Dhaka-1230.
                </p>
              </div>

              <div className="p-8 bg-white border border-slate-200 shadow-sm">
                <span className="text-[11px] font-mono uppercase text-purple-600 font-bold block mb-2">
                  International Operations
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Autonomous Chapters</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Active commercial operations and corporate presence across <strong>Hong Kong, Thailand, UK, China, and India</strong>,
                  operating alongside Bangladesh as independent sovereign chapters.
                </p>
              </div>

              <div className="p-8 bg-white border border-slate-200 shadow-sm">
                <span className="text-[11px] font-mono uppercase text-emerald-600 font-bold block mb-2">
                  Specialized Ecosystem
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">10 Business Entities</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Autonomous businesses tailored to their respective domains, from digital software
                  infrastructure to ambient urban advertising and sustainable jute export.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How the Portfolio Works */}
        <section className="py-24 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                  Organizational Model
                </span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  How the TISS Ecosystem Operates
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Rather than functioning as a single centralized conglomerate, TISS Corporation operates
                  as an agile parent platform empowering dedicated domain specialists.
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Each entity retains operational independence, sector focus, and specialized domain
                  teams, while benefiting from group-level strategic direction, financial backing, and
                  network relationships.
                </p>

                <div className="pt-2">
                  <Link
                    to="/businesses"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0284C7] hover:bg-[#0369A1] px-6 py-3.5 transition-colors shadow-sm"
                  >
                    <span>Inspect Business Directory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="p-6 bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[#0284C7]" />
                    <h4 className="text-sm font-bold text-slate-900">Parent Corporate Governance</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8 font-medium">
                    TISS Co. Ltd. sets long-term commercial strategy, maintains cross-border regulatory
                    adherence, and evaluates strategic partnership opportunities.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-purple-600" />
                    <h4 className="text-sm font-bold text-slate-900">Autonomous Domain Execution</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8 font-medium">
                    Companies like Parameter-X Ltd. (software engineering) and Huixin Global Ltd. (ambient
                    media) maintain distinct commercial relationships with external partners.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <h4 className="text-sm font-bold text-slate-900">Pragmatic Capital Allocation</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8 font-medium">
                    Resources are allocated based on real commercial viability, market infrastructure
                    demands, and verifiable customer requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Ecosystem Architecture Diagram */}
        <section className="py-24 bg-slate-50/70 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CorporateEcosystemDiagram />
          </div>
        </section>

        {/* Corporate Approach (The 4 Pillars) */}
        <section className="py-24 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                Guiding Principles
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                The Four Pillars of Our Approach
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyData.pillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="p-6 bg-slate-50 border border-slate-200 hover:border-[#0284C7] hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono text-[#0284C7] font-bold block mb-3">
                      {pillar.number}.
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mb-2">{pillar.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Horizon Section */}
        <section className="py-24 bg-gradient-to-br from-[#0B192C] to-[#0F172A] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#38BDF8]">
              Strategic Outlook
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              The Next Chapter of Connected Growth
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              As TISS Corporation deepens its footprint across active operating sectors, the group continues
              to evaluate new commercial frontiers. From advancing international trade linkages to
              launching consumer retail supermarkets and digital systems, our evolution remains disciplined,
              customer-centered, and focused on lasting value.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-[#38BDF8] transition-colors shadow-md"
              >
                <span>Connect With Corporate Team</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
