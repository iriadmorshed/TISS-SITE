import React, { useEffect } from 'react';
import { X, Award, CheckCircle2, Briefcase, Mail, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { TeamMember } from '../../types';

interface TeamSpotlightModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectMember: (member: TeamMember) => void;
  allMembers: TeamMember[];
}

export const TeamSpotlightModal: React.FC<TeamSpotlightModalProps> = ({
  member,
  isOpen,
  onClose,
  onSelectMember,
  allMembers,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  const currentIndex = allMembers.findIndex((m) => m.id === member.id);
  const prevMember = allMembers[(currentIndex - 1 + allMembers.length) % allMembers.length];
  const nextMember = allMembers[(currentIndex + 1) % allMembers.length];

  // Derive initials
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('');

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="spotlight-title"
    >
      {/* Dimmed backdrop with blur */}
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Ribbon */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-20 px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest text-[#0284C7] font-bold bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Leadership Spotlight</span>
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              [{currentIndex + 1} of {allMembers.length}]
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Quick Prev/Next buttons */}
            <button
              type="button"
              onClick={() => onSelectMember(prevMember)}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title={`Previous: ${prevMember.name}`}
              aria-label="Previous team member"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => onSelectMember(nextMember)}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title={`Next: ${nextMember.name}`}
              aria-label="Next team member"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="w-px h-5 bg-slate-200 mx-1" />
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close spotlight modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Identity Block */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.avatarColor} shadow-md flex items-center justify-center font-black text-2xl tracking-wider shrink-0 border border-white/20`}
            >
              {initials}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white bg-[#0284C7] px-2.5 py-0.5 rounded-full">
                  {member.role}
                </span>
                {member.isBridgeRole && (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Inter-Entity Bridge
                  </span>
                )}
                <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase">
                  Division: {member.divisionCode}
                </span>
              </div>

              <h2 id="spotlight-title" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {member.name}
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                <span>{member.department}</span>
              </p>
            </div>
          </div>

          {/* Full Professional Biography */}
          <div className="space-y-3 p-5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#0284C7] font-bold block">
              Professional Biography & Mandate
            </span>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {member.fullBio}
            </p>
          </div>

          {/* Key Professional Achievements */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#0284C7]" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Key Professional Achievements
              </h3>
            </div>

            <div className="space-y-2.5">
              {member.achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-[#0284C7] transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Focus Areas */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
              Strategic Focus Areas
            </span>
            <div className="flex flex-wrap gap-2">
              {member.focusAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-md border border-slate-200"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Leadership Pillars */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
              Core Leadership Pillars
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {member.keyLeadershipPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-sky-50/50 border border-sky-100 rounded-lg text-center"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 block">
                    {pillar}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Direct Channel */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#0284C7]" />
              <span className="font-medium">Direct Inquiries:</span>
              <a
                href={`mailto:${member.email}`}
                className="font-mono font-bold text-[#0284C7] hover:underline"
              >
                {member.email}
              </a>
            </div>

            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>TISS Corporation Executive Office</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-100 flex items-center justify-between rounded-b-2xl">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Viewing:</span>
            <span className="font-bold text-slate-900">{member.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectMember(nextMember)}
              className="text-xs font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors"
            >
              Next: {nextMember.name} →
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
