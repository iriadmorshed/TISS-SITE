import React from 'react';
import { BusinessStatus } from '../../types';
import { statusConfigMap } from '../../data/businesses';

interface BusinessStatusBadgeProps {
  status: BusinessStatus;
  size?: 'sm' | 'md';
}

export const BusinessStatusBadge: React.FC<BusinessStatusBadgeProps> = ({
  status,
  size = 'md',
}) => {
  const config = statusConfigMap[status] || statusConfigMap['status-to-be-confirmed'];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase rounded-none transition-colors ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]'
      } ${config.badgeClass}`}
      title={config.description}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-none shrink-0 ${config.dotClass}`}
        aria-hidden="true"
      />
      <span className="whitespace-nowrap font-semibold">{config.label}</span>
    </span>
  );
};
