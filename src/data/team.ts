export interface LeadershipProfile {
  id: string;
  name: string;
  title: string;
  roleType: 'executive' | 'board' | 'advisory' | 'sector-head';
  bio: string;
  image?: string;
  verified: boolean;
  publish: boolean;
}

/**
 * Leadership Data Model
 * Currently empty pending verified executive dataset from TISS administration.
 * Strictly adheres to Factual Integrity rule: No invented executive names or biographies.
 */
export const leadershipProfiles: LeadershipProfile[] = [
  // Future verified leadership profiles will be added here
];

export const leadershipPageConfig = {
  headline: 'Governed by Experience. Driven by Purpose.',
  subheadline:
    'Our executive stewards and sector directors cultivate operational discipline, long-term strategic relationships, and cross-border commercial execution.',
  emptyStateTitle: 'Leadership Profiles Under Verification',
  emptyStateMessage:
    'Executive and sector leadership profiles are currently undergoing internal administrative review and legal verification prior to public publication. Detailed credentials and corporate governance governance structures will be published in this space upon final clearance.',
  governancePillars: [
    {
      title: 'Institutional Integrity',
      description:
        'Upholding strict commercial compliance, statutory licensing adherence, and transparent corporate governance across all operating entities.',
    },
    {
      title: 'Operational Autonomy',
      description:
        'Empowering specialized sector leadership teams with operational decision-making freedom paired with shared group standards.',
    },
    {
      title: 'Sustainable Continuity',
      description:
        'Fostering generational stability, risk mitigation, and prudent capital allocation across diverse economic cycles.',
    },
  ],
};
