import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Mail } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-[#0B1522] via-[#0F172A] to-[#1E293B] py-24 text-white relative overflow-hidden">
      {/* Animated Ambient Glow Circles in Background */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0284C7]/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-float" />

      {/* Subtle Grid Accent */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-7">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-500/15 border border-sky-400/30 text-xs font-bold uppercase tracking-[0.18em] text-[#38BDF8] animate-float">
          <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Strategic Collaboration</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight [text-wrap:balance]">
          Let’s Explore What We Can Build Together.
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Connect with TISS Corporation to discuss business opportunities, corporate relationships,
          service partnerships, or commercial collaboration across our diversified portfolio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
          <Link
            to="/contact"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-[#38BDF8] hover:text-slate-900 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/businesses"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white border border-slate-600 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Explore Portfolio</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
