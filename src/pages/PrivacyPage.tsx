import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useCMS } from '../context/CMSContext';

export const PrivacyPage: React.FC = () => {
  const { cmsData } = useCMS();
  const narratives = cmsData.narratives;

  return (
    <>
      <SEO
        title="Privacy Policy — TISS Corporation"
        description="Privacy policy and data governance practices of TISS Co. Ltd. (TISS Corporation)."
        canonicalPath="/privacy"
      />

      <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
        <div className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
          </div>
        </div>

        <section className="py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="space-y-3 pb-6 border-b border-slate-200">
              <span className="text-xs uppercase font-mono font-bold text-[#0284C7]">
                Corporate Governance
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
                {narratives.privacyTitle || 'Privacy Policy'}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                TISS Co. Ltd. (TISS Corporation) · Corporate Data Stewardship Guidelines · Effective {narratives.privacyEffectiveDate || 'January 2024'}
              </p>
            </div>

            {narratives.privacyContent ? (
              <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                {narratives.privacyContent}
              </div>
            ) : (
              <div className="space-y-8 text-sm text-slate-600 leading-relaxed font-medium">
                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    1. Information We Collect
                  </h2>
                  <p>
                    When you interact with TISS Corporation via our official website, we may receive business
                    contact details submitted voluntarily through our inquiry forms, including full name,
                    organization, business email address, telephone contact, and the nature of your commercial inquiry.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    2. Purpose of Processing
                  </h2>
                  <p>
                    Information submitted through this portal is utilized exclusively to evaluate corporate
                    proposals, route inquiries to appropriate portfolio management teams, maintain professional
                    business communication, and coordinate contractual engagements.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    3. Information Security & Confidentiality
                  </h2>
                  <p>
                    We implement administrative, technical, and operational security safeguards to protect
                    corporate correspondence from unauthorized access or disclosure. We do not sell, rent,
                    or monetize commercial inquiry data with external commercial third parties.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    4. Direct Inquiries & Contact
                  </h2>
                  <p>
                    Questions regarding this privacy statement or corporate data handling should be directed
                    to our corporate office at{' '}
                    <a href="mailto:info@tisscoltd.com" className="text-[#0284C7] underline font-bold">
                      info@tisscoltd.com
                    </a>{' '}
                    or{' '}
                    <a href="mailto:tisscorporation@gmail.com" className="text-[#0284C7] underline font-bold">
                      tisscorporation@gmail.com
                    </a>
                    .
                  </p>
                </section>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
