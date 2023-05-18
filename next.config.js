const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  async rewrites() {
    return [
      {
        source: '/lv/:path*',
        destination: '/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
