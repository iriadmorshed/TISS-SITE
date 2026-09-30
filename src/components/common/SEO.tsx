import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: string;
  schema?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  schema,
}) => {
  useEffect(() => {
    // Update Title
    const formattedTitle = title.includes('TISS Co. Ltd.')
      ? title
      : `${title} | TISS Co. Ltd.`;
    document.title = formattedTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OG Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', formattedTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogTypeTag = document.querySelector('meta[property="og:type"]');
    if (ogTypeTag) ogTypeTag.setAttribute('content', ogType);

    // Update Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    const currentOrigin =
      typeof window !== 'undefined' ? window.location.origin : 'https://tiss.com.bd';
    linkCanonical.setAttribute('href', `${currentOrigin}${canonicalPath}`);

    // Dynamic Schema script if provided
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
  }, [title, description, canonicalPath, ogType, schema]);

  return null;
};
