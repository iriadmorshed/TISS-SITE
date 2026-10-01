import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Settings, LogOut, CheckCircle2, Sliders, ExternalLink } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const AdminBar: React.FC = () => {
  const { isAdminLoggedIn, logoutAdmin, cmsData, lastSavedAt } = useCMS();
  const location = useLocation();

  if (!isAdminLoggedIn) {
    return null;
  }

  const isOnAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="bg-[#090D16] text-white border-b border-sky-950 px-4 py-2 text-xs font-mono select-none sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Admin Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="tracking-wider uppercase text-[11px]">Admin CMS Mode</span>
          </div>

          <span className="text-slate-600 hidden sm:inline">|</span>

          <div className="hidden md:flex items-center gap-2 text-slate-300 text-[11px]">
            <span>Ticker:</span>
            <span className={cmsData.ticker.enabled ? 'text-sky-400 font-bold' : 'text-amber-400 font-bold'}>
              {cmsData.ticker.enabled ? `Active (${cmsData.ticker.speed}s)` : 'Paused'}
            </span>
            <span>·</span>
            <span>Staff:</span>
            <span className="text-white font-bold">{cmsData.bdChapter.totalEmployees}</span>
            <span>·</span>
            <span>Offices:</span>
            <span className="text-white font-bold">{cmsData.bdChapter.totalOffices}</span>
          </div>

          {lastSavedAt && (
            <span className="hidden lg:inline text-[10px] text-slate-400">
              [Synced at {lastSavedAt}]
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {!isOnAdminPage ? (
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold rounded transition-colors text-[11px]"
            >
              <Sliders className="w-3 h-3" />
              <span>Open Admin Panel</span>
            </Link>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded transition-colors text-[11px]"
            >
              <ExternalLink className="w-3 h-3" />
              <span>View Live Website</span>
            </Link>
          )}

          <button
            type="button"
            onClick={logoutAdmin}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded transition-colors text-[11px]"
            title="Log out of Admin session"
          >
            <LogOut className="w-3 h-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
