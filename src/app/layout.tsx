import type { Metadata } from 'next';
import { Bree_Serif, Anek_Malayalam } from 'next/font/google';
import './globals.css';
import Preloader from '@/components/layout/Preloader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MeatSliderMarquee from '@/components/know-your-meat/MeatSliderMarquee';
import SmoothScroll from '@/components/layout/SmoothScroll';
import ScrollToTop from '@/components/layout/ScrollToTop';

const breeSerif = Bree_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bree-serif',
  display: 'swap',
});

const anekMalayalam = Anek_Malayalam({
  subsets: ['latin', 'malayalam'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-anek-malayalam',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://meatinfoods.com'),
  title: {
    default: 'MEATiN | Premium Meat Experience',
    template: '%s | MEATiN'
  },
  description: 'Fresh meat delivered with trust. Discover premium cuts, hygienic processing, and ethical sourcing with MEATiN.',
  keywords: ['fresh meat', 'premium cuts', 'buy meat online', 'hygienic meat', 'ethical sourcing', 'MEATiN', 'meat delivery', 'fresh chicken', 'fresh mutton', 'fresh fish'],
  authors: [{ name: 'MEATiN Foods' }],
  creator: 'MEATiN Foods',
  publisher: 'MEATiN Foods',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/meatin-logo.webp',
  },
  openGraph: {
    title: 'MEATiN | Premium Meat Experience',
    description: 'Fresh meat delivered with trust. Discover premium cuts, hygienic processing, and ethical sourcing with MEATiN.',
    url: 'https://meatinfoods.com',
    siteName: 'MEATiN',
    images: [
      {
        url: '/assets/logo-image.webp',
        width: 800,
        height: 600,
        alt: 'MEATiN Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MEATiN | Premium Meat Experience',
    description: 'Fresh meat delivered with trust. Discover premium cuts, hygienic processing, and ethical sourcing with MEATiN.',
    images: ['/assets/logo-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'MEATiN',
    'url': 'https://meatinfoods.com',
    'logo': 'https://meatinfoods.com/assets/logo-image.webp',
    'sameAs': [
      'https://www.facebook.com/meatinfoods',
      'https://www.instagram.com/meatinfoods',
    ],
    'description': 'Fresh meat delivered with trust. Discover premium cuts, hygienic processing, and ethical sourcing with MEATiN.',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+91-XXXXXXXXXX', // Fallback or template contact
      'contactType': 'customer service',
    }
  };

  return (
    <html 
      lang="en" 
      className={`${breeSerif.variable} ${anekMalayalam.variable}`} 
      suppressHydrationWarning
    >
      <body className="font-anek bg-white text-slate-900 min-h-screen flex flex-col antialiased preloader-active" suppressHydrationWarning>
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
        <script
          id="preloader-check"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('meatin_preloaded') === 'true') {
                  document.body.classList.remove('preloader-active');
                } else {
                  document.documentElement.classList.add('is-preloading');
                }
              } catch(e) {}
            `,
          }}
          suppressHydrationWarning
        />
        <Preloader />

        <Navbar />
        <main className="flex-1 w-full">
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </main>
        <MeatSliderMarquee />
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
