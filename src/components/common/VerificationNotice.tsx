import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface VerificationNoticeProps {
  type?: 'regulatory' | 'info' | 'statutory';
  title?: string;
  message: string;
  className?: string;
}

export const VerificationNotice: React.FC<VerificationNoticeProps> = ({
  type = 'info',
  title,
  message,
  className = '',
}) => {
  const isRegulatory = type === 'regulatory' || type === 'statutory';

  return (
    <div
      className={`p-4 border text-xs leading-relaxed ${
        isRegulatory
          ? 'bg-amber-50/80 border-amber-200 text-amber-900'
          : 'bg-sky-50/80 border-sky-200 text-slate-800'
      } ${className}`}
      role="note"
    >
      <div className="flex items-start gap-2.5">
        {isRegulatory ? (
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        ) : (
          <Info className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
        )}
        <div className="space-y-1">
          {title && (
            <p className="font-bold tracking-wider uppercase text-[11px] text-slate-900">
              {title}
            </p>
          )}
          <p className="text-slate-700 font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};
