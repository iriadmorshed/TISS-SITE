import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  LogOut,
  Sparkles,
  Megaphone,
  Building2,
  Users,
  Briefcase,
  Globe2,
  Layout,
  FileText,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  Eye,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  X,
  Save,
  Search,
  Check,
  Crop,
  Smartphone,
  Monitor,
  Globe,
  Linkedin,
  Twitter,
  Mail,
  Image as ImageIcon,
  FilePlus,
  Share2,
  Play,
  Pause,
  Palette,
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { SEO } from '../components/common/SEO';
import { TeamMember, Business, CountryPresence } from '../types';
import {
  TickerItemConfig,
  TickerIconType,
  CustomPage,
  SocialMediaLink,
  FooterLinkItem,
} from '../types/cms';
import { ImageCropperModal } from '../components/admin/ImageCropperModal';
import { AdminSidebar, AdminTab } from '../components/admin/AdminSidebar';
import { AnimationSettingsTab } from '../components/admin/AnimationSettingsTab';
import { ThemeSettingsTab } from '../components/admin/ThemeSettingsTab';
import { IdentitySettingsTab } from '../components/admin/IdentitySettingsTab';
import { AdminUsersTab } from '../components/admin/AdminUsersTab';
import { AuditLogsTab } from '../components/admin/AuditLogsTab';

export const AdminPage: React.FC = () => {
  const {
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
  } = useCMS();

  // Tab State
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Sidebar Layout State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tiss_admin_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const toggleSidebar = (val: boolean) => {
    setIsSidebarCollapsed(val);
    try {
      localStorage.setItem('tiss_admin_sidebar_collapsed', val ? 'true' : 'false');
    } catch {}
  };

  const handleGlobalPublish = () => {
    setIsPublishing(true);
    publishChanges();
    showNotification('✓ All site updates published live to production');
    setTimeout(() => setIsPublishing(false), 1200);
  };

  // Footer Dynamic Links Modal State
  const [editingFooterLink, setEditingFooterLink] = useState<FooterLinkItem | null>(null);
  const [isNewFooterLinkModal, setIsNewFooterLinkModal] = useState(false);

  // Cropper Modal State
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperSrc, setCropperSrc] = useState<string | null>(null);
  const [cropperTarget, setCropperTarget] = useState<'team' | 'headerLogo' | 'footerLogo' | 'ogImage'>('team');

  // SEO Tab specific state
  const [selectedSeoRoute, setSelectedSeoRoute] = useState<string>('/');
  const [serpPreviewMode, setSerpPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Custom Pages State
  const [editingCustomPage, setEditingCustomPage] = useState<CustomPage | null>(null);
  const [isNewCustomPageModal, setIsNewCustomPageModal] = useState(false);

  // Social Links State (Footer)
  const [editingSocialLink, setEditingSocialLink] = useState<SocialMediaLink | null>(null);
  const [isNewSocialLinkModal, setIsNewSocialLinkModal] = useState(false);

  // Narrative Page Selector State
  const [selectedNarrativePage, setSelectedNarrativePage] = useState<
    'about' | 'services' | 'global' | 'journey' | 'team' | 'contact' | 'privacy' | 'terms'
  >('about');

  // Login Form State
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Toast / notification
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Editing Modals / Forms State
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isNewMemberModal, setIsNewMemberModal] = useState(false);

  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [isNewBusinessModal, setIsNewBusinessModal] = useState(false);

  const [editingCountry, setEditingCountry] = useState<CountryPresence | null>(null);
  const [isNewCountryModal, setIsNewCountryModal] = useState(false);

  const [editingTickerItem, setEditingTickerItem] = useState<TickerItemConfig | null>(null);
  const [isNewTickerModal, setIsNewTickerModal] = useState(false);

  // Backup / Import State
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');

  // Security Credentials state
  const [newAdminUser, setNewAdminUser] = useState(cmsData.adminCredentials.username);
  const [newAdminPass, setNewAdminPass] = useState('');

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginAdmin(loginUser, loginPass);
    if (!success) {
      setLoginError('Invalid Administrator ID or Password. Please verify and try again.');
    } else {
      showNotification('Administrator authenticated successfully');
    }
  };

  // Image Upload Handler
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'team' | 'headerLogo' | 'footerLogo' | 'favicon' | 'ogImage'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, SVG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) return;

      if (target === 'favicon') {
        updateHeader({ faviconUrl: result });
        const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        if (link) link.href = result;
        showNotification('Favicon updated live in browser');
      } else if (target === 'headerLogo') {
        updateHeader({ customLogoUrl: result });
        showNotification('Main Header Logo updated live');
      } else if (target === 'footerLogo') {
        updateFooter({ customLogoUrl: result });
        showNotification('Dedicated Footer Logo updated live');
      } else if (target === 'ogImage') {
        updateSEO({ ogImageUrl: result });
        showNotification('OpenGraph Social Share Card Image updated');
      } else if (target === 'team') {
        // Open Cropper Modal for Team Member
        setCropperSrc(result);
        setCropperTarget('team');
        setCropperOpen(true);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Crop Complete Callback
  const handleCropComplete = (croppedDataUrl: string) => {
    if (cropperTarget === 'team' && editingMember) {
      setEditingMember({
        ...editingMember,
        imageUrl: croppedDataUrl,
      });
      showNotification('Photo standardized to 400x400 and attached to member');
    } else if (cropperTarget === 'headerLogo') {
      updateHeader({ customLogoUrl: croppedDataUrl });
      showNotification('Header logo updated');
    } else if (cropperTarget === 'footerLogo') {
      updateFooter({ customLogoUrl: croppedDataUrl });
      showNotification('Footer logo updated');
    } else if (cropperTarget === 'ogImage') {
      updateSEO({ ogImageUrl: croppedDataUrl });
      showNotification('OpenGraph image updated');
    }
  };

  // -------------------------------------------------------------
  // IF NOT LOGGED IN -> RENDER LOGIN FORM
  // -------------------------------------------------------------
  if (!isAdminLoggedIn) {
    return (
      <>
        <SEO
          title="Administrator Portal — TISS Corporation"
          description="Authorized administrative access to manage site content, ticker, corporate data, and leadership directories."
          canonicalPath="/admin"
        />

        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
            <div className="text-center space-y-3 mb-8">
              <div className="w-14 h-14 bg-[#0284C7]/20 border border-[#0284C7]/40 rounded-2xl flex items-center justify-center mx-auto text-[#38BDF8]">
                <Shield className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white">
                  {cmsData.siteIdentity?.adminPortalTitle || 'TISS Corporation'}
                </h1>
                <p className="text-xs uppercase font-mono tracking-widest text-[#38BDF8] font-bold mt-1">
                  {cmsData.siteIdentity?.adminPortalSubtitle || 'Management Portal'}
                </p>
              </div>
              <p className="text-xs text-slate-400">
                {cmsData.siteIdentity?.adminPortalNotice ||
                  'Enter your administrative credentials to manage corporate pages, ticker, team, and portfolio data.'}
              </p>
            </div>

            {loginError && (
              <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-1.5">
                  Admin ID / Username
                </label>
                <input
                  type="text"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  placeholder="Enter administrator ID"
                  required
                  className="w-full px-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition-all font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <Lock className="w-4 h-4" />
                <span>Secure Sign In</span>
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>← Return to Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // -------------------------------------------------------------
  // IF LOGGED IN -> RENDER FULL CMS DASHBOARD
  // -------------------------------------------------------------
  const tabsList = [
    { id: 'overview', label: 'Dashboard', icon: <Layout className="w-4 h-4" /> },
    { id: 'ticker', label: 'Ticker & Marquee', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'header', label: 'Header & Nav', icon: <Sliders className="w-4 h-4" /> },
    { id: 'footer', label: 'Footer & Addresses', icon: <Building2 className="w-4 h-4" /> },
    { id: 'hero', label: 'Homepage Hero & Stats', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'team', label: 'Team & BD Chapter', icon: <Users className="w-4 h-4" /> },
    { id: 'businesses', label: '10 Portfolio Entities', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'global', label: '6 Global Chapters', icon: <Globe2 className="w-4 h-4" /> },
    { id: 'narratives', label: 'Single Page Editor', icon: <FileText className="w-4 h-4" /> },
    { id: 'pages', label: 'Custom Pages Studio', icon: <FilePlus className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO & SERP Studio', icon: <Search className="w-4 h-4" /> },
    { id: 'security', label: 'Backup & Security', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <>
      <SEO
        title="Admin Content Management Dashboard — TISS Corporation"
        description="Comprehensive category-wise dynamic site administration panel."
        canonicalPath="/admin"
      />

      {/* Collapsible Persistent Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={toggleSidebar}
        searchQuery={sidebarSearch}
        setSearchQuery={setSidebarSearch}
        onPublishLive={handleGlobalPublish}
        isPublishing={isPublishing}
      />

      {/* Main Content Area (Offset by Sidebar Width) */}
      <div
        className={`min-h-screen bg-[#F1F5F9] text-slate-900 pb-24 transition-all duration-300 ${
          isSidebarCollapsed ? 'md:pl-20' : 'md:pl-72'
        }`}
      >
        {/* Top Management Header */}
        <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleSidebar(!isSidebarCollapsed)}
                className="md:hidden p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                aria-label="Toggle Menu"
              >
                <Sliders className="w-4 h-4" />
              </button>

              <div className="w-9 h-9 bg-[#0284C7] rounded-xl flex items-center justify-center font-black text-white text-base tracking-wider shadow-xs">
                {cmsData.siteIdentity?.logoName?.[0] || 'T'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-black tracking-tight text-white">
                    {cmsData.siteIdentity?.adminPortalTitle || 'TISS CMS Administrator'}
                  </h1>
                  <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-bold hidden sm:inline">
                    Live Synced
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                  All updates publish live to the site immediately
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {lastSavedAt && (
                <span className="text-xs font-mono text-slate-400 hidden lg:inline">
                  Saved: <strong className="text-slate-200">{lastSavedAt}</strong>
                </span>
              )}

              <button
                type="button"
                onClick={handleGlobalPublish}
                disabled={isPublishing}
                className="px-3.5 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                title="Publish all changes live"
              >
                <Save className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Publish Changes</span>
              </button>

              <Link
                to="/"
                target="_blank"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={logoutAdmin}
                className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 border border-rose-500/30"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Global Floating Toast Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-sky-400/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-medium">{notification}</span>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {/* TAB: SITE IDENTITY & LOGO */}
          {activeTab === 'identity' && (
            <IdentitySettingsTab
              onSaveNotification={showNotification}
              onImageUpload={handleImageUpload}
            />
          )}

          {/* TAB: THEME & COLOR CUSTOMIZER */}
          {activeTab === 'theme' && (
            <ThemeSettingsTab onSaveNotification={showNotification} />
          )}

          {/* TAB: ANIMATION SETTINGS */}
          {activeTab === 'animations' && (
            <AnimationSettingsTab onSaveNotification={showNotification} />
          )}

          {/* TAB: ADMIN USERS & ROLES */}
          {activeTab === 'admin_users' && (
            <AdminUsersTab onSaveNotification={showNotification} />
          )}

          {/* TAB: LOGIN AUDIT LOGS */}
          {activeTab === 'audit_logs' && (
            <AuditLogsTab onSaveNotification={showNotification} />
          )}

          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Quick Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-mono uppercase font-bold text-[#0284C7]">Ticker Status</span>
                    <Megaphone className="w-4 h-4 text-[#0284C7]" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">
                    {cmsData.ticker.enabled ? `${cmsData.ticker.speed}s` : 'Paused'}
                  </div>
                  <p className="text-xs text-slate-500">
                    {cmsData.ticker.items.length} broadcast items active in rotation
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-mono uppercase font-bold text-emerald-600">Workforce Scale</span>
                    <Users className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">{cmsData.bdChapter.totalEmployees}</div>
                  <p className="text-xs text-slate-500">
                    Operating across {cmsData.bdChapter.totalOffices} corporate and operational offices
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-mono uppercase font-bold text-amber-600">Portfolio</span>
                    <Briefcase className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">{cmsData.businesses.length} Businesses</div>
                  <p className="text-xs text-slate-500">
                    10 specialized operating entities in full catalogue
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-mono uppercase font-bold text-purple-600">Global Presence</span>
                    <Globe2 className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">{cmsData.countries.length} Countries</div>
                  <p className="text-xs text-slate-500">
                    Physical chapter offices with autonomous local compliance
                  </p>
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Category-Wise Site Management</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                    Every piece of copy, timing, header, address, team member, and portfolio business can be managed directly below.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('ticker')}
                    className="p-5 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-xl text-left transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 group-hover:text-[#0284C7]">Ticker & Marquee</span>
                      <Megaphone className="w-4 h-4 text-[#0284C7]" />
                    </div>
                    <p className="text-xs text-slate-600">
                      Change animation speed ({cmsData.ticker.speed}s), toggle wire on/off, add or edit announcements.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('team')}
                    className="p-5 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-xl text-left transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 group-hover:text-[#0284C7]">Team & Leadership</span>
                      <Users className="w-4 h-4 text-[#0284C7]" />
                    </div>
                    <p className="text-xs text-slate-600">
                      Manage {cmsData.teamMembers.length} executives and bridge directors, bios, and 150+ staff statistics.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('businesses')}
                    className="p-5 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-xl text-left transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 group-hover:text-[#0284C7]">10 Portfolio Entities</span>
                      <Briefcase className="w-4 h-4 text-[#0284C7]" />
                    </div>
                    <p className="text-xs text-slate-600">
                      Edit services, company headlines, status badges, websites, and business descriptions.
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TICKER & MARQUEE WIRE */}
          {activeTab === 'ticker' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Animated Ticker Configuration</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Controls the infinite marquee header announcement bar, speed in seconds, and active messages.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={cmsData.ticker.enabled}
                        onChange={(e) => {
                          updateTicker({ enabled: e.target.checked });
                          showNotification(e.target.checked ? 'Ticker activated' : 'Ticker paused');
                        }}
                        className="w-4 h-4 text-[#0284C7] rounded"
                      />
                      <span className="text-xs font-bold text-slate-800">Ticker Enabled</span>
                    </label>
                  </div>
                </div>

                {/* Speed Controller Slider */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono uppercase font-bold text-slate-700">
                        Marquee Scroll Duration / Speed
                      </label>
                      <span className="text-xs font-mono font-bold text-[#0284C7] bg-white px-2.5 py-1 rounded border border-slate-200">
                        {cmsData.ticker.speed} seconds
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="200"
                      step="5"
                      value={cmsData.ticker.speed}
                      onChange={(e) => {
                        updateTicker({ speed: Number(e.target.value) });
                      }}
                      className="w-full accent-[#0284C7]"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>20s (Fast)</span>
                      <span>125s (Default Smooth)</span>
                      <span>200s (Very Relaxed)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase font-bold text-slate-700 block">
                      Ticker Badge Label
                    </label>
                    <input
                      type="text"
                      value={cmsData.ticker.badgeLabel}
                      onChange={(e) => updateTicker({ badgeLabel: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0284C7]"
                      placeholder="e.g. TISS WIRE"
                    />
                  </div>
                </div>

                {/* Ticker Items List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
                      Broadcast Items ({cmsData.ticker.items.length})
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTickerItem({
                          id: `tick-${Date.now()}`,
                          label: 'Notice',
                          text: 'New corporate announcement text...',
                          action: null,
                          iconType: 'sparkle',
                        });
                        setIsNewTickerModal(true);
                      }}
                      className="px-3.5 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Ticker Message</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {cmsData.ticker.items.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono uppercase font-bold text-[#0284C7] bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                              {item.label}
                            </span>
                            {item.action && (
                              <span className="text-[10px] font-mono text-slate-400">
                                Link: {item.action}
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            {item.text}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingTickerItem(item);
                              setIsNewTickerModal(false);
                            }}
                            className="p-2 text-slate-600 hover:text-[#0284C7] hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Item"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = cmsData.ticker.items.filter((i) => i.id !== item.id);
                              updateTicker({ items: newItems });
                              showNotification('Ticker item deleted');
                            }}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HEADER & NAVIGATION */}
          {activeTab === 'header' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-8 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-black text-slate-900">Header Branding & Navigation</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Customize the brand identity, slogans, contact buttons, and menu navigation links.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={cmsData.header.brandName}
                    onChange={(e) => updateHeader({ brandName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                    Brand Slogan / Tagline
                  </label>
                  <input
                    type="text"
                    value={cmsData.header.brandTagline}
                    onChange={(e) => updateHeader({ brandTagline: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                    Header CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={cmsData.header.ctaText}
                    onChange={(e) => updateHeader({ ctaText: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                    Header CTA Button Link
                  </label>
                  <input
                    type="text"
                    value={cmsData.header.ctaLink}
                    onChange={(e) => updateHeader({ ctaLink: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              {/* Logo & Favicon Upload Zone */}
              <div className="pt-6 border-t border-slate-200 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
                    Header Logo & Browser Favicon Media
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload your custom corporate vector/image logo and browser tab favicon.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Main Header Logo */}
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-mono uppercase font-bold text-slate-900">
                          Main Navigation Logo
                        </h5>
                        <p className="text-[11px] text-slate-500">
                          Displayed at the top-left of every public page
                        </p>
                      </div>
                      {cmsData.header.customLogoUrl ? (
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          Custom Logo Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                          Default 3D Ribbon
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-white border border-slate-200 rounded-xl">
                      <div className="w-16 h-16 rounded-xl border border-slate-200 bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                        {cmsData.header.customLogoUrl ? (
                          <img
                            src={cmsData.header.customLogoUrl}
                            alt="Header Logo"
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <div className="text-[10px] text-slate-400 font-mono text-center leading-tight">
                            Default 3D Emblem
                          </div>
                        )}
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="cursor-pointer px-3 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Logo File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, 'headerLogo')}
                            />
                          </label>
                          {cmsData.header.customLogoUrl && (
                            <button
                              type="button"
                              onClick={() => {
                                updateHeader({ customLogoUrl: '' });
                                showNotification('Reset header to default 3D emblem logo');
                              }}
                              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-lg border border-slate-200 transition-colors"
                            >
                              Reset to Default
                            </button>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400">
                          Supports PNG, SVG, JPG, WebP transparent backgrounds
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Browser Favicon */}
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-mono uppercase font-bold text-slate-900">
                          Browser Tab Favicon
                        </h5>
                        <p className="text-[11px] text-slate-500">
                          Live icon displayed in browser address & bookmarks
                        </p>
                      </div>
                      {cmsData.header.faviconUrl ? (
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          Custom Favicon Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                          Default Favicon
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-white border border-slate-200 rounded-xl">
                      <div className="w-16 h-16 rounded-xl border border-slate-200 bg-slate-50 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                        {cmsData.header.faviconUrl ? (
                          <img
                            src={cmsData.header.faviconUrl}
                            alt="Favicon"
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-[#0284C7] flex items-center justify-center text-white font-black text-sm">
                            T
                          </div>
                        )}
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="cursor-pointer px-3 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Favicon</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, 'favicon')}
                            />
                          </label>
                          {cmsData.header.faviconUrl && (
                            <button
                              type="button"
                              onClick={() => {
                                updateHeader({ faviconUrl: '' });
                                const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
                                if (link) link.href = '/favicon.svg';
                                showNotification('Reset to default favicon');
                              }}
                              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-lg border border-slate-200 transition-colors"
                            >
                              Reset Favicon
                            </button>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400">
                          Recommended: 32x32, 64x64 or SVG icon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Items Manager */}
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Menu Navigation Links
                </h4>

                <div className="space-y-3">
                  {cmsData.header.navLinks.map((nav, idx) => (
                    <div
                      key={nav.id}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={nav.enabled}
                          onChange={(e) => {
                            const newLinks = [...cmsData.header.navLinks];
                            newLinks[idx] = { ...nav, enabled: e.target.checked };
                            updateHeader({ navLinks: newLinks });
                            showNotification(`Menu item "${nav.label}" updated`);
                          }}
                          className="w-4 h-4 text-[#0284C7] rounded"
                        />
                        <span className="font-bold text-sm text-slate-900">{nav.label}</span>
                        <span className="font-mono text-xs text-slate-500">({nav.path})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={nav.label}
                          onChange={(e) => {
                            const newLinks = [...cmsData.header.navLinks];
                            newLinks[idx] = { ...nav, label: e.target.value };
                            updateHeader({ navLinks: newLinks });
                          }}
                          className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FOOTER & ADDRESSES */}
          {activeTab === 'footer' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-black text-slate-900">Footer Content & Corporate Coordinates</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Manage registered offices, official emails, international chapter notices, and legal disclaimers.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                    Footer About Narrative
                  </label>
                  <textarea
                    rows={3}
                    value={cmsData.footer.aboutText}
                    onChange={(e) => updateFooter({ aboutText: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                      Corporate Office Address
                    </label>
                    <textarea
                      rows={2}
                      value={cmsData.footer.corporateOffice}
                      onChange={(e) => updateFooter({ corporateOffice: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                      Registered Office Address
                    </label>
                    <textarea
                      rows={2}
                      value={cmsData.footer.registeredOffice}
                      onChange={(e) => updateFooter({ registeredOffice: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                      Primary Inquiries Email
                    </label>
                    <input
                      type="email"
                      value={cmsData.footer.primaryEmail}
                      onChange={(e) => updateFooter({ primaryEmail: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                      Secondary Inquiries Email
                    </label>
                    <input
                      type="email"
                      value={cmsData.footer.secondaryEmail}
                      onChange={(e) => updateFooter({ secondaryEmail: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                    Copyright Line
                  </label>
                  <input
                    type="text"
                    value={cmsData.footer.copyrightText}
                    onChange={(e) => updateFooter({ copyrightText: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                {/* Footer Dedicated Logo Upload */}
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-mono uppercase font-bold text-slate-900">
                        Footer Dark Background Logo
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Dedicated emblem/wordmark rendered against the deep navy footer background
                      </p>
                    </div>
                    {cmsData.footer.customLogoUrl ? (
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        Dedicated Footer Logo Set
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Inheriting Header Logo
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-[#0B1522] border border-slate-800 rounded-xl">
                    <div className="w-16 h-16 rounded-xl border border-slate-700 bg-[#0F172A] p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                      {cmsData.footer.customLogoUrl || cmsData.header.customLogoUrl ? (
                        <img
                          src={cmsData.footer.customLogoUrl || cmsData.header.customLogoUrl}
                          alt="Footer Logo"
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <div className="text-[9px] text-slate-400 font-mono text-center leading-tight">
                          Default 3D Emblem
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="cursor-pointer px-3 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Dedicated Footer Logo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, 'footerLogo')}
                          />
                        </label>
                        {cmsData.footer.customLogoUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              updateFooter({ customLogoUrl: '' });
                              showNotification('Footer now uses header logo');
                            }}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors"
                          >
                            Use Header Logo
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Optimized for dark mode displays (white or transparent logos look best)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links & Buttons Manager */}
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-[#0284C7]" />
                        <h4 className="text-xs font-mono uppercase font-bold text-slate-900">
                          Website Footer Social Media Buttons
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Dynamic social channels displayed at the bottom of the website. Add, edit, or remove channels anytime.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingSocialLink({
                          id: `soc-${Date.now()}`,
                          platform: 'linkedin',
                          label: 'LinkedIn',
                          url: 'https://linkedin.com/company/',
                          enabled: true,
                        });
                        setIsNewSocialLinkModal(true);
                      }}
                      className="px-3 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Social Channel</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {(!cmsData.footer.socialLinks || cmsData.footer.socialLinks.length === 0) ? (
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
                        No social media buttons configured. Click "Add Social Channel" to create one.
                      </div>
                    ) : (
                      cmsData.footer.socialLinks.map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all text-xs"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 shrink-0">
                              {link.platform === 'linkedin' && <Linkedin className="w-4 h-4 text-[#0A66C2]" />}
                              {link.platform === 'twitter' && <Twitter className="w-4 h-4 text-slate-900" />}
                              {link.platform === 'facebook' && <Globe className="w-4 h-4 text-[#1877F2]" />}
                              {link.platform === 'youtube' && <Play className="w-4 h-4 text-[#FF0000]" />}
                              {link.platform === 'whatsapp' && <Share2 className="w-4 h-4 text-[#25D366]" />}
                              {link.platform === 'github' && <Globe className="w-4 h-4 text-slate-800" />}
                              {(link.platform === 'globe' || link.platform === 'instagram') && <Globe className="w-4 h-4 text-[#0284C7]" />}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">{link.label}</span>
                                <span className="text-[10px] font-mono uppercase bg-slate-200/70 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                                  {link.platform}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-mono truncate max-w-xs sm:max-w-md">
                                {link.url}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = (cmsData.footer.socialLinks || []).map((s) =>
                                  s.id === link.id ? { ...s, enabled: !s.enabled } : s
                                );
                                updateFooter({ socialLinks: updated });
                                showNotification(`${link.label} ${!link.enabled ? 'activated' : 'deactivated'}`);
                              }}
                              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors ${
                                link.enabled
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                              }`}
                            >
                              {link.enabled ? 'Visible' : 'Hidden'}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingSocialLink(link);
                                setIsNewSocialLinkModal(false);
                              }}
                              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Edit link"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                const updated = (cmsData.footer.socialLinks || []).filter(
                                  (s) => s.id !== link.id
                                );
                                updateFooter({ socialLinks: updated });
                                showNotification(`Removed ${link.label}`);
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete link"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Dynamic Footer Navigation Links Manager */}
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#0284C7]" />
                        <h4 className="text-xs font-mono uppercase font-bold text-slate-900">
                          Footer Dynamic Navigation Links
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Control which links appear in the footer columns (Overview & Legal). Toggle visibility, add custom links, or remove anytime.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingFooterLink({
                          id: `fl-${Date.now()}`,
                          label: '',
                          path: '',
                          group: 'overview',
                          enabled: true,
                        });
                        setIsNewFooterLinkModal(true);
                      }}
                      className="px-3.5 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Footer Link</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {(!cmsData.footer.navLinks || cmsData.footer.navLinks.length === 0) ? (
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
                        No custom footer links defined.
                      </div>
                    ) : (
                      cmsData.footer.navLinks.map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all text-xs"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="p-1.5 bg-white border border-slate-200 rounded-lg shrink-0 font-mono text-[10px] uppercase font-bold text-[#0284C7]">
                              {link.group}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">{link.label}</span>
                                <span className="text-[10px] font-mono text-slate-500">
                                  {link.path}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = (cmsData.footer.navLinks || []).map((l) =>
                                  l.id === link.id ? { ...l, enabled: !l.enabled } : l
                                );
                                updateFooterLinks(updated);
                                showNotification(
                                  `${link.label} ${!link.enabled ? 'visible in footer' : 'hidden from footer'}`
                                );
                              }}
                              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors ${
                                link.enabled
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                              }`}
                            >
                              {link.enabled ? 'Visible' : 'Hidden'}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingFooterLink(link);
                                setIsNewFooterLinkModal(false);
                              }}
                              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Edit link"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                const updated = (cmsData.footer.navLinks || []).filter(
                                  (l) => l.id !== link.id
                                );
                                updateFooterLinks(updated);
                                showNotification(`Removed ${link.label}`);
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete link"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Save & Publish Footer Button */}
                <div className="pt-6 border-t border-slate-200 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      publishChanges();
                      showNotification('✓ Footer configuration & links published live');
                    }}
                    className="px-5 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Publish Footer</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HOMEPAGE HERO & ALL SECTIONS (TOP-TO-BOTTOM) */}
          {activeTab === 'hero' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Header Overview Card */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1 bg-[#0284C7]/10 text-[#0284C7] rounded">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <h3 className="text-xl font-black text-slate-900">
                      Complete Homepage Content & Animation Controls
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Dynamically manage every element from the top hero down to the final call-to-action, including ambient motion and network speed.
                  </p>
                </div>

                <Link
                  to="/"
                  target="_blank"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shrink-0 shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Preview Live Homepage</span>
                </Link>
              </div>

              {/* 1. HERO BANNER & ANIMATION SPEED CONTROL */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
                    <span>1. Hero Section & Interactive Animation</span>
                  </h4>
                  <span className="text-[10px] font-mono uppercase bg-sky-100 text-[#0284C7] font-bold px-2 py-0.5 rounded">
                    Above The Fold
                  </span>
                </div>

                {/* Animation Control Subcard */}
                <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5 text-[#0284C7]" />
                        <span>Background Glow & Network Node Motion</span>
                      </span>
                      <p className="text-[11px] text-slate-500">
                        Toggle ambient lighting pulses and radial network node animations on the hero canvas
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const nextState = !cmsData.hero.animationsEnabled;
                          updateHero({ animationsEnabled: nextState });
                          showNotification(`Animations ${nextState ? 'enabled' : 'paused'}`);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                          cmsData.hero.animationsEnabled !== false
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                            : 'bg-slate-200 text-slate-700 border-slate-300'
                        }`}
                      >
                        {cmsData.hero.animationsEnabled !== false ? '● Animations Active' : '○ Animations Paused'}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-sky-100 flex flex-wrap items-center gap-4">
                    <label className="text-[11px] font-bold text-slate-700">Animation Motion Speed:</label>
                    {(['slow', 'normal', 'fast'] as const).map((spd) => (
                      <label key={spd} className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name="animationSpeed"
                          value={spd}
                          checked={(cmsData.hero.animationSpeed || 'normal') === spd}
                          onChange={() => {
                            updateHero({ animationSpeed: spd });
                            showNotification(`Animation speed set to ${spd}`);
                          }}
                          className="text-[#0284C7] focus:ring-[#0284C7]"
                        />
                        <span className="capitalize">{spd}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                      Hero Badge Pill
                    </label>
                    <input
                      type="text"
                      value={cmsData.hero.badgeText}
                      onChange={(e) => updateHero({ badgeText: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                        Headline Line 1
                      </label>
                      <input
                        type="text"
                        value={cmsData.hero.headlineLine1}
                        onChange={(e) => updateHero({ headlineLine1: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-black text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                        Headline Line 2 (Highlighted Gradient)
                      </label>
                      <input
                        type="text"
                        value={cmsData.hero.headlineLine2}
                        onChange={(e) => updateHero({ headlineLine2: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-black text-[#0284C7]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                      Hero Sub-headline
                    </label>
                    <textarea
                      rows={3}
                      value={cmsData.hero.subheadline}
                      onChange={(e) => updateHero({ subheadline: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Primary CTA Label</label>
                      <input
                        type="text"
                        value={cmsData.hero.primaryCtaLabel || 'Explore Portfolio Entities'}
                        onChange={(e) => updateHero({ primaryCtaLabel: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Primary CTA Link</label>
                      <input
                        type="text"
                        value={cmsData.hero.primaryCtaLink || '/businesses'}
                        onChange={(e) => updateHero({ primaryCtaLink: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Secondary CTA Label</label>
                      <input
                        type="text"
                        value={cmsData.hero.secondaryCtaLabel || 'Corporate Profile'}
                        onChange={(e) => updateHero({ secondaryCtaLabel: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Secondary CTA Link</label>
                      <input
                        type="text"
                        value={cmsData.hero.secondaryCtaLink || '/about'}
                        onChange={(e) => updateHero({ secondaryCtaLink: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. SCALE & SCOPE (4 STAT COUNTERS) */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>2. Corporate Scale & Key Metric Counters</span>
                  </h4>
                  <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Key Performance Indicators
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Scale Section Badge</label>
                    <input
                      type="text"
                      value={cmsData.hero.scaleBadge || 'Corporate Scale & Scope'}
                      onChange={(e) => updateHero({ scaleBadge: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Scale Section Headline</label>
                    <input
                      type="text"
                      value={cmsData.hero.scaleHeadline || 'An Ecosystem of Specialized Businesses'}
                      onChange={(e) => updateHero({ scaleHeadline: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Scale Section Subheadline</label>
                    <input
                      type="text"
                      value={cmsData.hero.scaleSubheadline || 'TISS Corporation unites diversified capabilities...'}
                      onChange={(e) => updateHero({ scaleSubheadline: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">Metric 1</span>
                    <input
                      type="text"
                      value={cmsData.hero.metric1Value}
                      onChange={(e) => updateHero({ metric1Value: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-sm font-bold text-slate-900 font-mono"
                    />
                    <input
                      type="text"
                      value={cmsData.hero.metric1Label}
                      onChange={(e) => updateHero({ metric1Label: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 font-medium"
                    />
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">Metric 2</span>
                    <input
                      type="text"
                      value={cmsData.hero.metric2Value}
                      onChange={(e) => updateHero({ metric2Value: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-sm font-bold text-slate-900 font-mono"
                    />
                    <input
                      type="text"
                      value={cmsData.hero.metric2Label}
                      onChange={(e) => updateHero({ metric2Label: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 font-medium"
                    />
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">Metric 3</span>
                    <input
                      type="text"
                      value={cmsData.hero.metric3Value}
                      onChange={(e) => updateHero({ metric3Value: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-sm font-bold text-slate-900 font-mono"
                    />
                    <input
                      type="text"
                      value={cmsData.hero.metric3Label}
                      onChange={(e) => updateHero({ metric3Label: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 font-medium"
                    />
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">Metric 4</span>
                    <input
                      type="text"
                      value={cmsData.hero.metric4Value}
                      onChange={(e) => updateHero({ metric4Value: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-sm font-bold text-slate-900 font-mono"
                    />
                    <input
                      type="text"
                      value={cmsData.hero.metric4Label}
                      onChange={(e) => updateHero({ metric4Label: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* 3. PORTFOLIO MOSAIC SECTION */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>3. Portfolio Mosaic Header & CTAs</span>
                  </h4>
                  <span className="text-[10px] font-mono uppercase bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">
                    10 Business Showcase
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={cmsData.hero.portfolioBadge || 'Multi-Sector Capabilities'}
                      onChange={(e) => updateHero({ portfolioBadge: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Section Headline</label>
                    <input
                      type="text"
                      value={cmsData.hero.portfolioHeadline || 'The Portfolio Mosaic'}
                      onChange={(e) => updateHero({ portfolioHeadline: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">CTA Button Label</label>
                    <input
                      type="text"
                      value={cmsData.hero.portfolioCtaLabel || 'Complete Business Directory'}
                      onChange={(e) => updateHero({ portfolioCtaLabel: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 4. CORPORATE HERITAGE & ARCHITECTURE */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>4. Corporate Heritage & Architecture</span>
                  </h4>
                  <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                    Corporate Story
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Heritage Badge</label>
                      <input
                        type="text"
                        value={cmsData.hero.heritageBadge || 'Corporate Heritage'}
                        onChange={(e) => updateHero({ heritageBadge: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Heritage Headline</label>
                      <input
                        type="text"
                        value={cmsData.hero.heritageHeadline || 'Built on Experience. Oriented Toward Opportunity.'}
                        onChange={(e) => updateHero({ heritageHeadline: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Paragraph 1 (Group Foundation)</label>
                      <textarea
                        rows={3}
                        value={cmsData.hero.heritageParagraph1 || 'TISS Co. Ltd. (TISS Corporation) has a company formation background...'}
                        onChange={(e) => updateHero({ heritageParagraph1: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Paragraph 2 (Autonomous Model)</label>
                      <textarea
                        rows={3}
                        value={cmsData.hero.heritageParagraph2 || 'Rather than centralizing all activities under a rigid monolithic framework...'}
                        onChange={(e) => updateHero({ heritageParagraph2: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                      <span className="font-bold text-slate-800">Architecture Point 1</span>
                      <input
                        type="text"
                        value={cmsData.hero.heritagePoint1Title || 'International Foundation'}
                        onChange={(e) => updateHero({ heritagePoint1Title: e.target.value })}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold"
                      />
                      <textarea
                        rows={2}
                        value={cmsData.hero.heritagePoint1Text || 'Autonomous chapters conducting operations across 6 countries.'}
                        onChange={(e) => updateHero({ heritagePoint1Text: e.target.value })}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-[11px]"
                      />
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                      <span className="font-bold text-slate-800">Architecture Point 2</span>
                      <input
                        type="text"
                        value={cmsData.hero.heritagePoint2Title || 'Autonomous Operating Units'}
                        onChange={(e) => updateHero({ heritagePoint2Title: e.target.value })}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold"
                      />
                      <textarea
                        rows={2}
                        value={cmsData.hero.heritagePoint2Text || 'Specialized domain leadership backed by group-level governance.'}
                        onChange={(e) => updateHero({ heritagePoint2Text: e.target.value })}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-[11px]"
                      />
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                      <span className="font-bold text-slate-800">Architecture Point 3</span>
                      <input
                        type="text"
                        value={cmsData.hero.heritagePoint3Title || 'Active Activities Since 2017'}
                        onChange={(e) => updateHero({ heritagePoint3Title: e.target.value })}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold"
                      />
                      <textarea
                        rows={2}
                        value={cmsData.hero.heritagePoint3Text || 'Operating with registered presence in Uttara, Dhaka-1230.'}
                        onChange={(e) => updateHero({ heritagePoint3Text: e.target.value })}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. GLOBAL PERSPECTIVE SECTION */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <span>5. Global Perspective & Multi-Jurisdiction Section</span>
                  </h4>
                  <span className="text-[10px] font-mono uppercase bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">
                    Global Network
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Global Badge</label>
                    <input
                      type="text"
                      value={cmsData.hero.globalBadge || 'International Operations'}
                      onChange={(e) => updateHero({ globalBadge: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Global Headline</label>
                    <input
                      type="text"
                      value={cmsData.hero.globalHeadline || 'A Grounded Multi-Jurisdiction Footprint'}
                      onChange={(e) => updateHero({ globalHeadline: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Global CTA Label</label>
                    <input
                      type="text"
                      value={cmsData.hero.globalCtaLabel || 'Explore Global Presence'}
                      onChange={(e) => updateHero({ globalCtaLabel: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 6. OPERATING APPROACH */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>6. Operating Approach Section</span>
                  </h4>
                  <span className="text-[10px] font-mono uppercase bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded">
                    4 Strategic Pillars
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Approach Badge</label>
                    <input
                      type="text"
                      value={cmsData.hero.approachBadge || 'Operating Mindset'}
                      onChange={(e) => updateHero({ approachBadge: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Approach Headline</label>
                    <input
                      type="text"
                      value={cmsData.hero.approachHeadline || 'Our Corporate Approach'}
                      onChange={(e) => updateHero({ approachHeadline: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* 7. FINAL STRATEGIC CTA BANNER */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-900" />
                    <span>7. Final Strategic Call to Action Section</span>
                  </h4>
                  <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded">
                    Bottom Conversion Banner
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">CTA Badge</label>
                      <input
                        type="text"
                        value={cmsData.hero.ctaBadge || 'Strategic Collaboration'}
                        onChange={(e) => updateHero({ ctaBadge: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">CTA Headline</label>
                      <input
                        type="text"
                        value={cmsData.hero.ctaHeadline || 'Let’s Explore What We Can Build Together.'}
                        onChange={(e) => updateHero({ ctaHeadline: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">CTA Subheadline</label>
                    <textarea
                      rows={2}
                      value={cmsData.hero.ctaSubheadline || 'Connect with TISS Corporation to discuss business opportunities...'}
                      onChange={(e) => updateHero({ ctaSubheadline: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Primary CTA Label</label>
                      <input
                        type="text"
                        value={cmsData.hero.ctaPrimaryLabel || 'Start a Conversation'}
                        onChange={(e) => updateHero({ ctaPrimaryLabel: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Primary CTA Link</label>
                      <input
                        type="text"
                        value={cmsData.hero.ctaPrimaryLink || '/contact'}
                        onChange={(e) => updateHero({ ctaPrimaryLink: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Secondary CTA Label</label>
                      <input
                        type="text"
                        value={cmsData.hero.ctaSecondaryLabel || 'Explore Portfolio'}
                        onChange={(e) => updateHero({ ctaSecondaryLabel: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Secondary CTA Link</label>
                      <input
                        type="text"
                        value={cmsData.hero.ctaSecondaryLink || '/businesses'}
                        onChange={(e) => updateHero({ secondaryCtaLink: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: TEAM & BD CHAPTER (150+ STAFF & 3 OFFICES) */}
          {activeTab === 'team' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* BD Chapter Stats Editor */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase text-[#0284C7] font-bold">Workforce & Facilities</span>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">Bangladesh Chapter Scale</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Manage the nationwide workforce scale and office counts across Bangladesh.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                      Total Employees in BD
                    </label>
                    <input
                      type="text"
                      value={cmsData.bdChapter.totalEmployees}
                      onChange={(e) => updateBDChapter({ totalEmployees: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 font-mono"
                      placeholder="e.g. 150+"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                      Total Operating Offices
                    </label>
                    <input
                      type="number"
                      value={cmsData.bdChapter.totalOffices}
                      onChange={(e) => updateBDChapter({ totalOffices: Number(e.target.value) })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 font-mono"
                      placeholder="3"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                      Offices Summary Text
                    </label>
                    <input
                      type="text"
                      value={cmsData.bdChapter.officesSummary}
                      onChange={(e) => updateBDChapter({ officesSummary: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Leadership Directory Management */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      Leadership Directorate & Bridge Directors ({cmsData.teamMembers.length})
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Full control over bios, professional achievements, departments, and roles.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingMember({
                        id: `leader-${Date.now()}`,
                        name: 'New Executive',
                        role: 'Director',
                        department: 'General Management',
                        departmentCategory: 'operations',
                        divisionCode: 'DIR',
                        bio: 'Executive description...',
                        fullBio: 'Full professional biography...',
                        focusAreas: ['Strategy', 'Execution'],
                        achievements: ['Milestone 1', 'Milestone 2'],
                        keyLeadershipPillars: ['Leadership', 'Integrity'],
                        email: 'info@tisscoltd.com',
                        avatarColor: 'from-[#0284C7] to-[#0369A1] text-white',
                        isBridgeRole: false,
                      });
                      setIsNewMemberModal(true);
                    }}
                    className="px-4 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shrink-0 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Leader</span>
                  </button>
                </div>

                {/* Team Members List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cmsData.teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0284C7] bg-white px-2 py-0.5 rounded border border-slate-200">
                            {member.divisionCode}
                          </span>
                          {member.isBridgeRole && (
                            <span className="text-[9px] font-mono font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              Inter-Company Bridge
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-base font-black text-slate-900">{member.name}</h4>
                          <div className="text-xs font-bold text-[#0284C7]">{member.role}</div>
                          <div className="text-[11px] text-slate-500">{member.department}</div>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {member.bio}
                        </p>

                        <div className="text-[10px] text-slate-400 font-mono">
                          {member.achievements.length} Achievements · {member.focusAreas.length} Focus Areas
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200/80 mt-4 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingMember(member);
                            setIsNewMemberModal(false);
                          }}
                          className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit Spotlight & Bio</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteTeamMember(member.id);
                            showNotification(`Deleted ${member.name}`);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: 10 PORTFOLIO BUSINESSES */}
          {activeTab === 'businesses' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Operating Portfolio Enterprises ({cmsData.businesses.length})
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Manage service catalogues, operational status, sector codes, and descriptions for all entities.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingBusiness({
                      id: `biz-${Date.now()}`,
                      slug: `new-venture-${Date.now()}`,
                      name: 'New Portfolio Entity Ltd.',
                      shortName: 'New Entity',
                      category: 'Enterprise Solutions',
                      sectorCode: 'ENT',
                      positioning: 'Specialized Provider',
                      headline: 'Delivering Next-Generation Enterprise Capabilities',
                      description: 'Overview description...',
                      extendedOverview: 'Extended corporate overview description...',
                      services: ['Enterprise Service 1', 'Enterprise Service 2'],
                      audience: ['Corporate Clients'],
                      strategicFit: 'Strategic commercial synergy',
                      status: 'operating',
                      statusPublic: true,
                      websiteApproved: true,
                      themeColor: '#0284C7',
                      accentBg: 'bg-sky-50',
                      accentBorder: 'border-sky-200',
                      accentText: 'text-[#0284C7]',
                      heroLayoutPattern: 'technical-split',
                    });
                    setIsNewBusinessModal(true);
                  }}
                  className="px-4 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shrink-0 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Business</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cmsData.businesses.map((biz) => (
                  <div
                    key={biz.id}
                    className="p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase font-bold text-slate-500">
                          {biz.category}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                            biz.status === 'operating'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {biz.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-black text-slate-900">{biz.name}</h4>
                        <p className="text-xs font-bold text-[#0284C7]">{biz.headline}</p>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {biz.description}
                      </p>

                      <div className="text-[11px] text-slate-500 font-mono">
                        {biz.services.length} Services Listed · Slug: /{biz.slug}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200/80 mt-4 flex items-center justify-between">
                      <Link
                        to={`/businesses/${biz.slug}`}
                        target="_blank"
                        className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                      >
                        <span>View Page</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingBusiness(biz);
                            setIsNewBusinessModal(false);
                          }}
                          className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteBusiness(biz.id);
                            showNotification(`Deleted ${biz.name}`);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Business"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: 6 GLOBAL CHAPTERS */}
          {activeTab === 'global' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Autonomous Sovereign Chapters ({cmsData.countries.length} Jurisdictions)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Every country has a physical office, local legal autonomy, and domain specialization.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingCountry({
                      country: 'New Country',
                      countryCode: 'XX',
                      formation: true,
                      operations: true,
                      office: true,
                      officeType: 'Chapter Office',
                      specializedFields: ['International Trade'],
                      scopeModel: 'specialized',
                      commercialReach: true,
                      verified: true,
                      publish: true,
                      description: 'Autonomous chapter description...',
                      legalAutonomyNote: 'Operates autonomously under local statutory law.',
                    });
                    setIsNewCountryModal(true);
                  }}
                  className="px-4 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shrink-0 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Country Chapter</span>
                </button>
              </div>

              <div className="space-y-4">
                {cmsData.countries.map((c) => (
                  <div
                    key={c.countryCode}
                    className="p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                          {c.countryCode}
                        </span>
                        <h4 className="text-base font-black text-slate-900">{c.country}</h4>
                        <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                          Office Active
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#0284C7]">{c.officeType}</p>
                      <p className="text-xs text-slate-600 max-w-xl">{c.description}</p>
                      <p className="text-[11px] text-slate-500 font-mono italic">
                        Legal: {c.legalAutonomyNote}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCountry(c);
                          setIsNewCountryModal(false);
                        }}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteCountry(c.countryCode);
                          showNotification(`Deleted ${c.country}`);
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Country"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: SINGLE PAGE EDITOR (DYNAMIC EDIT SETTINGS FOR EVERY PAGE) */}
          {activeTab === 'narratives' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Header Overview Card */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1 bg-[#0284C7]/10 text-[#0284C7] rounded">
                      <FileText className="w-5 h-5" />
                    </span>
                    <h3 className="text-xl font-black text-slate-900">
                      Single Page Content & Dynamic Narratives
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Select any single public page to dynamically customize its badge, headlines, corporate statements, and content sections.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase">Active Page:</span>
                  <span className="text-xs font-mono font-black text-[#0284C7] bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200 uppercase">
                    /{selectedNarrativePage}
                  </span>
                </div>
              </div>

              {/* Sub-Navigation Strip: Select Page to Edit */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
                <div className="flex items-center gap-2 min-w-max">
                  {[
                    { id: 'about', label: 'About Us', path: '/about' },
                    { id: 'services', label: 'Services', path: '/services' },
                    { id: 'global', label: 'Global Presence', path: '/global-presence' },
                    { id: 'journey', label: 'Corporate Journey', path: '/journey' },
                    { id: 'team', label: 'Leadership & Team', path: '/team' },
                    { id: 'contact', label: 'Contact Us', path: '/contact' },
                    { id: 'privacy', label: 'Privacy Policy', path: '/privacy' },
                    { id: 'terms', label: 'Terms of Service', path: '/terms' },
                  ].map((p) => {
                    const isSelected = selectedNarrativePage === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedNarrativePage(p.id as any)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                          isSelected
                            ? 'bg-[#0284C7] text-white shadow-xs'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <span>{p.label}</span>
                        <span className={`text-[10px] font-mono opacity-70`}>({p.path})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-Page Content Forms */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                {/* 1. ABOUT US PAGE */}
                {selectedNarrativePage === 'about' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <h4 className="text-base font-black text-slate-900">About Us Page Content</h4>
                        <p className="text-xs text-slate-500">Live at /about</p>
                      </div>
                      <Link
                        to="/about"
                        target="_blank"
                        className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                      >
                        <span>View Live About Page</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Page Badge</label>
                        <input
                          type="text"
                          value={cmsData.narratives.aboutBadge || 'Corporate Profile'}
                          onChange={(e) => updateNarratives({ aboutBadge: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                        <input
                          type="text"
                          value={cmsData.narratives.aboutHeadline || 'Building Businesses. Connecting Opportunities.'}
                          onChange={(e) => updateNarratives({ aboutHeadline: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Hero Sub-headline / Narrative</label>
                      <textarea
                        rows={3}
                        value={cmsData.narratives.aboutSubheadline || 'TISS Co. Ltd. (TISS Corporation) is a diversified enterprise group...'}
                        onChange={(e) => updateNarratives({ aboutSubheadline: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div>
                        <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                          Corporate Mission Statement
                        </label>
                        <textarea
                          rows={4}
                          value={cmsData.narratives.missionStatement}
                          onChange={(e) => updateNarratives({ missionStatement: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                          Corporate Vision Statement
                        </label>
                        <textarea
                          rows={4}
                          value={cmsData.narratives.visionStatement}
                          onChange={(e) => updateNarratives({ visionStatement: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Core Values & Heritage Summary</label>
                      <textarea
                        rows={2}
                        value={cmsData.narratives.heritageSummaryText || 'Rooted in international partnerships and committed to long-term sustainable enterprise growth.'}
                        onChange={(e) => updateNarratives({ heritageSummaryText: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>
                  </div>
                )}

                {/* 2. SERVICES PAGE */}
                {selectedNarrativePage === 'services' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <h4 className="text-base font-black text-slate-900">Services & Capabilities Page</h4>
                        <p className="text-xs text-slate-500">Live at /services</p>
                      </div>
                      <Link
                        to="/services"
                        target="_blank"
                        className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                      >
                        <span>View Live Services</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Page Badge</label>
                        <input
                          type="text"
                          value={cmsData.narratives.servicesBadge || 'Capabilities & Solutions'}
                          onChange={(e) => updateNarratives({ servicesBadge: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                        <input
                          type="text"
                          value={cmsData.narratives.servicesHeadline || 'Specialized Capabilities Across 10 Operating Entities'}
                          onChange={(e) => updateNarratives({ servicesHeadline: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Hero Sub-headline</label>
                      <textarea
                        rows={3}
                        value={cmsData.narratives.servicesSubheadline || 'Explore the complete capability matrix of TISS Corporation, delivered through dedicated entities.'}
                        onChange={(e) => updateNarratives({ servicesSubheadline: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Service Delivery Operational Model Note</label>
                      <textarea
                        rows={2}
                        value={cmsData.narratives.servicesModelNote || 'Services are contracted and delivered directly through autonomous operating units with full legal accountability.'}
                        onChange={(e) => updateNarratives({ servicesModelNote: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>
                  </div>
                )}

                {/* 3. GLOBAL PRESENCE PAGE */}
                {selectedNarrativePage === 'global' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <h4 className="text-base font-black text-slate-900">Global Presence Page</h4>
                        <p className="text-xs text-slate-500">Live at /global-presence</p>
                      </div>
                      <Link
                        to="/global-presence"
                        target="_blank"
                        className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                      >
                        <span>View Live Global Page</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Page Badge</label>
                        <input
                          type="text"
                          value={cmsData.narratives.globalBadge || 'International Operations'}
                          onChange={(e) => updateNarratives({ globalBadge: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                        <input
                          type="text"
                          value={cmsData.narratives.globalHeadline || 'Autonomous Sovereign Chapters Across 6 Jurisdictions'}
                          onChange={(e) => updateNarratives({ globalHeadline: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Hero Sub-headline</label>
                      <textarea
                        rows={3}
                        value={cmsData.narratives.globalSubheadline || 'Independent legal entities with dedicated physical offices, local management, and sovereign regulatory compliance.'}
                        onChange={(e) => updateNarratives({ globalSubheadline: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Legal Autonomy & Sovereign Governance Notice</label>
                      <textarea
                        rows={2}
                        value={cmsData.narratives.globalAutonomyNote || 'Each chapter maintains independent accounting, tax compliance, and local operational autonomy.'}
                        onChange={(e) => updateNarratives({ globalAutonomyNote: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>
                  </div>
                )}

                {/* 4. CORPORATE JOURNEY PAGE */}
                {selectedNarrativePage === 'journey' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <h4 className="text-base font-black text-slate-900">Corporate Journey Page</h4>
                        <p className="text-xs text-slate-500">Live at /journey</p>
                      </div>
                      <Link
                        to="/journey"
                        target="_blank"
                        className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                      >
                        <span>View Live Journey</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Page Badge</label>
                        <input
                          type="text"
                          value={cmsData.narratives.journeyBadge || 'Milestones & Growth'}
                          onChange={(e) => updateNarratives({ journeyBadge: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                        <input
                          type="text"
                          value={cmsData.narratives.journeyHeadline || 'Our Evolutionary Path in Bangladesh & Beyond'}
                          onChange={(e) => updateNarratives({ journeyHeadline: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Hero Sub-headline</label>
                      <textarea
                        rows={3}
                        value={cmsData.narratives.journeySubheadline || 'Tracing the trajectory of TISS Corporation from international formation to an integrated multi-sector group.'}
                        onChange={(e) => updateNarratives({ journeySubheadline: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>
                  </div>
                )}

                {/* 5. LEADERSHIP & TEAM PAGE */}
                {selectedNarrativePage === 'team' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <h4 className="text-base font-black text-slate-900">Leadership & Team Page</h4>
                        <p className="text-xs text-slate-500">Live at /team</p>
                      </div>
                      <Link
                        to="/team"
                        target="_blank"
                        className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                      >
                        <span>View Live Team Page</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Page Badge</label>
                        <input
                          type="text"
                          value={cmsData.narratives.teamBadge || 'Leadership & Governance'}
                          onChange={(e) => updateNarratives({ teamBadge: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                        <input
                          type="text"
                          value={cmsData.narratives.teamHeadline || 'Corporate Directorate & Specialized Squads'}
                          onChange={(e) => updateNarratives({ teamHeadline: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Hero Sub-headline</label>
                      <textarea
                        rows={3}
                        value={cmsData.narratives.teamSubheadline || 'The professionals and domain heads driving operational excellence and corporate governance.'}
                        onChange={(e) => updateNarratives({ teamSubheadline: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>
                  </div>
                )}

                {/* 6. CONTACT PAGE */}
                {selectedNarrativePage === 'contact' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <h4 className="text-base font-black text-slate-900">Contact Us Page</h4>
                        <p className="text-xs text-slate-500">Live at /contact</p>
                      </div>
                      <Link
                        to="/contact"
                        target="_blank"
                        className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                      >
                        <span>View Live Contact Page</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Page Badge</label>
                        <input
                          type="text"
                          value={cmsData.narratives.contactBadge || 'Corporate Dialogue'}
                          onChange={(e) => updateNarratives({ contactBadge: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                        <input
                          type="text"
                          value={cmsData.narratives.contactHeadline || 'Start a Conversation with TISS.'}
                          onChange={(e) => updateNarratives({ contactHeadline: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Hero Sub-headline</label>
                      <textarea
                        rows={2}
                        value={cmsData.narratives.contactSubheadline || 'Connect with TISS Corporation to discuss business opportunities, partnerships, or sector inquiries.'}
                        onChange={(e) => updateNarratives({ contactSubheadline: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Secretariat Inquiry Response Notice</label>
                        <textarea
                          rows={2}
                          value={cmsData.narratives.contactResponseNotice || 'All commercial correspondence is evaluated by the corporate secretariat within 1-2 business days.'}
                          onChange={(e) => updateNarratives({ contactResponseNotice: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Office Hours</label>
                        <input
                          type="text"
                          value={cmsData.narratives.contactOfficeHours || 'Sunday – Thursday: 09:00 – 18:00 (GMT+6)'}
                          onChange={(e) => updateNarratives({ contactOfficeHours: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. PRIVACY POLICY */}
                {selectedNarrativePage === 'privacy' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <h4 className="text-base font-black text-slate-900">Privacy Policy Page</h4>
                        <p className="text-xs text-slate-500">Live at /privacy</p>
                      </div>
                      <Link
                        to="/privacy"
                        target="_blank"
                        className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                      >
                        <span>View Live Privacy</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Page Title</label>
                        <input
                          type="text"
                          value={cmsData.narratives.privacyTitle || 'Privacy Policy'}
                          onChange={(e) => updateNarratives({ privacyTitle: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Effective Date Notice</label>
                        <input
                          type="text"
                          value={cmsData.narratives.privacyEffectiveDate || 'January 2026'}
                          onChange={(e) => updateNarratives({ privacyEffectiveDate: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Privacy Content Summary / Markdown</label>
                      <textarea
                        rows={6}
                        value={cmsData.narratives.privacyContent || 'TISS Co. Ltd. (TISS Corporation) is committed to protecting the privacy of our website visitors and business partners. We do not sell or trade private data.'}
                        onChange={(e) => updateNarratives({ privacyContent: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono"
                      />
                    </div>
                  </div>
                )}

                {/* 8. TERMS OF SERVICE */}
                {selectedNarrativePage === 'terms' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <h4 className="text-base font-black text-slate-900">Terms of Service Page</h4>
                        <p className="text-xs text-slate-500">Live at /terms</p>
                      </div>
                      <Link
                        to="/terms"
                        target="_blank"
                        className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                      >
                        <span>View Live Terms</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Page Title</label>
                        <input
                          type="text"
                          value={cmsData.narratives.termsTitle || 'Terms of Service'}
                          onChange={(e) => updateNarratives({ termsTitle: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Effective Date Notice</label>
                        <input
                          type="text"
                          value={cmsData.narratives.termsEffectiveDate || 'January 2026'}
                          onChange={(e) => updateNarratives({ termsEffectiveDate: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Terms Content Summary / Markdown</label>
                      <textarea
                        rows={6}
                        value={cmsData.narratives.termsContent || 'By accessing this website, you agree to comply with corporate guidelines and applicable laws.'}
                        onChange={(e) => updateNarratives({ termsContent: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 10: CUSTOM PAGES STUDIO (CREATE & MANAGE DYNAMIC PAGES) */}
          {activeTab === 'pages' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1 bg-[#0284C7]/10 text-[#0284C7] rounded">
                      <FilePlus className="w-5 h-5" />
                    </span>
                    <h3 className="text-xl font-black text-slate-900">
                      Custom Pages Studio ({cmsData.customPages?.length || 0} Pages)
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Create new independent custom pages anytime. Control slugs, hero banners, content, publishing status, and menu placement.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingCustomPage({
                      id: `page-${Date.now()}`,
                      slug: 'new-page',
                      title: 'New Page Title',
                      badgeText: 'Corporate Notice',
                      heroHeadline: 'Welcome to Our New Page',
                      heroSubheadline: 'Detailed description of this new corporate page.',
                      content: 'Write your page content here in clear paragraphs.\n\nEach paragraph block will be displayed cleanly on the public website.',
                      published: true,
                      showInHeaderNav: false,
                      showInFooter: true,
                      seoTitle: '',
                      seoDescription: '',
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                    });
                    setIsNewCustomPageModal(true);
                  }}
                  className="px-5 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-2 shrink-0 self-start md:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Page</span>
                </button>
              </div>

              {/* Pages List */}
              <div className="space-y-4">
                {(!cmsData.customPages || cmsData.customPages.length === 0) ? (
                  <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                      <FilePlus className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">No Custom Pages Yet</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      You can create unlimited dynamic pages (such as Sustainability, CSR, Press Releases, or Careers). Click "Create New Page" to start!
                    </p>
                  </div>
                ) : (
                  cmsData.customPages.map((page) => (
                    <div
                      key={page.id}
                      className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-2 max-w-xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                            /pages/{page.slug}
                          </span>
                          <span
                            className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                              page.published
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {page.published ? 'Published' : 'Draft'}
                          </span>
                          {page.showInHeaderNav && (
                            <span className="text-[10px] font-mono uppercase bg-sky-100 text-[#0284C7] font-bold px-2 py-0.5 rounded">
                              Header Menu
                            </span>
                          )}
                          {page.showInFooter && (
                            <span className="text-[10px] font-mono uppercase bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">
                              Footer Link
                            </span>
                          )}
                        </div>

                        <h4 className="text-lg font-black text-slate-900">{page.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2">{page.heroSubheadline}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {page.published && (
                          <Link
                            to={`/pages/${page.slug}`}
                            target="_blank"
                            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-[#0284C7]" />
                            <span>Preview</span>
                          </Link>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setEditingCustomPage(page);
                            setIsNewCustomPageModal(false);
                          }}
                          className="px-3.5 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit Page</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            deleteCustomPage(page.id);
                            showNotification(`Deleted page: ${page.title}`);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Page"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: SEO & SERP STUDIO DASHBOARD */}
          {activeTab === 'seo' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Header & Health Audit Banner */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="p-1 bg-[#0284C7]/10 text-[#0284C7] rounded">
                        <Search className="w-5 h-5" />
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        Dynamic SEO & SERP Studio
                      </h3>
                      <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Live Reactive Meta
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Configure search engine optimization, Google search result previews, OpenGraph social cards, and per-page meta tags.
                    </p>
                  </div>

                  {/* Calculated SEO Score Badge */}
                  {(() => {
                    let score = 0;
                    const titleLen = cmsData.seo.metaTitle.length;
                    const descLen = cmsData.seo.metaDescription.length;
                    if (titleLen >= 30 && titleLen <= 70) score += 25;
                    else if (titleLen > 0) score += 15;

                    if (descLen >= 100 && descLen <= 170) score += 25;
                    else if (descLen > 0) score += 15;

                    if (cmsData.seo.keywords.length > 10) score += 15;
                    if (cmsData.seo.ogImageUrl) score += 15;
                    if (cmsData.seo.canonicalBase) score += 10;
                    if (cmsData.seo.indexingEnabled) score += 10;

                    return (
                      <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3.5 rounded-xl shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex flex-col items-center justify-center font-black shadow-xs">
                          <span className="text-base leading-none">{score}</span>
                          <span className="text-[8px] opacity-80 uppercase tracking-tighter">/100</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">SEO Health Score</span>
                          <span className="text-[11px] font-mono text-emerald-600 font-bold">
                            {score >= 80 ? '● High Visibility' : '● Needs Optimization'}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Audit Checklist Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">Title Tag</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {cmsData.seo.metaTitle.length} chars (optimal 40-60)
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">Meta Description</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {cmsData.seo.metaDescription.length} chars (optimal 120-160)
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">OG Social Card</span>
                      {cmsData.seo.ogImageUrl ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {cmsData.seo.ogImageUrl ? 'Card Image Active' : 'No Card Image'}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">Search Indexing</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {cmsData.seo.indexingEnabled ? 'index, follow' : 'noindex'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2-Column: Live Previews vs Form Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Form Controls (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Global Meta Box */}
                  <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                    <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
                      Global Search Engine Metadata
                    </h4>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-mono uppercase font-bold text-slate-700">
                          Global Site Meta Title
                        </label>
                        <span className="text-[11px] font-mono text-slate-400">
                          {cmsData.seo.metaTitle.length} characters
                        </span>
                      </div>
                      <input
                        type="text"
                        value={cmsData.seo.metaTitle}
                        onChange={(e) => updateSEO({ metaTitle: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0284C7]"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-mono uppercase font-bold text-slate-700">
                          Global Meta Description
                        </label>
                        <span
                          className={`text-[11px] font-mono ${
                            cmsData.seo.metaDescription.length >= 120 &&
                            cmsData.seo.metaDescription.length <= 165
                              ? 'text-emerald-600 font-bold'
                              : 'text-slate-400'
                          }`}
                        >
                          {cmsData.seo.metaDescription.length} / 160 chars
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={cmsData.seo.metaDescription}
                        onChange={(e) => updateSEO({ metaDescription: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0284C7]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                        Search Keywords (comma separated)
                      </label>
                      <textarea
                        rows={2}
                        value={cmsData.seo.keywords}
                        onChange={(e) => updateSEO({ keywords: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0284C7]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                          Canonical Base URL
                        </label>
                        <input
                          type="url"
                          value={cmsData.seo.canonicalBase}
                          onChange={(e) => updateSEO({ canonicalBase: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                          Google Search Console Verification Token
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. google1234567890abcdef"
                          value={cmsData.seo.googleSiteVerification || ''}
                          onChange={(e) => updateSEO({ googleSiteVerification: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-900"
                        />
                      </div>
                    </div>

                    {/* Robots Indexing Toggle */}
                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Search Engine Robots Indexing</span>
                        <p className="text-[11px] text-slate-500">
                          Allow Google, Bing, and major search engines to index site content
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cmsData.seo.indexingEnabled}
                          onChange={(e) => {
                            updateSEO({ indexingEnabled: e.target.checked });
                            showNotification(
                              e.target.checked
                                ? 'Search indexing enabled (index, follow)'
                                : 'Search indexing disabled (noindex)'
                            );
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0284C7]"></div>
                      </label>
                    </div>
                  </div>

                  {/* Social Graph & OpenGraph Media Box */}
                  <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                    <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
                      Social Share Card (Open Graph & Twitter)
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                          OG Title (Social Headline)
                        </label>
                        <input
                          type="text"
                          value={cmsData.seo.ogTitle}
                          onChange={(e) => updateSEO({ ogTitle: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                          Twitter Card Format
                        </label>
                        <select
                          value={cmsData.seo.twitterCard}
                          onChange={(e: any) => updateSEO({ twitterCard: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900"
                        >
                          <option value="summary_large_image">summary_large_image (Large Hero Card)</option>
                          <option value="summary">summary (Standard Square Card)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                        OG Description (Social Preview Teaser)
                      </label>
                      <textarea
                        rows={2}
                        value={cmsData.seo.ogDescription}
                        onChange={(e) => updateSEO({ ogDescription: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                      />
                    </div>

                    {/* OG Image Upload */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase font-bold text-slate-800">
                          Social Share Image (1200x630px recommended)
                        </span>
                        {cmsData.seo.ogImageUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              updateSEO({ ogImageUrl: '' });
                              showNotification('OG Image cleared');
                            }}
                            className="text-[11px] text-rose-600 hover:underline"
                          >
                            Remove Image
                          </button>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        {cmsData.seo.ogImageUrl ? (
                          <img
                            src={cmsData.seo.ogImageUrl}
                            alt="OG Preview"
                            className="w-32 h-20 object-cover rounded-xl border border-slate-300 shadow-xs shrink-0"
                          />
                        ) : (
                          <div className="w-32 h-20 bg-slate-200 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400 font-mono text-center p-2 shrink-0">
                            No Image Set
                          </div>
                        )}

                        <div className="space-y-2 flex-1 w-full">
                          <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Share Card Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, 'ogImage')}
                            />
                          </label>
                          <input
                            type="url"
                            placeholder="Or paste image URL (https://...)"
                            value={cmsData.seo.ogImageUrl}
                            onChange={(e) => updateSEO({ ogImageUrl: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-800"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Per-Page SEO Overrides Studio */}
                  <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
                          Per-Page SEO Custom Overrides
                        </h4>
                        <p className="text-xs text-slate-500">
                          Tailor exact titles and descriptions for individual pages
                        </p>
                      </div>
                      <span className="text-[11px] font-mono text-[#0284C7] font-bold">
                        {Object.keys(cmsData.seo.pageOverrides || {}).length} Custom Pages
                      </span>
                    </div>

                    {/* Route Selector */}
                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                        Select Page Route
                      </label>
                      <select
                        value={selectedSeoRoute}
                        onChange={(e) => setSelectedSeoRoute(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                      >
                        <option value="/">Homepage (/)</option>
                        <option value="/about">Corporate About (/about)</option>
                        <option value="/businesses">Portfolio Businesses (/businesses)</option>
                        <option value="/services">Services Catalogue (/services)</option>
                        <option value="/global-presence">6 Global Chapters (/global-presence)</option>
                        <option value="/journey">Corporate Journey (/journey)</option>
                        <option value="/team">Leadership & BD Chapter (/team)</option>
                        <option value="/contact">Corporate Contact (/contact)</option>
                      </select>
                    </div>

                    {/* Edit Selected Route Override */}
                    {(() => {
                      const currentOverride = cmsData.seo.pageOverrides?.[selectedSeoRoute] || {
                        title: '',
                        description: '',
                      };

                      return (
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-xs font-bold text-slate-700">
                                Page Meta Title Override
                              </label>
                              {currentOverride.title && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextOverrides = { ...(cmsData.seo.pageOverrides || {}) };
                                    delete nextOverrides[selectedSeoRoute];
                                    updateSEO({ pageOverrides: nextOverrides });
                                    showNotification(`Reset SEO for route: ${selectedSeoRoute}`);
                                  }}
                                  className="text-[10px] text-rose-600 hover:underline"
                                >
                                  Reset to Global
                                </button>
                              )}
                            </div>
                            <input
                              type="text"
                              placeholder={`Inherited from global: ${cmsData.seo.metaTitle}`}
                              value={currentOverride.title || ''}
                              onChange={(e) => {
                                const nextOverrides = {
                                  ...(cmsData.seo.pageOverrides || {}),
                                  [selectedSeoRoute]: {
                                    ...(currentOverride || {}),
                                    title: e.target.value,
                                  },
                                };
                                updateSEO({ pageOverrides: nextOverrides });
                              }}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Page Meta Description Override
                            </label>
                            <textarea
                              rows={2}
                              placeholder={`Inherited from global: ${cmsData.seo.metaDescription}`}
                              value={currentOverride.description || ''}
                              onChange={(e) => {
                                const nextOverrides = {
                                  ...(cmsData.seo.pageOverrides || {}),
                                  [selectedSeoRoute]: {
                                    ...(currentOverride || {}),
                                    description: e.target.value,
                                  },
                                };
                                updateSEO({ pageOverrides: nextOverrides });
                              }}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900"
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Right Column: Live Interactive SERP & Social Previews (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Google Search SERP Simulator Card */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <span className="text-xs font-mono uppercase font-bold text-slate-900 flex items-center gap-1.5">
                        <Search className="w-3.5 h-3.5 text-[#0284C7]" />
                        <span>Google Search SERP Preview</span>
                      </span>

                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setSerpPreviewMode('desktop')}
                          className={`p-1 rounded flex items-center gap-1 text-[10px] font-bold ${
                            serpPreviewMode === 'desktop'
                              ? 'bg-white text-slate-900 shadow-2xs'
                              : 'text-slate-500'
                          }`}
                        >
                          <Monitor className="w-3 h-3" />
                          <span>Desktop</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSerpPreviewMode('mobile')}
                          className={`p-1 rounded flex items-center gap-1 text-[10px] font-bold ${
                            serpPreviewMode === 'mobile'
                              ? 'bg-white text-slate-900 shadow-2xs'
                              : 'text-slate-500'
                          }`}
                        >
                          <Smartphone className="w-3 h-3" />
                          <span>Mobile</span>
                        </button>
                      </div>
                    </div>

                    {/* Realistic Google Search Card */}
                    <div
                      className={`p-4 bg-white rounded-xl border border-slate-200 shadow-sm ${
                        serpPreviewMode === 'mobile' ? 'max-w-[340px] mx-auto' : ''
                      }`}
                    >
                      {/* URL Breadcrumb */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-[9px] shrink-0">
                          T
                        </div>
                        <div className="truncate">
                          <span className="text-[12px] text-slate-800 font-semibold block leading-none">
                            TISS Co. Ltd.
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono truncate block">
                            https://tiss.com.bd{selectedSeoRoute === '/' ? '' : selectedSeoRoute}
                          </span>
                        </div>
                      </div>

                      {/* Clickable Blue Google Search Title */}
                      <h4 className="text-base text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug line-clamp-2">
                        {cmsData.seo.pageOverrides?.[selectedSeoRoute]?.title ||
                          cmsData.seo.metaTitle}
                      </h4>

                      {/* Snippet Description */}
                      <p className="text-xs text-[#4d5156] line-clamp-2 mt-1 leading-relaxed">
                        {cmsData.seo.pageOverrides?.[selectedSeoRoute]?.description ||
                          cmsData.seo.metaDescription}
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-400 font-medium text-center">
                      Live simulation of Google Search desktop & mobile result cards
                    </p>
                  </div>

                  {/* Social Share Card Preview (Facebook/LinkedIn) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <span className="text-xs font-mono uppercase font-bold text-slate-900 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-sky-600" />
                        <span>Social Card Preview (LinkedIn / FB)</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                        {cmsData.seo.twitterCard}
                      </span>
                    </div>

                    {/* Realistic Social Share Card */}
                    <div className="rounded-xl border border-slate-200 overflow-hidden shadow-xs bg-slate-50">
                      {cmsData.seo.ogImageUrl ? (
                        <div className="h-44 w-full bg-slate-900 overflow-hidden">
                          <img
                            src={cmsData.seo.ogImageUrl}
                            alt="Social Share Thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-36 w-full bg-gradient-to-r from-slate-900 via-slate-800 to-[#0284C7]/80 flex flex-col items-center justify-center p-4 text-center">
                          <span className="text-white font-black text-lg">TISS Co. Ltd.</span>
                          <span className="text-xs text-sky-300 font-medium mt-1">
                            Building Businesses · Connecting Opportunities
                          </span>
                        </div>
                      )}

                      <div className="p-3.5 bg-white border-t border-slate-100 space-y-1">
                        <span className="text-[10px] uppercase font-mono text-slate-400 font-bold tracking-wider">
                          TISS.COM.BD
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {cmsData.seo.ogTitle || cmsData.seo.metaTitle}
                        </h5>
                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                          {cmsData.seo.ogDescription || cmsData.seo.metaDescription}
                        </p>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 font-medium text-center">
                      Card preview for LinkedIn, WhatsApp, Facebook & X social sharing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: BACKUP & SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Credentials update */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Administrator Credentials</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Update the administrator login ID and master password.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                      Admin Username / ID
                    </label>
                    <input
                      type="text"
                      value={newAdminUser}
                      onChange={(e) => setNewAdminUser(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                      New Password (leave empty to keep current)
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newAdminPass}
                      onChange={(e) => setNewAdminPass(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const passToUse = newAdminPass.trim() || cmsData.adminCredentials.passwordHash;
                    updateAdminCredentials(newAdminUser, passToUse);
                    setNewAdminPass('');
                    showNotification('Admin credentials updated successfully');
                  }}
                  className="px-5 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save New Credentials</span>
                </button>
              </div>

              {/* Data Backup & Restore */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Full Website Backup & Restore</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Export the entire website configuration to a portable JSON file, or restore from a previously exported file.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      const jsonStr = exportCMSJson();
                      const blob = new Blob([jsonStr], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `tiss-website-backup-${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                      showNotification('Backup JSON exported successfully');
                    }}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      resetToDefaults();
                      showNotification('Restored to default corporate data');
                    }}
                    className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>

                {/* Import JSON Section */}
                <div className="pt-6 border-t border-slate-200 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">Import & Restore JSON</h4>
                  {importError && (
                    <p className="text-xs text-rose-600 font-bold">{importError}</p>
                  )}
                  <textarea
                    rows={4}
                    placeholder="Paste exported JSON content here to restore..."
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImportError('');
                      if (!importJsonText.trim()) {
                        setImportError('Please paste JSON text first.');
                        return;
                      }
                      const res = importCMSJson(importJsonText);
                      if (res.success) {
                        setImportJsonText('');
                        showNotification(res.message);
                      } else {
                        setImportError(res.message);
                      }
                    }}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import & Apply JSON</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODAL: EDIT / ADD TEAM MEMBER (SPOTLIGHT & BIO) */}
      {/* ======================================================== */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-xl font-black text-slate-900">
                {isNewMemberModal ? 'Add New Leadership Member' : `Edit: ${editingMember.name}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Photo Upload & Standardized Cropper Section */}
              <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1 bg-[#0284C7]/10 text-[#0284C7] rounded">
                      <ImageIcon className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">
                        Official Profile Photo & Image Cropper
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Standardized 400x400 uniform crop for consistent leadership cards
                      </p>
                    </div>
                  </div>
                  {editingMember.imageUrl && (
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Photo Uploaded
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-3.5 border border-sky-200/70 rounded-xl">
                  {/* Photo Preview */}
                  <div className="relative shrink-0">
                    {editingMember.imageUrl ? (
                      <img
                        src={editingMember.imageUrl}
                        alt={editingMember.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0284C7] shadow-sm"
                      />
                    ) : (
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                          editingMember.avatarColor || 'from-[#0284C7] to-[#0369A1] text-white'
                        } flex items-center justify-center font-black text-xl shadow-xs border border-slate-200`}
                      >
                        {editingMember.name
                          .split(' ')
                          .map((n) => n[0])
                          .filter(Boolean)
                          .slice(0, 2)
                          .join('') || 'ID'}
                      </div>
                    )}
                  </div>

                  {/* Actions & Guide */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="cursor-pointer px-3.5 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Choose Photo to Crop</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'team')}
                        />
                      </label>

                      {editingMember.imageUrl && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setCropperSrc(editingMember.imageUrl || null);
                              setCropperTarget('team');
                              setCropperOpen(true);
                            }}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
                          >
                            <Crop className="w-3 h-3 text-[#0284C7]" />
                            <span>Adjust Crop</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingMember({ ...editingMember, imageUrl: '' });
                              showNotification('Photo removed, reverted to initials avatar');
                            }}
                            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-lg border border-rose-200 transition-colors"
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Upload any dimension photo — our interactive cropper centers and resizes it to uniform 400x400.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Official Designation / Role</label>
                  <input
                    type="text"
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department Name</label>
                  <input
                    type="text"
                    value={editingMember.department}
                    onChange={(e) => setEditingMember({ ...editingMember, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department Category Filter</label>
                  <select
                    value={editingMember.departmentCategory}
                    onChange={(e: any) =>
                      setEditingMember({ ...editingMember, departmentCategory: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold"
                  >
                    <option value="executive">Executive Governance</option>
                    <option value="operations">Operations & Expansion</option>
                    <option value="it">IT & Software</option>
                    <option value="coordination">Coordination & Logistics</option>
                    <option value="hr">HR & Administration</option>
                    <option value="finance">Finance & Treasury</option>
                    <option value="legal">Legal & Regulatory</option>
                    <option value="supply-chain">Supply Chain & Procurement</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Division Code</label>
                  <input
                    type="text"
                    value={editingMember.divisionCode}
                    onChange={(e) => setEditingMember({ ...editingMember, divisionCode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingMember.isBridgeRole}
                      onChange={(e) => setEditingMember({ ...editingMember, isBridgeRole: e.target.checked })}
                      className="w-4 h-4 text-[#0284C7] rounded"
                    />
                    <span className="font-bold text-slate-800">Inter-Company Bridge Role</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Short Card Bio</label>
                <textarea
                  rows={2}
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Spotlight Biography</label>
                <textarea
                  rows={4}
                  value={editingMember.fullBio}
                  onChange={(e) => setEditingMember({ ...editingMember, fullBio: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Key Professional Achievements (one per line)
                </label>
                <textarea
                  rows={3}
                  value={editingMember.achievements.join('\n')}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      achievements: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Strategic Focus Areas (comma separated)
                </label>
                <input
                  type="text"
                  value={editingMember.focusAreas.join(', ')}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      focusAreas: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              {/* Social Media & Contact Links */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Social Media & Professional Coordinates</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1">
                      <Linkedin className="w-3 h-3 text-[#0A66C2]" />
                      <span>LinkedIn Profile URL</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      value={editingMember.socialLinks?.linkedin || ''}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          socialLinks: {
                            ...(editingMember.socialLinks || {}),
                            linkedin: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1">
                      <Twitter className="w-3 h-3 text-sky-500" />
                      <span>Twitter / X Profile URL</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://x.com/..."
                      value={editingMember.socialLinks?.twitter || ''}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          socialLinks: {
                            ...(editingMember.socialLinks || {}),
                            twitter: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-[#0284C7]" />
                      <span>Website / Portfolio URL</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={editingMember.socialLinks?.website || ''}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          socialLinks: {
                            ...(editingMember.socialLinks || {}),
                            website: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-emerald-600" />
                      <span>Direct Official Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="executive@tisscoltd.com"
                      value={editingMember.socialLinks?.email || editingMember.email || ''}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          email: e.target.value,
                          socialLinks: {
                            ...(editingMember.socialLinks || {}),
                            email: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isNewMemberModal) {
                    addTeamMember(editingMember);
                    showNotification(`Added ${editingMember.name}`);
                  } else {
                    updateTeamMember(editingMember);
                    showNotification(`Updated ${editingMember.name}`);
                  }
                  setEditingMember(null);
                }}
                className="px-5 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Save Member Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDIT / ADD BUSINESS */}
      {/* ======================================================== */}
      {editingBusiness && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-xl font-black text-slate-900">
                {isNewBusinessModal ? 'Add New Portfolio Business' : `Edit: ${editingBusiness.name}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingBusiness(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Legal Entity Name</label>
                  <input
                    type="text"
                    value={editingBusiness.name}
                    onChange={(e) => setEditingBusiness({ ...editingBusiness, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Short Name / Brand</label>
                  <input
                    type="text"
                    value={editingBusiness.shortName}
                    onChange={(e) => setEditingBusiness({ ...editingBusiness, shortName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Commercial Category</label>
                  <input
                    type="text"
                    value={editingBusiness.category}
                    onChange={(e) => setEditingBusiness({ ...editingBusiness, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Operational Status</label>
                  <select
                    value={editingBusiness.status}
                    onChange={(e: any) =>
                      setEditingBusiness({ ...editingBusiness, status: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold"
                  >
                    <option value="operating">Operating</option>
                    <option value="development">Development</option>
                    <option value="planned">Planned</option>
                    <option value="coming-soon">Coming Soon</option>
                    <option value="regulatory">Regulatory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Headline Statement</label>
                <input
                  type="text"
                  value={editingBusiness.headline}
                  onChange={(e) => setEditingBusiness({ ...editingBusiness, headline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Concise Description</label>
                <textarea
                  rows={2}
                  value={editingBusiness.description}
                  onChange={(e) => setEditingBusiness({ ...editingBusiness, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Extended Overview Narrative</label>
                <textarea
                  rows={4}
                  value={editingBusiness.extendedOverview}
                  onChange={(e) =>
                    setEditingBusiness({ ...editingBusiness, extendedOverview: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Services Offered (one per line)
                </label>
                <textarea
                  rows={3}
                  value={editingBusiness.services.join('\n')}
                  onChange={(e) =>
                    setEditingBusiness({
                      ...editingBusiness,
                      services: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Public Website URL (optional)</label>
                <input
                  type="text"
                  value={editingBusiness.publicWebsite || ''}
                  onChange={(e) =>
                    setEditingBusiness({ ...editingBusiness, publicWebsite: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingBusiness(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isNewBusinessModal) {
                    addBusiness(editingBusiness);
                    showNotification(`Added ${editingBusiness.name}`);
                  } else {
                    updateBusiness(editingBusiness);
                    showNotification(`Updated ${editingBusiness.name}`);
                  }
                  setEditingBusiness(null);
                }}
                className="px-5 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Save Business
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDIT / ADD COUNTRY */}
      {/* ======================================================== */}
      {editingCountry && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-xl font-black text-slate-900">
                {isNewCountryModal ? 'Add Country Chapter' : `Edit Chapter: ${editingCountry.country}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingCountry(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Country Name</label>
                  <input
                    type="text"
                    value={editingCountry.country}
                    onChange={(e) => setEditingCountry({ ...editingCountry, country: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Country Code (2 letters)</label>
                  <input
                    type="text"
                    value={editingCountry.countryCode}
                    onChange={(e) =>
                      setEditingCountry({ ...editingCountry, countryCode: e.target.value.toUpperCase() })
                    }
                    maxLength={3}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Physical Office Location / Details</label>
                <input
                  type="text"
                  value={editingCountry.officeType || ''}
                  onChange={(e) => setEditingCountry({ ...editingCountry, officeType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Specialized Fields (comma separated)
                </label>
                <input
                  type="text"
                  value={(editingCountry.specializedFields || []).join(', ')}
                  onChange={(e) =>
                    setEditingCountry({
                      ...editingCountry,
                      specializedFields: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Chapter Overview Narrative</label>
                <textarea
                  rows={3}
                  value={editingCountry.description || ''}
                  onChange={(e) => setEditingCountry({ ...editingCountry, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Local Sovereign Legal Autonomy Note</label>
                <textarea
                  rows={2}
                  value={editingCountry.legalAutonomyNote || ''}
                  onChange={(e) =>
                    setEditingCountry({ ...editingCountry, legalAutonomyNote: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingCountry(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isNewCountryModal) {
                    addCountry(editingCountry);
                    showNotification(`Added ${editingCountry.country}`);
                  } else {
                    updateCountry(editingCountry);
                    showNotification(`Updated ${editingCountry.country}`);
                  }
                  setEditingCountry(null);
                }}
                className="px-5 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Save Country
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDIT / ADD TICKER ITEM */}
      {/* ======================================================== */}
      {editingTickerItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-xl font-black text-slate-900">
                {isNewTickerModal ? 'Add Ticker Item' : 'Edit Ticker Item'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingTickerItem(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Item Label / Category</label>
                <input
                  type="text"
                  value={editingTickerItem.label}
                  onChange={(e) =>
                    setEditingTickerItem({ ...editingTickerItem, label: e.target.value })
                  }
                  placeholder="e.g. Corporate Office, Retail Operations..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Announcement Message Text</label>
                <textarea
                  rows={3}
                  value={editingTickerItem.text}
                  onChange={(e) =>
                    setEditingTickerItem({ ...editingTickerItem, text: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Icon Type</label>
                <select
                  value={editingTickerItem.iconType}
                  onChange={(e: any) =>
                    setEditingTickerItem({ ...editingTickerItem, iconType: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold"
                >
                  <option value="office">Office Building</option>
                  <option value="pin">Location Pin</option>
                  <option value="mail">Mail Envelope</option>
                  <option value="global">Globe</option>
                  <option value="sparkle">Sparkle</option>
                  <option value="announcement">Megaphone</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Optional Target Link / Action (URL, /path, or mailto:)
                </label>
                <input
                  type="text"
                  value={editingTickerItem.action || ''}
                  onChange={(e) =>
                    setEditingTickerItem({
                      ...editingTickerItem,
                      action: e.target.value ? e.target.value : null,
                    })
                  }
                  placeholder="e.g. /businesses/qubely-mega-mart or mailto:info@tisscoltd.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingTickerItem(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  let updatedList: TickerItemConfig[];
                  if (isNewTickerModal) {
                    updatedList = [editingTickerItem, ...cmsData.ticker.items];
                  } else {
                    updatedList = cmsData.ticker.items.map((i) =>
                      i.id === editingTickerItem.id ? editingTickerItem : i
                    );
                  }
                  updateTicker({ items: updatedList });
                  showNotification('Ticker item saved');
                  setEditingTickerItem(null);
                }}
                className="px-5 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Save Ticker Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDIT / ADD SOCIAL MEDIA BUTTON (FOOTER) */}
      {/* ======================================================== */}
      {editingSocialLink && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-xl font-black text-slate-900">
                {isNewSocialLinkModal ? 'Add Social Media Channel' : 'Edit Social Media Channel'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingSocialLink(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Platform</label>
                <select
                  value={editingSocialLink.platform}
                  onChange={(e: any) =>
                    setEditingSocialLink({
                      ...editingSocialLink,
                      platform: e.target.value,
                      label:
                        editingSocialLink.label === '' ||
                        ['LinkedIn', 'Twitter / X', 'Facebook', 'YouTube', 'WhatsApp', 'GitHub', 'Website', 'Instagram'].includes(editingSocialLink.label)
                          ? e.target.value === 'twitter'
                            ? 'Twitter / X'
                            : e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                          : editingSocialLink.label,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                >
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter / X</option>
                  <option value="facebook">Facebook</option>
                  <option value="youtube">YouTube</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="instagram">Instagram</option>
                  <option value="github">GitHub</option>
                  <option value="globe">Official Website / Portal</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Button Label</label>
                <input
                  type="text"
                  value={editingSocialLink.label}
                  onChange={(e) =>
                    setEditingSocialLink({ ...editingSocialLink, label: e.target.value })
                  }
                  placeholder="e.g. LinkedIn, Twitter, WhatsApp"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Destination URL / Link</label>
                <input
                  type="url"
                  value={editingSocialLink.url}
                  onChange={(e) =>
                    setEditingSocialLink({ ...editingSocialLink, url: e.target.value })
                  }
                  placeholder="https://..."
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-900"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingSocialLink.enabled}
                    onChange={(e) =>
                      setEditingSocialLink({ ...editingSocialLink, enabled: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7]"
                  />
                  <span>Show button in website footer</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingSocialLink(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!editingSocialLink.url.trim()) {
                    showNotification('Please enter a destination URL');
                    return;
                  }
                  let updated: SocialMediaLink[];
                  if (isNewSocialLinkModal) {
                    updated = [...(cmsData.footer.socialLinks || []), editingSocialLink];
                  } else {
                    updated = (cmsData.footer.socialLinks || []).map((s) =>
                      s.id === editingSocialLink.id ? editingSocialLink : s
                    );
                  }
                  updateFooter({ socialLinks: updated });
                  showNotification(`Saved ${editingSocialLink.label} button`);
                  setEditingSocialLink(null);
                }}
                className="px-5 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Save Channel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDIT / ADD CUSTOM PAGE */}
      {/* ======================================================== */}
      {editingCustomPage && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {isNewCustomPageModal ? 'Create New Custom Page' : `Edit: ${editingCustomPage.title}`}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Accessible at /pages/{editingCustomPage.slug || 'url-slug'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingCustomPage(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Page Title</label>
                  <input
                    type="text"
                    value={editingCustomPage.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      const autoSlug = newTitle
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');
                      setEditingCustomPage({
                        ...editingCustomPage,
                        title: newTitle,
                        slug: isNewCustomPageModal ? autoSlug : editingCustomPage.slug,
                      });
                    }}
                    placeholder="e.g. Sustainability Charter"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    URL Slug (/pages/...)
                  </label>
                  <input
                    type="text"
                    value={editingCustomPage.slug}
                    onChange={(e) =>
                      setEditingCustomPage({
                        ...editingCustomPage,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, ''),
                      })
                    }
                    placeholder="e.g. sustainability"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hero Badge Text</label>
                  <input
                    type="text"
                    value={editingCustomPage.badgeText || ''}
                    onChange={(e) =>
                      setEditingCustomPage({ ...editingCustomPage, badgeText: e.target.value })
                    }
                    placeholder="e.g. Corporate Governance"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hero Headline</label>
                  <input
                    type="text"
                    value={editingCustomPage.heroHeadline}
                    onChange={(e) =>
                      setEditingCustomPage({ ...editingCustomPage, heroHeadline: e.target.value })
                    }
                    placeholder="Primary headline banner"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Hero Sub-headline / Intro</label>
                <textarea
                  rows={2}
                  value={editingCustomPage.heroSubheadline}
                  onChange={(e) =>
                    setEditingCustomPage({ ...editingCustomPage, heroSubheadline: e.target.value })
                  }
                  placeholder="Summary paragraph displayed below headline..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Page Body Content (Multi-Paragraph Formatted Text)
                </label>
                <textarea
                  rows={8}
                  value={editingCustomPage.content}
                  onChange={(e) =>
                    setEditingCustomPage({ ...editingCustomPage, content: e.target.value })
                  }
                  placeholder="Type the page content here. Separate paragraphs with an empty line..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 leading-relaxed font-mono"
                />
              </div>

              {/* Placements & Visibility */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <span className="font-bold text-slate-800 block text-xs uppercase font-mono tracking-wider">
                  Menu Placements & Publishing
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={editingCustomPage.published}
                      onChange={(e) =>
                        setEditingCustomPage({ ...editingCustomPage, published: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7]"
                    />
                    <span>Publish Page Live</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={editingCustomPage.showInHeaderNav}
                      onChange={(e) =>
                        setEditingCustomPage({
                          ...editingCustomPage,
                          showInHeaderNav: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7]"
                    />
                    <span>Show in Header Nav</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={editingCustomPage.showInFooter}
                      onChange={(e) =>
                        setEditingCustomPage({
                          ...editingCustomPage,
                          showInFooter: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7]"
                    />
                    <span>Show in Footer</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">SEO Meta Title (Optional)</label>
                  <input
                    type="text"
                    value={editingCustomPage.seoTitle || ''}
                    onChange={(e) =>
                      setEditingCustomPage({ ...editingCustomPage, seoTitle: e.target.value })
                    }
                    placeholder="Inherits page title if blank"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">SEO Description (Optional)</label>
                  <input
                    type="text"
                    value={editingCustomPage.seoDescription || ''}
                    onChange={(e) =>
                      setEditingCustomPage({ ...editingCustomPage, seoDescription: e.target.value })
                    }
                    placeholder="Inherits subheadline if blank"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingCustomPage(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!editingCustomPage.title.trim() || !editingCustomPage.slug.trim()) {
                    showNotification('Please enter both title and URL slug');
                    return;
                  }
                  if (isNewCustomPageModal) {
                    addCustomPage({
                      ...editingCustomPage,
                      updatedAt: new Date().toISOString(),
                    });
                    showNotification(`Created custom page: ${editingCustomPage.title}`);
                  } else {
                    updateCustomPage({
                      ...editingCustomPage,
                      updatedAt: new Date().toISOString(),
                    });
                    showNotification(`Updated custom page: ${editingCustomPage.title}`);
                  }
                  setEditingCustomPage(null);
                }}
                className="px-5 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Save Custom Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add / Edit Dynamic Footer Link */}
      {editingFooterLink && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-lg font-black text-slate-900">
                {isNewFooterLinkModal ? 'Add Dynamic Footer Link' : `Edit: ${editingFooterLink.label}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingFooterLink(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Link Title / Label</label>
                <input
                  type="text"
                  value={editingFooterLink.label}
                  onChange={(e) =>
                    setEditingFooterLink({ ...editingFooterLink, label: e.target.value })
                  }
                  placeholder="e.g. Group Directory, Investor Relations"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Route / URL</label>
                <input
                  type="text"
                  value={editingFooterLink.path}
                  onChange={(e) =>
                    setEditingFooterLink({ ...editingFooterLink, path: e.target.value })
                  }
                  placeholder="e.g. /businesses or /pages/sustainability"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Footer Column / Section
                  </label>
                  <select
                    value={editingFooterLink.group}
                    onChange={(e) =>
                      setEditingFooterLink({
                        ...editingFooterLink,
                        group: e.target.value as 'overview' | 'quick' | 'legal',
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                  >
                    <option value="overview">Corporate Overview</option>
                    <option value="legal">Legal & Compliance (Bottom Ribbon)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Link Visibility</label>
                  <select
                    value={editingFooterLink.enabled ? 'true' : 'false'}
                    onChange={(e) =>
                      setEditingFooterLink({
                        ...editingFooterLink,
                        enabled: e.target.value === 'true',
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                  >
                    <option value="true">Visible in Footer</option>
                    <option value="false">Hidden / Disabled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingFooterLink(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!editingFooterLink.label.trim() || !editingFooterLink.path.trim()) {
                    showNotification('Please enter link label and target URL');
                    return;
                  }
                  const currentLinks = cmsData.footer.navLinks || [];
                  if (isNewFooterLinkModal) {
                    updateFooterLinks([...currentLinks, editingFooterLink]);
                    showNotification(`Added footer link: ${editingFooterLink.label}`);
                  } else {
                    updateFooterLinks(
                      currentLinks.map((l) =>
                        l.id === editingFooterLink.id ? editingFooterLink : l
                      )
                    );
                    showNotification(`Updated footer link: ${editingFooterLink.label}`);
                  }
                  setEditingFooterLink(null);
                }}
                className="px-5 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Save Footer Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Standardized Image Cropper Modal */}
      <ImageCropperModal
        isOpen={cropperOpen}
        imageSrc={cropperSrc}
        outputWidth={400}
        outputHeight={400}
        shape="round"
        title={
          cropperTarget === 'team'
            ? 'Crop & Standardize Team Member Photo (400x400)'
            : 'Crop Image'
        }
        onCropComplete={handleCropComplete}
        onClose={() => {
          setCropperOpen(false);
          setCropperSrc(null);
        }}
      />
    </>
  );
};
