import { TeamMember } from '../types';

export interface ChapterStats {
  chapterName: string;
  totalEmployees: string;
  totalOffices: number;
  officesSummary: string;
  description: string;
}

export const bdChapterStats: ChapterStats = {
  chapterName: 'Bangladesh Chapter Core Leadership',
  totalEmployees: '150+',
  totalOffices: 3,
  officesSummary: '3 Strategic Corporate & Operational Hubs in Dhaka',
  description:
    'The Bangladesh Chapter is powered by a workforce of 150+ dedicated professionals operating across 3 corporate and operational facilities in Dhaka. The core leadership team directs multi-sector operations, engineering squads, customer experience hubs, retail logistics, and administrative teams.',
};

export const departmentFilters = [
  { id: 'all', label: 'All Departments', category: 'all' },
  { id: 'executive', label: 'Executive Governance', category: 'executive' },
  { id: 'operations', label: 'Operations & Expansion', category: 'operations' },
  { id: 'it', label: 'IT & Software', category: 'it' },
  { id: 'coordination', label: 'Coordination & Logistics', category: 'coordination' },
  { id: 'hr', label: 'HR & Administration', category: 'hr' },
  { id: 'finance', label: 'Finance & Treasury', category: 'finance' },
  { id: 'legal', label: 'Legal & Compliance', category: 'legal' },
  { id: 'supply-chain', label: 'Supply Chain & SCM', category: 'supply-chain' },
] as const;

export const teamMembers: TeamMember[] = [
  // 1. Sr. Vice President
  {
    id: 'mohsin-mia',
    name: 'Mohsin Mia',
    role: 'Sr. Vice President',
    department: 'Executive Governance & Group Strategy',
    departmentCategory: 'executive',
    divisionCode: 'EXEC-VP',
    bio: 'Provides executive strategic direction, corporate governance, capital allocation, and high-level stakeholder alignment across TISS Corporation’s operating portfolio.',
    fullBio:
      'Mohsin Mia serves as Senior Vice President (Sr. Vice President) of TISS Corporation. Leading corporate governance and multi-sector strategy, he oversees long-term investment planning, statutory compliance frameworks, and high-level corporate partnerships. With comprehensive leadership acumen across cross-border trade and commercial operations, he steers group-level policy and supports the autonomous operational leadership across all portfolio businesses.',
    focusAreas: [
      'Group Commercial Strategy',
      'Corporate Governance & Statutory Oversight',
      'Capital Allocation & Strategic Expansion',
      'Institutional & Joint Venture Relations',
      'Multi-Sector Growth Stewardship',
    ],
    achievements: [
      'Spearheaded strategic group governance guiding TISS Corporation across 10 specialized operating businesses.',
      'Formulated institutional compliance codes ensuring transparent corporate accountability.',
      'Directed investment allocation and capital frameworks for retail, BPO, and technology rollouts.',
      'Fostered high-level corporate and industry alliances expanding the group’s commercial reach.',
    ],
    keyLeadershipPillars: [
      'Executive Stewardship',
      'Institutional Integrity',
      'Strategic Expansion',
      'Corporate Resilience',
    ],
    email: 'info@tisscoltd.com',
    avatarColor: 'from-slate-900 to-slate-800 text-sky-400',
    isBridgeRole: false,
  },

  // 2. Country Manager & BD Operational Head
  {
    id: 'riad-morshed',
    name: 'Riad Morshed',
    role: 'Country Manager & BD Operational Head',
    department: 'Bangladesh Chapter Operations & Commercial Expansion',
    departmentCategory: 'operations',
    divisionCode: 'BD-OPS',
    bio: 'Leads Bangladesh Chapter operations, executive commercial execution, business development, and cross-sector operational synergy across all 3 offices and 150+ personnel.',
    fullBio:
      'Riad Morshed serves as Country Manager and Operational Head of the Bangladesh Chapter at TISS Corporation. He commands overall operational execution, commercial scale, and enterprise client relations across Bangladesh, orchestrating 150+ employees and 3 corporate and operational offices. Leading with an agile, results-driven approach, he bridges strategic executive directives with daily operational excellence across technology, customer communication, logistics, retail, and media ventures.',
    focusAreas: [
      'Bangladesh Chapter Operational Leadership',
      '150+ Workforce Strategic Coordination',
      'Enterprise Business Development & Client Acquisitions',
      'Cross-Portfolio Commercial Synergy',
      'Performance Optimization & SLA Governance',
    ],
    achievements: [
      'Directs nationwide operations across 3 corporate and operational facilities in Dhaka.',
      'Led the expansion and operational integration of 150+ professionals across multi-sector business units.',
      'Accelerated client acquisition and long-term enterprise contracts across BPO, logistics, and digital services.',
      'Structured high-efficiency operational workflows maximizing cross-business delivery and revenue growth.',
    ],
    keyLeadershipPillars: [
      'Operational Excellence',
      'Strategic Execution',
      'Cross-Functional Leadership',
      'Commercial Agility',
    ],
    email: 'info@tisscoltd.com',
    avatarColor: 'from-[#0284C7] to-[#0369A1] text-white',
    isBridgeRole: false,
  },

  // 3. Head of IT & CEO of Parameter-X
  {
    id: 'paris-bala',
    name: 'Paris Bala',
    role: 'Head Of IT & CEO of Parameter-X Ltd.',
    department: 'Information Technology & Software Engineering Directorate',
    departmentCategory: 'it',
    divisionCode: 'IT-CEO',
    bio: 'Heads enterprise IT systems, digital infrastructure, and cybersecurity for the group, while serving as Chief Executive Officer (CEO) of Parameter-X Ltd.',
    fullBio:
      'Paris Bala heads the Information Technology division at TISS Corporation and serves as the Chief Executive Officer (CEO) of Parameter-X Ltd., the group’s flagship software engineering and IT solutions entity. He directs enterprise digital architecture, cybersecurity protocols, high-availability cloud systems, and bespoke software platforms. Under his technological leadership, Parameter-X delivers cutting-edge software solutions and powers mission-critical digital backbones for modern enterprises.',
    focusAreas: [
      'CEO Leadership at Parameter-X Ltd.',
      'Enterprise Cloud & Infrastructure Architecture',
      'Cybersecurity & Critical Data Governance',
      'High-Availability Telecommunications & Networks',
      'Custom Enterprise Software & ERP Solutions',
    ],
    achievements: [
      'Built and scales Parameter-X Ltd. into a premier software development and enterprise IT company.',
      'Architected resilient high-availability IT infrastructure powering omnichannel BPO and corporate operations.',
      'Enforced enterprise-grade cybersecurity standards, automated disaster recovery, and zero-downtime networks.',
      'Spearheaded custom ERP systems and proprietary enterprise software deployed across the business group.',
    ],
    keyLeadershipPillars: [
      'Technological Innovation',
      'Software Architecture',
      'Cybersecurity Vigilance',
      'Engineering Rigor',
    ],
    email: 'info@tisscoltd.com',
    avatarColor: 'from-teal-600 to-teal-800 text-white',
    isBridgeRole: false,
  },

  // 4. Head of Coordination
  {
    id: 'abdullah-al-mamun',
    name: 'Abdullah Al Mamun',
    role: 'Head Of Coordination',
    department: 'Inter-Entity Coordination & Operational Logistics',
    departmentCategory: 'coordination',
    divisionCode: 'COORD',
    bio: 'Orchestrates cross-functional alignment, regulatory liaisons, multi-office logistics, and executive workflow coordination across the group ecosystem.',
    fullBio:
      'Abdullah Al Mamun serves as the Head of Coordination at TISS Corporation, playing a vital role in harmonizing operational workflows, regulatory compliance, and multi-office communications across all 3 offices in Bangladesh. He acts as the key executive bridge between department directors, sector managers, and external institutional partners, ensuring operational alignment, swift project deployment, and seamless administrative rhythm.',
    focusAreas: [
      'Multi-Office Operational Synchronization',
      'Inter-Entity Project Management',
      'Regulatory & Statutory Compliance Liaison',
      'Logistics & Physical Facility Readiness',
      'Cross-Departmental Workflow Coordination',
    ],
    achievements: [
      'Centralized inter-office coordination protocols connecting 3 facilities in Dhaka into a unified workflow.',
      'Orchestrated regulatory compliance, statutory submissions, and corporate licensing across subsidiaries.',
      'Coordinated physical site outfitting, vendor sourcing, and infrastructure readiness for new retail and BPO launches.',
      'Established transparent cross-entity reporting mechanisms accelerating executive decision-making.',
    ],
    keyLeadershipPillars: [
      'Process Harmonization',
      'Multi-Office Synchronization',
      'Operational Reliability',
      'Stakeholder Alignment',
    ],
    email: 'info@tisscoltd.com',
    avatarColor: 'from-amber-600 to-amber-700 text-white',
    isBridgeRole: false,
  },

  // 5. Head of HR-Admin
  {
    id: 'sanzida-alam-dola',
    name: 'Sanzida Alam Dola',
    role: 'Head Of HR-Admin',
    department: 'Human Capital Management & Corporate Administration',
    departmentCategory: 'hr',
    divisionCode: 'HR-ADM',
    bio: 'Oversees human capital strategy, talent acquisition, corporate culture, workplace policies, and administration for the 150+ workforce.',
    fullBio:
      'Sanzida Alam Dola leads Human Resources and Corporate Administration at TISS Corporation. She oversees workforce strategy, talent acquisition, organizational culture, and administrative operations for the 150+ employees across the Bangladesh Chapter. Her proactive HR leadership ensures transparent workplace governance, competitive talent development, comprehensive welfare initiatives, and full statutory labor compliance.',
    focusAreas: [
      'Strategic Talent Acquisition & Pipeline',
      'Workforce Administration (150+ Personnel)',
      'Corporate Culture, Diversity & Employee Welfare',
      'HR Regulatory & Statutory Labor Compliance',
      'Continuous Learning & Leadership Development',
    ],
    achievements: [
      'Built robust talent acquisition pipelines managing growth to 150+ professionals across tech, BPO, and retail.',
      'Implemented progressive corporate HR policies, objective appraisals, and standardized benefit structures.',
      'Maintained exemplary administrative facilities across corporate and registered office locations.',
      'Championed employee engagement and continuous professional skill advancement programs.',
    ],
    keyLeadershipPillars: [
      'People-First Leadership',
      'Administrative Rigor',
      'Organizational Culture',
      'Ethical Stewardship',
    ],
    email: 'info@tisscoltd.com',
    avatarColor: 'from-purple-600 to-purple-800 text-white',
    isBridgeRole: false,
  },

  // 6. Strategic Bridge Role: Head of Group Financial Control & Treasury
  {
    id: 'tariqul-islam',
    name: 'Tariqul Islam',
    role: 'Head of Financial Control & Treasury',
    department: 'Corporate Finance, Taxation & Inter-Company Treasury',
    departmentCategory: 'finance',
    divisionCode: 'FIN-CTRL',
    bio: 'Serves as group financial bridge, orchestrating centralized auditing, inter-company treasury liquidity, tax compliance, and budget discipline across all 10 operating entities.',
    fullBio:
      'Tariqul Islam acts as Head of Financial Control & Treasury at TISS Corporation, providing the critical inter-entity financial bridge connecting all 10 portfolio companies. He monitors corporate cash flows, tax compliance, capital expenditure governance, and statutory fiscal audits. By standardizing accounting frameworks across retail, logistics, software, and international trading businesses, he safeguards financial integrity and operational solvency throughout the group.',
    focusAreas: [
      'Inter-Company Financial Consolidation',
      'Corporate Treasury & Working Capital Management',
      'Statutory Tax & Regulatory Audit Compliance',
      'Capex & Operational Budget Governance',
      'Cross-Entity Financial Risk Assessment',
    ],
    achievements: [
      'Centralized treasury and cash-flow management systems across 10 autonomous operating companies.',
      'Instituted automated ledger consolidation reducing month-end financial reconciliations from weeks to days.',
      'Maintained impeccable corporate tax and statutory audit records with regulatory authorities.',
      'Engineered structured capital allocations supporting the launch and scale of retail and BPO ventures.',
    ],
    keyLeadershipPillars: [
      'Fiscal Prudence',
      'Audit Transparency',
      'Capital Optimization',
      'Statutory Rigor',
    ],
    email: 'info@tisscoltd.com',
    avatarColor: 'from-emerald-700 to-emerald-900 text-white',
    isBridgeRole: true,
  },

  // 7. Strategic Bridge Role: Head of Corporate Legal & Regulatory Compliance
  {
    id: 'farhana-yasmin',
    name: 'Farhana Yasmin',
    role: 'Head of Legal & Regulatory Affairs',
    department: 'Corporate Governance, Statutory Compliance & Contractual Law',
    departmentCategory: 'legal',
    divisionCode: 'LEGAL-GOV',
    bio: 'Serves as legal bridge across the portfolio, managing corporate filings, licensing, IP rights, client contracts, and sovereign statutory compliance.',
    fullBio:
      'Farhana Yasmin leads Corporate Legal & Regulatory Affairs at TISS Corporation, serving as the essential legal bridge across all subsidiaries. She navigates complex corporate statutes, joint venture agreements, commercial lease contracts, intellectual property trademarks, and labor laws. Her proactive legal governance ensures that every portfolio entity operates with robust regulatory protection and flawless institutional standing.',
    focusAreas: [
      'Cross-Entity Statutory Governance & Filings',
      'Commercial Contracts & Enterprise Master Service Agreements',
      'Intellectual Property & Trademark Protection',
      'Labor Regulations & Employment Compliance',
      'Regulatory Interface & Corporate Licensing',
    ],
    achievements: [
      'Established uniform Master Services Agreement (MSA) standards protecting client relationships across all units.',
      'Secured corporate trademarks and intellectual property rights across all 10 operating businesses.',
      'Supervised statutory compliance filings with zero corporate penalties or regulatory notices.',
      'Negotiated high-value corporate leases and partner contracts across prime retail and office spaces.',
    ],
    keyLeadershipPillars: [
      'Legal Precision',
      'Regulatory Foresight',
      'Contractual Integrity',
      'Corporate Defense',
    ],
    email: 'info@tisscoltd.com',
    avatarColor: 'from-blue-700 to-indigo-900 text-white',
    isBridgeRole: true,
  },

  // 8. Strategic Bridge Role: Head of Group Supply Chain & Vendor Procurement
  {
    id: 'kamrul-hasan',
    name: 'Kamrul Hasan',
    role: 'Head of Supply Chain & Procurement',
    department: 'Inter-Entity Procurement, SCM Logistics & Vendor Synergies',
    departmentCategory: 'supply-chain',
    divisionCode: 'SCM-PROC',
    bio: 'Acts as procurement bridge uniting group buying power, negotiated supplier contracts, centralized logistics dispatch, and inventory pipelines across all businesses.',
    fullBio:
      'Kamrul Hasan serves as Head of Group Supply Chain & Vendor Procurement, functioning as the vital supply chain bridge unifying procurement and logistics across TISS Corporation. He negotiates volume pricing with domestic and global vendors, synchronizes warehouse distribution for retail and cargo units, and implements lean supply chain practices. His role maximizes cost efficiencies and operational throughput across retail, trading, and logistics ventures.',
    focusAreas: [
      'Inter-Company Procurement Synergies',
      'Bulk Vendor Rate Negotiations & SLA Governance',
      'Centralized Warehouse & Dispatch Logistics',
      'Farm-to-Shelf & Cross-Border Freight Coordination',
      'Inventory Optimization & Quality Inspections',
    ],
    achievements: [
      'Consolidated vendor master agreements yielding 18% cost savings across hardware, retail inventory, and supplies.',
      'Built agile supplier distribution networks serving Qubely Mega Mart and Qubely CargoLink facilities.',
      'Structured automated purchase order (PO) workflows linking corporate finance with warehouse dispatch.',
      'Established strict incoming quality assurance standards across perishable and non-perishable categories.',
    ],
    keyLeadershipPillars: [
      'Procurement Leverage',
      'Supply Chain Agility',
      'Vendor Accountability',
      'Cost Efficiency',
    ],
    email: 'info@tisscoltd.com',
    avatarColor: 'from-orange-700 to-amber-900 text-white',
    isBridgeRole: true,
  },

  // 9. Strategic Bridge Role: Head of Brand Strategy & Public Relations
  {
    id: 'nusrat-jahan',
    name: 'Nusrat Jahan',
    role: 'Head of Brand Strategy & Public Relations',
    department: 'Group Brand Architecture, Communications & Corporate Media',
    departmentCategory: 'operations',
    divisionCode: 'BRAND-PR',
    bio: 'Bridges unified corporate communications, brand identity guidelines, marketing campaigns, and ambient media presence across all 10 operating entities.',
    fullBio:
      'Nusrat Jahan heads Brand Strategy & Public Relations at TISS Corporation, bridging group brand identity with sector-level marketing execution. She directs brand positioning, media partnerships, press communications, and public relations across Huixin Global, Qubely AdWings, Mega Mart, and technology offerings. Her strategic eye ensures consistent prestige, trust, and brand clarity across all internal and public-facing touchpoints.',
    focusAreas: [
      'Unified Group Brand Architecture & Guidelines',
      'Public Relations, Press & Corporate Communications',
      'Omnichannel Marketing Strategy Across Subsidiaries',
      'Ambient Media & Digital Advertising Integration',
      'Stakeholder Trust & Brand Reputation Governance',
    ],
    achievements: [
      'Engineered the comprehensive corporate identity system unifying 10 specialized portfolio brands under TISS.',
      'Led public relations campaigns and media partner contracts reaching over 1.5 million monthly ambient impressions.',
      'Structured high-converting launch marketing playbooks for retail, software, and customer care entities.',
      'Managed corporate editorial standards and external communication disclosures across all media channels.',
    ],
    keyLeadershipPillars: [
      'Brand Cohesion',
      'Strategic Communications',
      'Creative Excellence',
      'Reputational Stewardship',
    ],
    email: 'info@tisscoltd.com',
    avatarColor: 'from-rose-700 to-pink-900 text-white',
    isBridgeRole: true,
  },

  // 10. Strategic Bridge Role: Head of Service Quality & Operational SLA
  {
    id: 'asif-mahmud',
    name: 'Asif Mahmud',
    role: 'Head of Service Quality & Operational SLA',
    department: 'Quality Assurance, Customer Experience Standards & KPI Auditing',
    departmentCategory: 'operations',
    divisionCode: 'QA-SLA',
    bio: 'Acts as operational quality bridge, auditing client service delivery, customer satisfaction scores, and technical SLA performance across all enterprise units.',
    fullBio:
      'Asif Mahmud acts as Head of Service Quality & Operational SLA, bridging enterprise customer expectations with day-to-day service execution across TISS Corporation. He formulates quality benchmarks, conducts blind audits on customer contact floors, tracks software uptime SLAs, and oversees retail customer feedback loops. His work ensures that every client interaction reflects uncompromising professionalism and operational integrity.',
    focusAreas: [
      'Cross-Entity Quality Assurance Benchmarking',
      'Customer Care & BPO SLA Monitoring (Qubely ConnectPoint)',
      'Software & IT Delivery Quality Standards (Parameter-X)',
      'Customer NPS & Continuous Feedback Frameworks',
      'Operational Process Optimization & Defect Reduction',
    ],
    achievements: [
      'Implemented group-wide SLA tracking dashboards maintaining 99.4% service benchmark compliance.',
      'Pioneered quality assurance calibration frameworks adopted by 150+ personnel across customer care and delivery.',
      'Reduced customer resolution turnaround times by 35% through standardized escalation protocols.',
      'Instituted mystery shopper and client satisfaction surveys driving operational improvements in retail and logistics.',
    ],
    keyLeadershipPillars: [
      'Zero-Defect Mindset',
      'Client Empathy',
      'Operational Rigor',
      'Continuous Calibration',
    ],
    email: 'info@tisscoltd.com',
    avatarColor: 'from-cyan-700 to-blue-900 text-white',
    isBridgeRole: true,
  },
];

export const additionalOperationalTeams = [
  {
    name: 'Software Engineering & Cloud Architecture Squads',
    entity: 'Parameter-X Ltd.',
    focus: 'Full-stack software development, cloud infrastructure, AI solutions, and enterprise ERP maintenance.',
    teamsCount: '4 Specialized Agile Pods',
  },
  {
    name: 'Customer Experience & Omnichannel Support Floors',
    entity: 'Qubely ConnectPoint',
    focus: '24/7 high-volume inbound helpdesk, customer retention, multi-lingual support, and quality assurance.',
    teamsCount: '3 Dedicated Shifts & QA Division',
  },
  {
    name: 'Retail Merchandising & Store Operations Team',
    entity: 'Qubely Mega Mart Ltd.',
    focus: 'Procurement, vendor onboarding, category management, inventory control, and retail customer service.',
    teamsCount: 'Store Operations & Category Teams',
  },
  {
    name: 'Supply Chain, Logistics & Dispatch Unit',
    entity: 'Qubely CargoLink & Jute Division',
    focus: 'Fleet coordination, parcel logistics, warehouse management, and domestic cargo handling.',
    teamsCount: 'Logistics Fleet & Dispatch Crew',
  },
  {
    name: 'Media Network, Creative & Ambient Ads Team',
    entity: 'Huixin Global & Qubely AdWings',
    focus: 'Digital screen maintenance, media buying, creative production, and client brand campaigns.',
    teamsCount: 'Creative & Technical Media Crews',
  },
  {
    name: 'Finance, Accounts & Statutory Audit Desk',
    entity: 'Corporate Finance Directorate',
    focus: 'Financial planning, taxation compliance, treasury management, and multi-entity accounting.',
    teamsCount: 'Centralized Accounting & Audit Desk',
  },
];
