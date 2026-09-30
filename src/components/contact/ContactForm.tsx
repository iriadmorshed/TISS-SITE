import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { businesses } from '../../data/businesses';
import { inquiryTypes } from '../../data/contact';

interface FormData {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  inquiryType: string;
  businessOfInterest: string;
  message: string;
  privacyConsent: boolean;
}

interface FormErrors {
  fullName?: string;
  organization?: string;
  email?: string;
  inquiryType?: string;
  message?: string;
  privacyConsent?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    inquiryType: 'General Inquiry',
    businessOfInterest: 'TISS Corporation (Corporate)',
    message: '',
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Corporate email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Please provide details of your inquiry (minimum 15 characters).';
    }
    if (!formData.privacyConsent) {
      errs.privacyConsent = 'Please acknowledge that corporate inquiry details will be processed confidentially.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionFeedback(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionFeedback(
        'Thank you. Your commercial inquiry has been recorded. Our corporate coordination team will reach out directly.'
      );
      setFormData({
        fullName: '',
        organization: '',
        email: '',
        phone: '',
        inquiryType: 'General Inquiry',
        businessOfInterest: 'TISS Corporation (Corporate)',
        message: '',
        privacyConsent: false,
      });
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {submissionFeedback && (
        <div
          className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-3"
          role="status"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-xs uppercase tracking-wider text-emerald-900">Inquiry Received</p>
            <p className="mt-0.5 leading-relaxed font-medium">{submissionFeedback}</p>
          </div>
        </div>
      )}

      {/* Row 1: Full Name & Organization */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="block text-xs font-bold text-slate-800">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={`w-full bg-slate-50 border py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0284C7] transition-colors ${
              errors.fullName ? 'border-rose-400' : 'border-slate-300'
            }`}
            placeholder="e.g. Eleanor Vance"
          />
          {errors.fullName && (
            <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.fullName}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="organization" className="block text-xs font-bold text-slate-800">
            Organization / Company
          </label>
          <input
            id="organization"
            type="text"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className="w-full bg-slate-50 border border-slate-300 py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0284C7] transition-colors"
            placeholder="e.g. Apex Trade Holdings"
          />
        </div>
      </div>

      {/* Row 2: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-bold text-slate-800">
            Corporate Email <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full bg-slate-50 border py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0284C7] transition-colors ${
              errors.email ? 'border-rose-400' : 'border-slate-300'
            }`}
            placeholder="e.g. vance@company.com"
          />
          {errors.email && (
            <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="phone" className="block text-xs font-bold text-slate-800">
            Phone / WhatsApp Number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-slate-50 border border-slate-300 py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0284C7] transition-colors"
            placeholder="e.g. +880 1700 000000"
          />
        </div>
      </div>

      {/* Row 3: Inquiry Type & Business of Interest */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="inquiryType" className="block text-xs font-bold text-slate-800">
            Inquiry Classification
          </label>
          <select
            id="inquiryType"
            value={formData.inquiryType}
            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
            className="w-full bg-slate-50 border border-slate-300 py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0284C7] transition-colors font-medium"
          >
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="businessOfInterest" className="block text-xs font-bold text-slate-800">
            Business of Interest
          </label>
          <select
            id="businessOfInterest"
            value={formData.businessOfInterest}
            onChange={(e) => setFormData({ ...formData, businessOfInterest: e.target.value })}
            className="w-full bg-slate-50 border border-slate-300 py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0284C7] transition-colors font-medium"
          >
            <option value="TISS Corporation (Corporate)">TISS Corporation (Corporate Group)</option>
            {businesses.map((biz) => (
              <option key={biz.id} value={biz.name}>
                {biz.name} ({biz.sectorCode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs font-bold text-slate-800">
          Message & Commercial Context <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`w-full bg-slate-50 border py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0284C7] transition-colors ${
            errors.message ? 'border-rose-400' : 'border-slate-300'
          }`}
          placeholder="Please outline the nature of your inquiry, commercial scope, or service requirements..."
        />
        {errors.message && (
          <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3" /> {errors.message}
          </p>
        )}
      </div>

      {/* Privacy Consent Checkbox */}
      <div className="space-y-1">
        <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-600 select-none font-medium">
          <input
            type="checkbox"
            checked={formData.privacyConsent}
            onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
            className="mt-0.5 border-slate-300 text-[#0284C7] focus:ring-[#0284C7]"
          />
          <span>
            I acknowledge that corporate information provided in this inquiry will be processed confidentially
            by TISS Corporation coordination team.
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="text-[11px] text-rose-500 flex items-center gap-1 pl-6 font-medium">
            <AlertCircle className="w-3 h-3" /> {errors.privacyConsent}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all shadow-md disabled:opacity-50 cursor-pointer"
      >
        <span>{isSubmitting ? 'Transmitting...' : 'Submit Corporate Inquiry'}</span>
        <Send className="w-3.5 h-3.5" />
      </button>
    </form>
  );
};
