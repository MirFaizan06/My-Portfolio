import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component
 * Dynamically updates meta tags, Open Graph tags, and structured data for each page
 */
const SEO = ({
  title = 'Mir Faizan - Full Stack Developer | Web & Mobile App Development',
  description = 'Professional full-stack developer specializing in React, Node.js, and modern web technologies. Building scalable web and mobile applications with 2+ years of experience.',
  keywords = 'full stack developer, web developer, react developer, node.js developer, mobile app development, freelance developer, software engineer',
  author = 'Mir Faizan (NxT)',
  image = 'https://client-the-nxt-lvls-projects.vercel.app/og-image.jpg',
  type = 'website',
  url = '',
  structuredData = null,
}) => {
  const location = useLocation();
  const baseUrl = 'https://client-the-nxt-lvls-projects.vercel.app';
  const currentUrl = url || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      const attr = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'English');
    updateMetaTag('revisit-after', '7 days');

    // Open Graph meta tags (Facebook, LinkedIn)
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Mir Faizan Portfolio', true);
    updateMetaTag('og:locale', 'en_US', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:creator', '@mirfaizan8803');
    updateMetaTag('twitter:site', '@mirfaizan8803');

    // Additional SEO meta tags
    updateMetaTag('theme-color', '#0891b2'); // Cyan color from design
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Structured Data (JSON-LD)
    if (structuredData) {
      let structuredDataScript = document.querySelector('script[type="application/ld+json"]#structured-data');

      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.setAttribute('type', 'application/ld+json');
        structuredDataScript.setAttribute('id', 'structured-data');
        document.head.appendChild(structuredDataScript);
      }

      structuredDataScript.textContent = JSON.stringify(structuredData);
    }

    // Preconnect to external domains for performance
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://firestore.googleapis.com',
    ];

    preconnectDomains.forEach(domain => {
      let preconnect = document.querySelector(`link[rel="preconnect"][href="${domain}"]`);
      if (!preconnect) {
        preconnect = document.createElement('link');
        preconnect.setAttribute('rel', 'preconnect');
        preconnect.setAttribute('href', domain);
        preconnect.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(preconnect);
      }
    });

  }, [title, description, keywords, author, image, type, currentUrl, structuredData]);

  return null; // This component doesn't render anything
};

// Predefined SEO configurations for each page
export const seoConfig = {
  home: {
    title: 'Mir Faizan - Full Stack Developer | React, Node.js Expert',
    description: 'Professional full-stack developer with 2+ years experience in React, Node.js, and mobile development. Building scalable web applications for clients worldwide.',
    keywords: 'mir faizan, full stack developer, react developer, node.js developer, mobile app developer, freelance developer, software engineer, india developer',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Mir Faizan',
      alternateName: 'NxT',
      url: 'https://client-the-nxt-lvls-projects.vercel.app',
      image: 'https://client-the-nxt-lvls-projects.vercel.app/profile.jpg',
      jobTitle: 'Full Stack Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance',
      },
      sameAs: [
        'https://github.com/MirFaizan06',
      ],
      knowsAbout: [
        'Web Development',
        'Mobile App Development',
        'React',
        'Node.js',
        'Full Stack Development',
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'India',
      },
      email: 'mirfaizan8803@gmail.com',
    },
  },

  projects: {
    title: 'Projects - Mir Faizan | Full Stack Development Portfolio',
    description: 'Explore my portfolio of 50+ completed projects including web applications, mobile apps, and e-commerce platforms built with React, Node.js, and modern technologies.',
    keywords: 'portfolio projects, web development projects, react projects, node.js projects, mobile app projects, full stack projects, developer portfolio',
    type: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Projects Portfolio',
      description: 'Collection of web and mobile development projects by Mir Faizan',
      author: {
        '@type': 'Person',
        name: 'Mir Faizan',
      },
    },
  },

  pricing: {
    title: 'Pricing - Affordable Web Development Services | Mir Faizan',
    description: 'Transparent pricing for web development and mobile app development services. Starting from $99. Multi-currency support with competitive rates for quality development work.',
    keywords: 'web development pricing, mobile app cost, freelance developer rates, web development cost, app development pricing, affordable web developer, competitive pricing',
    type: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Web Development',
      provider: {
        '@type': 'Person',
        name: 'Mir Faizan',
      },
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Web Development Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Starter Package',
              description: 'Perfect for small projects and startups',
            },
          },
        ],
      },
    },
  },

  resume: {
    title: 'Resume - Mir Faizan | Full Stack Developer Experience & Skills',
    description: 'Professional resume showcasing 2+ years of full-stack development experience, technical skills in React, Node.js, education, certifications, and achievements.',
    keywords: 'developer resume, full stack developer cv, react developer resume, node.js developer experience, professional resume, developer skills, software engineer resume',
    type: 'profile',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Mir Faizan',
      jobTitle: 'Senior Full Stack Developer',
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name: 'Bachelor of Science in Computer Science',
        },
      ],
      knowsAbout: [
        'JavaScript',
        'React',
        'Node.js',
        'MySQL',
        'MongoDB',
        'Mobile Development',
      ],
    },
  },

  contact: {
    title: 'Contact - Hire Mir Faizan | Full Stack Developer',
    description: 'Get in touch for web development and mobile app development projects. Available for freelance work and consultations. Fast response guaranteed.',
    keywords: 'hire developer, contact web developer, freelance developer contact, hire full stack developer, web development inquiry, developer consultation',
    type: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Mir Faizan',
      description: 'Contact form and information for Mir Faizan',
      author: {
        '@type': 'Person',
        name: 'Mir Faizan',
        email: 'mirfaizan8803@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'India',
        },
      },
    },
  },
};

// Website-level structured data
export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mir Faizan Portfolio',
  alternateName: 'NxY Portfolio',
  url: 'https://client-the-nxt-lvls-projects.vercel.app',
  description: 'Professional portfolio of Mir Faizan, a full-stack developer specializing in web and mobile development',
  author: {
    '@type': 'Person',
    name: 'Mir Faizan',
    email: 'mirfaizan8803@gmail.com',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://client-the-nxt-lvls-projects.vercel.app/projects?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default SEO;
