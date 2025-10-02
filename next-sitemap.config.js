module.exports = {
    siteUrl: process.env.SITE_URL || 'https://properties.maksv.lv',
    generateRobotsTxt: true,
    exclude: ['/server-sitemap.xml', '/admin', '/admin/login'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://properties.maksv.lv/server-sitemap.xml',
        ],
    },
};
