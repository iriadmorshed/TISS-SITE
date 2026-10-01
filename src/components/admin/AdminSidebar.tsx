import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layout,
  Megaphone,
  Sliders,
  Building2,
  Sparkles,
  Users,
  Briefcase,
  Globe2,
  FileText,
  FilePlus,
  Search,
  Shield,
  Palette,
  Film,
  UserCheck,
  History,
  ChevronsLeft,
  ChevronsRight,
  ExternalLink,
  Save,
  CheckCircle2,
  Sparkle,
  SlidersHorizontal,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { AdminRole } from '../../types/cms';

export type AdminTab =
  | 'overview'
  | 'identity'
  | 'theme'
  | 'animations'
  | 'ticker'
  | 'header'
  | 'footer'
  | 'hero'
  | 'narratives'
  | 'pages'
  | 'businesses'
  | 'team'
  | 'global'
  | 'seo'
  | 'admin_users'
  | 'audit_logs'
  | 'security';

interface NavItem {
  id: AdminTab;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  badge?: string;
  allowedRoles?: AdminRole[];
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onPublishLive: () => void;
  isPublishing: boolean;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  searchQuery,
  setSearchQuery,
  onPublishLive,
  isPublishing,
}) => {
  const { cmsData, currentAdminUser } = useCMS();

  const navGroups: NavGroup[] = [
    {
      title: 'Core & Overview',
      items: [
        {
          id: 'overview',
          label: 'Dashboard & Metrics',
          shortLabel: 'Overview',
          icon: <Layout className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'Branding & Visuals',
      items: [
        {
          id: 'identity',
          label: 'Site Identity & Logo',
          shortLabel: 'Identity',
          icon: <SlidersHorizontal className="w-4 h-4" />,
          badge: 'Logo',
        },
        {
          id: 'theme',
          label: 'Colors & Theme Styling',
          shortLabel: 'Colors',
          icon: <Palette className="w-4 h-4" />,
          badge: 'Colors',
        },
        {
          id: 'animations',
          label: 'Animation Controls',
          shortLabel: 'Motion',
          icon: <Film className="w-4 h-4" />,
          badge: cmsData.animation?.enabled ? 'Active' : 'Off',
        },
      ],
    },
    {
      title: 'Header & Navigation',
      items: [
        {
          id: 'ticker',
          label: 'Ticker & Marquee',
          shortLabel: 'Ticker',
          icon: <Megaphone className="w-4 h-4" />,
          badge: `${cmsData.ticker?.items?.length || 0}`,
        },
        {
          id: 'header',
          label: 'Header & Menus',
          shortLabel: 'Header',
          icon: <Sliders className="w-4 h-4" />,
        },
        {
          id: 'footer',
          label: 'Footer & Dynamic Links',
          shortLabel: 'Footer',
          icon: <Building2 className="w-4 h-4" />,
          badge: `${(cmsData.footer?.navLinks?.length || 0) + (cmsData.footer?.socialLinks?.length || 0)}`,
        },
      ],
    },
    {
      title: 'Content & Page Studio',
      items: [
        {
          id: 'hero',
          label: 'Homepage (Top-to-Bottom)',
          shortLabel: 'Home',
          icon: <Sparkles className="w-4 h-4" />,
        },
        {
          id: 'narratives',
          label: 'Single Page Editor',
          shortLabel: 'Pages',
          icon: <FileText className="w-4 h-4" />,
          badge: '8 Pages',
        },
        {
          id: 'pages',
          label: 'Custom Pages Studio',
          shortLabel: 'Custom',
          icon: <FilePlus className="w-4 h-4" />,
          badge: `${cmsData.customPages?.length || 0}`,
        },
      ],
    },
    {
      title: 'Portfolio & Ecosystem',
      items: [
        {
          id: 'businesses',
          label: '10 Portfolio Entities',
          shortLabel: 'Entities',
          icon: <Briefcase className="w-4 h-4" />,
          badge: `${cmsData.businesses?.length || 10}`,
        },
        {
          id: 'team',
          label: 'Leadership & BD Team',
          shortLabel: 'Team',
          icon: <Users className="w-4 h-4" />,
          badge: `${cmsData.teamMembers?.length || 0}`,
        },
        {
          id: 'global',
          label: '6 Sovereign Chapters',
          shortLabel: 'Global',
          icon: <Globe2 className="w-4 h-4" />,
          badge: `${cmsData.countries?.length || 6}`,
        },
      ],
    },
    {
      title: 'Growth & SEO',
      items: [
        {
          id: 'seo',
          label: 'SEO & SERP Studio',
          shortLabel: 'SEO',
          icon: <Search className="w-4 h-4" />,
          badge: 'SERP',
        },
      ],
    },
    {
      title: 'Administration & Logs',
      items: [
        {
          id: 'admin_users',
          label: 'Admins & Permissions',
          shortLabel: 'Admins',
          icon: <UserCheck className="w-4 h-4" />,
          badge: `${cmsData.adminUsers?.length || 4}`,
        },
        {
          id: 'audit_logs',
          label: 'Login Audit Logs',
          shortLabel: 'Audits',
          icon: <History className="w-4 h-4" />,
          badge: `${cmsData.adminLoginAudits?.length || 0}`,
        },
        {
          id: 'security',
          label: 'Backup & Factory Reset',
          shortLabel: 'Backup',
          icon: <Shield className="w-4 h-4" />,
        },
      ],
    },
  ];

  // Role Badge Styling
  const getRoleBadge = (role?: AdminRole) => {
    switch (role) {
      case 'super_admin':
        return { label: 'Super Admin', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      case 'assistant_admin':
        return { label: 'Assistant Admin', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      case 'seo_editor':
        return { label: 'SEO Editor', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'content_writer':
        return { label: 'Content Writer', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      default:
        return { label: 'Admin', color: 'bg-slate-700 text-slate-300 border-slate-600' };
    }
  };

  const userRole = getRoleBadge(currentAdminUser?.role);

  // Filter items by search
  const filteredGroups = navGroups
    .map((group) => {
      const filteredItems = group.items.filter(
        (item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.shortLabel.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...group, items: filteredItems };
    })
    .filter((group) => group.items.length > 0);

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#0B1522] border-r border-slate-800 text-slate-300 flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
      aria-label="CMS Navigation Sidebar"
    >
      {/* Top Sidebar Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 shrink-0">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#0284C7] flex items-center justify-center font-black text-white text-sm shadow-xs shrink-0">
              {cmsData.siteIdentity?.logoName?.[0] || 'T'}
            </div>
            <div className="min-w-0">
              <h2 className="text-xs font-black text-white truncate tracking-wide">
                {cmsData.siteIdentity?.logoName || 'TISS'}{' '}
                <span className="text-[#38BDF8]">{cmsData.siteIdentity?.logoSuffix || 'CMS'}</span>
              </h2>
              <p className="text-[10px] text-slate-400 font-mono truncate">Control Center</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-8 h-8 rounded-lg bg-[#0284C7] flex items-center justify-center font-black text-white text-sm shadow-xs">
            {cmsData.siteIdentity?.logoName?.[0] || 'T'}
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Active User Card (Expanded Mode) */}
      {!isCollapsed && (
        <div className="p-3 border-b border-slate-800/60 bg-slate-900/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0284C7] to-sky-400 flex items-center justify-center text-xs font-bold text-white uppercase shrink-0 shadow-inner">
              {(currentAdminUser?.displayName || 'Admin')[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white truncate">
                  {currentAdminUser?.displayName || 'Administrator'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`text-[9.5px] font-mono uppercase px-1.5 py-0.2 rounded border font-semibold ${userRole.color}`}>
                  {userRole.label}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Active Session" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Input Filter */}
      {!isCollapsed && (
        <div className="p-3 border-b border-slate-800/60 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter settings..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-900/80 border border-slate-700/80 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0284C7] transition-all"
            />
          </div>
        </div>
      )}

      {/* Navigation Links Scroll Container */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4 custom-scrollbar">
        {filteredGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed && (
              <p className="px-3 text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 mb-1.5">
                {group.title}
              </p>
            )}

            {group.items.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all group relative ${
                    isActive
                      ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/20 font-extrabold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <span
                    className={`shrink-0 transition-transform ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-400'
                    }`}
                  >
                    {item.icon}
                  </span>

                  {!isCollapsed ? (
                    <>
                      <span className="truncate flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  ) : (
                    isActive && (
                      <span className="absolute right-1 w-1.5 h-1.5 rounded-full bg-sky-300" />
                    )
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Persistent Bottom Action Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/60 shrink-0 space-y-2">
        <button
          type="button"
          onClick={onPublishLive}
          disabled={isPublishing}
          className={`w-full py-2.5 px-3 bg-gradient-to-r from-[#0284C7] to-sky-600 hover:from-[#0369A1] hover:to-sky-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
            isPublishing ? 'opacity-70 animate-pulse' : 'hover:scale-[1.02]'
          }`}
          title="Save all changes and publish live to the website"
        >
          {isPublishing ? (
            <>
              <Sparkle className="w-4 h-4 animate-spin text-white" />
              {!isCollapsed && <span>Publishing...</span>}
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {!isCollapsed && <span>Save & Publish</span>}
            </>
          )}
        </button>

        {!isCollapsed && (
          <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 pt-1 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Synced</span>
            </span>
            <Link
              to="/"
              target="_blank"
              className="text-[#38BDF8] hover:underline flex items-center gap-1"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};
