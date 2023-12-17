/* eslint-disable camelcase */
/* eslint-disable react/function-component-definition */

import type { Metadata } from 'next';
import { Wendy_One } from 'next/font/google';

import '@radix-ui/themes/styles.css';
import '../styles/globals.css';
import { Providers } from './providers';

const font = Wendy_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-main',
});

export const metadata: Metadata = {
  title: 'Scheduler',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
