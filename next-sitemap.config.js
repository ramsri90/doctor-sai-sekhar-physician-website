/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.drsaisekharphysician.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
