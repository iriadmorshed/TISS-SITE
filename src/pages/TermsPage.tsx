import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Terms of Use — TISS Corporation"
        description="Terms and conditions governing access to the TISS Co. Ltd. (TISS Corporation) corporate website."
        canonicalPath="/terms"
      />

      <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
        <div className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Terms of Use' }]} />
          </div>
        </div>

        <section className="py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="space-y-3 pb-6 border-b border-slate-200">
              <span className="text-xs uppercase font-mono font-bold text-[#0284C7]">
                Corporate Governance
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
                Terms of Use
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                TISS Co. Ltd. (TISS Corporation) · Website Terms & Conditions
              </p>
            </div>

            <div className="space-y-8 text-sm text-slate-600 leading-relaxed font-medium">
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or browsing the corporate website of TISS Co. Ltd. (TISS Corporation), you
                  agree to comply with these terms. If you do not agree with any portion of these conditions,
                  please discontinue use of this site.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900">
                  2. Corporate Information & Scope
                </h2>
                <p>
                  This website is provided for corporate informational, capability introduction, and business
                  coordination purposes. Information presented regarding operating entities and portfolio
                  services is maintained to reflect accurate commercial standing.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900">
                  3. Intellectual Property Rights
                </h2>
                <p>
                  All content, trademarks, brand names, and graphical emblems on this site are the intellectual
                  property of TISS Co. Ltd. (TISS Corporation) or its associated operating businesses.
                  Unauthorized duplication or commercial re-publication is strictly prohibited without prior
                  written authorization.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900">
                  4. Governance & Jurisdiction
                </h2>
                <p>
                  These terms are governed by the laws and statutory regulations of Bangladesh. For any
                  contractual inquiries or legal correspondence, contact our registered office in Uttara,
                  Dhaka-1230.
                </p>
              </section>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
