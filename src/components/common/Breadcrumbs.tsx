import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumbs"
      className="flex items-center text-xs text-slate-500 py-3 overflow-x-auto whitespace-nowrap"
    >
      <Link
        to="/"
        className="hover:text-[#0284C7] font-semibold transition-colors focus:outline-none"
      >
        Home
      </Link>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400 shrink-0" aria-hidden="true" />
            {isLast || !item.path ? (
              <span className="text-slate-900 font-bold truncate max-w-xs" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-[#0284C7] font-medium transition-colors focus:outline-none"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
