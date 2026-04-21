export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/video/', '/discover/', '/trending', '/search'],
        disallow: ['/feed', '/settings', '/studio', '/notifications', '/upload', '/admin', '/api/', '/liked', '/saved', '/watch-history', '/following', '/onboarding'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot'],
        disallow: ['/'],
      },
    ],
    sitemap: 'https://shrimp.app/sitemap.xml',
    host: 'https://shrimp.app',
  };
}
