import React from 'react';
import { MapPin, Mail, Sparkles, Building2, Megaphone, ArrowUpRight, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TickerBar: React.FC = () => {
  const tickerItems = [
    {
      icon: <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />,
      label: 'Corporate Office',
      text: 'House-59, 6th Floor, Road-13, Sector-13, Uttara, Dhaka-1230',
      action: null,
    },
    {
      icon: <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />,
      label: 'Registered Office',
      text: 'House-28, 6th Floor, 9 Ave., Sec-15D, Uttara, Dhaka-1230',
      action: null,
    },
    {
      icon: <Mail className="w-3.5 h-3.5 text-emerald-400" />,
      label: 'Corporate Emails',
      text: 'info@tisscoltd.com · tisscorporation@gmail.com',
      action: 'mailto:info@tisscoltd.com',
    },
    {
      icon: <Globe2 className="w-3.5 h-3.5 text-[#38BDF8]" />,
      label: 'Global Operations',
      text: 'Operations Across Autonomous Chapters: Bangladesh, Hong Kong, Thailand, UK, China, and India',
      action: '/global-presence',
    },
    {
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
      label: 'Retail Operations',
      text: 'Qubely Mega Mart Ltd. incorporated, prime retail premises secured, vendor procurement active ahead of launch',
      action: '/businesses/qubely-mega-mart',
    },
    {
      icon: <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />,
      label: 'TISS Corporation',
      text: 'Diversified Business Group · 10 Specialized Portfolio Entities · Activities in Bangladesh Since 2017',
      action: '/about',
    },
  ];

  return (
    <div className="bg-[#0B1522] text-slate-200 border-b border-slate-800 text-xs overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Fixed Left Tag Label with Live Signal */}
        <div className="z-10 bg-[#070E17] text-white px-4 py-2 border-r border-slate-800 shrink-0 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#38BDF8] flex items-center gap-1">
            <Megaphone className="w-3 h-3 text-[#38BDF8]" />
            <span>TISS WIRE</span>
          </span>
        </div>

        {/* Continuous Animated Marquee Ticker Track */}
        <div className="overflow-hidden flex-1 relative py-2">
          {/* Gradient fade on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0B1522] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0B1522] to-transparent pointer-events-none z-10" />

          <div className="animate-ticker flex items-center gap-8 whitespace-nowrap">
            {/* Set 1 */}
            {tickerItems.map((item, idx) => (
              <div key={`t1-${idx}`} className="inline-flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 font-semibold text-slate-300">
                  {item.icon}
                  <span className="text-[11px] font-mono uppercase text-[#38BDF8] font-bold">
                    {item.label}:
                  </span>
                </span>
                {item.action ? (
                  item.action.startsWith('mailto:') ? (
                    <a
                      href={item.action}
                      className="text-slate-200 hover:text-[#38BDF8] hover:underline font-mono text-[11px] transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <Link
                      to={item.action}
                      className="text-slate-200 hover:text-[#38BDF8] hover:underline transition-colors flex items-center gap-1"
                    >
                      <span>{item.text}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </Link>
                  )
                ) : (
                  <span className="text-slate-300 font-medium">{item.text}</span>
                )}
                <span className="text-slate-700 ml-4">✦</span>
              </div>
            ))}

            {/* Set 2 (Duplicate for seamless loop) */}
            {tickerItems.map((item, idx) => (
              <div key={`t2-${idx}`} className="inline-flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 font-semibold text-slate-300">
                  {item.icon}
                  <span className="text-[11px] font-mono uppercase text-[#38BDF8] font-bold">
                    {item.label}:
                  </span>
                </span>
                {item.action ? (
                  item.action.startsWith('mailto:') ? (
                    <a
                      href={item.action}
                      className="text-slate-200 hover:text-[#38BDF8] hover:underline font-mono text-[11px] transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <Link
                      to={item.action}
                      className="text-slate-200 hover:text-[#38BDF8] hover:underline transition-colors flex items-center gap-1"
                    >
                      <span>{item.text}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </Link>
                  )
                ) : (
                  <span className="text-slate-300 font-medium">{item.text}</span>
                )}
                <span className="text-slate-700 ml-4">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
