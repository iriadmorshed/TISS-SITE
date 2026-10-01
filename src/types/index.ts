export type BusinessStatus =
  | 'operating'
  | 'development'
  | 'planned'
  | 'coming-soon'
  | 'regulatory'
  | 'status-to-be-confirmed';

export interface BusinessStatusConfig {
  label: string;
  badgeClass: string;
  dotClass: string;
  description: string;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: string;
  sectorCode: string;
  positioning: string;
  headline: string;
  description: string;
  extendedOverview: string;
  services: string[];
  audience: string[];
  strategicFit: string;
  status: BusinessStatus;
  statusPublic: boolean;
  statusNote?: string;
  regulatoryNote?: string;
  publicWebsite?: string;
  websiteApproved: boolean;
  themeColor: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  heroLayoutPattern: 'technical-split' | 'editorial-column' | 'wide-focus' | 'minimal-stacked';
}

export interface ExternalPresence {
  entity: string;
  type: 'website' | 'linkedin' | 'recruitment' | 'other';
  label: string;
  url: string;
  verificationLevel: 'tier-a-confirmed' | 'tier-b-public-reference' | 'verification-required';
  approvedForPublication: boolean;
  notes: string;
}

export interface CountryPresence {
  country: string;
  countryCode: string;
  formation: boolean;
  operations: boolean;
  office: boolean;
  officeType?: string;
  specializedFields?: string[];
  scopeModel?: 'specialized' | 'diversified';
  commercialReach: boolean;
  verified: boolean;
  publish: boolean;
  description?: string;
  legalAutonomyNote?: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  status: 'confirmed' | 'planned' | 'in-progress';
  description: string;
  details?: string[];
  verificationLevel: 'tier-a-confirmed' | 'tier-b-public' | 'verification-required';
}

export interface OfficeAddressDetails {
  title: string;
  house: string;
  floor: string;
  avenueOrRoad: string;
  sector: string;
  city: string;
  fullAddress: string;
}

export interface ContactConfig {
  officialEmail: string;
  secondaryEmail?: string;
  officialPhone: string | null;
  officialWebsite: string;
  registeredAddress: string;
  corporateOffice: string;
  registeredOfficeDetails: OfficeAddressDetails;
  corporateOfficeDetails: OfficeAddressDetails;
  inquiryNotice: string;
  internalVerificationNote: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  departmentCategory:
    | 'executive'
    | 'operations'
    | 'it'
    | 'coordination'
    | 'hr'
    | 'finance'
    | 'legal'
    | 'supply-chain';
  divisionCode: string;
  bio: string;
  fullBio: string;
  focusAreas: string[];
  achievements: string[];
  keyLeadershipPillars: string[];
  email: string;
  avatarColor: string;
  imageUrl?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    website?: string;
    phone?: string;
  };
  isBridgeRole?: boolean;
}
