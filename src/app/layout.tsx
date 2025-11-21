import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'salus alpha - USD Currency Converter',
  description:
    'Fast, transparent conversion of USD to EUR and CHF with current ECB exchange rates',
};

/**
 * Root layout component - wraps all pages with common HTML structure.
 * Sets up dark mode and font configuration.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">{children}</body>
    </html>
  );
}
