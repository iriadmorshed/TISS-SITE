import React from 'react';
import { Mail, MapPin, Building, ShieldCheck, Globe, Clock } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ContactForm } from '../components/contact/ContactForm';
import { contactConfig } from '../data/contact';
import { useCMS } from '../context/CMSContext';

export const ContactPage: React.FC = () => {
  const { cmsData } = useCMS();
  const narratives = cmsData.narratives;

  return (
    <>
      <SEO
        title="Contact & Commercial Inquiries — TISS Corporation"
        description="Initiate a dialogue with TISS Co. Ltd. (TISS Corporation) for business partnerships, enterprise services, corporate relationships, or sector inquiries."
        canonicalPath="/contact"
      />

      <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
        {/* Breadcrumb Bar */}
        <div className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Contact & Inquiries' }]} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 sm:py-20 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                <span className="w-5 h-[2px] bg-[#0284C7]" />
                <span>{narratives.contactBadge || 'Corporate Dialogue'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
                {narratives.contactHeadline || 'Start a Conversation with TISS.'}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                {narratives.contactSubheadline ||
                  'Connect with TISS Corporation to discuss business opportunities, enterprise service requirements, strategic partnerships, and commercial collaboration across our operating businesses.'}
              </p>
            </div>
          </div>
        </section>

        {/* Two-Column Contact Layout */}
        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Coordinates & Verification Status (5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                    Corporate Secretariat
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Direct Corporate Coordination
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {narratives.contactResponseNotice || contactConfig.inquiryNotice}
                  </p>
                </div>

                {/* Verified Corporate Domicile & Addresses Box */}
                <div className="p-7 bg-white border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#0284C7] font-bold">
                      Official Corporate Coordinates
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 font-bold uppercase bg-emerald-50 px-2.5 py-0.5 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> Active Domicile
                    </span>
                  </div>

                  <div className="space-y-5 text-xs sm:text-sm text-slate-700">
                    <div className="flex items-start gap-3">
                      <Building className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900 font-bold">Entity:</strong>
                        <span className="text-slate-800">TISS Co. Ltd. (TISS Corporation)</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900 font-bold">Corporate Office:</strong>
                        <span className="text-slate-700 leading-relaxed block">
                          House-59, 6th Floor, Road-13, Sector-13, Uttara, Dhaka-1230, Bangladesh
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900 font-bold">Registered Office:</strong>
                        <span className="text-slate-700 leading-relaxed block">
                          House-28, 6th Floor, 9 Ave., Sec-15D, Uttara, Dhaka-1230, Bangladesh
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900 font-bold">Official Emails:</strong>
                        <div className="flex flex-col gap-1 font-mono text-xs mt-0.5">
                          <a
                            href="mailto:info@tisscoltd.com"
                            className="text-[#0284C7] hover:underline font-bold"
                          >
                            info@tisscoltd.com
                          </a>
                          <a
                            href="mailto:tisscorporation@gmail.com"
                            className="text-[#0284C7] hover:underline font-bold"
                          >
                            tisscorporation@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Globe className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900 font-bold">Web Presence:</strong>
                        <span className="text-slate-700 font-mono text-xs">
                          {contactConfig.officialWebsite}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inquiry Confidentiality Assurance */}
                <div className="p-6 bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
                    <span>Inquiry Confidentiality</span>
                  </div>
                  <p className="leading-relaxed font-medium">
                    All commercial proposals, partnership inquiries, and procurement requests submitted through
                    this portal are handled directly by our corporate secretariat under institutional non-disclosure standards.
                  </p>
                </div>
              </div>

              {/* Right Column: Inquiry Form (7 cols) */}
              <div className="lg:col-span-7 bg-white border border-slate-200 p-8 sm:p-10 shadow-sm">
                <div className="mb-8 pb-4 border-b border-slate-100">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Submit Corporate Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                    Please provide complete commercial contact details to ensure accurate routing to the appropriate sector team.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
