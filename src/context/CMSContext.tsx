import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteCMSData,
  TickerConfig,
  HeaderConfig,
  FooterConfig,
  HeroConfig,
  BDChapterConfig,
  PageContentNarrative,
  SEOConfig,
  CustomPage,
  SocialMediaLink,
  FooterLinkItem,
  AnimationConfig,
  ThemeConfig,
  SiteIdentityConfig,
  AdminUser,
  AdminLoginAudit,
} from '../types/cms';
import { defaultCMSData } from '../data/cmsDefaults';
import { TeamMember, Business, CountryPresence } from '../types';

const STORAGE_KEY = 'tiss_site_cms_data_v2';
const AUTH_KEY = 'tiss_admin_session_v2';
const USER_KEY = 'tiss_admin_active_user_v2';

interface CMSContextType {
  cmsData: SiteCMSData;
  isAdminLoggedIn: boolean;
  currentAdminUser: AdminUser | null;
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;
  updateAdminCredentials: (user: string, pass: string) => void;
  updateTicker: (data: Partial<TickerConfig>) => void;
  updateHeader: (data: Partial<HeaderConfig>) => void;
  updateFooter: (data: Partial<FooterConfig>) => void;
  updateSocialLinks: (links: SocialMediaLink[]) => void;
  updateFooterLinks: (links: FooterLinkItem[]) => void;
  updateAnimation: (data: Partial<AnimationConfig>) => void;
  updateTheme: (data: Partial<ThemeConfig>) => void;
  updateSiteIdentity: (data: Partial<SiteIdentityConfig>) => void;
  addAdminUser: (user: AdminUser) => void;
  updateAdminUser: (user: AdminUser) => void;
  deleteAdminUser: (id: string) => void;
  clearLoginAudits: () => void;
  publishChanges: () => void;
  updateHero: (data: Partial<HeroConfig>) => void;
  updateBDChapter: (data: Partial<BDChapterConfig>) => void;
  updateTeamMember: (member: TeamMember) => void;
  addTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  updateBusiness: (biz: Business) => void;
  addBusiness: (biz: Business) => void;
  deleteBusiness: (id: string) => void;
  updateCountry: (country: CountryPresence) => void;
  addCountry: (country: CountryPresence) => void;
  deleteCountry: (countryCode: string) => void;
  updateNarratives: (narratives: Partial<PageContentNarrative>) => void;
  addCustomPage: (page: CustomPage) => void;
  updateCustomPage: (page: CustomPage) => void;
  deleteCustomPage: (id: string) => void;
  updateSEO: (seo: Partial<SEOConfig>) => void;
  resetToDefaults: () => void;
  exportCMSJson: () => string;
  importCMSJson: (json: string) => { success: boolean; message: string };
  lastSavedAt: string | null;
}

const CMSContext = createContext<CMSContextType | null>(null);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cmsData, setCmsData] = useState<SiteCMSData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.version) {
          // Merge with defaults to ensure all required fields exist
          return {
            ...defaultCMSData,
            ...parsed,
            ticker: { ...defaultCMSData.ticker, ...(parsed.ticker || {}) },
            header: { ...defaultCMSData.header, ...(parsed.header || {}) },
            footer: {
              ...defaultCMSData.footer,
              ...(parsed.footer || {}),
              socialLinks: parsed.footer?.socialLinks || defaultCMSData.footer.socialLinks,
              navLinks: parsed.footer?.navLinks || defaultCMSData.footer.navLinks,
            },
            hero: { ...defaultCMSData.hero, ...(parsed.hero || {}) },
            bdChapter: { ...defaultCMSData.bdChapter, ...(parsed.bdChapter || {}) },
            narratives: { ...defaultCMSData.narratives, ...(parsed.narratives || {}) },
            customPages: parsed.customPages || defaultCMSData.customPages,
            seo: { ...defaultCMSData.seo, ...(parsed.seo || {}) },
            adminCredentials: { ...defaultCMSData.adminCredentials, ...(parsed.adminCredentials || {}) },
            animation: { ...defaultCMSData.animation, ...(parsed.animation || {}) },
            theme: { ...defaultCMSData.theme, ...(parsed.theme || {}) },
            siteIdentity: { ...defaultCMSData.siteIdentity, ...(parsed.siteIdentity || {}) },
            adminUsers: parsed.adminUsers?.length ? parsed.adminUsers : defaultCMSData.adminUsers,
            adminLoginAudits: parsed.adminLoginAudits?.length ? parsed.adminLoginAudits : defaultCMSData.adminLoginAudits,
          };
        }
      }
    } catch (e) {
      console.warn('Failed to parse CMS data from localStorage, using defaults', e);
    }
    return defaultCMSData;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(() => {
    try {
      const savedUser = sessionStorage.getItem(USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  // Auto-sync state changes to localStorage and update favicon
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cmsData));
      setLastSavedAt(new Date().toLocaleTimeString());

      // Dynamic Favicon Update
      if (cmsData.header.faviconUrl) {
        const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        if (link) {
          link.href = cmsData.header.faviconUrl;
        }
      }
    } catch (e) {
      console.error('Failed to save CMS data to localStorage', e);
    }
  }, [cmsData]);

  // Apply theme & animation styles live to document root
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const theme = cmsData.theme || defaultCMSData.theme;
    const animation = cmsData.animation || defaultCMSData.animation;

    // Theme CSS Variables
    root.style.setProperty('--color-primary', theme.primaryColor || '#0284C7');
    root.style.setProperty('--color-primary-hover', theme.primaryHoverColor || '#0369A1');
    root.style.setProperty('--color-accent', theme.accentColor || '#38BDF8');
    root.style.setProperty('--color-secondary', theme.secondaryColor || '#B99A62');
    root.style.setProperty('--bg-page', theme.pageBackground || '#F8FAFC');
    root.style.setProperty('--bg-card', theme.surfaceCardBackground || '#FFFFFF');
    root.style.setProperty('--bg-footer', theme.footerBackground || '#0B1522');
    root.style.setProperty('--text-heading', theme.textHeadingColor || '#0F172A');

    // Animation Attributes & Toggles
    root.setAttribute('data-animations', animation.enabled ? 'true' : 'false');
    root.setAttribute('data-entrance-fades', animation.entranceFades ? 'true' : 'false');
    root.setAttribute('data-scroll-reveals', animation.scrollReveals ? 'true' : 'false');
    root.setAttribute('data-hero-glow', animation.heroAmbientGlow ? 'true' : 'false');
    root.setAttribute('data-floating', animation.floatingBadges ? 'true' : 'false');
    root.setAttribute('data-ticker-pause', animation.tickerPauseOnHover ? 'true' : 'false');
    root.style.setProperty('--ticker-duration', `${animation.tickerSpeed || 45}s`);

    if (!animation.enabled) {
      root.classList.add('no-animations');
    } else {
      root.classList.remove('no-animations');
    }
  }, [cmsData.theme, cmsData.animation]);

  // Enhanced Admin Login with Multiple Roles and Audit Logging
  const loginAdmin = (username: string, password: string): boolean => {
    const userTrim = username.trim().toLowerCase();
    const passTrim = password.trim();

    // Check modern adminUsers list
    const usersList = cmsData.adminUsers?.length ? cmsData.adminUsers : defaultCMSData.adminUsers;
    const foundUser = usersList.find(
      (u) => u.username.toLowerCase() === userTrim && u.active
    );

    let isSuccess = false;
    let loggedUser: AdminUser | null = null;

    if (foundUser && foundUser.passwordHash === passTrim) {
      isSuccess = true;
      loggedUser = foundUser;
    } else {
      // Legacy fallback
      const creds = cmsData.adminCredentials;
      if (creds.username.toLowerCase() === userTrim && creds.passwordHash === passTrim) {
        isSuccess = true;
        loggedUser = {
          id: 'usr-legacy',
          username: creds.username,
          displayName: 'Corporate Super Admin',
          role: 'super_admin',
          passwordHash: creds.passwordHash,
          email: 'admin@tiss.com.bd',
          active: true,
          createdAt: new Date().toISOString(),
        };
      }
    }

    // Record login audit log entry
    const newAudit: AdminLoginAudit = {
      id: `audit-${Date.now()}`,
      username: username.trim(),
      displayName: loggedUser?.displayName || username.trim(),
      role: loggedUser?.role || 'super_admin',
      timestamp: new Date().toISOString(),
      deviceInfo: typeof navigator !== 'undefined'
        ? `${navigator.platform || 'Desktop'} · ${navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Browser'}`
        : 'Web Client',
      ipAddress: '103.145.118.24 (Uttara Hub)',
      success: isSuccess,
    };

    setCmsData((prev) => ({
      ...prev,
      adminLoginAudits: [newAudit, ...(prev.adminLoginAudits || [])].slice(0, 100),
      adminUsers: loggedUser
        ? (prev.adminUsers || []).map((u) =>
            u.id === loggedUser!.id ? { ...u, lastLogin: new Date().toISOString() } : u
          )
        : prev.adminUsers,
    }));

    if (isSuccess && loggedUser) {
      setCurrentAdminUser(loggedUser);
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      sessionStorage.setItem(USER_KEY, JSON.stringify(loggedUser));
      return true;
    }

    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setCurrentAdminUser(null);
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(USER_KEY);
  };

  const updateAdminCredentials = (user: string, pass: string) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      adminCredentials: {
        username: user.trim(),
        passwordHash: pass.trim(),
      },
    }));
  };

  // Update Animation Config
  const updateAnimation = (data: Partial<AnimationConfig>) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      animation: {
        ...(prev.animation || defaultCMSData.animation),
        ...data,
      },
    }));
  };

  // Update Theme Colors & Styling
  const updateTheme = (data: Partial<ThemeConfig>) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      theme: {
        ...(prev.theme || defaultCMSData.theme),
        ...data,
      },
    }));
  };

  // Update Site Identity & Logo text
  const updateSiteIdentity = (data: Partial<SiteIdentityConfig>) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      siteIdentity: {
        ...(prev.siteIdentity || defaultCMSData.siteIdentity),
        ...data,
      },
    }));
  };

  // Update Footer Dynamic Links
  const updateFooterLinks = (links: FooterLinkItem[]) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      footer: {
        ...prev.footer,
        navLinks: links,
      },
    }));
  };

  // Admin Users Management
  const addAdminUser = (user: AdminUser) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      adminUsers: [user, ...(prev.adminUsers || [])],
    }));
  };

  const updateAdminUser = (user: AdminUser) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      adminUsers: (prev.adminUsers || []).map((u) => (u.id === user.id ? user : u)),
    }));
  };

  const deleteAdminUser = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      adminUsers: (prev.adminUsers || []).filter((u) => u.id !== id),
    }));
  };

  // Clear Login Audits
  const clearLoginAudits = () => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      adminLoginAudits: [],
    }));
  };

  // Publish Changes explicitly
  const publishChanges = () => {
    const timestamp = new Date().toISOString();
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: timestamp,
      lastPublishedAt: timestamp,
    }));
  };

  // Update Ticker
  const updateTicker = (data: Partial<TickerConfig>) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      ticker: {
        ...prev.ticker,
        ...data,
      },
    }));
  };

  // Update Header
  const updateHeader = (data: Partial<HeaderConfig>) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      header: {
        ...prev.header,
        ...data,
      },
    }));
  };

  // Update Footer
  const updateFooter = (data: Partial<FooterConfig>) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      footer: {
        ...prev.footer,
        ...data,
      },
    }));
  };

  // Update Hero
  const updateHero = (data: Partial<HeroConfig>) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      hero: {
        ...prev.hero,
        ...data,
      },
    }));
  };

  // Update BD Chapter Stats
  const updateBDChapter = (data: Partial<BDChapterConfig>) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      bdChapter: {
        ...prev.bdChapter,
        ...data,
      },
    }));
  };

  // Team CRUD
  const updateTeamMember = (member: TeamMember) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      teamMembers: prev.teamMembers.map((m) => (m.id === member.id ? member : m)),
    }));
  };

  const addTeamMember = (member: TeamMember) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      teamMembers: [member, ...prev.teamMembers],
    }));
  };

  const deleteTeamMember = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      teamMembers: prev.teamMembers.filter((m) => m.id !== id),
    }));
  };

  // Business CRUD
  const updateBusiness = (biz: Business) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      businesses: prev.businesses.map((b) => (b.id === biz.id ? biz : b)),
    }));
  };

  const addBusiness = (biz: Business) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      businesses: [...prev.businesses, biz],
    }));
  };

  const deleteBusiness = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      businesses: prev.businesses.filter((b) => b.id !== id),
    }));
  };

  // Country CRUD
  const updateCountry = (country: CountryPresence) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      countries: prev.countries.map((c) =>
        c.countryCode === country.countryCode ? country : c
      ),
    }));
  };

  const addCountry = (country: CountryPresence) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      countries: [...prev.countries, country],
    }));
  };

  const deleteCountry = (countryCode: string) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      countries: prev.countries.filter((c) => c.countryCode !== countryCode),
    }));
  };

  // Narratives
  const updateNarratives = (narratives: Partial<PageContentNarrative>) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      narratives: {
        ...prev.narratives,
        ...narratives,
      },
    }));
  };

  // SEO
  const updateSEO = (seo: Partial<SEOConfig>) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      seo: {
        ...prev.seo,
        ...seo,
      },
    }));
  };

  // Social Links
  const updateSocialLinks = (links: SocialMediaLink[]) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      footer: {
        ...prev.footer,
        socialLinks: links,
      },
    }));
  };

  // Custom Pages CRUD
  const addCustomPage = (page: CustomPage) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      customPages: [...(prev.customPages || []), page],
    }));
  };

  const updateCustomPage = (page: CustomPage) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      customPages: (prev.customPages || []).map((p) => (p.id === page.id ? page : p)),
    }));
  };

  const deleteCustomPage = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      customPages: (prev.customPages || []).filter((p) => p.id !== id),
    }));
  };

  // Factory Reset
  const resetToDefaults = () => {
    setCmsData({
      ...defaultCMSData,
      lastUpdated: new Date().toISOString(),
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  // Export JSON
  const exportCMSJson = () => {
    return JSON.stringify(cmsData, null, 2);
  };

  // Import JSON
  const importCMSJson = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, message: 'Invalid JSON format' };
      }
      setCmsData({
        ...defaultCMSData,
        ...parsed,
        lastUpdated: new Date().toISOString(),
      });
      return { success: true, message: 'CMS data imported successfully' };
    } catch (e: any) {
      return { success: false, message: e.message || 'JSON parsing error' };
    }
  };

  return (
    <CMSContext.Provider
      value={{
        cmsData,
        isAdminLoggedIn,
        currentAdminUser,
        loginAdmin,
        logoutAdmin,
        updateAdminCredentials,
        updateTicker,
        updateHeader,
        updateFooter,
        updateSocialLinks,
        updateFooterLinks,
        updateAnimation,
        updateTheme,
        updateSiteIdentity,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,
        clearLoginAudits,
        publishChanges,
        updateHero,
        updateBDChapter,
        updateTeamMember,
        addTeamMember,
        deleteTeamMember,
        updateBusiness,
        addBusiness,
        deleteBusiness,
        updateCountry,
        addCountry,
        deleteCountry,
        updateNarratives,
        addCustomPage,
        updateCustomPage,
        deleteCustomPage,
        updateSEO,
        resetToDefaults,
        exportCMSJson,
        importCMSJson,
        lastSavedAt,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
