import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Award, Briefcase, Mail, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const TeamPage: React.FC = () => {
  const leadershipCommittees = [
    {
      title: 'Executive Management & Board of Directors',
      description:
        'Provides overarching group strategy, capital allocation, institutional governance, and cross-border commercial development across all portfolio enterprises.',
      scope: 'Group Governance · Strategic Investment · Risk Oversight',
      leadRole: 'Office of the Managing Board',
    },
    {
      title: 'Technology & Digital Infrastructure Council',
      description:
        'Leads bespoke software engineering, enterprise cloud architectures, ERP implementations, and automated systems through Parameter-X Ltd.',
      scope: 'Software Engineering · Cloud Systems · Digital Transformation',
      leadRole: 'Technology Sector Directorate',
    },
    {
      title: 'BPO & Omnichannel Customer Experience Hub',
      description:
        'Guides high-volume inbound helpdesks, dedicated representative operations, and structured commercial outreach through Qubely ConnectPoint.',
      scope: 'Omnichannel CX · Inbound/Outbound Workflows · Quality Assurance',
      leadRole: 'Customer Experience Operations',
    },
    {
      title: 'Retail & Supermarket Operations Directorate',
      description:
        'Manages store outfitting, direct vendor procurement contracts, farm-to-shelf logistics, and customer retail experience for Qubely Mega Mart Ltd.',
      scope: 'Retail Expansion · Vendor Procurement · Store Operations',
      leadRole: 'Consumer Retail Management',
    },
    {
      title: 'Logistics, Supply Chain & Global Trade Directorate',
      description:
        'Coordinates freight forwarding, warehousing, parcel delivery networks, and international trade commodities through Qubely CargoLink and TGB Global Trading.',
      scope: 'Freight Logistics · Jute Trade · Cross-Border Transit',
      leadRole: 'Supply Chain & Trade Directorate',
    },
    {
      title: 'Media, Communications & Brand Solutions Group',
      description:
        'Drives premium elevator media branding, ambient advertising networks, and digital brand management through Huixin Global Ltd. and Qubely AdWings.',
      scope: 'Elevator Media Networks · Ambient Advertising · Creative Strategy',
      leadRole: 'Media & Brand Strategy',
    },
  ];

  const governancePillars = [
    {
      number: '01',
      title: 'Corporate Stewardship & Integrity',
      description:
        'Every portfolio business adheres to rigorous corporate compliance, statutory regulations, and transparent financial stewardship.',
    },
    {
      number: '02',
      title: 'Autonomous Sector Agility',
      description:
        'Operational teams maintain domain specialization and decision-making independence to serve client requirements with rapid execution.',
    },
    {
      number: '03',
      title: 'Enduring Partnerships',
      description:
        'We value long-term institutional relationships with clients, suppliers, and regulatory bodies over short-term transactional models.',
    },
  ];

  return (
    <>
      <SEO
        title="Leadership & Corporate Governance — TISS Corporation"
        description="Learn about the executive governance structure, sector operations councils, and corporate stewardship guiding TISS Co. Ltd. (TISS Corporation)."
        canonicalPath="/team"
      />

      <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
        {/* Breadcrumb Bar */}
        <div className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Leadership & Governance' }]} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 lg:py-24 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                <Shield className="w-4 h-4 text-[#0284C7]" />
                <span>Governance & Stewardship</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Corporate Governance & Leadership Structure
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                TISS Corporation is steered by a dedicated executive framework that balances strategic group
                oversight with autonomous sector leadership across technology, BPO, logistics, retail,
                media, and international commerce.
              </p>
            </div>
          </div>
        </section>

        {/* Governance Principles */}
        <section className="py-20 bg-slate-50/70 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                Operating Foundations
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Executive Governance Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {governancePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-white border border-slate-200 shadow-sm hover:border-[#0284C7] transition-all space-y-3"
                >
                  <span className="text-xs font-mono text-[#0284C7] font-bold">
                    {pillar.number}.
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Councils & Sector Leadership */}
        <section className="py-20 lg:py-24 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                Organizational Structure
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                Sector Operational Councils
              </h2>
              <p className="text-sm text-slate-600 mt-2 font-medium">
                Each core commercial sector within TISS Corporation is anchored by dedicated domain leadership
                ensuring specialized service delivery, technological innovation, and client satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipCommittees.map((committee, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-white border border-slate-200 shadow-sm hover:border-[#0284C7] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#0284C7] bg-sky-50 px-2.5 py-1 border border-sky-200">
                        {committee.leadRole}
                      </span>
                      <Award className="w-4 h-4 text-slate-400" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">
                      {committee.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {committee.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
                      Focus Area
                    </span>
                    <p className="text-xs font-semibold text-slate-800">
                      {committee.scope}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Direct Executive Engagement Contact Box */}
        <section className="py-20 bg-slate-50/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 bg-white border border-slate-200 shadow-md space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#0284C7] font-bold">
                  Executive Dialogue
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Connect with the Leadership Office
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  For institutional partnerships, strategic joint ventures, executive coordination, or corporate
                  inquiries, our leadership team welcomes direct correspondence.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
                <div className="p-4 bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                    Corporate Office
                  </span>
                  <p className="text-slate-900 font-semibold">
                    House-59, 6th Floor, Road-13, Sector-13, Uttara, Dhaka-1230
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                    Executive Inquiries
                  </span>
                  <div className="flex flex-col gap-0.5 font-mono text-xs">
                    <a href="mailto:info@tisscoltd.com" className="text-[#0284C7] font-bold hover:underline">
                      info@tisscoltd.com
                    </a>
                    <a href="mailto:tisscorporation@gmail.com" className="text-[#0284C7] font-bold hover:underline">
                      tisscorporation@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-[#0284C7] transition-colors shadow-sm"
                >
                  <span>Submit Corporate Inquiry</span>
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
