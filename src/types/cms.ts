import { Business, TeamMember, CountryPresence } from './index';

export type TickerIconType = 'office' | 'pin' | 'mail' | 'global' | 'sparkle' | 'announcement' | 'link';

export interface TickerItemConfig {
  id: string;
  label: string;
  text: string;
  action: string | null;
  iconType: TickerIconType;
}

export interface TickerConfig {
  enabled: boolean;
  speed: number; // in seconds (e.g. 15 to 200, default 125)
  badgeLabel: string; // e.g. "TISS WIRE"
  items: TickerItemConfig[];
}

export interface HeaderConfig {
  brandName: string;
  brandTagline: string;
  customLogoUrl?: string;
  faviconUrl?: string;
  primaryEmail: string;
  contactNumber: string;
  ctaText: string;
  ctaLink: string;
  navLinks: {
    id: string;
    label: string;
    path: string;
    enabled: boolean;
    hasDropdown?: boolean;
  }[];
}

export interface SocialMediaLink {
  id: string;
  platform: 'linkedin' | 'facebook' | 'twitter' | 'youtube' | 'instagram' | 'whatsapp' | 'github' | 'globe';
  label: string;
  url: string;
  enabled: boolean;
}

export interface FooterLinkItem {
  id: string;
  label: string;
  path: string;
  group: 'overview' | 'quick' | 'legal';
  enabled: boolean;
}

export interface FooterConfig {
  brandStatement: string;
  aboutText: string;
  customLogoUrl?: string;
  corporateOffice: string;
  registeredOffice: string;
  internationalSummary: string;
  primaryEmail: string;
  secondaryEmail: string;
  copyrightText: string;
  disclaimer: string;
  socialLinks?: SocialMediaLink[];
  navLinks?: FooterLinkItem[];
}

export interface HomePageConfig {
  // Hero Section
  badgeText: string;
  headlineLine1: string;
  headlineLine2: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
  animationsEnabled: boolean; // toggle background pulse glow and network node animation
  animationSpeed: 'normal' | 'slow' | 'fast';

  // Snapshot / Stats Section
  scaleBadge: string;
  scaleHeadline: string;
  scaleSubheadline: string;
  metric1Label: string;
  metric1Value: string;
  metric1Subtext: string;
  metric2Label: string;
  metric2Value: string;
  metric2Subtext: string;
  metric3Label: string;
  metric3Value: string;
  metric3Subtext: string;
  metric4Label: string;
  metric4Value: string;
  metric4Subtext: string;

  // Portfolio Section
  portfolioBadge: string;
  portfolioHeadline: string;
  portfolioSubheadline: string;
  portfolioCtaLabel: string;
  portfolioCtaLink: string;

  // Corporate Heritage / Story Section
  heritageBadge: string;
  heritageHeadline: string;
  heritageParagraph1: string;
  heritageParagraph2: string;
  heritageCtaLabel: string;
  heritageCtaLink: string;
  heritageArchTitle: string;
  heritagePoint1Title: string;
  heritagePoint1Text: string;
  heritagePoint2Title: string;
  heritagePoint2Text: string;
  heritagePoint3Title: string;
  heritagePoint3Text: string;

  // Global Section
  globalBadge: string;
  globalHeadline: string;
  globalSubheadline: string;
  globalCtaLabel: string;
  globalCtaLink: string;

  // Approach / Strategy Section
  approachBadge: string;
  approachHeadline: string;
  approachSubheadline: string;

  // Final Call to Action Section
  ctaBadge: string;
  ctaHeadline: string;
  ctaSubheadline: string;
  ctaPrimaryLabel: string;
  ctaPrimaryLink: string;
  ctaSecondaryLabel: string;
  ctaSecondaryLink: string;
}

// Backward-compatibility alias
export type HeroConfig = HomePageConfig;

export interface BDChapterConfig {
  chapterName: string;
  totalEmployees: string;
  totalOffices: number;
  officesSummary: string;
  description: string;
}

export interface PageContentNarrative {
  // About Page
  aboutBadge?: string;
  aboutHeadline: string;
  aboutSubheadline: string;
  missionStatement: string;
  visionStatement: string;
  aboutMission?: string;
  aboutVision?: string;
  coreValuesText?: string;
  heritageSummaryText?: string;

  // Services Page
  servicesBadge?: string;
  servicesHeadline?: string;
  servicesSubheadline?: string;
  servicesModelNote?: string;

  // Global Presence Page
  globalBadge?: string;
  globalHeadline?: string;
  globalSubheadline?: string;
  globalAutonomyNote?: string;

  // Journey Page
  journeyBadge?: string;
  journeyHeadline?: string;
  journeySubheadline?: string;

  // Team Page
  teamBadge?: string;
  teamHeadline?: string;
  teamSubheadline?: string;

  // Contact Page
  contactBadge?: string;
  contactHeadline: string;
  contactSubheadline: string;
  contactResponseNotice: string;
  contactOfficeHours?: string;

  // Legal Pages
  privacyTitle?: string;
  privacyEffectiveDate?: string;
  privacyContent?: string;
  termsTitle?: string;
  termsEffectiveDate?: string;
  termsContent?: string;
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  badgeText?: string;
  heroHeadline: string;
  heroSubheadline: string;
  content: string; // Markdown or formatted text paragraphs
  published: boolean;
  showInHeaderNav: boolean;
  showInFooter: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  twitterCard: 'summary' | 'summary_large_image';
  canonicalBase: string;
  indexingEnabled: boolean;
  googleSiteVerification?: string;
  pageOverrides?: Record<string, { title?: string; description?: string; keywords?: string }>;
}

export interface AdminCredentials {
  username: string;
  passwordHash: string;
}

export interface AnimationConfig {
  enabled: boolean; // Master toggle for animations
  entranceFades: boolean; // Page and section entrance fades
  scrollReveals: boolean; // Scroll-triggered reveals
  heroAmbientGlow: boolean; // Glowing backdrop lights
  floatingBadges: boolean; // Floating badges motion
  tickerSpeed: number; // Seconds for full marquee cycle (e.g. 15s - 180s)
  tickerPauseOnHover: boolean; // Pause ticker on hover
  cardHoverEffects: boolean; // Lift and scale card effects
  smoothScroll: boolean; // Smooth scrolling behavior
  animationSpeedPreset: 'slow' | 'normal' | 'fast';
}

export interface ThemeConfig {
  preset: 'sky_corporate' | 'navy_executive' | 'gold_obsidian' | 'emerald_prestige' | 'crimson_enterprise' | 'custom';
  primaryColor: string; // Default #0284C7
  primaryHoverColor: string; // Default #0369A1
  accentColor: string; // Default #38BDF8
  secondaryColor: string; // Default #B99A62 (Gold)
  pageBackground: string; // Default #F8FAFC
  surfaceCardBackground: string; // Default #FFFFFF
  footerBackground: string; // Default #0B1522
  textHeadingColor: string; // Default #0F172A
  badgeBgColor: string; // Default #E0F2FE
  badgeTextColor: string; // Default #0284C7
}

export interface SiteIdentityConfig {
  logoName: string; // e.g. "TISS"
  logoSuffix: string; // e.g. "CO. LTD."
  tagline: string; // e.g. "Building Businesses · Connecting Opportunities"
  customLogoUrl?: string;
  adminPortalTitle: string; // e.g. "TISS Corporate Portal"
  adminPortalSubtitle: string; // e.g. "Content Management & Operational System"
  adminPortalNotice: string; // e.g. "Authorized Administrative Access"
}

export type AdminRole = 'super_admin' | 'assistant_admin' | 'seo_editor' | 'content_writer';

export interface AdminUser {
  id: string;
  username: string;
  displayName: string;
  role: AdminRole;
  passwordHash: string;
  email: string;
  active: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface AdminLoginAudit {
  id: string;
  username: string;
  displayName: string;
  role: AdminRole;
  timestamp: string;
  ipAddress?: string;
  deviceInfo?: string;
  success: boolean;
}

export interface SiteCMSData {
  version: number;
  lastUpdated: string;
  lastPublishedAt?: string;
  ticker: TickerConfig;
  header: HeaderConfig;
  footer: FooterConfig;
  hero: HomePageConfig;
  bdChapter: BDChapterConfig;
  teamMembers: TeamMember[];
  businesses: Business[];
  countries: CountryPresence[];
  narratives: PageContentNarrative;
  customPages: CustomPage[];
  seo: SEOConfig;
  adminCredentials: AdminCredentials;
  animation: AnimationConfig;
  theme: ThemeConfig;
  siteIdentity: SiteIdentityConfig;
  adminUsers: AdminUser[];
  adminLoginAudits: AdminLoginAudit[];
}
