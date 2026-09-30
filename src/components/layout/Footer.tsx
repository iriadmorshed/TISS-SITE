import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Building2, Phone } from 'lucide-react';
import { businesses } from '../../data/businesses';
import { companyData } from '../../data/company';
import { TissLogo } from '../common/TissLogo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1522] text-slate-400 border-t border-slate-800 text-sm">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Col 1: Group Identity, Statement & Offices (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-flex items-center group">
              <TissLogo variant="dark" size="md" />
            </Link>

            <p className="text-xs uppercase tracking-[0.14em] text-[#38BDF8] font-bold">
              {companyData.brandStatement}
            </p>

            <p className="text-xs leading-relaxed text-slate-300 max-w-md">
              A diversified business group bringing together specialized businesses across technology,
              enterprise communication, logistics, advertising, advisory, travel, modern retail, and international trade.
            </p>

            {/* Direct Official Addresses & Contact Coordinates */}
            <div className="pt-4 text-xs text-slate-300 space-y-4 border-t border-slate-800/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                    Corporate Office
                  </span>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    House-59, 6th Floor, Road-13, Sector-13, Uttara, Dhaka-1230, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#B99A62] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                    Registered Office
                  </span>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    House-28, 6th Floor, 9 Ave., Sec-15D, Uttara, Dhaka-1230, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                    International Operations (5 Countries)
                  </span>
                  <p className="text-slate-200 text-xs leading-relaxed font-medium">
                    Hong Kong · Thailand · United Kingdom (UK) · China · India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                    Corporate Inquiries
                  </span>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono">
                    <a
                      href="mailto:info@tisscoltd.com"
                      className="text-slate-200 hover:text-[#38BDF8] transition-colors"
                    >
                      info@tisscoltd.com
                    </a>
                    <span className="text-slate-600">·</span>
                    <a
                      href="mailto:tisscorporation@gmail.com"
                      className="text-slate-200 hover:text-[#38BDF8] transition-colors"
                    >
                      tisscorporation@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Corporate Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-wider font-bold text-white">
              Corporate Overview
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About TISS Corporation
                </Link>
              </li>
              <li>
                <Link to="/businesses" className="hover:text-white transition-colors">
                  Portfolio Directory (10 Entities)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Group Capabilities
                </Link>
              </li>
              <li>
                <Link to="/global-presence" className="hover:text-white transition-colors">
                  Global Presence & Foundation
                </Link>
              </li>
              <li>
                <Link to="/journey" className="hover:text-white transition-colors">
                  Our Corporate Journey
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-white transition-colors">
                  Leadership & Governance
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Business Dialogue
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portfolio Businesses (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs uppercase tracking-wider font-bold text-white">
              Portfolio Businesses
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {businesses.map((biz) => (
                <Link
                  key={biz.id}
                  to={`/businesses/${biz.slug}`}
                  className="hover:text-white transition-colors truncate block py-0.5"
                >
                  {biz.shortName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lower Legal & Rights Ribbon */}
      <div className="border-t border-slate-800/80 bg-[#08101A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              <p>© {currentYear} TISS Co. Ltd. (TISS Corporation). All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-slate-200 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-slate-200 transition-colors">
                Terms of Use
              </Link>
              <span className="text-slate-600 hidden md:inline">|</span>
              <span className="text-[11px] text-slate-400 hidden md:inline font-mono">
                Uttara, Dhaka-1230, Bangladesh
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
