import { Inter } from 'next/font/google';
import Script from 'next/script';
import '../styles/globals.css';
import { BottomNav } from '../components/layout/BottomNav';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://shrimp.app'),
  title: {
    default: 'Shrimp — Watch & Share Short Videos',
    template: '%s · Shrimp',
  },
  description: 'Discover trending short videos, follow creators, and share moments on Shrimp — the social video platform built for creators.',
  keywords: ['short videos', 'social video', 'creators', 'trending videos', 'share videos'],
  authors: [{ name: 'Shrimp' }],
  creator: 'Shrimp',
  publisher: 'Shrimp',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shrimp.app',
    siteName: 'Shrimp',
    title: 'Shrimp — Watch & Share Short Videos',
    description: 'Discover trending short videos and follow your favourite creators.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Shrimp — social video platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ShrimpApp',
    creator: '@ShrimpApp',
    title: 'Shrimp — Watch & Share Short Videos',
    description: 'Discover trending short videos and follow your favourite creators.',
    images: ['/og-default.jpg'],
  },
  icons: {
    icon: '/shrimp-logo.svg',
  },
  alternates: {
    canonical: 'https://shrimp.app',
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: 'Shrimp RSS Feed' }],
      'application/json+oembed': [{ url: '/oembed?url=https://shrimp.app', title: 'Shrimp oEmbed' }],
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Script id="ga4" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}`}</Script>
        <div className="min-h-screen xl:flex">
          <Sidebar />
          <div className="flex min-h-screen flex-1 flex-col">
            <TopBar />
            <main className="page-shell flex-1 py-8">{children}</main>
          </div>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
