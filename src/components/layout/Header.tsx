import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { TickerBar } from './TickerBar';
import { TissLogo } from '../common/TissLogo';

export const Header: React.FC = () => {
  const { cmsData } = useCMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [businessesDropdownOpen, setBusinessesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setBusinessesDropdownOpen(false);
  }, [location.pathname]);

  // Track scroll for subtle border contrast enhancement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click for businesses dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setBusinessesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setBusinessesDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const customNavLinks = (cmsData.customPages || [])
    .filter((p) => p.published && p.showInHeaderNav)
    .map((p) => ({
      id: p.id,
      label: p.title,
      path: `/pages/${p.slug}`,
      enabled: true,
      hasDropdown: false,
    }));

  const navLinks = [
    ...cmsData.header.navLinks.filter((item) => item.enabled),
    ...customNavLinks,
  ];
  const businesses = cmsData.businesses;

  return (
    <header className="sticky top-0 z-50 transition-all duration-200">
      {/* ANIMATED TICKER ANNOUNCEMENT BAR */}
      <TickerBar />

      {/* MAIN NAVIGATION BAR */}
      <div
        className={`${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* ZONE 1: Brand Wordmark with Precision Emblem */}
            <Link
              to="/"
              className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              aria-label="TISS Co. Ltd. Home"
            >
              <TissLogo size="md" customLogoUrl={cmsData.header.customLogoUrl} />
            </Link>

          {/* ZONE 2: Clean Text Navigation Links (Desktop) */}
          <nav
            className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600"
            aria-label="Primary Navigation"
          >
            {navLinks.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);

              if (item.hasDropdown) {
                return (
                  <div key={item.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setBusinessesDropdownOpen(!businessesDropdownOpen)}
                      onMouseEnter={() => setBusinessesDropdownOpen(true)}
                      className={`inline-flex items-center gap-1.5 py-2 transition-colors hover:text-[#0284C7] focus:outline-none focus:text-[#0284C7] ${
                        isActive ? 'text-[#0284C7] font-bold' : 'text-slate-700'
                      }`}
                      aria-expanded={businessesDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          businessesDropdownOpen ? 'rotate-180 text-[#0284C7]' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Refined Mega-Menu Dropdown */}
                    {businessesDropdownOpen && (
                      <div
                        onMouseLeave={() => setBusinessesDropdownOpen(false)}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[560px] bg-white border border-slate-200 p-5 shadow-2xl z-50 grid grid-cols-2 gap-3"
                      >
                        <div className="col-span-2 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                          <span className="text-xs uppercase tracking-wider font-bold text-slate-500">
                            10 Portfolio Businesses
                          </span>
                          <Link
                            to="/businesses"
                            onClick={() => setBusinessesDropdownOpen(false)}
                            className="text-xs font-semibold text-[#0284C7] hover:underline flex items-center gap-1"
                          >
                            Full Directory <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>
                        {businesses.map((biz) => (
                          <Link
                            key={biz.id}
                            to={`/businesses/${biz.slug}`}
                            onClick={() => setBusinessesDropdownOpen(false)}
                            className="group/item p-2.5 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                          >
                            <div className="flex items-baseline justify-between">
                              <span className="text-xs font-bold text-slate-900 group-hover/item:text-[#0284C7] transition-colors truncate">
                                {biz.shortName}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono uppercase font-semibold">
                                {biz.sectorCode}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {biz.headline}
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`relative py-2 transition-colors hover:text-[#0284C7] ${
                    isActive ? 'text-[#0284C7] font-bold' : 'text-slate-700'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0284C7]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ZONE 3: Primary Action Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to={cmsData.header.ctaLink || '/contact'}
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-[#0284C7] transition-colors duration-200 shadow-sm"
            >
              {cmsData.header.ctaText || 'Contact Us'}
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden gap-3">
            <Link
              to={cmsData.header.ctaLink || '/contact'}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#0284C7] transition-colors"
            >
              {cmsData.header.ctaText || 'Contact Us'}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0284C7] hover:bg-slate-100 rounded-none focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-40 bg-white/98 backdrop-blur-md lg:hidden flex flex-col justify-between overflow-y-auto border-t border-slate-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="px-6 py-8 space-y-6">
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-[#0284C7] font-bold">
                Menu
              </span>
              <nav className="flex flex-col space-y-3">
                <Link
                  to="/"
                  className="text-lg font-bold text-slate-900 hover:text-[#0284C7] py-1 border-b border-slate-100"
                >
                  Home
                </Link>
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="text-lg font-bold text-slate-900 hover:text-[#0284C7] py-1 border-b border-slate-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Quick Portfolio Selector in Mobile Drawer */}
            <div className="pt-4">
              <p className="text-xs uppercase font-mono tracking-widest text-slate-500 font-bold mb-3">
                Portfolio Businesses
              </p>
              <div className="grid grid-cols-1 gap-2">
                {businesses.map((biz) => (
                  <Link
                    key={biz.id}
                    to={`/businesses/${biz.slug}`}
                    className="flex items-center justify-between py-1.5 text-sm text-slate-700 hover:text-[#0284C7]"
                  >
                    <span className="font-semibold">{biz.name}</span>
                    <span className="text-xs font-mono text-slate-500">{biz.sectorCode}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 bg-slate-50">
            <Link
              to={cmsData.header.ctaLink || '/contact'}
              className="w-full flex items-center justify-center py-3 text-sm font-bold tracking-wider uppercase text-white bg-[#0284C7] hover:bg-[#0369A1] transition-colors"
            >
              {cmsData.header.ctaText || 'Contact Us'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
