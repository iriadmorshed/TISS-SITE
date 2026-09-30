import { ExternalPresence } from '../types';

/**
 * Central Digital Presence & Research Layer
 * Tracks external links, verification status, and publication clearance.
 * Only items marked `approvedForPublication: true` are rendered on the public website.
 */
export const externalPresenceList: ExternalPresence[] = [
  {
    entity: 'Parameter-X Ltd.',
    type: 'website',
    label: 'parameter-x.com',
    url: 'https://parameter-x.com/',
    verificationLevel: 'tier-b-public-reference',
    approvedForPublication: true,
    notes:
      'Verified active public company domain. Showcases software engineering, SaaS, APIs, backend systems, and web applications. Employee counts and unverified claims are not imported.',
  },
  {
    entity: 'Huixin Global Ltd. — Qubely AdWings',
    type: 'website',
    label: 'huixin.co.bd',
    url: 'https://www.huixin.co.bd/',
    verificationLevel: 'tier-b-public-reference',
    approvedForPublication: true,
    notes:
      'Verified active public company domain. Highlights elevator and ambient advertising media in Bangladesh. Approved for outbound reference.',
  },
  {
    entity: 'TGB Global Trading',
    type: 'website',
    label: 'tgbglobaltrading.com',
    url: 'https://tgbglobaltrading.com/',
    verificationLevel: 'tier-b-public-reference',
    approvedForPublication: true,
    notes:
      'Verified active public company domain. References international jute export trade from Bangladesh. Self-published trade market details treated as company-published info.',
  },
  {
    entity: 'Qubely ConnectPoint',
    type: 'recruitment',
    label: 'ConnectPoint Career & Public References',
    url: '',
    verificationLevel: 'verification-required',
    approvedForPublication: false,
    notes:
      'Public recruitment and professional profile references indicate Bangladesh-based communication operations. External links withheld until primary company domain is designated.',
  },
  {
    entity: 'Parameter-X Ltd.',
    type: 'linkedin',
    label: 'Parameter-X LinkedIn Presence',
    url: '',
    verificationLevel: 'tier-b-public-reference',
    approvedForPublication: false,
    notes:
      'Public LinkedIn company presence observed. Generic social links withheld to avoid unverified profile associations.',
  },
];
