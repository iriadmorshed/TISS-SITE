import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, Building2, ChevronRight } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const HeroPortfolioNetwork: React.FC = () => {
  const { cmsData } = useCMS();
  const businesses = cmsData.businesses;
  const hero = cmsData.hero;
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);
  const [pulsePhase, setPulsePhase] = useState(0);

  // Gentle pulse animation cycle
  useEffect(() => {
    if (hero.animationsEnabled === false) return;
    const intervalMs =
      hero.animationSpeed === 'slow' ? 90 : hero.animationSpeed === 'fast' ? 25 : 50;
    const timer = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 100);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [hero.animationsEnabled, hero.animationSpeed]);

  const centerX = 300;
  const centerY = 300;
  const radius = 210;

  const nodePositions = businesses.map((biz, index) => {
    const angle = (index * (360 / businesses.length) - 90) * (Math.PI / 180);
    return {
      biz,
      index,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  return (
    <section className="relative min-h-[calc(100vh-6.5rem)] flex items-center bg-gradient-to-b from-white via-slate-50/70 to-slate-100/90 overflow-hidden border-b border-slate-200">
      {/* Background Architectural Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0F172A 1px, transparent 1px), linear-gradient(to bottom, #0F172A 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Dual Animated Ambient Light Glows */}
      {hero.animationsEnabled !== false && (
        <>
          <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-sky-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none animate-float" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Brand Statement & Actions */}
          <div className="lg:col-span-6 space-y-7">
            {/* Animated Floating Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white border border-sky-200 shadow-xs text-xs font-bold text-[#0284C7] animate-float">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0284C7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0284C7]"></span>
              </span>
              <span className="tracking-wider uppercase font-mono">
                {hero.badgeText}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.08] [text-wrap:balance]">
                {hero.headlineLine1} <br />
                <span className="bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#0A2540] bg-clip-text text-transparent">
                  {hero.headlineLine2}
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              {hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to={hero.primaryCtaLink || '/businesses'}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all shadow-md shadow-sky-600/25 hover:shadow-lg hover:shadow-sky-600/30 hover:-translate-y-0.5 duration-200"
              >
                <span>{hero.primaryCtaLabel || 'Explore Portfolio Businesses'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={hero.secondaryCtaLink || '/about'}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-800 bg-white border border-slate-300 hover:border-slate-500 hover:bg-slate-50 transition-all shadow-xs hover:-translate-y-0.5 duration-200"
              >
                <Compass className="w-4 h-4 text-[#0284C7]" />
                <span>{hero.secondaryCtaLabel || 'Corporate Profile'}</span>
              </Link>
            </div>

            {/* Corporate Grounding Coordinates */}
            <div className="pt-6 border-t border-slate-200/90 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1 p-3 bg-white/70 border border-slate-200 shadow-xs hover:border-[#0284C7] transition-colors">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-mono font-bold">
                  BD Chapter Office
                </span>
                <span className="text-slate-900 font-bold block">Uttara, Dhaka-1230</span>
              </div>
              <div className="space-y-1 p-3 bg-white/70 border border-slate-200 shadow-xs hover:border-[#0284C7] transition-colors">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-mono font-bold">
                  Foundation
                </span>
                <span className="text-slate-900 font-bold block">Activities Since 2017</span>
              </div>
              <div className="space-y-1 p-3 bg-white/70 border border-slate-200 shadow-xs hover:border-[#0284C7] transition-colors col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-mono font-bold">
                  Operating Footprint
                </span>
                <span className="text-slate-900 font-bold block">Autonomous Chapters</span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Interactive Portfolio Network */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div className="w-full max-w-[500px] aspect-square relative select-none">
              <svg
                viewBox="0 0 600 600"
                className="w-full h-full overflow-visible drop-shadow-md"
                aria-label="TISS Corporation Portfolio Network Diagram"
              >
                {/* Structural Planetary Orbit Reference Circles with Subtle Rotation */}
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius + 35}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                  opacity="0.6"
                />
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius * 0.55}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1.2"
                />

                {/* Connection Lines & Animated Flow Signals between Center & Nodes */}
                {nodePositions.map((pos, idx) => {
                  const isHovered = activeNodeIndex === idx;

                  // Signal packet calculation moving outward from center
                  const progress = ((pulsePhase + idx * 10) % 100) / 100;
                  const signalX = centerX + (pos.x - centerX) * progress;
                  const signalY = centerY + (pos.y - centerY) * progress;

                  return (
                    <g key={`connection-${pos.biz.id}`}>
                      {/* Connection Ray Line */}
                      <line
                        x1={centerX}
                        y1={centerY}
                        x2={pos.x}
                        y2={pos.y}
                        stroke={isHovered ? '#0284C7' : '#CBD5E1'}
                        strokeWidth={isHovered ? 2.5 : 1.25}
                        strokeOpacity={isHovered ? 1 : 0.65}
                        className="transition-all duration-300"
                      />

                      {/* Animated Traveling Data Packet Dot */}
                      <circle
                        cx={signalX}
                        cy={signalY}
                        r={isHovered ? 3.5 : 2}
                        fill={isHovered ? '#0284C7' : '#94A3B8'}
                        opacity={isHovered ? 0.9 : 0.5}
                      />
                    </g>
                  );
                })}

                {/* Central TISS Corporate Core Hub */}
                <g className="cursor-default">
                  {/* Outer breathing ring */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={76}
                    fill="#FFFFFF"
                    stroke="#0284C7"
                    strokeWidth="2.5"
                    className="drop-shadow-lg"
                  />
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={64}
                    fill="#F8FAFC"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                  />

                  {/* Official Emblem In SVG Center */}
                  <image
                    href="/brand/tiss-symbol.svg"
                    x={centerX - 26}
                    y={centerY - 50}
                    width={52}
                    height={52}
                    className="drop-shadow-xs"
                  />

                  {/* Center Typography */}
                  <text
                    x={centerX}
                    y={centerY + 16}
                    textAnchor="middle"
                    fill="#0F172A"
                    fontFamily="Manrope, sans-serif"
                    fontSize="15"
                    fontWeight="900"
                    letterSpacing="0.08em"
                  >
                    TISS <tspan fill="#0284C7" fontSize="12" fontWeight="700">CO. LTD.</tspan>
                  </text>
                  <text
                    x={centerX}
                    y={centerY + 32}
                    textAnchor="middle"
                    fill="#64748B"
                    fontFamily="Manrope, sans-serif"
                    fontSize="8"
                    fontWeight="700"
                    letterSpacing="0.12em"
                  >
                    TISS CORPORATION
                  </text>
                </g>

                {/* 10 Specialized Portfolio Nodes */}
                {nodePositions.map((pos, idx) => {
                  const isHovered = activeNodeIndex === idx;
                  return (
                    <g
                      key={pos.biz.id}
                      className="cursor-pointer group"
                      onMouseEnter={() => setActiveNodeIndex(idx)}
                      onMouseLeave={() => setActiveNodeIndex(null)}
                      onClick={() => {
                        window.location.href = `/businesses/${pos.biz.slug}`;
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${pos.biz.name}: ${pos.biz.category}`}
                    >
                      {/* Pulse aura when hovered */}
                      {isHovered && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={32}
                          fill={pos.biz.themeColor}
                          opacity={0.15}
                          className="animate-ping"
                        />
                      )}

                      {/* Node Circle */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isHovered ? 24 : 18}
                        fill={isHovered ? '#FFFFFF' : '#FFFFFF'}
                        stroke={isHovered ? '#0284C7' : '#94A3B8'}
                        strokeWidth={isHovered ? 3 : 1.75}
                        className="transition-all duration-300 drop-shadow-md"
                      />

                      {/* Inner Dot Accent with Company Brand Color */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isHovered ? 7 : 4.5}
                        fill={pos.biz.themeColor}
                        className="transition-all duration-300"
                      />

                      {/* Node Label with High Contrast */}
                      <text
                        x={pos.x}
                        y={pos.y > centerY ? pos.y + 34 : pos.y - 24}
                        textAnchor="middle"
                        fill={isHovered ? '#0284C7' : '#0F172A'}
                        fontFamily="Manrope, sans-serif"
                        fontSize={isHovered ? '12.5' : '11'}
                        fontWeight={isHovered ? '800' : '700'}
                        letterSpacing="0.01em"
                        className="transition-all duration-200 pointer-events-none filter drop-shadow-xs"
                      >
                        {pos.biz.shortName}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Dynamic Active Business Interactive Preview Panel */}
            <div className="w-full mt-4 p-4 sm:p-5 bg-white border border-slate-200 shadow-md text-xs min-h-[76px] flex items-center justify-between transition-all duration-300">
              {activeNodeIndex !== null ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm sm:text-base">
                      {businesses[activeNodeIndex].name}
                    </span>
                    <span className="text-[10px] font-mono text-[#0284C7] bg-sky-50 px-2 py-0.5 border border-sky-200 uppercase font-bold">
                      {businesses[activeNodeIndex].sectorCode}
                    </span>
                  </div>
                  <p className="text-slate-600 line-clamp-1 font-medium">
                    {businesses[activeNodeIndex].headline}
                  </p>
                </div>
              ) : (
                <div className="text-slate-500 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0284C7] shrink-0" />
                  <span>Hover or click any business node to inspect specialized sector capabilities.</span>
                </div>
              )}

              {activeNodeIndex !== null && (
                <Link
                  to={`/businesses/${businesses[activeNodeIndex].slug}`}
                  className="shrink-0 ml-4 px-4 py-2 text-xs font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all flex items-center gap-1 shadow-sm"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
