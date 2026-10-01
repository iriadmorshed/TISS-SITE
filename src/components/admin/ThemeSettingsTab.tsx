import React from 'react';
import {
  Palette,
  CheckCircle2,
  Save,
  RotateCcw,
  Sparkles,
  Eye,
  Sliders,
  Paintbrush,
  Layers,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { ThemeConfig } from '../../types/cms';

interface ThemeSettingsTabProps {
  onSaveNotification: (msg: string) => void;
}

export const ThemeSettingsTab: React.FC<ThemeSettingsTabProps> = ({ onSaveNotification }) => {
  const { cmsData, updateTheme, publishChanges } = useCMS();
  const theme = cmsData.theme || {
    preset: 'sky_corporate',
    primaryColor: '#0284C7',
    primaryHoverColor: '#0369A1',
    accentColor: '#38BDF8',
    secondaryColor: '#B99A62',
    pageBackground: '#F8FAFC',
    surfaceCardBackground: '#FFFFFF',
    footerBackground: '#0B1522',
    textHeadingColor: '#0F172A',
    badgeBgColor: '#E0F2FE',
    badgeTextColor: '#0284C7',
  };

  const presets: { id: ThemeConfig['preset']; name: string; desc: string; colors: ThemeConfig }[] = [
    {
      id: 'sky_corporate',
      name: 'Corporate Sky & Slate',
      desc: 'Signature TISS blue with clean modern slate contrasts',
      colors: {
        preset: 'sky_corporate',
        primaryColor: '#0284C7',
        primaryHoverColor: '#0369A1',
        accentColor: '#38BDF8',
        secondaryColor: '#B99A62',
        pageBackground: '#F8FAFC',
        surfaceCardBackground: '#FFFFFF',
        footerBackground: '#0B1522',
        textHeadingColor: '#0F172A',
        badgeBgColor: '#E0F2FE',
        badgeTextColor: '#0284C7',
      },
    },
    {
      id: 'navy_executive',
      name: 'Executive Navy & Cobalt',
      desc: 'Authoritative deep royal navy suited for institutional finance',
      colors: {
        preset: 'navy_executive',
        primaryColor: '#1E3A8A',
        primaryHoverColor: '#1E40AF',
        accentColor: '#60A5FA',
        secondaryColor: '#D97706',
        pageBackground: '#F8FAFC',
        surfaceCardBackground: '#FFFFFF',
        footerBackground: '#0F172A',
        textHeadingColor: '#0F172A',
        badgeBgColor: '#DBEAFE',
        badgeTextColor: '#1E3A8A',
      },
    },
    {
      id: 'gold_obsidian',
      name: 'Obsidian & Gold Luxe',
      desc: 'Prestigious warm golden bronze with sleek obsidian accents',
      colors: {
        preset: 'gold_obsidian',
        primaryColor: '#B99A62',
        primaryHoverColor: '#9A7D46',
        accentColor: '#EAB308',
        secondaryColor: '#D97706',
        pageBackground: '#FDFCFB',
        surfaceCardBackground: '#FFFFFF',
        footerBackground: '#121212',
        textHeadingColor: '#1A1816',
        badgeBgColor: '#FEF3C7',
        badgeTextColor: '#B45309',
      },
    },
    {
      id: 'emerald_prestige',
      name: 'Emerald Prestige',
      desc: 'Vibrant green representing sustainable and agricultural growth',
      colors: {
        preset: 'emerald_prestige',
        primaryColor: '#059669',
        primaryHoverColor: '#047857',
        accentColor: '#34D399',
        secondaryColor: '#B99A62',
        pageBackground: '#F0FDF4',
        surfaceCardBackground: '#FFFFFF',
        footerBackground: '#062817',
        textHeadingColor: '#064E3B',
        badgeBgColor: '#D1FAE5',
        badgeTextColor: '#047857',
      },
    },
    {
      id: 'crimson_enterprise',
      name: 'Crimson Enterprise',
      desc: 'High-energy crimson corporate aesthetic with deep charcoal foundation',
      colors: {
        preset: 'crimson_enterprise',
        primaryColor: '#DC2626',
        primaryHoverColor: '#B91C1C',
        accentColor: '#F87171',
        secondaryColor: '#F59E0B',
        pageBackground: '#FEF2F2',
        surfaceCardBackground: '#FFFFFF',
        footerBackground: '#1C0B0B',
        textHeadingColor: '#450A0A',
        badgeBgColor: '#FEE2E2',
        badgeTextColor: '#DC2626',
      },
    },
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    updateTheme(p.colors);
    onSaveNotification(`Applied "${p.name}" theme preset`);
  };

  const handleSave = () => {
    publishChanges();
    onSaveNotification('✓ Theme and color palette published live');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#0284C7]/10 text-[#0284C7] rounded-lg">
              <Palette className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-slate-900">
              Colors & Theme Customizer
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Customize the primary corporate colors, page background, card surfaces, badges, and dark footer styling.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save & Publish Colors</span>
        </button>
      </div>

      {/* Preset Palettes Card */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <h4 className="text-base font-black text-slate-900">1-Click Corporate Presets</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Select an expertly harmonized enterprise color theme or customize your own palette below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {presets.map((p) => {
            const isSelected = theme.preset === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-[#0284C7] bg-sky-50/50 ring-2 ring-[#0284C7]/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">{p.name}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0284C7]" />}
                </div>

                <div className="flex items-center gap-1.5 mb-2.5">
                  <div
                    className="w-6 h-6 rounded-md border border-black/10 shadow-2xs"
                    style={{ backgroundColor: p.colors.primaryColor }}
                    title="Primary"
                  />
                  <div
                    className="w-6 h-6 rounded-md border border-black/10 shadow-2xs"
                    style={{ backgroundColor: p.colors.accentColor }}
                    title="Accent"
                  />
                  <div
                    className="w-6 h-6 rounded-md border border-black/10 shadow-2xs"
                    style={{ backgroundColor: p.colors.secondaryColor }}
                    title="Secondary"
                  />
                  <div
                    className="w-6 h-6 rounded-md border border-black/10 shadow-2xs"
                    style={{ backgroundColor: p.colors.footerBackground }}
                    title="Footer"
                  />
                  <div
                    className="w-6 h-6 rounded-md border border-black/10 shadow-2xs"
                    style={{ backgroundColor: p.colors.pageBackground }}
                    title="Page Background"
                  />
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">{p.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Color Pickers Grid */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div>
          <h4 className="text-base font-black text-slate-900">Custom Palette & Color Points</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Fine-tune each individual color point. Changes reflect live on the website in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Primary Color */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-800">
              Primary Brand Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => updateTheme({ primaryColor: e.target.value, preset: 'custom' })}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
              />
              <input
                type="text"
                value={theme.primaryColor}
                onChange={(e) => updateTheme({ primaryColor: e.target.value, preset: 'custom' })}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
              />
            </div>
            <p className="text-[10px] text-slate-500">Buttons, links, key brand accents</p>
          </div>

          {/* Primary Hover Color */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-800">
              Primary Hover Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.primaryHoverColor}
                onChange={(e) => updateTheme({ primaryHoverColor: e.target.value, preset: 'custom' })}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
              />
              <input
                type="text"
                value={theme.primaryHoverColor}
                onChange={(e) => updateTheme({ primaryHoverColor: e.target.value, preset: 'custom' })}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
              />
            </div>
            <p className="text-[10px] text-slate-500">Button active/hover states</p>
          </div>

          {/* Accent Color */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-800">
              Light Accent Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.accentColor}
                onChange={(e) => updateTheme({ accentColor: e.target.value, preset: 'custom' })}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
              />
              <input
                type="text"
                value={theme.accentColor}
                onChange={(e) => updateTheme({ accentColor: e.target.value, preset: 'custom' })}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
              />
            </div>
            <p className="text-[10px] text-slate-500">Highlights, glows, dark mode tags</p>
          </div>

          {/* Secondary Gold Color */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-800">
              Secondary Brand Accent
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.secondaryColor}
                onChange={(e) => updateTheme({ secondaryColor: e.target.value, preset: 'custom' })}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
              />
              <input
                type="text"
                value={theme.secondaryColor}
                onChange={(e) => updateTheme({ secondaryColor: e.target.value, preset: 'custom' })}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
              />
            </div>
            <p className="text-[10px] text-slate-500">Registered offices, gold highlights</p>
          </div>

          {/* Page Background */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-800">
              Page Background Tint
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.pageBackground}
                onChange={(e) => updateTheme({ pageBackground: e.target.value, preset: 'custom' })}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
              />
              <input
                type="text"
                value={theme.pageBackground}
                onChange={(e) => updateTheme({ pageBackground: e.target.value, preset: 'custom' })}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
              />
            </div>
            <p className="text-[10px] text-slate-500">Body background (default: #F8FAFC)</p>
          </div>

          {/* Surface Card Background */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-800">
              Surface Card Background
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.surfaceCardBackground}
                onChange={(e) => updateTheme({ surfaceCardBackground: e.target.value, preset: 'custom' })}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
              />
              <input
                type="text"
                value={theme.surfaceCardBackground}
                onChange={(e) => updateTheme({ surfaceCardBackground: e.target.value, preset: 'custom' })}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
              />
            </div>
            <p className="text-[10px] text-slate-500">Container backgrounds (default: #FFFFFF)</p>
          </div>

          {/* Footer Background */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-800">
              Footer Background
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.footerBackground}
                onChange={(e) => updateTheme({ footerBackground: e.target.value, preset: 'custom' })}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
              />
              <input
                type="text"
                value={theme.footerBackground}
                onChange={(e) => updateTheme({ footerBackground: e.target.value, preset: 'custom' })}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
              />
            </div>
            <p className="text-[10px] text-slate-500">Bottom footer background (#0B1522)</p>
          </div>

          {/* Headings Text Color */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-800">
              Headings Text Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.textHeadingColor}
                onChange={(e) => updateTheme({ textHeadingColor: e.target.value, preset: 'custom' })}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
              />
              <input
                type="text"
                value={theme.textHeadingColor}
                onChange={(e) => updateTheme({ textHeadingColor: e.target.value, preset: 'custom' })}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
              />
            </div>
            <p className="text-[10px] text-slate-500">Title typography color (#0F172A)</p>
          </div>
        </div>
      </div>

      {/* Live Interactive Visual Preview Card */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#0284C7]" />
            <h4 className="text-base font-black text-slate-900">Live Component Color Preview</h4>
          </div>
          <span className="text-xs font-mono text-slate-400">Interactive Mockup</span>
        </div>

        <div
          className="p-8 rounded-xl border border-slate-200 space-y-6 transition-colors"
          style={{ backgroundColor: theme.pageBackground }}
        >
          {/* Card Mockup */}
          <div
            className="p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 max-w-lg mx-auto"
            style={{ backgroundColor: theme.surfaceCardBackground }}
          >
            <div className="flex items-center gap-2">
              <span
                className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${theme.primaryColor}15`,
                  color: theme.primaryColor,
                }}
              >
                Sample Badge
              </span>
              <span
                className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${theme.secondaryColor}20`,
                  color: theme.secondaryColor,
                }}
              >
                Secondary Tag
              </span>
            </div>

            <h3
              className="text-xl font-black tracking-tight"
              style={{ color: theme.textHeadingColor }}
            >
              Enterprise Preview Headline
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              This card reflects the page background, surface background, heading color, and brand accents configured above.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white rounded-lg shadow-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: theme.primaryColor }}
              >
                Primary Button
              </button>

              <button
                type="button"
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors"
                style={{
                  borderColor: theme.primaryColor,
                  color: theme.primaryColor,
                  backgroundColor: 'transparent',
                }}
              >
                Outline Button
              </button>
            </div>
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
          <span>Save & Publish Colors</span>
        </button>
      </div>
    </div>
  );
};
