import { SiteCMSData } from '../types/cms';
import { businesses } from './businesses';
import { teamMembers, bdChapterStats } from './team';
import { CountryPresence } from '../types';

export const defaultCountries: CountryPresence[] = [
  {
    country: 'Bangladesh',
    countryCode: 'BD',
    formation: true,
    operations: true,
    office: true,
    officeType: '3 Corporate & Operational Hubs (Uttara, Dhaka)',
    specializedFields: ['Enterprise Tech', '24/7 BPO', 'Supermarket Retail', 'Logistics', 'Ambient Media', 'Travel'],
    scopeModel: 'diversified',
    commercialReach: true,
    verified: true,
    publish: true,
    description:
      'Independent operating chapter with 150+ professionals across 3 offices, managing diversified operations in technology, BPO, retail, freight, and media since 2017.',
    legalAutonomyNote: 'Autonomous BD corporate entity adhering to Bangladesh statutory corporate & labor laws, interconnected via group communication network.',
  },
  {
    country: 'Hong Kong',
    countryCode: 'HK',
    formation: true,
    operations: true,
    office: true,
    officeType: 'Chapter Office (Central, Hong Kong)',
    specializedFields: ['Cross-Border Trade Finance', 'Foreign Exchange Settlement', 'Corporate Governance'],
    scopeModel: 'specialized',
    commercialReach: true,
    verified: true,
    publish: true,
    description:
      'Dedicated chapter office serving as an international financial and trade gateway for structured multi-currency commerce and regional holding liaison.',
    legalAutonomyNote: 'Operates as an independent Hong Kong registered company governed by Hong Kong corporate & financial regulations.',
  },
  {
    country: 'Thailand',
    countryCode: 'TH',
    formation: true,
    operations: true,
    office: true,
    officeType: 'Chapter Office (Bangkok)',
    specializedFields: ['Elevator & Ambient Media', 'FMCG Cross-Border Trade', 'Regional Travel Logistics'],
    scopeModel: 'diversified',
    commercialReach: true,
    verified: true,
    publish: true,
    description:
      'Dedicated chapter office coordinating multi-field activities across Southeast Asian digital ambient advertising, retail FMCG sourcing, and travel channels.',
    legalAutonomyNote: 'Operates autonomously under Thailand commercial business laws and regional regulatory framework.',
  },
  {
    country: 'United Kingdom (UK)',
    countryCode: 'GB',
    formation: true,
    operations: true,
    office: true,
    officeType: 'Chapter Office (London)',
    specializedFields: ['European Business Advisory', 'Technology Consulting', 'Cross-Border Compliance'],
    scopeModel: 'specialized',
    commercialReach: true,
    verified: true,
    publish: true,
    description:
      'Dedicated chapter office delivering strategic European commercial linkages, bilateral trade facilitation, and technology consulting partnerships.',
    legalAutonomyNote: 'Operates autonomously as a UK registered company complying with Companies House and UK commercial statutes.',
  },
  {
    country: 'China',
    countryCode: 'CN',
    formation: true,
    operations: true,
    office: true,
    officeType: 'Chapter Office & Sourcing Hub (Guangzhou / Shenzhen)',
    specializedFields: ['Hardware & Tech Sourcing', 'Factory QA Inspections', 'Export Freight Consolidation'],
    scopeModel: 'specialized',
    commercialReach: true,
    verified: true,
    publish: true,
    description:
      'Dedicated chapter office commanding direct manufacturer relationships, electronics component procurement, quality inspection, and international maritime freight.',
    legalAutonomyNote: 'Operates under PRC commercial and foreign trade legal standards, coordinated via group protocols.',
  },
  {
    country: 'India',
    countryCode: 'IN',
    formation: true,
    operations: true,
    office: true,
    officeType: 'Chapter Office (Kolkata / Regional Corridor)',
    specializedFields: ['Regional Agro-Commodities', 'Raw Jute Supply Corridors', 'Industrial Sourcing'],
    scopeModel: 'specialized',
    commercialReach: true,
    verified: true,
    publish: true,
    description:
      'Dedicated chapter office driving South Asian commodity trading, raw jute procurement, cross-border agro-logistics, and regional supply chain agreements.',
    legalAutonomyNote: 'Operates autonomously under Indian corporate law and interstate commercial regulations.',
  },
];

export const defaultCMSData: SiteCMSData = {
  version: 1,
  lastUpdated: new Date().toISOString(),
  ticker: {
    enabled: true,
    speed: 125, // in seconds
    badgeLabel: 'TISS WIRE',
    items: [
      {
        id: 'tick-1',
        label: 'Corporate Office',
        text: 'House-59, 6th Floor, Road-13, Sector-13, Uttara, Dhaka-1230',
        action: null,
        iconType: 'office',
      },
      {
        id: 'tick-2',
        label: 'Registered Office',
        text: 'House-28, 6th Floor, 9 Ave., Sec-15D, Uttara, Dhaka-1230',
        action: null,
        iconType: 'pin',
      },
      {
        id: 'tick-3',
        label: 'Corporate Emails',
        text: 'info@tisscoltd.com · tisscorporation@gmail.com',
        action: 'mailto:info@tisscoltd.com',
        iconType: 'mail',
      },
      {
        id: 'tick-4',
        label: 'Global Operations',
        text: 'Offices Across 6 Autonomous Chapters: Bangladesh, Hong Kong, Thailand, UK, China, and India',
        action: '/global-presence',
        iconType: 'global',
      },
      {
        id: 'tick-5',
        label: 'Workforce & Hubs',
        text: '150+ Professional Workforce Operating Across 3 Strategic Corporate & Operational Hubs in Dhaka',
        action: '/team',
        iconType: 'sparkle',
      },
      {
        id: 'tick-6',
        label: 'Retail Operations',
        text: 'Qubely Mega Mart Ltd. incorporated, prime retail premises secured, vendor procurement active ahead of launch',
        action: '/businesses/qubely-mega-mart',
        iconType: 'announcement',
      },
      {
        id: 'tick-7',
        label: 'TISS Corporation',
        text: 'Diversified Business Group · 10 Specialized Portfolio Entities · Activities in Bangladesh Since 2017',
        action: '/about',
        iconType: 'office',
      },
    ],
  },
  header: {
    brandName: 'TISS Co. Ltd.',
    brandTagline: 'Building Businesses. Connecting Opportunities.',
    customLogoUrl: '',
    faviconUrl: '',
    primaryEmail: 'info@tisscoltd.com',
    contactNumber: '+880 2 4895 1230',
    ctaText: 'Contact Us',
    ctaLink: '/contact',
    navLinks: [
      { id: 'nav-1', label: 'About', path: '/about', enabled: true },
      { id: 'nav-2', label: 'Businesses', path: '/businesses', enabled: true, hasDropdown: true },
      { id: 'nav-3', label: 'Services', path: '/services', enabled: true },
      { id: 'nav-4', label: 'Global Presence', path: '/global-presence', enabled: true },
      { id: 'nav-5', label: 'Journey', path: '/journey', enabled: true },
      { id: 'nav-6', label: 'Leadership', path: '/team', enabled: true },
    ],
  },
  footer: {
    brandStatement: 'Building Businesses. Connecting Opportunities.',
    aboutText:
      'A diversified business group bringing together specialized businesses across technology, enterprise communication, logistics, advertising, advisory, travel, modern retail, and international trade.',
    customLogoUrl: '',
    corporateOffice: 'House-59, 6th Floor, Road-13, Sector-13, Uttara, Dhaka-1230, Bangladesh',
    registeredOffice: 'House-28, 6th Floor, 9 Ave., Sec-15D, Uttara, Dhaka-1230, Bangladesh',
    internationalSummary: 'Hong Kong · Thailand · United Kingdom (UK) · China · India',
    primaryEmail: 'info@tisscoltd.com',
    secondaryEmail: 'tisscorporation@gmail.com',
    copyrightText: 'TISS Co. Ltd. (TISS Corporation). All rights reserved.',
    disclaimer:
      'All enterprise entities operate with autonomous legal compliance under their respective sovereign jurisdictions, synchronized via unified corporate communication.',
    socialLinks: [
      {
        id: 'soc-1',
        platform: 'linkedin',
        label: 'LinkedIn',
        url: 'https://linkedin.com/company/tiss-corporation',
        enabled: true,
      },
      {
        id: 'soc-2',
        platform: 'facebook',
        label: 'Facebook',
        url: 'https://facebook.com/tisscorporation',
        enabled: true,
      },
      {
        id: 'soc-3',
        platform: 'twitter',
        label: 'Twitter / X',
        url: 'https://x.com/tisscorporation',
        enabled: true,
      },
      {
        id: 'soc-4',
        platform: 'whatsapp',
        label: 'WhatsApp Business',
        url: 'https://wa.me/880248951230',
        enabled: true,
      },
      {
        id: 'soc-5',
        platform: 'youtube',
        label: 'YouTube',
        url: 'https://youtube.com/@tisscorporation',
        enabled: false,
      },
    ],
    navLinks: [
      { id: 'fn-1', label: 'About TISS Corporation', path: '/about', group: 'overview', enabled: true },
      { id: 'fn-2', label: 'Portfolio Directory (10 Entities)', path: '/businesses', group: 'overview', enabled: true },
      { id: 'fn-3', label: 'Group Capabilities & Services', path: '/services', group: 'overview', enabled: true },
      { id: 'fn-4', label: 'Global Presence & Foundation', path: '/global-presence', group: 'overview', enabled: true },
      { id: 'fn-5', label: 'Our Corporate Journey', path: '/journey', group: 'overview', enabled: true },
      { id: 'fn-6', label: 'Leadership & Directorate', path: '/team', group: 'overview', enabled: true },
      { id: 'fn-7', label: 'Contact & Business Dialogue', path: '/contact', group: 'overview', enabled: true },
      { id: 'fn-8', label: 'Privacy Policy', path: '/privacy', group: 'legal', enabled: true },
      { id: 'fn-9', label: 'Terms of Use', path: '/terms', group: 'legal', enabled: true },
    ],
  },
  hero: {
    // Hero Section
    badgeText: 'TISS Corporation · 10 Specialized Enterprises',
    headlineLine1: 'Building Businesses.',
    headlineLine2: 'Connecting Opportunities.',
    subheadline:
      'A diversified corporate group bringing together autonomous specialized businesses across software engineering, customer operations, modern retail, freight logistics, elevator media, and international trade.',
    primaryCtaLabel: 'Explore 10 Enterprises',
    primaryCtaLink: '/businesses',
    secondaryCtaLabel: 'View Leadership & BD Chapter',
    secondaryCtaLink: '/team',
    animationsEnabled: true,
    animationSpeed: 'normal',

    // Snapshot / Stats Section
    scaleBadge: 'Corporate Scale & Scope',
    scaleHeadline: 'An Ecosystem of Specialized Businesses',
    scaleSubheadline:
      'TISS Corporation unites diversified capabilities under dedicated operating entities, fostering domain leadership, client satisfaction, and continuous commercial expansion.',
    metric1Label: 'Personnel in BD',
    metric1Value: '150+',
    metric1Subtext: 'Across engineering, CX, retail, and coordination squads',
    metric2Label: 'Offices in Dhaka',
    metric2Value: '3',
    metric2Subtext: 'Corporate, Registered, and delivery facilities',
    metric3Label: 'Portfolio Businesses',
    metric3Value: '10',
    metric3Subtext: 'Operating across technology, BPO, logistics, and retail',
    metric4Label: 'Countries Present',
    metric4Value: '6',
    metric4Subtext: 'Autonomous chapters with physical offices and local compliance',

    // Portfolio Section
    portfolioBadge: 'Multi-Sector Capabilities',
    portfolioHeadline: 'The Portfolio Mosaic',
    portfolioSubheadline:
      'Explore our 10 operating enterprises spanning technology, BPO, modern retail, freight, and ambient advertising.',
    portfolioCtaLabel: 'Complete Business Directory',
    portfolioCtaLink: '/businesses',

    // Corporate Heritage / Story Section
    heritageBadge: 'Corporate Heritage',
    heritageHeadline: 'Built on Experience. Oriented Toward Opportunity.',
    heritageParagraph1:
      'TISS Co. Ltd. (TISS Corporation) has a company formation background across five countries and has been actively conducting business in Bangladesh since 2017. Our portfolio reflects a disciplined approach to nurturing specialized enterprises across multiple key sectors.',
    heritageParagraph2:
      'Rather than centralizing all activities under a rigid monolithic framework, the group empowers autonomous operational units. Each business possesses dedicated sector capabilities, modern infrastructure, and agile leadership, backed by the parent company’s corporate governance and long-term capital stability.',
    heritageCtaLabel: 'Read Full Corporate Profile',
    heritageCtaLink: '/about',
    heritageArchTitle: 'Corporate Architecture: Diversified Group Model',
    heritagePoint1Title: 'International Outlook',
    heritagePoint1Text:
      'Company formation background across 5 jurisdictions provides wide perspective on cross-border trade, commercial partnerships, and compliance standards.',
    heritagePoint2Title: 'Operating Maturity',
    heritagePoint2Text:
      'Active commercial track record in Bangladesh since 2017 across software, business process outsourcing, retail mart, freight forwarding, and media.',
    heritagePoint3Title: 'Independent Operating Structure',
    heritagePoint3Text:
      'Subsidiary companies operate autonomously with dedicated domain teams, while maintaining common corporate values and statutory governance.',

    // Global Section
    globalBadge: 'Global Reach & Governance',
    globalHeadline: 'Operating Across 6 Sovereign Chapters',
    globalSubheadline:
      'Dedicated physical offices established in Bangladesh, Hong Kong, Thailand, UK, China, and India, operating under local legal autonomy.',
    globalCtaLabel: 'Explore Global Presence',
    globalCtaLink: '/global-presence',

    // Approach / Strategy Section
    approachBadge: 'Operating Model',
    approachHeadline: 'Strategic Pillars of Group Governance',
    approachSubheadline:
      'Guiding principles ensuring independence of subsidiaries while unlocking shared operational scale.',

    // Final Call to Action Section
    ctaBadge: 'Strategic Collaboration',
    ctaHeadline: 'Let’s Explore What We Can Build Together.',
    ctaSubheadline:
      'Connect with TISS Corporation to discuss business opportunities, corporate relationships, service partnerships, or commercial collaboration across our diversified portfolio.',
    ctaPrimaryLabel: 'Start a Conversation',
    ctaPrimaryLink: '/contact',
    ctaSecondaryLabel: 'Explore Portfolio',
    ctaSecondaryLink: '/businesses',
  },
  bdChapter: bdChapterStats,
  teamMembers: teamMembers,
  businesses: businesses,
  countries: defaultCountries,
  narratives: {
    // About Page
    aboutBadge: 'Corporate Profile & Foundation',
    aboutHeadline: 'Diversified Enterprise Ecosystem Built for Sustained Excellence',
    aboutSubheadline:
      'Founded in 2017, TISS Corporation bridges visionary leadership, autonomous operating subsidiaries, and strict statutory governance across domestic and cross-border commercial channels.',
    missionStatement:
      'To build market-leading specialized businesses that deliver world-class technology, communication, and supply chain solutions while fostering sustainable economic growth and uncompromised corporate integrity.',
    visionStatement:
      'To emerge as a benchmark diversified conglomerate across South Asia and international gateway markets, empowering autonomous enterprises connected through cutting-edge technology and shared ethical standards.',
    coreValuesText:
      'Operational Autonomy, Statutory Integrity, Continuous Technological Innovation, and Cross-Border Excellence.',
    heritageSummaryText:
      'Commercial operations active in Bangladesh since 2017 with 150+ professionals across 3 corporate and operational facilities in Dhaka.',

    // Services Page
    servicesBadge: 'Enterprise Capabilities',
    servicesHeadline: 'Integrated Multi-Sector Solutions & Delivery',
    servicesSubheadline:
      'Explore comprehensive technology, BPO, modern retail, freight forwarding, ambient advertising, and trade advisory capabilities delivered across our 10 operating entities.',
    servicesModelNote:
      'All enterprise services are executed with dedicated service-level agreements (SLAs), enterprise data protection, and domain-specialized personnel.',

    // Global Presence Page
    globalBadge: 'International Chapter Footprint',
    globalHeadline: 'Decentralized Sovereign Chapters Across 6 Countries',
    globalSubheadline:
      'Every chapter operates as an autonomous legal entity adhering strictly to sovereign corporate laws while interconnected via group governance protocols.',
    globalAutonomyNote:
      'Full statutory compliance is maintained independently in each sovereign territory, with dedicated chapter management driving local growth.',

    // Journey Page
    journeyBadge: 'Chronological Milestones',
    journeyHeadline: 'A Trajectory of Methodical Growth Since 2017',
    journeySubheadline:
      'From foundational operations in Dhaka to establishing 10 market enterprises and physical chapter offices across 6 sovereign territories.',

    // Team Page
    teamBadge: 'Executive Governance & Leadership',
    teamHeadline: 'Bangladesh Chapter Leadership & Operational Directorate',
    teamSubheadline:
      'Over 150 dedicated professionals steered by our core executive council, specialized Inter-Entity Bridge Directors, and multi-department teams.',

    // Contact Page
    contactBadge: 'Executive Communication',
    contactHeadline: 'Executive Dialogue & Institutional Inquiries',
    contactSubheadline:
      'Our corporate office and leadership directorate welcome inquiries regarding strategic partnerships, enterprise service contracts, joint ventures, and institutional correspondence.',
    contactResponseNotice:
      'Direct correspondence is managed by the Office of Coordination. Official inquiries are acknowledged within 24 business hours.',
    contactOfficeHours: 'Sunday – Thursday: 9:00 AM – 6:00 PM (GMT+6)',

    // Legal Pages
    privacyTitle: 'Corporate Privacy Policy',
    privacyEffectiveDate: 'January 2026',
    privacyContent:
      'TISS Co. Ltd. (TISS Corporation) is dedicated to upholding the highest standards of data integrity and confidentiality across all operating subsidiaries.',
    termsTitle: 'Terms of Corporate Use',
    termsEffectiveDate: 'January 2026',
    termsContent:
      'By accessing the website and digital portals of TISS Co. Ltd. and its operating entities, you agree to statutory compliance and non-infringement standards.',
  },
  customPages: [
    {
      id: 'page-csr',
      slug: 'sustainability',
      title: 'Sustainability & Social Impact',
      badgeText: 'Corporate Responsibility',
      heroHeadline: 'Empowering Communities Through Responsible Enterprise',
      heroSubheadline:
        'TISS Corporation is committed to ethical employment, digital literacy in Bangladesh, environmentally sustainable retail packaging, and inclusive workplace practices.',
      content: `### Our Sustainability Pillars

At TISS Corporation, we believe that durable commercial growth goes hand-in-hand with social accountability and environmental stewardship.

#### 1. Fair Employment & Skill Acceleration
Across our 150+ professionals in Bangladesh, we prioritize continuous skill development, technology certifications, competitive compensation, and equitable career pathways.

#### 2. Ethical Supply Chains & Green Retail
Through Qubely Mega Mart Ltd. and Qubely CargoLink, we collaborate with local producers, prioritize eco-conscious packaging, and reduce freight emissions through optimized routing.

#### 3. Community Engagement
Our corporate units actively support digital enablement initiatives for young technologists and local university internship programs.`,
      published: true,
      showInHeaderNav: true,
      showInFooter: true,
      seoTitle: 'Sustainability & Social Impact — TISS Corporation',
      seoDescription:
        'Learn about TISS Corporation’s sustainability initiatives, fair employment commitments, and ethical community practices.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  seo: {
    metaTitle: 'TISS Co. Ltd. (TISS Corporation) — Building Businesses. Connecting Opportunities.',
    metaDescription:
      'A diversified corporate group bringing together autonomous specialized businesses across technology, customer communication, logistics, advertising, advisory, travel, modern retail, and international trade.',
    keywords:
      'TISS Corporation, TISS Co Ltd, Bangladesh Chapter, Parameter-X, Qubely ConnectPoint, Qubely Mega Mart, Qubely CargoLink, Huixin Global, trade finance, technology enterprise, BPO, retail, logistics',
    ogTitle: 'TISS Co. Ltd. — Diversified Enterprise Group',
    ogDescription:
      'Operating 10 specialized businesses across technology, communication, retail, media, and logistics with 150+ professionals and 3 offices in Dhaka.',
    ogImageUrl: '',
    twitterCard: 'summary_large_image',
    canonicalBase: 'https://tiss.com.bd',
    indexingEnabled: true,
    googleSiteVerification: '',
  },
  adminCredentials: {
    username: 'admin',
    passwordHash: 'tissadmin2026',
  },
  animation: {
    enabled: true,
    entranceFades: true,
    scrollReveals: true,
    heroAmbientGlow: true,
    floatingBadges: true,
    tickerSpeed: 45,
    tickerPauseOnHover: true,
    cardHoverEffects: true,
    smoothScroll: true,
    animationSpeedPreset: 'normal',
  },
  theme: {
    preset: 'sky_corporate',
    primaryColor: '#0284C7',
    primaryHoverColor: '#0369A1',
    accentColor: '#38BDF8',
    secondaryColor: '#B99A62',
    pageBackground: '#F8FAFC',
    surfaceCardBackground: '#FFFFFF',
    footerBackground: '#0B1522',
    textHeadingColor: '#0F172A',
    badgeBgColor: '#E0F2FE',
    badgeTextColor: '#0284C7',
  },
  siteIdentity: {
    logoName: 'TISS',
    logoSuffix: 'CO. LTD.',
    tagline: 'Building Businesses · Connecting Opportunities',
    customLogoUrl: '',
    adminPortalTitle: 'TISS Corporate Portal',
    adminPortalSubtitle: 'Content Management & Operations System',
    adminPortalNotice: 'Authorized Administrative Access Only',
  },
  adminUsers: [
    {
      id: 'usr-1',
      username: 'admin',
      displayName: 'Corporate Super Admin',
      role: 'super_admin',
      passwordHash: 'tissadmin2026',
      email: 'admin@tiss.com.bd',
      active: true,
      createdAt: '2026-01-10T00:00:00.000Z',
      lastLogin: '2026-10-01T12:00:00.000Z',
    },
    {
      id: 'usr-2',
      username: 'seo_lead',
      displayName: 'SEO & Marketing Editor',
      role: 'seo_editor',
      passwordHash: 'seo2026',
      email: 'seo@tiss.com.bd',
      active: true,
      createdAt: '2026-02-15T00:00:00.000Z',
      lastLogin: '2026-09-30T10:15:00.000Z',
    },
    {
      id: 'usr-3',
      username: 'writer',
      displayName: 'Corporate Content Writer',
      role: 'content_writer',
      passwordHash: 'writer2026',
      email: 'writer@tiss.com.bd',
      active: true,
      createdAt: '2026-03-01T00:00:00.000Z',
      lastLogin: '2026-09-28T14:40:00.000Z',
    },
    {
      id: 'usr-4',
      username: 'assistant',
      displayName: 'Operations Assistant Admin',
      role: 'assistant_admin',
      passwordHash: 'asst2026',
      email: 'assistant@tiss.com.bd',
      active: true,
      createdAt: '2026-04-05T00:00:00.000Z',
      lastLogin: '2026-09-29T16:20:00.000Z',
    },
  ],
  adminLoginAudits: [
    {
      id: 'audit-1',
      username: 'admin',
      displayName: 'Corporate Super Admin',
      role: 'super_admin',
      timestamp: '2026-10-01T11:45:00.000Z',
      ipAddress: '103.145.118.24 (Dhaka)',
      deviceInfo: 'Mac OS · Chrome 128.0 · Uttara Hub',
      success: true,
    },
    {
      id: 'audit-2',
      username: 'seo_lead',
      displayName: 'SEO & Marketing Editor',
      role: 'seo_editor',
      timestamp: '2026-09-30T10:15:00.000Z',
      ipAddress: '103.145.118.25 (Dhaka)',
      deviceInfo: 'Windows 11 · Edge 127.0',
      success: true,
    },
    {
      id: 'audit-3',
      username: 'writer',
      displayName: 'Corporate Content Writer',
      role: 'content_writer',
      timestamp: '2026-09-28T14:40:00.000Z',
      ipAddress: '103.145.118.28 (Dhaka)',
      deviceInfo: 'Mac OS · Safari 17.5',
      success: true,
    },
  ],
};
