import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Award, Shield, CheckCircle2 } from 'lucide-react';
import { companyData } from '../../data/company';

export const CorporateStory: React.FC = () => {
  return (
    <section className="bg-slate-50/70 py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
              <span className="w-5 h-[2px] bg-[#0284C7]" />
              <span>Corporate Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Built on Experience. <br />
              Oriented Toward Opportunity.
            </h2>

            <p className="text-base text-slate-700 leading-relaxed font-medium">
              TISS Co. Ltd. (TISS Corporation) has a company formation background across five countries
              and has been actively conducting business in Bangladesh since 2017. Our portfolio reflects a
              disciplined approach to nurturing specialized enterprises across multiple key sectors.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Rather than centralizing all activities under a rigid monolithic framework, the group
              empowers autonomous operational units. Each business possesses dedicated sector
              capabilities, modern infrastructure, and agile leadership, backed by the parent company’s
              corporate governance and long-term capital stability.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0284C7] hover:bg-[#0369A1] px-6 py-3.5 transition-colors shadow-sm"
              >
                <span>Read Full Corporate Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 bg-white border border-slate-200 shadow-md space-y-8 relative">
              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0284C7] font-bold">
                  Corporate Architecture
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {companyData.secondaryExpression}
                </h3>
              </div>

              <div className="space-y-4 text-xs text-slate-600 divide-y divide-slate-100">
                <div className="pt-4 first:pt-0 flex items-start gap-3.5">
                  <div className="p-2 bg-sky-50 text-[#0284C7] shrink-0 mt-0.5">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-0.5 font-bold">International Outlook</strong>
                    <span className="leading-relaxed">
                      Company formation background across 5 jurisdictions provides wide perspective on
                      cross-border trade, commercial partnerships, and compliance standards.
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex items-start gap-3.5">
                  <div className="p-2 bg-purple-50 text-purple-600 shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-0.5 font-bold">Dedicated Sector Specialization</strong>
                    <span className="leading-relaxed">
                      10 specialized entities with dedicated operating expertise, from enterprise software
                      and nationwide logistics to ambient advertising and modern retail.
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex items-start gap-3.5">
                  <div className="p-2 bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-0.5 font-bold">Institutional Reliability</strong>
                    <span className="leading-relaxed">
                      Built around operational integrity, transparent business practices, and enduring
                      commercial relationships that stand the test of time.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
