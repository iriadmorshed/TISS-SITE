import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useCMS } from '../context/CMSContext';
import { FileText, ArrowRight, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { NotFoundPage } from './NotFoundPage';

export const CustomPageView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { cmsData } = useCMS();

  const page = (cmsData.customPages || []).find(
    (p) => p.slug.toLowerCase() === slug?.toLowerCase()
  );

  if (!page || !page.published) {
    return <NotFoundPage />;
  }

  return (
    <>
      <SEO
        title={page.seoTitle || `${page.title} — TISS Co. Ltd.`}
        description={page.seoDescription || page.heroSubheadline}
        canonicalPath={`/pages/${page.slug}`}
      />

      <div className="bg-[#F8FAFC]">
        {/* Breadcrumb strip */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumbs
              items={[
                { label: 'Home', path: '/' },
                { label: page.title, path: `/pages/${page.slug}` },
              ]}
            />
          </div>
        </div>

        {/* Hero Banner Section */}
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100/80 py-16 sm:py-20 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            {page.badgeText && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-sky-200 text-xs font-bold text-[#0284C7] shadow-2xs font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>{page.badgeText}</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {page.heroHeadline || page.title}
            </h1>

            {page.heroSubheadline && (
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
                {page.heroSubheadline}
              </p>
            )}
          </div>
        </section>

        {/* Main Content Body */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-xs space-y-6">
              {/* Parse Markdown-like headings, bolding, lists, and paragraphs */}
              <div className="prose prose-slate max-w-none space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                {page.content.split('\n\n').map((block, idx) => {
                  const trimmed = block.trim();
                  if (!trimmed) return null;

                  if (trimmed.startsWith('### ')) {
                    return (
                      <h3
                        key={idx}
                        className="text-xl sm:text-2xl font-black text-slate-900 pt-4 pb-1 border-b border-slate-100 tracking-tight"
                      >
                        {trimmed.replace('### ', '')}
                      </h3>
                    );
                  }

                  if (trimmed.startsWith('#### ')) {
                    return (
                      <h4
                        key={idx}
                        className="text-base sm:text-lg font-bold text-slate-900 pt-3 text-[#0284C7]"
                      >
                        {trimmed.replace('#### ', '')}
                      </h4>
                    );
                  }

                  if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                    const items = trimmed.split('\n');
                    return (
                      <ul key={idx} className="space-y-2 pl-2">
                        {items.map((it, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-1" />
                            <span>{it.replace(/^[-*]\s+/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={idx} className="leading-relaxed">
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              {/* Bottom CTA block */}
              <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-xl mt-8">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Have questions about this initiative?</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Connect directly with our Corporate Secretariat & Coordination Office.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-2 shrink-0 shadow-sm"
                >
                  <span>Contact Directorate</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
