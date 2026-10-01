import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Building2,
  Phone,
  Shield,
  Lock,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  MessageCircle,
  Github,
  Globe,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { TissLogo } from '../common/TissLogo';

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'linkedin':
      return <Linkedin className="w-4 h-4" />;
    case 'facebook':
      return <Facebook className="w-4 h-4" />;
    case 'twitter':
      return <Twitter className="w-4 h-4" />;
    case 'youtube':
      return <Youtube className="w-4 h-4" />;
    case 'instagram':
      return <Instagram className="w-4 h-4" />;
    case 'whatsapp':
      return <MessageCircle className="w-4 h-4" />;
    case 'github':
      return <Github className="w-4 h-4" />;
    default:
      return <Globe className="w-4 h-4" />;
  }
};

export const Footer: React.FC = () => {
  const { cmsData } = useCMS();
  const currentYear = new Date().getFullYear();
  const { footer, businesses, customPages } = cmsData;

  return (
    <footer className="bg-[#0B1522] text-slate-400 border-t border-slate-800 text-sm">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Col 1: Group Identity, Statement & Offices (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-flex items-center group">
              <TissLogo variant="dark" size="md" customLogoUrl={footer.customLogoUrl || cmsData.header.customLogoUrl} />
            </Link>

            <p className="text-xs uppercase tracking-[0.14em] text-[#38BDF8] font-bold">
              {footer.brandStatement}
            </p>

            <p className="text-xs leading-relaxed text-slate-300 max-w-md">
              {footer.aboutText}
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
                    {footer.corporateOffice}
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
                    {footer.registeredOffice}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                    International Operations (Autonomous Chapters)
                  </span>
                  <p className="text-slate-200 text-xs leading-relaxed font-medium">
                    {footer.internationalSummary}
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
                      href={`mailto:${footer.primaryEmail}`}
                      className="text-slate-200 hover:text-[#38BDF8] transition-colors"
                    >
                      {footer.primaryEmail}
                    </a>
                    {footer.secondaryEmail && (
                      <>
                        <span className="text-slate-600">·</span>
                        <a
                          href={`mailto:${footer.secondaryEmail}`}
                          className="text-slate-200 hover:text-[#38BDF8] transition-colors"
                        >
                          {footer.secondaryEmail}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Corporate Social Media Buttons */}
            {footer.socialLinks && footer.socialLinks.filter((s) => s.enabled).length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold mb-2">
                  Official Channels & Networks
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {footer.socialLinks
                    .filter((s) => s.enabled)
                    .map((s) => (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-900/90 hover:bg-[#0284C7] text-slate-300 hover:text-white rounded-lg transition-all border border-slate-800 hover:border-sky-400 flex items-center gap-1.5 shadow-xs"
                        title={s.label}
                        aria-label={s.label}
                      >
                        {getSocialIcon(s.platform)}
                        <span className="text-[11px] font-bold hidden sm:inline">{s.label}</span>
                      </a>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Col 2: Corporate Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-wider font-bold text-white">
              Corporate Overview
            </p>
            <ul className="space-y-2.5 text-xs">
              {(footer.navLinks
                ? footer.navLinks.filter((l) => l.enabled && l.group !== 'legal')
                : [
                    { id: '1', label: 'About TISS Corporation', path: '/about' },
                    { id: '2', label: 'Portfolio Directory (10 Entities)', path: '/businesses' },
                    { id: '3', label: 'Group Capabilities', path: '/services' },
                    { id: '4', label: 'Global Presence & Foundation', path: '/global-presence' },
                    { id: '5', label: 'Our Corporate Journey', path: '/journey' },
                    { id: '6', label: 'Leadership & Governance', path: '/team' },
                    { id: '7', label: 'Contact & Business Dialogue', path: '/contact' },
                  ]
              ).map((link) => (
                <li key={link.id}>
                  <Link to={link.path} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* Dynamic Custom Pages in Footer */}
              {customPages &&
                customPages
                  .filter((p) => p.published && p.showInFooter)
                  .map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/pages/${p.slug}`}
                        className="text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1"
                      >
                        <span>{p.title}</span>
                      </Link>
                    </li>
                  ))}
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
              <p>© {currentYear} {footer.copyrightText}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {(footer.navLinks
                ? footer.navLinks.filter((l) => l.enabled && l.group === 'legal')
                : [
                    { id: 'l1', label: 'Privacy Policy', path: '/privacy' },
                    { id: 'l2', label: 'Terms of Use', path: '/terms' },
                  ]
              ).map((link) => (
                <Link key={link.id} to={link.path} className="hover:text-slate-200 transition-colors">
                  {link.label}
                </Link>
              ))}
              <span className="text-slate-700 hidden md:inline">·</span>
              <Link
                to="/admin"
                aria-label="Admin Portal"
                title="Admin Portal"
                className="text-slate-700 hover:text-slate-400 transition-colors p-1"
              >
                <Lock className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
