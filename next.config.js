/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'pt', 'es'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  trailingSlash: true,
}

module.exports = nextConfig
