import React from 'react';
import { SEO } from '../components/common/SEO';
import { HeroPortfolioNetwork } from '../components/home/HeroPortfolioNetwork';
import { CorporateSnapshot } from '../components/home/CorporateSnapshot';
import { PortfolioMosaic } from '../components/home/PortfolioMosaic';
import { SectorLandscape } from '../components/home/SectorLandscape';
import { CorporateStory } from '../components/home/CorporateStory';
import { GlobalPerspectivePreview } from '../components/home/GlobalPerspectivePreview';
import { CorporateApproach } from '../components/home/CorporateApproach';
import { FinalCTA } from '../components/home/FinalCTA';
import { companyData } from '../data/company';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEO
        title="TISS Co. Ltd. (TISS Corporation) — Building Businesses. Connecting Opportunities."
        description={companyData.description}
        canonicalPath="/"
      />
      <div className="bg-[#F8FAFC]">
        <HeroPortfolioNetwork />
        <CorporateSnapshot />
        <PortfolioMosaic />
        <SectorLandscape />
        <CorporateStory />
        <GlobalPerspectivePreview />
        <CorporateApproach />
        <FinalCTA />
      </div>
    </>
  );
};
