import { Router } from 'express';
import { listVideos } from '../services/mockStore.js';

const router = Router();

router.get('/rss.xml', async (req, res) => {
  try {
    const items = listVideos()
      .slice(0, 20)
      .map((video) => `
        <item>
          <title><![CDATA[${video.title}]]></title>
          <link>https://shrimp.app/video/${video.id}/${video.slug}</link>
          <guid isPermaLink="true">https://shrimp.app/video/${video.id}/${video.slug}</guid>
          <pubDate>${new Date(video.publishedAt).toUTCString()}</pubDate>
          <description><![CDATA[${video.description}]]></description>
        </item>`)
      .join('');

    res.type('application/rss+xml').send(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Shrimp</title><link>https://shrimp.app</link><description>Shrimp videos</description>${items}</channel></rss>`);
  } catch (error) {
    res.status(500).send('RSS generation failed');
  }
});

router.get('/sitemap.xml', async (req, res) => {
  try {
    const urls = listVideos()
      .slice(0, 50)
      .map((video) => `<url><loc>https://shrimp.app/video/${video.id}/${video.slug}</loc></url>`)
      .join('');
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  } catch (error) {
    res.status(500).send('Sitemap generation failed');
  }
});

router.get('/oembed', async (req, res) => {
  try {
    res.json({ type: 'video', version: '1.0', provider_name: 'Shrimp', provider_url: 'https://shrimp.app' });
  } catch (error) {
    res.status(500).json({ error: 'oEmbed generation failed' });
  }
});

export default router;
