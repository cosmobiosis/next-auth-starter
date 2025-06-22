import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import './globals.css';
import { auth } from '@/auth/utils';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { ModeToggle } from '@/components/mode-toggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.AUTH_URL
      ? `${process.env.AUTH_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: 'Yeti',
  description:
    '',
  openGraph: {
    url: '/',
    title: 'Yeti',
    description:
      ''
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yeti',
    description:
      ''
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang='en' suppressHydrationWarning>
      <body 
        className='font-clash antialiased bg-gradient-to-br from-[#eaf6ff] via-[#ffeedd] to-[#ffd9a0]
          bg-[length:200%_200%] animate-gradient-slow
          backdrop-blur-xl bg-white/30
          border border-white/20'>
        <div className=''>
            {children}
          <Toaster />
        </div>
        </body>
      </html>
    </SessionProvider>
  );
}
