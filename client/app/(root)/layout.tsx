import { ReactQueryProvider } from '@/providers/react.query.provider';
import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import { Header } from '@/shared/components';

import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Budget Tracker',
    template: '%s | Budget Tracker',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${inter.className} antialiased`}>
        <ReactQueryProvider>
          <div id="modals-root"></div>
          <Header />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
