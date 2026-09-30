import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Mail } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Page Not Found — TISS Corporation"
        description="The requested corporate directory path does not exist on the TISS Corporation website."
      />

      <div className="bg-[#F8FAFC] text-slate-900 min-h-[70vh] flex items-center justify-center py-24">
        <div className="max-w-xl mx-auto px-4 text-center space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0284C7] font-bold">
            Navigation Notice · 404
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            Page Not Found
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            The page or portfolio reference you requested could not be located in our group directory.
            Please use the navigation links below to return to active sections.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#0284C7] hover:bg-[#0369A1] transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </Link>

            <Link
              to="/businesses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-800 bg-white border border-slate-300 hover:border-slate-500 transition-colors shadow-xs"
            >
              <Compass className="w-4 h-4 text-[#0284C7]" />
              <span>Explore Businesses</span>
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-800 bg-white border border-slate-300 hover:border-slate-500 transition-colors shadow-xs"
            >
              <Mail className="w-4 h-4 text-[#0284C7]" />
              <span>Contact TISS</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
