export interface NavItem {
  label: string;
  path: string;
  isExternal?: boolean;
}

export const mainNavItems: NavItem[] = [
  { label: 'About', path: '/about' },
  { label: 'Businesses', path: '/businesses' },
  { label: 'Services', path: '/services' },
  { label: 'Global Presence', path: '/global-presence' },
  { label: 'Journey', path: '/journey' },
  { label: 'Contact', path: '/contact' },
];

export const corporateSectors = [
  { name: 'Technology & Software', code: 'TECH', targetSlug: 'parameter-x' },
  { name: 'BPO & Communication', code: 'BPO', targetSlug: 'qubely-connectpoint' },
  { name: 'Logistics & Courier', code: 'LOGISTICS', targetSlug: 'qubely-cargolink' },
  { name: 'Ambient & Outdoor Media', code: 'MEDIA', targetSlug: 'huixin-global-adwings' },
  { name: 'Business Advisory', code: 'ADVISORY', targetSlug: 'qubely-capitals' },
  { name: 'Travel & Mobility', code: 'TRAVEL', targetSlug: 'qubely-holidays' },
  { name: 'Consumer Retail', code: 'RETAIL', targetSlug: 'qubely-mega-mart' },
  { name: 'Financial Connectivity', code: 'FINANCE', targetSlug: 'qubely-exchange' },
  { name: 'Digital Growth & Creative', code: 'MARKETING', targetSlug: 'qubely-digital-solutions' },
  { name: 'International Jute Trade', code: 'TRADE', targetSlug: 'tgb-global-trading' },
];
