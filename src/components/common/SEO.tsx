import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: string;
  schema?: object;
  keywords?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  schema,
  keywords,
}) => {
  const { cmsData } = useCMS();
  const seoConfig = cmsData.seo;

  useEffect(() => {
    const override = canonicalPath ? seoConfig.pageOverrides?.[canonicalPath] : undefined;

    // 1. Update Title
    const rawTitle = override?.title || title || seoConfig.metaTitle;
    const formattedTitle = rawTitle.includes('TISS Co. Ltd.')
      ? rawTitle
      : `${rawTitle} | TISS Co. Ltd.`;
    document.title = formattedTitle;

    // 2. Update Meta Description
    const activeDesc = override?.description || description || seoConfig.metaDescription;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', activeDesc);

    // 3. Update Meta Keywords
    const activeKeywords = override?.keywords || keywords || seoConfig.keywords;
    if (activeKeywords) {
      let metaKw = document.querySelector('meta[name="keywords"]');
      if (!metaKw) {
        metaKw = document.createElement('meta');
        metaKw.setAttribute('name', 'keywords');
        document.head.appendChild(metaKw);
      }
      metaKw.setAttribute('content', activeKeywords);
    }

    // 4. Update Robots Indexing
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute(
      'content',
      seoConfig.indexingEnabled ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'
    );

    // 5. Update OG Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', formattedTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', activeDesc);

    const ogTypeTag = document.querySelector('meta[property="og:type"]');
    if (ogTypeTag) ogTypeTag.setAttribute('content', ogType);

    if (seoConfig.ogImageUrl) {
      let ogImageTag = document.querySelector('meta[property="og:image"]');
      if (!ogImageTag) {
        ogImageTag = document.createElement('meta');
        ogImageTag.setAttribute('property', 'og:image');
        document.head.appendChild(ogImageTag);
      }
      ogImageTag.setAttribute('content', seoConfig.ogImageUrl);
    }

    // 6. Twitter Card
    let twCard = document.querySelector('meta[name="twitter:card"]');
    if (!twCard) {
      twCard = document.createElement('meta');
      twCard.setAttribute('name', 'twitter:card');
      document.head.appendChild(twCard);
    }
    twCard.setAttribute('content', seoConfig.twitterCard || 'summary_large_image');

    // 7. Google Site Verification
    if (seoConfig.googleSiteVerification) {
      let gVerify = document.querySelector('meta[name="google-site-verification"]');
      if (!gVerify) {
        gVerify = document.createElement('meta');
        gVerify.setAttribute('name', 'google-site-verification');
        document.head.appendChild(gVerify);
      }
      gVerify.setAttribute('content', seoConfig.googleSiteVerification);
    }

    // 8. Update Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    const currentOrigin = seoConfig.canonicalBase ||
      (typeof window !== 'undefined' ? window.location.origin : 'https://tiss.com.bd');
    linkCanonical.setAttribute('href', `${currentOrigin}${canonicalPath}`);

    // 9. Dynamic Schema script if provided
    let schemaScript = document.getElementById('dynamic-page-schema') as HTMLScriptElement | null;
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'dynamic-page-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [title, description, canonicalPath, ogType, schema, keywords, seoConfig]);

  return null;
};
