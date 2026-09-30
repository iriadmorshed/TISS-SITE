import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { timelineMilestones } from '../data/timeline';

export const JourneyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Corporate Journey & Milestones — TISS Corporation"
        description="Chronicle of TISS Co. Ltd. (TISS Corporation)’s operational evolution, from foundational commercial activities in Bangladesh in 2017 to diversified enterprise sectors."
        canonicalPath="/journey"
      />

      <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
        {/* Breadcrumb Bar */}
        <div className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Our Journey' }]} />
          </div>
        </div>

        {/* Hero */}
        <section className="py-20 lg:py-24 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                <Calendar className="w-4 h-4 text-[#0284C7]" />
                <span>Institutional Timeline</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Our Corporate Journey
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                TISS Corporation has been actively conducting commercial activities in Bangladesh since 2017.
                Our evolving portfolio reflects a disciplined, step-by-step approach to establishing specialized
                businesses across critical enterprise and consumer sectors.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Sequence */}
        <section className="py-20 lg:py-24 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {timelineMilestones.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 sm:p-10 bg-white border border-slate-200 shadow-sm hover:border-[#0284C7] hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="px-3.5 py-1 bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-[#0284C7]">
                        {item.year}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        {item.title}
                      </h2>
                    </div>
                    <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                      {item.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mt-4 font-medium">
                    {item.description}
                  </p>

                  {item.details && item.details.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
                      {item.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing: The Next Chapter */}
        <section className="py-24 bg-slate-50/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
              Continuous Expansion
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
              The Next Chapter
            </h3>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
              Continued business growth at TISS Corporation emphasizes steady capability expansion,
              robust compliance standards, and deepened collaboration across corporate trade and service
              corridors. We build thoughtfully with long-term resilience and client trust as our guiding standards.
            </p>
            <div className="pt-4">
              <Link
                to="/businesses"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0284C7] hover:bg-[#0369A1] transition-colors shadow-sm"
              >
                <span>Explore the Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
