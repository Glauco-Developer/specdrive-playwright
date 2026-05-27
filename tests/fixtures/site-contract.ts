/**
 * Site contract — update this file when IA, nav, or core copy changes on purpose.
 * Tests import from here so specs stay stable when only volatile CMS content changes.
 */
export const siteContract = {
  brandTitle: /The Wheel: Supporting & Representing Charities/,

  hero: {
    h1: /We are Ireland.s national association of charities and community groups/i,
    tagline: /thriving charity and community sector/i,
  },

  /** Top-level nav labels — change when menu IA changes */
  primaryNav: [
    'Become a Member',
    'Get Support',
    'Our Work',
    'About Us',
    'Member Hub',
    'News and Updates',
  ] as const,

  utilityNav: ['Contact us', 'Jobs board', 'Login'] as const,

  /** Section h2 headings expected on homepage */
  sections: {
    howWeHelp: 'How we help',
    workingOn: /What we.re working on/i,
    whyJoin: 'Why join us at The Wheel?',
    news: 'Our latest News and Updates',
    funders: 'Our funders',
    newsletter: 'Newsletter sign up',
    helpfulLinks: 'Helpful links',
  },

  /** Service cards under “How we help” */
  serviceCards: [
    { heading: 'Funding', cta: 'Access help with funding' },
    { heading: 'Training and Events', cta: 'Upcoming training' },
    { heading: 'Advice and Guidance', cta: 'Get Advice and Guidance' },
    { heading: 'Policy and Advocacy', cta: 'Policy & Advocacy' },
  ] as const,

  ctas: {
    joinToday: { name: 'Join us today', href: /\/join-us\/?$/ },
    alreadyMember: { name: 'Already a member?', href: /\/login\/?$/ },
    becomeMember: { hrefPattern: /\/membership\/become-a-member\/?$/ },
    viewAllNews: { name: 'View all news and updates', href: /\/news-and-updates\/?$/ },
  },

  workingOnLinks: ['Our Campaigns', 'Publications and Submissions', 'Our Projects'] as const,

  footer: {
    copyright: /© Copyright The Wheel \d{4}/,
    privacyLink: 'Privacy policy',
    subscribeLink: 'Subscribe',
  },

  /** Minimum article links in news block (content rotates) */
  minNewsArticleLinks: 1,
} as const;
