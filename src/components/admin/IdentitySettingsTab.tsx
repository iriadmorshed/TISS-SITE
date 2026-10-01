import React from 'react';
import {
  SlidersHorizontal,
  Image as ImageIcon,
  Save,
  CheckCircle2,
  Upload,
  Eye,
  Building,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { TissLogo } from '../common/TissLogo';

interface IdentitySettingsTabProps {
  onSaveNotification: (msg: string) => void;
  onImageUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'headerLogo' | 'footerLogo' | 'favicon'
  ) => void;
}

export const IdentitySettingsTab: React.FC<IdentitySettingsTabProps> = ({
  onSaveNotification,
  onImageUpload,
}) => {
  const { cmsData, updateSiteIdentity, updateHeader, publishChanges } = useCMS();
  const identity = cmsData.siteIdentity || {
    logoName: 'TISS',
    logoSuffix: 'CO. LTD.',
    tagline: 'Building Businesses · Connecting Opportunities',
    customLogoUrl: '',
    adminPortalTitle: 'TISS Corporate Portal',
    adminPortalSubtitle: 'Content Management & Operations System',
    adminPortalNotice: 'Authorized Administrative Access Only',
  };

  const handleSave = () => {
    publishChanges();
    onSaveNotification('✓ Site identity, logo text & portal info published live');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#0284C7]/10 text-[#0284C7] rounded-lg">
              <SlidersHorizontal className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-slate-900">
              Site Identity & Logo Branding
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Change the corporate name beside the logo (e.g., TISS), the company suffix (CO. LTD.), the tagline beneath, and the admin portal titles.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save & Publish Identity</span>
        </button>
      </div>

      {/* Section 1: Logo Wordmark & Tagline Customizer */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="pb-4 border-b border-slate-100">
          <h4 className="text-base font-black text-slate-900">Logo Wordmark & Tagline Configuration</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            These fields determine what appears in the header, footer, and navigation logos across the whole website.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Main Logo Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Logo Main Name (First Word)
            </label>
            <input
              type="text"
              value={identity.logoName}
              onChange={(e) => updateSiteIdentity({ logoName: e.target.value })}
              placeholder="e.g. TISS"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black text-slate-900 focus:outline-none focus:border-[#0284C7]"
            />
            <p className="text-[10px] text-slate-400">
              Displayed in bold dark / white typography beside the emblem.
            </p>
          </div>

          {/* Logo Suffix */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Logo Suffix / Company Entity Type
            </label>
            <input
              type="text"
              value={identity.logoSuffix}
              onChange={(e) => updateSiteIdentity({ logoSuffix: e.target.value })}
              placeholder="e.g. CO. LTD."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-[#0284C7] focus:outline-none focus:border-[#0284C7]"
            />
            <p className="text-[10px] text-slate-400">
              Displayed in vibrant cyan / sky blue tracking typography.
            </p>
          </div>

          {/* Logo Tagline Beneath */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Corporate Tagline (Beneath Logo)
            </label>
            <input
              type="text"
              value={identity.tagline}
              onChange={(e) => updateSiteIdentity({ tagline: e.target.value })}
              placeholder="e.g. Building Businesses · Connecting Opportunities"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-[#0284C7]"
            />
            <p className="text-[10px] text-slate-400">
              The high-visibility uppercase subtitle rendered below the brand name.
            </p>
          </div>
        </div>

        {/* Live Logo Preview Box */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#0284C7]" />
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Live Wordmark Previews (Light & Dark Themes)
            </h5>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Light Background Preview */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col items-center justify-center space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2">
                Header Theme (White Background)
              </span>
              <TissLogo
                variant="light"
                size="md"
                logoName={identity.logoName}
                logoSuffix={identity.logoSuffix}
                tagline={identity.tagline}
              />
            </div>

            {/* Dark Background Preview */}
            <div className="p-6 bg-[#0B1522] border border-slate-800 rounded-xl shadow-xs flex flex-col items-center justify-center space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2">
                Footer Theme (Dark Background)
              </span>
              <TissLogo
                variant="dark"
                size="md"
                logoName={identity.logoName}
                logoSuffix={identity.logoSuffix}
                tagline={identity.tagline}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Custom Logo Image Upload */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="pb-4 border-b border-slate-100">
          <h4 className="text-base font-black text-slate-900">Custom Logo File (Optional)</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            If you have an official image file (SVG, PNG, JPG), upload it here to replace the default 3D vector emblem.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="w-20 h-20 rounded-xl border border-slate-200 bg-white p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
            {identity.customLogoUrl || cmsData.header.customLogoUrl ? (
              <img
                src={identity.customLogoUrl || cmsData.header.customLogoUrl}
                alt="Logo"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="text-[10px] text-slate-400 font-mono text-center">
                Default 3D Emblem
              </span>
            )}
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <label className="cursor-pointer px-4 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shadow-xs">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Logo File</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onImageUpload(e, 'headerLogo')}
                />
              </label>

              {(identity.customLogoUrl || cmsData.header.customLogoUrl) && (
                <button
                  type="button"
                  onClick={() => {
                    updateSiteIdentity({ customLogoUrl: '' });
                    updateHeader({ customLogoUrl: '' });
                    onSaveNotification('Reverted to default 3D emblem');
                  }}
                  className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                >
                  Use Default 3D Emblem
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              Recommended: Square SVG or high-res transparent PNG (512x512).
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Admin Portal Info & Texts */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="pb-4 border-b border-slate-100">
          <h4 className="text-base font-black text-slate-900">Admin Portal Page Display Info</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure the titles, subtitles, and welcome messages displayed on the administrator portal screen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Admin Portal Main Title
            </label>
            <input
              type="text"
              value={identity.adminPortalTitle}
              onChange={(e) => updateSiteIdentity({ adminPortalTitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0284C7]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Admin Portal Subtitle
            </label>
            <input
              type="text"
              value={identity.adminPortalSubtitle}
              onChange={(e) => updateSiteIdentity({ adminPortalSubtitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-[#0284C7] focus:outline-none focus:border-[#0284C7]"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Security Notice / Description
            </label>
            <textarea
              rows={2}
              value={identity.adminPortalNotice}
              onChange={(e) => updateSiteIdentity({ adminPortalNotice: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#0284C7]"
            />
          </div>
        </div>
      </div>

      {/* Floating Action Save */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-3 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save & Publish Identity</span>
        </button>
      </div>
    </div>
  );
};
