import React from 'react';
import {
  Film,
  Sparkles,
  Play,
  Pause,
  Sliders,
  CheckCircle2,
  Save,
  RotateCcw,
  Zap,
  Eye,
  Activity,
  Layers,
  Sparkle,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface AnimationSettingsTabProps {
  onSaveNotification: (msg: string) => void;
}

export const AnimationSettingsTab: React.FC<AnimationSettingsTabProps> = ({ onSaveNotification }) => {
  const { cmsData, updateAnimation, publishChanges } = useCMS();
  const anim = cmsData.animation || {
    enabled: true,
    entranceFades: true,
    scrollReveals: true,
    heroAmbientGlow: true,
    floatingBadges: true,
    tickerSpeed: 45,
    tickerPauseOnHover: true,
    cardHoverEffects: true,
    smoothScroll: true,
    animationSpeedPreset: 'normal',
  };

  const handleSave = () => {
    publishChanges();
    onSaveNotification('✓ Animation settings published live to website');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#0284C7]/10 text-[#0284C7] rounded-lg">
              <Film className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-slate-900">
              Animation & Motion Controls
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Global toggle controls for UI entrance fades, scroll-triggered reveals, ticker marquee velocity, and ambient glows.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save & Publish Changes</span>
        </button>
      </div>

      {/* Master Toggle Card */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h4 className="text-base font-black text-slate-900">Global Animation Master Switch</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Instantly toggle all visual animations, transitions, and motion cycles across the entire website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-mono uppercase font-bold px-2.5 py-1 rounded-md ${
              anim.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
            }`}>
              {anim.enabled ? 'Animations Active' : 'Disabled (Static Mode)'}
            </span>
            <button
              type="button"
              onClick={() => {
                updateAnimation({ enabled: !anim.enabled });
                onSaveNotification(`Animations ${!anim.enabled ? 'Enabled' : 'Disabled'}`);
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                anim.enabled ? 'bg-[#0284C7]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  anim.enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Animation Speed Presets */}
        <div className="space-y-3">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
            Motion Velocity Preset
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'slow', label: 'Slow & Cinematic', desc: 'Gentle 90s ticker, smooth 0.6s fades', speed: 90 },
              { id: 'normal', label: 'Balanced (Standard)', desc: 'Natural 45s ticker, crisp 0.3s transitions', speed: 45 },
              { id: 'fast', label: 'Snappy & Agile', desc: 'Rapid 25s ticker, instantaneous reveals', speed: 25 },
            ].map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  updateAnimation({
                    animationSpeedPreset: preset.id as 'slow' | 'normal' | 'fast',
                    tickerSpeed: preset.speed,
                  });
                  onSaveNotification(`Preset set to: ${preset.label}`);
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  anim.animationSpeedPreset === preset.id
                    ? 'border-[#0284C7] bg-sky-50/60 ring-2 ring-[#0284C7]/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">{preset.label}</span>
                  {anim.animationSpeedPreset === preset.id && (
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7]" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500">{preset.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Animation Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Page & Section Reveals */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Zap className="w-4 h-4 text-[#0284C7]" />
            <h4 className="text-sm font-black text-slate-900">Entrance & Section Motion</h4>
          </div>

          <div className="space-y-4">
            {/* Entrance Fades */}
            <div className="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Entrance Fade-ins</span>
                <span className="text-[11px] text-slate-500">Smooth opacity fades on route & section load</span>
              </div>
              <input
                type="checkbox"
                checked={anim.entranceFades}
                onChange={(e) => updateAnimation({ entranceFades: e.target.checked })}
                className="w-4 h-4 text-[#0284C7] rounded border-slate-300 focus:ring-[#0284C7]"
              />
            </div>

            {/* Scroll-Triggered Reveals */}
            <div className="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Scroll-Triggered Reveals</span>
                <span className="text-[11px] text-slate-500">Elements reveal smoothly as viewport reaches them</span>
              </div>
              <input
                type="checkbox"
                checked={anim.scrollReveals}
                onChange={(e) => updateAnimation({ scrollReveals: e.target.checked })}
                className="w-4 h-4 text-[#0284C7] rounded border-slate-300 focus:ring-[#0284C7]"
              />
            </div>

            {/* Card Hover Transitions */}
            <div className="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Interactive Card Hover Lift</span>
                <span className="text-[11px] text-slate-500">Subtle Y-lift & shadow scaling on cards</span>
              </div>
              <input
                type="checkbox"
                checked={anim.cardHoverEffects}
                onChange={(e) => updateAnimation({ cardHoverEffects: e.target.checked })}
                className="w-4 h-4 text-[#0284C7] rounded border-slate-300 focus:ring-[#0284C7]"
              />
            </div>

            {/* Smooth Scroll */}
            <div className="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Smooth Page Scrolling</span>
                <span className="text-[11px] text-slate-500">Fluid native scroll behavior for in-page anchors</span>
              </div>
              <input
                type="checkbox"
                checked={anim.smoothScroll}
                onChange={(e) => updateAnimation({ smoothScroll: e.target.checked })}
                className="w-4 h-4 text-[#0284C7] rounded border-slate-300 focus:ring-[#0284C7]"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Ambient Background & Micro-motion */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-[#0284C7]" />
            <h4 className="text-sm font-black text-slate-900">Ambient Lighting & Micro-motion</h4>
          </div>

          <div className="space-y-4">
            {/* Hero Ambient Glow */}
            <div className="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Hero Ambient Light Glows</span>
                <span className="text-[11px] text-slate-500">Pulsing blue & amber lighting behind network diagrams</span>
              </div>
              <input
                type="checkbox"
                checked={anim.heroAmbientGlow}
                onChange={(e) => updateAnimation({ heroAmbientGlow: e.target.checked })}
                className="w-4 h-4 text-[#0284C7] rounded border-slate-300 focus:ring-[#0284C7]"
              />
            </div>

            {/* Floating Badges */}
            <div className="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Floating Badges & Tags</span>
                <span className="text-[11px] text-slate-500">Gentle vertical floating movement for badges</span>
              </div>
              <input
                type="checkbox"
                checked={anim.floatingBadges}
                onChange={(e) => updateAnimation({ floatingBadges: e.target.checked })}
                className="w-4 h-4 text-[#0284C7] rounded border-slate-300 focus:ring-[#0284C7]"
              />
            </div>

            {/* Ticker Pause On Hover */}
            <div className="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Ticker Pause on Hover</span>
                <span className="text-[11px] text-slate-500">Pause announcement marquee when user hovers mouse</span>
              </div>
              <input
                type="checkbox"
                checked={anim.tickerPauseOnHover}
                onChange={(e) => updateAnimation({ tickerPauseOnHover: e.target.checked })}
                className="w-4 h-4 text-[#0284C7] rounded border-slate-300 focus:ring-[#0284C7]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ticker Marquee Speed Control Card */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h4 className="text-base font-black text-slate-900">Ticker Marquee Velocity</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Control how fast the announcement wire scrolls across the screen (in seconds per cycle).
            </p>
          </div>
          <span className="font-mono text-xs font-bold bg-sky-50 text-[#0284C7] border border-sky-200 px-3 py-1 rounded-lg">
            {anim.tickerSpeed} seconds / cycle
          </span>
        </div>

        <div className="space-y-4">
          <input
            type="range"
            min={15}
            max={120}
            step={5}
            value={anim.tickerSpeed}
            onChange={(e) => updateAnimation({ tickerSpeed: Number(e.target.value) })}
            className="w-full accent-[#0284C7] cursor-pointer"
          />

          <div className="flex justify-between text-[11px] font-mono text-slate-400 font-semibold">
            <span>Fast (15s)</span>
            <span>Balanced (45s)</span>
            <span>Slow (90s)</span>
            <span>Extra Slow (120s)</span>
          </div>
        </div>

        {/* Live Simulation Box */}
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 overflow-hidden text-white">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-sky-400 font-bold">
              <Activity className="w-3.5 h-3.5" /> Live Marquee Simulation
            </span>
            <span>Hover to test pause effect</span>
          </div>

          <div className="relative overflow-hidden py-2 border-y border-slate-800/80 bg-slate-950/60 rounded">
            <div
              className={`flex items-center gap-8 ${
                anim.enabled ? 'animate-ticker' : ''
              }`}
              style={{
                animationDuration: `${anim.tickerSpeed}s`,
              }}
            >
              {[1, 2].map((loop) => (
                <div key={loop} className="flex items-center gap-8 shrink-0">
                  <span className="text-xs text-slate-200 font-medium">
                    ⚡ TISS WIRE: 150+ Professional Workforce in Dhaka
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-slate-200 font-medium">
                    🌐 Autonomous Sovereign Chapters: Bangladesh, Hong Kong, Thailand, UK, China, India
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-slate-200 font-medium">
                    🏢 10 Specialized Operating Entities Active Since 2017
                  </span>
                </div>
              ))}
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
          <span>Save & Publish Animation Settings</span>
        </button>
      </div>
    </div>
  );
};
