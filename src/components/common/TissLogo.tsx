import React from 'react';
import { useCMS } from '../../context/CMSContext';

interface TissLogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  customLogoUrl?: string;
  logoName?: string;
  logoSuffix?: string;
  tagline?: string;
}

export const TissLogo: React.FC<TissLogoProps> = ({
  className = '',
  showSubtitle = true,
  size = 'md',
  variant = 'light',
  customLogoUrl,
  logoName,
  logoSuffix,
  tagline,
}) => {
  const { cmsData } = useCMS();
  const identity = cmsData.siteIdentity;
  const activeLogoName = logoName || identity?.logoName || 'TISS';
  const activeLogoSuffix = logoSuffix || identity?.logoSuffix || 'CO. LTD.';
  const activeTagline = tagline || identity?.tagline || 'Building Businesses · Connecting Opportunities';
  const activeLogoUrl = customLogoUrl || identity?.customLogoUrl || cmsData.header?.customLogoUrl;

  // Dimensions tailored for crisp rendering and visibility
  const iconConfig = {
    sm: { box: 'w-9 h-9', pad: 'p-1', svgW: 30, svgH: 30, textTiss: 'text-lg', textCo: 'text-xs', subText: 'text-[7.5px]' },
    md: { box: 'w-11 h-11', pad: 'p-1.5', svgW: 38, svgH: 38, textTiss: 'text-xl', textCo: 'text-[13px]', subText: 'text-[8.5px]' },
    lg: { box: 'w-14 h-14', pad: 'p-2', svgW: 48, svgH: 48, textTiss: 'text-2xl', textCo: 'text-sm', subText: 'text-[9.5px]' },
  }[size];

  const textColor = variant === 'dark' ? 'text-white' : 'text-[#0F172A]';
  const coColor = variant === 'dark' ? 'text-[#38BDF8]' : 'text-[#0284C7]';
  const subtitleColor = variant === 'dark' ? 'text-slate-400' : 'text-slate-500';

  if (activeLogoUrl) {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <div className={`relative shrink-0 rounded-xl bg-white shadow-xs border border-slate-200 p-1 flex items-center justify-center ${iconConfig.box}`}>
          <img
            src={activeLogoUrl}
            alt={activeLogoName}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span className={`font-black tracking-[0.07em] ${textColor} ${iconConfig.textTiss}`}>
              {activeLogoName}
            </span>
            {activeLogoSuffix && (
              <span className={`font-extrabold tracking-[0.14em] ${coColor} ${iconConfig.textCo}`}>
                {activeLogoSuffix}
              </span>
            )}
          </div>
          {showSubtitle && (
            <span className={`font-bold tracking-[0.14em] uppercase mt-1 ${subtitleColor} ${iconConfig.subText}`}>
              {activeTagline}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 
        High-Visibility Mounting Base (Pedestal):
        A crisp, pure white rounded container with subtle border & shadow so the exact 3D ribbon emblem
        pops out with maximum clarity, vibrancy, and legibility on any background.
      */}
      <div
        className={`relative shrink-0 rounded-xl bg-white shadow-xs border border-slate-200/90 ring-1 ring-slate-100 flex items-center justify-center transition-all duration-300 group-hover:shadow-sm group-hover:scale-105 ${iconConfig.box} ${iconConfig.pad}`}
      >
        <svg
          width={iconConfig.svgW}
          height={iconConfig.svgH}
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xs overflow-visible"
        >
          <defs>
            {/* Cyan to Royal Blue Gradient */}
            <linearGradient id={`tissCyan_${size}_${variant}`} x1="100" y1="80" x2="360" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="35%" stopColor="#0288D1" />
              <stop offset="85%" stopColor="#0277BD" />
              <stop offset="100%" stopColor="#01579B" />
            </linearGradient>

            {/* Deep Purple to Magenta Spiral Gradient */}
            <linearGradient id={`tissPurple_${size}_${variant}`} x1="200" y1="120" x2="380" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#BA68C8" />
              <stop offset="30%" stopColor="#9C27B0" />
              <stop offset="70%" stopColor="#7B1FA2" />
              <stop offset="100%" stopColor="#4A148C" />
            </linearGradient>

            {/* Warm Orange to Golden Amber Gradient for Arrow Ribbon */}
            <linearGradient id={`tissOrange_${size}_${variant}`} x1="90" y1="330" x2="430" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF5722" />
              <stop offset="30%" stopColor="#FF9800" />
              <stop offset="75%" stopColor="#FFB74D" />
              <stop offset="100%" stopColor="#FFCA28" />
            </linearGradient>

            {/* Soft Layered Shadow */}
            <filter id={`tissShadow_${size}_${variant}`} x="-15%" y="-15%" width="135%" height="135%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="4" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.22" />
            </filter>
          </defs>

          <g filter={`url(#tissShadow_${size}_${variant})`}>
            {/* 1. Purple/Magenta Ribbon Sphere Base & Inner Vortex */}
            <path
              d="M190 195 C 240 135, 335 125, 360 215 C 380 280, 355 350, 275 365 C 205 375, 145 325, 175 270 C 195 235, 260 230, 280 200 C 295 175, 270 155, 240 160 C 210 165, 195 180, 190 195 Z"
              fill={`url(#tissPurple_${size}_${variant})`}
            />

            {/* Purple Bottom Curve Depth Layer */}
            <path
              d="M165 295 C 190 355, 270 375, 335 345 C 375 320, 385 270, 365 220 C 370 270, 345 330, 290 355 C 235 370, 180 340, 165 295 Z"
              fill="#4A148C"
              opacity="0.45"
            />

            {/* 2. Cyan / Azure Blue Sweeping Ribbon */}
            <path
              d="M285 88 C 190 85, 115 150, 102 245 C 95 305, 130 335, 165 325 C 120 285, 125 185, 195 130 C 255 85, 325 110, 345 150 C 365 190, 340 240, 280 265 C 215 290, 155 270, 135 240 C 150 280, 220 300, 290 275 C 365 245, 385 175, 355 125 C 330 95, 305 88, 285 88 Z"
              fill={`url(#tissCyan_${size}_${variant})`}
            />

            {/* 3. Ascending Golden-Orange Curved Ribbon Shaft */}
            <path
              d="M 92 282 C 86 312, 138 340, 202 322 C 266 304, 342 258, 382 225 L 366 205 C 330 235, 258 280, 198 296 C 145 310, 108 292, 102 272 Z"
              fill={`url(#tissOrange_${size}_${variant})`}
            />

            {/* 4. Ascending Golden Arrow Head & Terminal Beam */}
            <path
              d="M 102 272 C 155 335, 295 285, 376 220 L 362 195 L 438 168 L 416 244 L 392 220 C 322 282, 178 332, 92 282 Z"
              fill={`url(#tissOrange_${size}_${variant})`}
            />
          </g>
        </svg>
      </div>

      {/* Typography Wordmark Lockup */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-black tracking-[0.07em] transition-colors group-hover:text-[#0284C7] ${textColor} ${iconConfig.textTiss}`}
          >
            {activeLogoName}
          </span>
          {activeLogoSuffix && (
            <span className={`font-extrabold tracking-[0.14em] ${coColor} ${iconConfig.textCo}`}>
              {activeLogoSuffix}
            </span>
          )}
        </div>

        {showSubtitle && (
          <span
            className={`font-bold tracking-[0.14em] uppercase mt-1 ${subtitleColor} ${iconConfig.subText}`}
          >
            {activeTagline}
          </span>
        )}
      </div>
    </div>
  );
};
